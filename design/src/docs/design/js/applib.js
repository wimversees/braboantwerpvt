'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

window.Lube = function ($, ns) {
    'use strict';

    var cfg = {
        cache: {
            topEqualHeightBoxes: [
                //{ selector: '.testimonial > p', responsive: true, ignoreOffset: true }
            ]
        },
        classes: {
            scrolling: 'scrolling'
        },
        events: {
            scroll: 'scroll'
        }
    };

    ns.Dom = {
        init: function init() {
            var settings = cfg,
                classes = settings.classes,
                events = settings.events,
                cache = settings.cache;

            this.win = $(window);
            this.body = $(document.body);

            this.bindEvents(classes, events);
            this.windowsPhoneViewportFix();
            this.fixHeaderTopOnScroll();
            this.bindScrollTopEvent();
        },

        bindEvents: function bindEvents(classes, events) {
            var self = this,
                settings = cfg,
                cache = settings.cache;

            this.win.on(events.scroll, function () {
                self.body.addClass(classes.scrolling);

                ns.fn.delayedEvent(function () {
                    self.body.removeClass(classes.scrolling);
                }, 100, events.scroll);
            });

            this.win.on(events.resize, function () {
                ns.fn.delayedEvent(function () {
                    self.topEqualHeightHandler(cache.topEqualHeightBoxes, true);
                }, 200, 'resizeEqualHeight');
            });

            this.win.on(events.load, function () {
                self.topEqualHeightHandler(cache.topEqualHeightBoxes, false);
            });
        },

        windowsPhoneViewportFix: function windowsPhoneViewportFix() {
            // Copyright 2014-2015 Twitter, Inc.
            // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement('style');
                msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
                document.querySelector('head').appendChild(msViewportStyle);
            }
        },

        fixHeaderTopOnScroll: function fixHeaderTopOnScroll() {
            var fixedElement = $('header hr');
            var fixmeTop = fixedElement.offset().top; // get initial position of the element

            $(window).scroll(function () {
                // assign scroll event listener

                var currentScroll = $(window).scrollTop(); // get current position

                if (currentScroll >= fixmeTop) {
                    // apply position: fixed if you
                    fixedElement.css({ // scroll to that element or below it
                        position: 'fixed',
                        top: '0',
                        left: '0'
                    });
                } else {
                    // apply position: static
                    fixedElement.css({ // if you scroll above it
                        position: 'static'
                    });
                }
            });
        },

        bindScrollTopEvent: function bindScrollTopEvent() {
            var self = this;
            $('a[href="#top"]').click(function () {
                self.body.animate({ scrollTop: 0 }, "slow");
                return false;
            });
        }
    };

    return ns;
}(window.jQuery, window.Lube || {});

/**
* @author       [Stef Coenen & Tim Vermaelen]
* @date         [2016]
* @namespace    [Lube.fn]
* @type         [Functions]
* @requires     [jQuery, Lube]
* @revision     [0.1]
*/

// @param ($): window.jQuery
// @param (ns): window.Lube
window.Lube = function ($, ns) {

    // 1. ECMA-262/5
    'use strict';

    // 2. CONFIGURATION

    var cfg = {
        patterns: {
            mobile: new RegExp(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i),
            mobile2: new RegExp(/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/),
            tablet: new RegExp(/android|ipad|playbook|silk/i)
        },
        devices: {
            mobile: 'mobile',
            tablet: 'tablet',
            desktop: 'desktop'
        },
        delimiter: {
            key: '&',
            val: '='
        }
    };

    // 3. FUNCTIONS OBJECT
    ns.fn = {

        /**
         * @description Device detection
         * http://detectmobilebrowsers.com
         * @param {String} dvc : user agent string
         * @return {String} mobile | tablet | desktop
         */
        deviceDetection: function (dvc) {
            var cfgPatterns = cfg.patterns,
                cfgDevice = cfg.devices;

            return cfgPatterns.mobile.test(dvc) || cfgPatterns.mobile2.test(dvc.substr(0, 4)) ? cfgDevice.mobile : cfgPatterns.tablet.test(dvc) ? cfgDevice.tablet : cfgDevice.desktop;
        }(navigator.userAgent || navigator.vendor || window.opera),

        /**
         * @description Render html template with json data
         * @see handlebars or mustache if you need more advanced functionlity
         * @param {Object} obj
         * @param {String} template : html template with {{keys}} matching the object
         * @return {String} template : the template string replaced by key:value pairs from the object
         */
        renderTemplate: function renderTemplate(obj, template) {
            var tempKey, reg, key;

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    tempKey = String('{{' + key + '}}');
                    reg = new RegExp(tempKey, 'g');
                    template = template.replace(reg, obj[key]);
                }
            }

            return template;
        },

        /**
         * @description A (possibly faster) way to get the current timestamp as an integer.
         */
        now: Date.now || function () {
            return new Date().getTime();
        },

        /**
         * @description Defers a function, scheduling it to run after the current call stack has cleared.
         * @param {Function} func
         */
        defer: function defer(func) {
            return this.delay.apply(null, [func, 1].concat([].slice.call(arguments, 1)));
        },

        /**
         * @description Delays a function for the given number of milliseconds, and then calls it with the arguments supplied.
         * @param {Function} func
         * @param (Integer) wait : milliseconds
         */
        delay: function delay(func, wait) {
            var args = [].slice.call(arguments, 2);

            return setTimeout(function () {
                return func.apply(null, args);
            }, wait);
        },

        /**
         * @description Returns a function, that, when invoked, will only be triggered at most once during a given window of time.
         * @param {Function} func
         * @param {Integer} wait : milliseconds
         * @param {Boolean} options.leading : disable the execution on the leading edge. To disable execution on the trailing edge, ditto.
         */
        throttle: function throttle(func, wait, options) {
            var context, args, result;
            var timeout = null;
            var previous = 0;

            options = options || {};

            var later = function later() {
                previous = options.leading === false ? 0 : Lube.fn.now();
                timeout = null;
                result = func.apply(context, args);
                context = args = null;
            };

            return function () {
                var now = Lube.fn.now();

                if (!previous && options.leading === false) {
                    previous = now;
                }

                var remaining = wait - (now - previous);

                context = this;
                args = arguments;

                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = func.apply(context, args);
                    context = args = null;
                } else if (!timeout && options.trailing !== false) {
                    timeout = setTimeout(later, remaining);
                }

                return result;
            }();
        },

        /**
         * @description Returns a function, that, as long as it continues to be invoked, will not be triggered. The function will be called after it stops being called for N milliseconds.
         * @param {Function} func
         * @param {Integer} wait : milliseconds
         * @param {Boolean} immediate : if immediate is passed, trigger the function on the leading edge, instead of the trailing.
         */
        debounce: function debounce(func, wait, immediate) {
            var self = this,
                timeout,
                args,
                context,
                timestamp,
                result;

            var later = function later() {
                var last = self.now() - timestamp;
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                        context = args = null;
                    }
                }
            };

            return function () {
                context = this;
                args = arguments;
                timestamp = self.now();

                var callNow = immediate && !timeout;
                if (!timeout) {
                    timeout = setTimeout(later, wait);
                }
                if (callNow) {
                    result = func.apply(context, args);
                    context = args = null;
                }

                return result;
            }();
        },

        /**
         * @description delay events with the same id, good for window resize events, keystroke, etc ...
         * @param {Function} func : callback function to be run when done
         * @param {Integer} wait : integer in milliseconds
         * @param {String} id : unique event id
         */
        delayedEvent: function () {
            var timers = {};

            return function (func, wait, id) {
                wait = wait || 200;
                id = id || 'anonymous';

                if (timers[id]) {
                    clearTimeout(timers[id]);
                }

                timers[id] = setTimeout(func, wait);
            };
        }(),

        /**
         * @description Equally set height on items
         * @param {Object} elements : jquery list
         */
        equalHeight: function equalHeight(elements) {
            var el = $(elements),
                len = el.length || 0,
                heighest = 0;

            if (len > 1) {
                while (len--) {
                    var h = el.eq(len).outerHeight(true);

                    if (h > heighest) {
                        heighest = h;
                    }
                }

                el.outerHeight(heighest);
            }
        },

        /**
         * @description Convert a query alike string to an object literal
         * @param {String} qs : a query string of key value pairs (without ?)
         * @param {String} keyDelimiter : character between values and keys
         * @param {String} valDelimiter : character between keys and values
         * @return {Object} obj : object literal representing the query string
         * @example: key1=val1&key2=val2&key3=val3
         */
        convertQsToLiteral: function convertQsToLiteral(qs, keyDelimiter, valDelimiter) {
            var arrParams,
                obj = {};

            if (qs && qs.length) {
                keyDelimiter = keyDelimiter || cfg.delimiter.key;
                valDelimiter = valDelimiter || cfg.delimiter.val;
                arrParams = qs.split(keyDelimiter);

                $.each(arrParams, function (i, pair) {
                    var arrPair = pair.split(valDelimiter),
                        key = arrPair[0],
                        val = arrPair[1];

                    obj[key] = val;
                });
            }

            return obj;
        },

        /**
         * @description Get an object from a list of objects by searching for a key:value pair
         * @param {Object} obj : -literal, json
         * @param {String} val : the value you seek
         * @param {String} key : the key
         * @param {Boolean} isTypeComparison : if set to true, the key and value will be checked against it's type as well
         */
        getObjectProperty: function getObjectProperty(obj, val, key, isTypeComparison) {
            var property, o;

            for (property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (_typeof(obj[property]) === 'object') {
                        o = this.getObjectProperty(obj[property], val, key);
                        if (o) {
                            break;
                        }
                    } else {
                        // found a property which is not an object
                        if (isTypeComparison) {
                            if (property === key && obj[property] === val) {
                                // we got a match
                                o = obj;
                                break;
                            }
                        } else {
                            if (property == key && obj[property] == val) {
                                // we got a match
                                o = obj;
                                break;
                            }
                        }
                    }
                }
            }

            return o || undefined;
        },

        pageOffset: function pageOffset() {
            var supportPageOffset = window.pageXOffset !== undefined;
            var isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';

            return {
                x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
                y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
            };
        }
    };

    // 4. NAMESPACE
    return ns;
}(window.jQuery, window.Lube || {});

(function ($, ns, _) {
    'use strict';

    var cfg = {
        cache: {
            googlemap: '[data-component="Lube.GoogleMaps"]',
            action: '[data-action]',
            dateInput: '.action-filter-date',
            dateMinInput: '.action-filter-date-min',
            dateMaxInput: '.action-filter-date-max',
            btnClear: '.btn-clear'
        },
        classes: {
            hide: 'hide'
        },
        data: {
            action: 'action'
        },
        attributes: {},
        events: {
            click: 'click',
            change: 'change',
            mapLoaded: 'googlemaps.loaded',
            placeMarkers: 'googlemaps.place-markers',
            placeMarkersAndFit: 'googlemaps.place-markers-fit',
            placeMarker: 'googlemaps.place-marker',
            setMarkerActive: 'googlemaps.set-marker-active',
            locationUpdate: 'googlemaps.location-update',
            locationPlaced: 'googlemaps.location-placed',
            locationError: 'googlemaps.location-error',
            boundsupdated: 'googlemaps.bounds-update'
        },
        datepickerOptions: {
            format: 'dd/mm/yyyy',
            weekStart: 1,
            keepEmptyValues: true
        }
    };

    ns.ActionFilter = function (container) {
        this.container = container;
        this.settings = cfg;

        this.cacheItems();
        this.bindEvents();
        this.activate();
    };

    ns.ActionFilter.prototype = {
        cacheItems: function cacheItems() {
            var _this = this;

            var settings = this.settings,
                cache = settings.cache,
                data = settings.data;

            // Base
            this.htmlBody = $('html, body');
            this.map = $(cache.googlemap);

            // Filters
            this.dateInput = this.container.find(cache.dateInput);
            this.dateMinInput = this.container.find(cache.dateMinInput);
            this.dateMaxInput = this.container.find(cache.dateMaxInput);
            this.btnClear = this.container.find(cache.btnClear);

            //Actions
            this.firstActionDate = new Date();
            this.lastActionDate = new Date('1/1/2017');
            this.actions = this.container.find(cache.action);
            this.actionMarkers = [];

            var _loop = function _loop(i) {
                var actionData = _this.actions.eq(i).data(data.action);
                if (actionData !== undefined) {
                    actionData.handler = function () {
                        _this.actionClickHandler(_this.actions.eq(i), _this.actionMarkers[i]);
                    };
                    actionData.id = i;
                    actionData.element = _this.actions.eq(i);
                    _this.actionMarkers.push(actionData);

                    var date = new Date(actionData.date);
                    if (date < _this.firstActionDate) {
                        _this.firstActionDate = date;
                    } else if (date > _this.lastActionDate) {
                        _this.lastActionDate = date;
                    }
                }
            };

            for (var i = 0; i < this.actions.length; i++) {
                _loop(i);
            }
        },
        bindEvents: function bindEvents() {
            var _this2 = this;

            var settings = this.settings,
                events = settings.events;

            this.btnClear.on(events.click, function () {
                _this2.dateMinInput.datepicker('update', '');
                _this2.dateMaxInput.datepicker('update', '');
            });

            this.dateMinInput.on(events.change, function () {
                _this2.doFilter();
            });
            this.dateMaxInput.on(events.change, function () {
                _this2.doFilter();
            });

            this.map.on(events.boundsupdated, _.debounce(function (e, params) {
                _this2.currentBounds = params;
                _this2.doFilter();
            }, 300));
        },
        actionClickHandler: function actionClickHandler(actionElement, actionMarker) {
            this.htmlBody.animate({
                scrollTop: actionElement.offset().top
            }, 500);
        },
        activate: function activate() {
            var settings = this.settings,
                events = settings.events,
                data = settings.data;

            // Place initial markers
            this.map.trigger(events.placeMarkersAndFit, {
                markers: this.actionMarkers
            });

            // Init filters
            // Init datepickers
            var options = {};
            Object.assign(options, settings.datepickerOptions, {
                inputs: $().add(this.dateMinInput).add(this.dateMaxInput),
                startDate: this.firstActionDate,
                endDate: this.lastActionDate
            });
            this.datePickerInstance = this.dateInput.datepicker(options);
        },
        doFilter: function doFilter() {
            var actionMarkers = this.actionMarkers;

            var minDate = this.dateMinInput.datepicker('getUTCDate');
            var maxDate = this.dateMaxInput.datepicker('getUTCDate');

            actionMarkers = this.filterLocation(this.currentBounds, actionMarkers);
            if (minDate || maxDate) {
                actionMarkers = this.filterDates(minDate, maxDate, actionMarkers);
            }

            this.toggleVisiblityActions(actionMarkers);
        },
        filterLocation: function filterLocation(boundsObject, actions) {
            function filterMethod(action) {
                if (action.position.lat >= boundsObject.south && action.position.lat <= boundsObject.north) {
                    // Latitude matches
                    if (action.position.lng >= boundsObject.west && action.position.lng <= boundsObject.east) {
                        return true;
                    }
                }
                return false;
            }

            return actions.filter(filterMethod);
        },
        filterDates: function filterDates(minDate, maxDate, actions) {
            function filterMethod(action) {
                var date = new Date(action.date);
                if (!maxDate && minDate && date >= minDate || !minDate && maxDate && date <= maxDate || minDate && maxDate && date >= minDate && date <= maxDate) {
                    return true;
                } else {
                    return false;
                }
            }

            return actions.filter(filterMethod);
        },
        toggleVisiblityActions: function toggleVisiblityActions(toShowMarkers) {
            var allMarkers = this.actionMarkers;

            for (var i = 0; i < allMarkers.length; i++) {
                var currentMarker = allMarkers[i];
                if (toShowMarkers.indexOf(currentMarker) !== -1) {
                    this.showMarker(currentMarker);
                } else {
                    this.hideMarker(currentMarker);
                }
            }
        },
        showMarker: function showMarker(marker) {
            var classes = this.settings.classes;

            marker.element.show();
            marker.element.removeClass(classes.hide);
        },
        hideMarker: function hideMarker(marker) {
            var classes = this.settings.classes;

            marker.element.addClass(classes.hide);
            setTimeout(function () {
                marker.element.hide();
            }, 180);
        }
    };

    return ns;
})(window.jQuery, window.Lube || {}, window._ || {});

function asyncGoogleMaps() {}
(function ($, google, ns) {
    'use strict';

    var cfg = {
        cache: {},
        classes: {},
        data: {
            startLocation: 'start-location',
            geocodeCountryBias: 'geocode-country-bias'
        },
        attributes: {},
        events: {
            click: 'click',
            shown: 'shown.bs.modal',
            dragend: 'dragend',
            resize: 'resize',
            zoomChanged: 'zoom_changed',
            boundsChanged: 'bounds_changed',
            mapLoaded: 'googlemaps.loaded',
            placeMarkers: 'googlemaps.place-markers',
            placeMarkersAndFit: 'googlemaps.place-markers-fit',
            placeMarker: 'googlemaps.place-marker',
            setMarkerActive: 'googlemaps.set-marker-active',
            locationUpdate: 'googlemaps.location-update',
            locationPlaced: 'googlemaps.location-placed',
            locationError: 'googlemaps.location-error',
            boundsupdated: 'googlemaps.bounds-update'
        },
        options: {
            zoom: 8,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {},
            //minZoom: 5,
            gestureHandling: 'greedy',
            styles: [{
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "simplified"
                }, {
                    "hue": "#ff0000"
                }]
            }, {
                "featureType": "landscape.natural.landcover",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "weight": "0.50"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [{
                    "weight": "0.5"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [{
                    "weight": "0.5"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#53b2e1"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }]
        },
        scripts: {
            maps: '//maps.googleapis.com/maps/api/js?signed_in=true&v=3&libraries=geometry&key=AIzaSyD8S_YN_P49pKMB2GWK-uElvf8Wg3Xrck8&callback=asyncGoogleMaps',
            infoBox: 'design/js/vendor/googlemaps/infobox.min.js'
        }
    };

    ns.GoogleMaps = function (container) {
        this.container = container;
        this.settings = cfg;

        this.cacheItems();
        this.bindEvents();
        this.init();
    };

    ns.GoogleMaps.prototype = {
        init: function init() {
            var settings = this.settings,
                scripts = settings.scripts,
                events = settings.events,
                data = settings.data;

            this.markers = [];
            this.geocodeCountryBias = this.container.data(data.geocodeCountryBias) || 'BE';

            if (this.container && this.container.length) {
                if (google && google.hasOwnProperty('maps')) {
                    this.geocoder = new google.maps.Geocoder();
                    this.activate();
                } else {
                    this.getScripts(scripts, this.init.bind(this));
                }
            }
        },
        cacheItems: function cacheItems() {
            var settings = this.settings,
                cache = settings.cache;

            this.map = this.container.children().first();
            this.closestModal = this.container.closest(cache.modal);
        },
        bindEvents: function bindEvents() {
            var _this3 = this;

            var settings = this.settings,
                events = settings.events;

            this.container.on(events.placeMarkers, function (e, params) {
                if (params && params.markers) {
                    _this3.returnIfLoaded(function () {
                        _this3.placeMarkerArray(params.markers);
                    });
                }
            });

            this.container.on(events.placeMarkersAndFit, function (e, params) {
                if (params && params.markers) {
                    _this3.returnIfLoaded(function () {
                        _this3.placeMarkerArray(params.markers);
                        _this3.zoomToMarkers();
                    });
                }
            });

            $(window.Dom).on(events.resize, function () {
                // Recalculate map on resize of the window
                _this3.activate();
                _this3.map.height(_this3.container.outerHeight());
            });
        },
        returnIfLoaded: function returnIfLoaded(callback) {
            var settings = this.settings,
                events = settings.events;

            if (this.isLoaded) {
                callback();
            } else {
                this.container.on(events.mapLoaded, callback);
            }
        },
        placeMarkerArray: function placeMarkerArray(markers) {
            this.clearMarkers();
            for (var i = 0; i < markers.length; i++) {
                var type = markers[i].IsActive ? 'active' : 'default';
                this.placeMarker(markers[i].position, type, markers[i].id, markers[i].handler);
            }
        },
        bindMapEvents: function bindMapEvents() {
            var _this4 = this;

            var settings = this.settings,
                events = settings.events;

            this.instance.addListener(events.boundsChanged, function () {
                if (_this4.isLoaded) {
                    _this4.container.trigger(events.boundsupdated, _this4.instance.getBounds().toJSON());
                }
            });
        },
        activate: function activate() {
            var settings = this.settings,
                events = settings.events;

            if (!this.map.length) {
                this.createMapElement();
            }
            this.renderMap();
            this.bindMapEvents();
            this.container.trigger(events.mapLoaded);
            this.isLoaded = true;
        },
        getScripts: function getScripts(scripts, callback) {
            function errorHandler(n, t, scripts) {
                throw new Error(scripts);
            }

            $.getScript(scripts.maps).done(function () {
                google = window.google || {};
                callback();
            }).fail(errorHandler);
        },
        createMapElement: function createMapElement() {
            this.map = $('<div></div>');
            this.map.height(this.container.outerHeight());
            this.map.width('100%');
            this.container.append(this.map);
        },
        renderMap: function renderMap() {
            var settings = this.settings,
                options = settings.options,
                data = settings.data,
                startLocation = this.container.data(data.startLocation) || [50.862651, 4.361408],
                map = $.extend({}, options, {
                center: new google.maps.LatLng(startLocation[0], startLocation[1]),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT
                }
            });
            this.instance = new google.maps.Map(this.map.get(0), map);
        },
        geocodeAddress: function geocodeAddress(address, callback) {
            var _this5 = this;

            this.geocodePostalCode(address, function (location) {
                if (!location) {
                    _this5.geocodeCity(address, function (location) {
                        if (!location) {
                            console.error('Geocode was not successful for the following reason: ' + status);
                            _this5.container.trigger(_this5.settings.events.locationError);
                        } else {
                            callback(location);
                        }
                    });
                } else {
                    callback(location);
                }
            });
        },
        geocodePostalCode: function geocodePostalCode(postalCode, callback) {
            this.geocoder.geocode({
                componentRestrictions: {
                    country: this.geocodeCountryBias,
                    postalCode: postalCode
                }
            }, function (results, status) {
                if (status == 'OK') {
                    callback(results[0].geometry.location);
                } else {
                    callback(undefined);
                }
            });
        },
        geocodeCity: function geocodeCity(city, callback) {
            this.geocoder.geocode({
                address: city,
                componentRestrictions: {
                    country: this.geocodeCountryBias
                }
            }, function (results, status) {
                if (status == 'OK') {
                    callback(results[0].geometry.location);
                } else {
                    callback(undefined);
                }
            });
        },
        clearMarkers: function clearMarkers() {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers.length = 0;

            if (this.currentLocation) {
                this.placeMarker(this.currentLocation, 'location');
            }
        },
        placeMarker: function placeMarker(position, type, id, handler) {
            //var markerShape = new google.maps.MarkerShape();

            var markerObject = {
                position: position,
                map: this.instance
            };

            if (id && id.length) {
                markerObject.id = id;
            }

            if (type === 'default') {
                markerObject.zIndex = 1;
            } else {
                markerObject.zIndex = 0;
            }

            var placedMarker = new google.maps.Marker(markerObject);
            if (typeof handler === 'function') {
                placedMarker.addListener('click', handler);
            }

            this.markers.push(placedMarker);
            return placedMarker;
        },
        zoomToMarkers: function zoomToMarkers() {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < this.markers.length; i++) {
                bounds.extend(this.markers[i].getPosition());
            }

            this.instance.fitBounds(bounds);
        }
    };

    return ns;
})(window.jQuery, window.google || undefined, window.Lube || {});

(function ($, ns) {
    'use strict';

    ns.classes = function () {
        return {};
    };

    ns.modules = function () {};

    ns.dataComponentInitializer = function (rootElement) {
        var dataComponents = rootElement === undefined ? $('[data-component]') : rootElement.find('[data-component]').addBack('[data-component]');

        for (var i = 0; i < dataComponents.length; i++) {
            var dataComponent = dataComponents.eq(i),
                dataAttr = dataComponent.data('component');
            dataAttr = dataAttr.split('.');

            if (dataAttr.length >= 2) {
                var componentFunction = ns[dataAttr[1]];
                // Check if componentFunction exists,
                if (componentFunction) {
                    // Init it if it does
                    new componentFunction(dataComponent);
                }
            }
        }
    };

    $(function () {
        ns.classes();
        ns.modules();
        ns.dataComponentInitializer();
    });

    $(window).on('load', function () {
        $.ready.then(function () {
            $(window.Lube).trigger('load');
        });
    });

    window.Lube = ns;
})(window.jQuery, window.Lube || {});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImx1YmUuZG9tLmpzIiwibHViZS5mbi5qcyIsImx1YmUuYWN0aW9uZmlsdGVyLmpzIiwibHViZS5nb29nbGVtYXBzLmpzIiwibHViZS5zdHJhcG9uLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIkx1YmUiLCIkIiwibnMiLCJjZmciLCJjYWNoZSIsInRvcEVxdWFsSGVpZ2h0Qm94ZXMiLCJjbGFzc2VzIiwic2Nyb2xsaW5nIiwiZXZlbnRzIiwic2Nyb2xsIiwiRG9tIiwiaW5pdCIsInNldHRpbmdzIiwid2luIiwiYm9keSIsImRvY3VtZW50IiwiYmluZEV2ZW50cyIsIndpbmRvd3NQaG9uZVZpZXdwb3J0Rml4IiwiZml4SGVhZGVyVG9wT25TY3JvbGwiLCJiaW5kU2Nyb2xsVG9wRXZlbnQiLCJzZWxmIiwib24iLCJhZGRDbGFzcyIsImZuIiwiZGVsYXllZEV2ZW50IiwicmVtb3ZlQ2xhc3MiLCJyZXNpemUiLCJ0b3BFcXVhbEhlaWdodEhhbmRsZXIiLCJsb2FkIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJtc1ZpZXdwb3J0U3R5bGUiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVUZXh0Tm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJmaXhlZEVsZW1lbnQiLCJmaXhtZVRvcCIsIm9mZnNldCIsInRvcCIsImN1cnJlbnRTY3JvbGwiLCJzY3JvbGxUb3AiLCJjc3MiLCJwb3NpdGlvbiIsImxlZnQiLCJjbGljayIsImFuaW1hdGUiLCJqUXVlcnkiLCJwYXR0ZXJucyIsIm1vYmlsZSIsIlJlZ0V4cCIsIm1vYmlsZTIiLCJ0YWJsZXQiLCJkZXZpY2VzIiwiZGVza3RvcCIsImRlbGltaXRlciIsImtleSIsInZhbCIsImRldmljZURldGVjdGlvbiIsImR2YyIsImNmZ1BhdHRlcm5zIiwiY2ZnRGV2aWNlIiwidGVzdCIsInN1YnN0ciIsInZlbmRvciIsIm9wZXJhIiwicmVuZGVyVGVtcGxhdGUiLCJvYmoiLCJ0ZW1wbGF0ZSIsInRlbXBLZXkiLCJyZWciLCJoYXNPd25Qcm9wZXJ0eSIsIlN0cmluZyIsInJlcGxhY2UiLCJub3ciLCJEYXRlIiwiZ2V0VGltZSIsImRlZmVyIiwiZnVuYyIsImRlbGF5IiwiYXBwbHkiLCJjb25jYXQiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJ3YWl0IiwiYXJncyIsInNldFRpbWVvdXQiLCJ0aHJvdHRsZSIsIm9wdGlvbnMiLCJjb250ZXh0IiwicmVzdWx0IiwidGltZW91dCIsInByZXZpb3VzIiwibGF0ZXIiLCJsZWFkaW5nIiwicmVtYWluaW5nIiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJkZWJvdW5jZSIsImltbWVkaWF0ZSIsInRpbWVzdGFtcCIsImxhc3QiLCJjYWxsTm93IiwidGltZXJzIiwiaWQiLCJlcXVhbEhlaWdodCIsImVsZW1lbnRzIiwiZWwiLCJsZW4iLCJsZW5ndGgiLCJoZWlnaGVzdCIsImgiLCJlcSIsIm91dGVySGVpZ2h0IiwiY29udmVydFFzVG9MaXRlcmFsIiwicXMiLCJrZXlEZWxpbWl0ZXIiLCJ2YWxEZWxpbWl0ZXIiLCJhcnJQYXJhbXMiLCJzcGxpdCIsImVhY2giLCJpIiwicGFpciIsImFyclBhaXIiLCJnZXRPYmplY3RQcm9wZXJ0eSIsImlzVHlwZUNvbXBhcmlzb24iLCJwcm9wZXJ0eSIsIm8iLCJ1bmRlZmluZWQiLCJwYWdlT2Zmc2V0Iiwic3VwcG9ydFBhZ2VPZmZzZXQiLCJwYWdlWE9mZnNldCIsImlzQ1NTMUNvbXBhdCIsImNvbXBhdE1vZGUiLCJ4IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsTGVmdCIsInkiLCJwYWdlWU9mZnNldCIsIl8iLCJnb29nbGVtYXAiLCJhY3Rpb24iLCJkYXRlSW5wdXQiLCJkYXRlTWluSW5wdXQiLCJkYXRlTWF4SW5wdXQiLCJidG5DbGVhciIsImhpZGUiLCJkYXRhIiwiYXR0cmlidXRlcyIsImNoYW5nZSIsIm1hcExvYWRlZCIsInBsYWNlTWFya2VycyIsInBsYWNlTWFya2Vyc0FuZEZpdCIsInBsYWNlTWFya2VyIiwic2V0TWFya2VyQWN0aXZlIiwibG9jYXRpb25VcGRhdGUiLCJsb2NhdGlvblBsYWNlZCIsImxvY2F0aW9uRXJyb3IiLCJib3VuZHN1cGRhdGVkIiwiZGF0ZXBpY2tlck9wdGlvbnMiLCJmb3JtYXQiLCJ3ZWVrU3RhcnQiLCJrZWVwRW1wdHlWYWx1ZXMiLCJBY3Rpb25GaWx0ZXIiLCJjb250YWluZXIiLCJjYWNoZUl0ZW1zIiwiYWN0aXZhdGUiLCJwcm90b3R5cGUiLCJodG1sQm9keSIsIm1hcCIsImZpbmQiLCJmaXJzdEFjdGlvbkRhdGUiLCJsYXN0QWN0aW9uRGF0ZSIsImFjdGlvbnMiLCJhY3Rpb25NYXJrZXJzIiwiYWN0aW9uRGF0YSIsImhhbmRsZXIiLCJhY3Rpb25DbGlja0hhbmRsZXIiLCJlbGVtZW50IiwicHVzaCIsImRhdGUiLCJkYXRlcGlja2VyIiwiZG9GaWx0ZXIiLCJlIiwicGFyYW1zIiwiY3VycmVudEJvdW5kcyIsImFjdGlvbkVsZW1lbnQiLCJhY3Rpb25NYXJrZXIiLCJ0cmlnZ2VyIiwibWFya2VycyIsIk9iamVjdCIsImFzc2lnbiIsImlucHV0cyIsImFkZCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJkYXRlUGlja2VySW5zdGFuY2UiLCJtaW5EYXRlIiwibWF4RGF0ZSIsImZpbHRlckxvY2F0aW9uIiwiZmlsdGVyRGF0ZXMiLCJ0b2dnbGVWaXNpYmxpdHlBY3Rpb25zIiwiYm91bmRzT2JqZWN0IiwiZmlsdGVyTWV0aG9kIiwibGF0Iiwic291dGgiLCJub3J0aCIsImxuZyIsIndlc3QiLCJlYXN0IiwiZmlsdGVyIiwidG9TaG93TWFya2VycyIsImFsbE1hcmtlcnMiLCJjdXJyZW50TWFya2VyIiwiaW5kZXhPZiIsInNob3dNYXJrZXIiLCJoaWRlTWFya2VyIiwibWFya2VyIiwic2hvdyIsImFzeW5jR29vZ2xlTWFwcyIsImdvb2dsZSIsInN0YXJ0TG9jYXRpb24iLCJnZW9jb2RlQ291bnRyeUJpYXMiLCJzaG93biIsImRyYWdlbmQiLCJ6b29tQ2hhbmdlZCIsImJvdW5kc0NoYW5nZWQiLCJ6b29tIiwiZGlzYWJsZURlZmF1bHRVSSIsInpvb21Db250cm9sIiwiem9vbUNvbnRyb2xPcHRpb25zIiwiZ2VzdHVyZUhhbmRsaW5nIiwic3R5bGVzIiwic2NyaXB0cyIsIm1hcHMiLCJpbmZvQm94IiwiR29vZ2xlTWFwcyIsImdlb2NvZGVyIiwiR2VvY29kZXIiLCJnZXRTY3JpcHRzIiwiYmluZCIsImNoaWxkcmVuIiwiZmlyc3QiLCJjbG9zZXN0TW9kYWwiLCJjbG9zZXN0IiwibW9kYWwiLCJyZXR1cm5JZkxvYWRlZCIsInBsYWNlTWFya2VyQXJyYXkiLCJ6b29tVG9NYXJrZXJzIiwiaGVpZ2h0IiwiY2FsbGJhY2siLCJpc0xvYWRlZCIsImNsZWFyTWFya2VycyIsInR5cGUiLCJJc0FjdGl2ZSIsImJpbmRNYXBFdmVudHMiLCJpbnN0YW5jZSIsImFkZExpc3RlbmVyIiwiZ2V0Qm91bmRzIiwidG9KU09OIiwiY3JlYXRlTWFwRWxlbWVudCIsInJlbmRlck1hcCIsImVycm9ySGFuZGxlciIsIm4iLCJ0IiwiRXJyb3IiLCJnZXRTY3JpcHQiLCJkb25lIiwiZmFpbCIsIndpZHRoIiwiYXBwZW5kIiwiZXh0ZW5kIiwiY2VudGVyIiwiTGF0TG5nIiwibWFwVHlwZUlkIiwiTWFwVHlwZUlkIiwiUk9BRE1BUCIsIkNvbnRyb2xQb3NpdGlvbiIsIlRPUF9MRUZUIiwiTWFwIiwiZ2V0IiwiZ2VvY29kZUFkZHJlc3MiLCJhZGRyZXNzIiwiZ2VvY29kZVBvc3RhbENvZGUiLCJsb2NhdGlvbiIsImdlb2NvZGVDaXR5IiwiY29uc29sZSIsImVycm9yIiwic3RhdHVzIiwicG9zdGFsQ29kZSIsImdlb2NvZGUiLCJjb21wb25lbnRSZXN0cmljdGlvbnMiLCJjb3VudHJ5IiwicmVzdWx0cyIsImdlb21ldHJ5IiwiY2l0eSIsInNldE1hcCIsImN1cnJlbnRMb2NhdGlvbiIsIm1hcmtlck9iamVjdCIsInpJbmRleCIsInBsYWNlZE1hcmtlciIsIk1hcmtlciIsImJvdW5kcyIsIkxhdExuZ0JvdW5kcyIsImdldFBvc2l0aW9uIiwiZml0Qm91bmRzIiwibW9kdWxlcyIsImRhdGFDb21wb25lbnRJbml0aWFsaXplciIsInJvb3RFbGVtZW50IiwiZGF0YUNvbXBvbmVudHMiLCJhZGRCYWNrIiwiZGF0YUNvbXBvbmVudCIsImRhdGFBdHRyIiwiY29tcG9uZW50RnVuY3Rpb24iLCJyZWFkeSIsInRoZW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBQUMsSUFBQSxHQUFBLFVBQUFDLENBQUEsRUFBQUMsRUFBQSxFQUFBO0FBQ0E7O0FBRUEsUUFBQUMsTUFBQTtBQUNBQyxlQUFBO0FBQ0FDLGlDQUFBO0FBQ0E7QUFEQTtBQURBLFNBREE7QUFNQUMsaUJBQUE7QUFDQUMsdUJBQUE7QUFEQSxTQU5BO0FBU0FDLGdCQUFBO0FBQ0FDLG9CQUFBO0FBREE7QUFUQSxLQUFBOztBQWNBUCxPQUFBUSxHQUFBLEdBQUE7QUFDQUMsY0FBQSxnQkFBQTtBQUNBLGdCQUFBQyxXQUFBVCxHQUFBO0FBQUEsZ0JBQ0FHLFVBQUFNLFNBQUFOLE9BREE7QUFBQSxnQkFFQUUsU0FBQUksU0FBQUosTUFGQTtBQUFBLGdCQUdBSixRQUFBUSxTQUFBUixLQUhBOztBQUtBLGlCQUFBUyxHQUFBLEdBQUFaLEVBQUFGLE1BQUEsQ0FBQTtBQUNBLGlCQUFBZSxJQUFBLEdBQUFiLEVBQUFjLFNBQUFELElBQUEsQ0FBQTs7QUFFQSxpQkFBQUUsVUFBQSxDQUFBVixPQUFBLEVBQUFFLE1BQUE7QUFDQSxpQkFBQVMsdUJBQUE7QUFDQSxpQkFBQUMsb0JBQUE7QUFDQSxpQkFBQUMsa0JBQUE7QUFDQSxTQWRBOztBQWdCQUgsb0JBQUEsb0JBQUFWLE9BQUEsRUFBQUUsTUFBQSxFQUFBO0FBQ0EsZ0JBQUFZLE9BQUEsSUFBQTtBQUFBLGdCQUNBUixXQUFBVCxHQURBO0FBQUEsZ0JBRUFDLFFBQUFRLFNBQUFSLEtBRkE7O0FBSUEsaUJBQUFTLEdBQUEsQ0FBQVEsRUFBQSxDQUFBYixPQUFBQyxNQUFBLEVBQUEsWUFBQTtBQUNBVyxxQkFBQU4sSUFBQSxDQUFBUSxR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QUE4TCxnQkFBQUYsZUFBQXJNLEVBQUEsQ0FBQVMsQ0FBQSxDQUFBO0FBQUEsZ0JBQ0ErTCxXQUFBRCxjQUFBcEssSUFBQSxDQUFBLFdBQUEsQ0FEQTtBQUVBcUssdUJBQUFBLFNBQUFqTSxLQUFBLENBQUEsR0FBQSxDQUFBOztBQUVBLGdCQUFBaU0sU0FBQTNNLE1BQUEsSUFBQSxDQUFBLEVBQUE7QUFDQSxvQkFBQTRNLG9CQUFBelQsR0FBQXdULFNBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQTtBQUNBLG9CQUFBQyxpQkFBQSxFQUFBO0FBQ0E7QUFDQSx3QkFBQUEsaUJBQUEsQ0FBQUYsYUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBcEJBOztBQXNCQXhULE1BQUEsWUFBQTtBQUNBQyxXQUFBSSxPQUFBO0FBQ0FKLFdBQUFrVCxPQUFBO0FBQ0FsVCxXQUFBbVQsd0JBQUE7QUFDQSxLQUpBOztBQU1BcFQsTUFBQUYsTUFBQSxFQUFBc0IsRUFBQSxDQUFBLE1BQUEsRUFBQSxZQUFBO0FBQ0FwQixVQUFBMlQsS0FBQSxDQUFBQyxJQUFBLENBQUEsWUFBQTtBQUNBNVQsY0FBQUYsT0FBQUMsSUFBQSxFQUFBOEwsT0FBQSxDQUFBLE1BQUE7QUFDQSxTQUZBO0FBR0EsS0FKQTs7QUFNQS9MLFdBQUFDLElBQUEsR0FBQUUsRUFBQTtBQUNBLENBNUNBLEVBNENBSCxPQUFBaUQsTUE1Q0EsRUE0Q0FqRCxPQUFBQyxJQUFBLElBQUEsRUE1Q0EiLCJmaWxlIjoiYXBwbGliLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lkx1YmUgPSAoZnVuY3Rpb24oJCwgbnMpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgY2ZnID0ge1xyXG4gICAgICAgIGNhY2hlOiB7XHJcbiAgICAgICAgICAgIHRvcEVxdWFsSGVpZ2h0Qm94ZXM6IFtcclxuICAgICAgICAgICAgICAgIC8veyBzZWxlY3RvcjogJy50ZXN0aW1vbmlhbCA+IHAnLCByZXNwb25zaXZlOiB0cnVlLCBpZ25vcmVPZmZzZXQ6IHRydWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgICAgIHNjcm9sbGluZzogJ3Njcm9sbGluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICBzY3JvbGw6ICdzY3JvbGwnXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBucy5Eb20gPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IGNmZyxcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBzZXR0aW5ncy5jbGFzc2VzLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRzID0gc2V0dGluZ3MuZXZlbnRzLFxyXG4gICAgICAgICAgICAgICAgY2FjaGUgPSBzZXR0aW5ncy5jYWNoZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luID0gJCh3aW5kb3cpO1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkgPSAkKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKGNsYXNzZXMsIGV2ZW50cyk7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93c1Bob25lVmlld3BvcnRGaXgoKTtcclxuICAgICAgICAgICAgdGhpcy5maXhIZWFkZXJUb3BPblNjcm9sbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRTY3JvbGxUb3BFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKGNsYXNzZXMsIGV2ZW50cykge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IGNmZyxcclxuICAgICAgICAgICAgICAgIGNhY2hlID0gc2V0dGluZ3MuY2FjaGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbi5vbihldmVudHMuc2Nyb2xsLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYm9keS5hZGRDbGFzcyhjbGFzc2VzLnNjcm9sbGluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbnMuZm4uZGVsYXllZEV2ZW50KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYm9keS5yZW1vdmVDbGFzcyhjbGFzc2VzLnNjcm9sbGluZyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAsIGV2ZW50cy5zY3JvbGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luLm9uKGV2ZW50cy5yZXNpemUsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbnMuZm4uZGVsYXllZEV2ZW50KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudG9wRXF1YWxIZWlnaHRIYW5kbGVyKGNhY2hlLnRvcEVxdWFsSGVpZ2h0Qm94ZXMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjAwLCAncmVzaXplRXF1YWxIZWlnaHQnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbi5vbihldmVudHMubG9hZCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRvcEVxdWFsSGVpZ2h0SGFuZGxlcihjYWNoZS50b3BFcXVhbEhlaWdodEJveGVzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHdpbmRvd3NQaG9uZVZpZXdwb3J0Rml4OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gQ29weXJpZ2h0IDIwMTQtMjAxNSBUd2l0dGVyLCBJbmMuXHJcbiAgICAgICAgICAgIC8vIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXHJcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9JRU1vYmlsZVxcLzEwXFwuMC8pKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbXNWaWV3cG9ydFN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIG1zVmlld3BvcnRTdHlsZS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0AtbXMtdmlld3BvcnR7d2lkdGg6YXV0byFpbXBvcnRhbnR9J1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQobXNWaWV3cG9ydFN0eWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpeEhlYWRlclRvcE9uU2Nyb2xsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGZpeGVkRWxlbWVudCA9ICQoJ2hlYWRlciBocicpO1xyXG4gICAgICAgICAgICB2YXIgZml4bWVUb3AgPSBmaXhlZEVsZW1lbnQub2Zmc2V0KCkudG9wOyAvLyBnZXQgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudFxyXG5cclxuICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHsgLy8gYXNzaWduIHNjcm9sbCBldmVudCBsaXN0ZW5lclxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpOyAvLyBnZXQgY3VycmVudCBwb3NpdGlvblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2Nyb2xsID49IGZpeG1lVG9wKSB7IC8vIGFwcGx5IHBvc2l0aW9uOiBmaXhlZCBpZiB5b3VcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZEVsZW1lbnQuY3NzKHsgLy8gc2Nyb2xsIHRvIHRoYXQgZWxlbWVudCBvciBiZWxvdyBpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gYXBwbHkgcG9zaXRpb246IHN0YXRpY1xyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkRWxlbWVudC5jc3MoeyAvLyBpZiB5b3Ugc2Nyb2xsIGFib3ZlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnc3RhdGljJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kU2Nyb2xsVG9wRXZlbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoJ2FbaHJlZj1cIiN0b3BcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYm9keS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIFwic2xvd1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbnM7XHJcbn0od2luZG93LmpRdWVyeSwgd2luZG93Lkx1YmUgfHwge30pKTtcclxuIiwiLyoqXHJcbiogQGF1dGhvciAgICAgICBbU3RlZiBDb2VuZW4gJiBUaW0gVmVybWFlbGVuXVxyXG4qIEBkYXRlICAgICAgICAgWzIwMTZdXHJcbiogQG5hbWVzcGFjZSAgICBbTHViZS5mbl1cclxuKiBAdHlwZSAgICAgICAgIFtGdW5jdGlvbnNdXHJcbiogQHJlcXVpcmVzICAgICBbalF1ZXJ5LCBMdWJlXVxyXG4qIEByZXZpc2lvbiAgICAgWzAuMV1cclxuKi9cclxuXHJcbi8vIEBwYXJhbSAoJCk6IHdpbmRvdy5qUXVlcnlcclxuLy8gQHBhcmFtIChucyk6IHdpbmRvdy5MdWJlXHJcbndpbmRvdy5MdWJlID0gKGZ1bmN0aW9uICgkLCBucykge1xyXG5cclxuICAgIC8vIDEuIEVDTUEtMjYyLzVcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvLyAyLiBDT05GSUdVUkFUSU9OXHJcbiAgICB2YXIgY2ZnID0ge1xyXG4gICAgICAgIHBhdHRlcm5zOiB7XHJcbiAgICAgICAgICAgIG1vYmlsZTogbmV3IFJlZ0V4cCgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgKGNlfHBob25lKXx4ZGF8eGlpbm8vaSksXHJcbiAgICAgICAgICAgIG1vYmlsZTI6IG5ldyBSZWdFeHAoLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtLyksXHJcbiAgICAgICAgICAgIHRhYmxldDogbmV3IFJlZ0V4cCgvYW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRldmljZXM6IHtcclxuICAgICAgICAgICAgbW9iaWxlOiAnbW9iaWxlJyxcclxuICAgICAgICAgICAgdGFibGV0OiAndGFibGV0JyxcclxuICAgICAgICAgICAgZGVza3RvcDogJ2Rlc2t0b3AnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxpbWl0ZXI6IHtcclxuICAgICAgICAgICAga2V5OiAnJicsXHJcbiAgICAgICAgICAgIHZhbDogJz0nXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyAzLiBGVU5DVElPTlMgT0JKRUNUXHJcbiAgICBucy5mbiA9IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIERldmljZSBkZXRlY3Rpb25cclxuICAgICAgICAgKiBodHRwOi8vZGV0ZWN0bW9iaWxlYnJvd3NlcnMuY29tXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGR2YyA6IHVzZXIgYWdlbnQgc3RyaW5nXHJcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBtb2JpbGUgfCB0YWJsZXQgfCBkZXNrdG9wXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGV2aWNlRGV0ZWN0aW9uOiAoZnVuY3Rpb24gKGR2Yykge1xyXG4gICAgICAgICAgICB2YXIgY2ZnUGF0dGVybnMgPSBjZmcucGF0dGVybnMsXHJcbiAgICAgICAgICAgICAgICBjZmdEZXZpY2UgPSBjZmcuZGV2aWNlcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjZmdQYXR0ZXJucy5tb2JpbGUudGVzdChkdmMpIHx8IGNmZ1BhdHRlcm5zLm1vYmlsZTIudGVzdChkdmMuc3Vic3RyKDAsIDQpKSA/IGNmZ0RldmljZS5tb2JpbGUgOiBjZmdQYXR0ZXJucy50YWJsZXQudGVzdChkdmMpID8gY2ZnRGV2aWNlLnRhYmxldCA6IGNmZ0RldmljZS5kZXNrdG9wO1xyXG4gICAgICAgIH0obmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSkpLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gUmVuZGVyIGh0bWwgdGVtcGxhdGUgd2l0aCBqc29uIGRhdGFcclxuICAgICAgICAgKiBAc2VlIGhhbmRsZWJhcnMgb3IgbXVzdGFjaGUgaWYgeW91IG5lZWQgbW9yZSBhZHZhbmNlZCBmdW5jdGlvbmxpdHlcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHRlbXBsYXRlIDogaHRtbCB0ZW1wbGF0ZSB3aXRoIHt7a2V5c319IG1hdGNoaW5nIHRoZSBvYmplY3RcclxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlIDogdGhlIHRlbXBsYXRlIHN0cmluZyByZXBsYWNlZCBieSBrZXk6dmFsdWUgcGFpcnMgZnJvbSB0aGUgb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVuZGVyVGVtcGxhdGU6IGZ1bmN0aW9uIChvYmosIHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wS2V5LCByZWcsIGtleTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEtleSA9IFN0cmluZygne3snICsga2V5ICsgJ319Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnID0gbmV3IFJlZ0V4cCh0ZW1wS2V5LCAnZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShyZWcsIG9ialtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBBIChwb3NzaWJseSBmYXN0ZXIpIHdheSB0byBnZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIGFuIGludGVnZXIuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbm93OiBEYXRlLm5vdyB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzIGNsZWFyZWQuXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRlZmVyOiBmdW5jdGlvbiAoZnVuYykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWxheS5hcHBseShudWxsLCBbZnVuYywgMV0uY29uY2F0KFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXHJcbiAgICAgICAgICogQHBhcmFtIChJbnRlZ2VyKSB3YWl0IDogbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVsYXk6IGZ1bmN0aW9uIChmdW5jLCB3YWl0KSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XHJcbiAgICAgICAgICAgIH0sIHdhaXQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBhdCBtb3N0IG9uY2UgZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gd2FpdCA6IG1pbGxpc2Vjb25kc1xyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5sZWFkaW5nIDogZGlzYWJsZSB0aGUgZXhlY3V0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2UuIFRvIGRpc2FibGUgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlLCBkaXR0by5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aHJvdHRsZTogZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHQsIGFyZ3MsIHJlc3VsdDtcclxuICAgICAgICAgICAgdmFyIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgcHJldmlvdXMgPSAwO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogTHViZS5mbi5ub3coKTtcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IEx1YmUuZm4ubm93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdCBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yIE4gbWlsbGlzZWNvbmRzLlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmNcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHdhaXQgOiBtaWxsaXNlY29uZHNcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGltbWVkaWF0ZSA6IGlmIGltbWVkaWF0ZSBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRlYm91bmNlOiBmdW5jdGlvbiAoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSBzZWxmLm5vdygpIC0gdGltZXN0YW1wO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3QgPCB3YWl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wID0gc2VsZi5ub3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcclxuICAgICAgICAgICAgICAgIGlmICghdGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsTm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gZGVsYXkgZXZlbnRzIHdpdGggdGhlIHNhbWUgaWQsIGdvb2QgZm9yIHdpbmRvdyByZXNpemUgZXZlbnRzLCBrZXlzdHJva2UsIGV0YyAuLi5cclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIDogY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgcnVuIHdoZW4gZG9uZVxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gd2FpdCA6IGludGVnZXIgaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIDogdW5pcXVlIGV2ZW50IGlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVsYXllZEV2ZW50OiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGltZXJzID0ge307XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIGlkKSB7XHJcbiAgICAgICAgICAgICAgICB3YWl0ID0gd2FpdCB8fCAyMDA7XHJcbiAgICAgICAgICAgICAgICBpZCA9IGlkIHx8ICdhbm9ueW1vdXMnO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aW1lcnNbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyc1tpZF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRpbWVyc1tpZF0gPSBzZXRUaW1lb3V0KGZ1bmMsIHdhaXQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCksXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBFcXVhbGx5IHNldCBoZWlnaHQgb24gaXRlbXNcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudHMgOiBqcXVlcnkgbGlzdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVxdWFsSGVpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgdmFyIGVsID0gJChlbGVtZW50cyksXHJcbiAgICAgICAgICAgICAgICBsZW4gPSBlbC5sZW5ndGggfHwgMCxcclxuICAgICAgICAgICAgICAgIGhlaWdoZXN0ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChsZW4gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobGVuLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaCA9IGVsLmVxKGxlbikub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoID4gaGVpZ2hlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2hlc3QgPSBoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbC5vdXRlckhlaWdodChoZWlnaGVzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQ29udmVydCBhIHF1ZXJ5IGFsaWtlIHN0cmluZyB0byBhbiBvYmplY3QgbGl0ZXJhbFxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBxcyA6IGEgcXVlcnkgc3RyaW5nIG9mIGtleSB2YWx1ZSBwYWlycyAod2l0aG91dCA/KVxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlEZWxpbWl0ZXIgOiBjaGFyYWN0ZXIgYmV0d2VlbiB2YWx1ZXMgYW5kIGtleXNcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsRGVsaW1pdGVyIDogY2hhcmFjdGVyIGJldHdlZW4ga2V5cyBhbmQgdmFsdWVzXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBvYmogOiBvYmplY3QgbGl0ZXJhbCByZXByZXNlbnRpbmcgdGhlIHF1ZXJ5IHN0cmluZ1xyXG4gICAgICAgICAqIEBleGFtcGxlOiBrZXkxPXZhbDEma2V5Mj12YWwyJmtleTM9dmFsM1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnZlcnRRc1RvTGl0ZXJhbDogZnVuY3Rpb24gKHFzLCBrZXlEZWxpbWl0ZXIsIHZhbERlbGltaXRlcikge1xyXG4gICAgICAgICAgICB2YXIgYXJyUGFyYW1zLCBvYmogPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmIChxcyAmJiBxcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGtleURlbGltaXRlciA9IGtleURlbGltaXRlciB8fCBjZmcuZGVsaW1pdGVyLmtleTtcclxuICAgICAgICAgICAgICAgIHZhbERlbGltaXRlciA9IHZhbERlbGltaXRlciB8fCBjZmcuZGVsaW1pdGVyLnZhbDtcclxuICAgICAgICAgICAgICAgIGFyclBhcmFtcyA9IHFzLnNwbGl0KGtleURlbGltaXRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKGFyclBhcmFtcywgZnVuY3Rpb24gKGksIHBhaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyUGFpciA9IHBhaXIuc3BsaXQodmFsRGVsaW1pdGVyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gYXJyUGFpclswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gYXJyUGFpclsxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gR2V0IGFuIG9iamVjdCBmcm9tIGEgbGlzdCBvZiBvYmplY3RzIGJ5IHNlYXJjaGluZyBmb3IgYSBrZXk6dmFsdWUgcGFpclxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogOiAtbGl0ZXJhbCwganNvblxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWwgOiB0aGUgdmFsdWUgeW91IHNlZWtcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IDogdGhlIGtleVxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNUeXBlQ29tcGFyaXNvbiA6IGlmIHNldCB0byB0cnVlLCB0aGUga2V5IGFuZCB2YWx1ZSB3aWxsIGJlIGNoZWNrZWQgYWdhaW5zdCBpdCdzIHR5cGUgYXMgd2VsbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldE9iamVjdFByb3BlcnR5OiBmdW5jdGlvbiAob2JqLCB2YWwsIGtleSwgaXNUeXBlQ29tcGFyaXNvbikge1xyXG4gICAgICAgICAgICB2YXIgcHJvcGVydHksIG87XHJcblxyXG4gICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtwcm9wZXJ0eV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gPSB0aGlzLmdldE9iamVjdFByb3BlcnR5KG9ialtwcm9wZXJ0eV0sIHZhbCwga2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm91bmQgYSBwcm9wZXJ0eSB3aGljaCBpcyBub3QgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1R5cGVDb21wYXJpc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgPT09IGtleSAmJiBvYmpbcHJvcGVydHldID09PSB2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBnb3QgYSBtYXRjaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBvYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgPT0ga2V5ICYmIG9ialtwcm9wZXJ0eV0gPT0gdmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgZ290IGEgbWF0Y2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvID0gb2JqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbyB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGFnZU9mZnNldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzdXBwb3J0UGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWE9mZnNldCAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB2YXIgaXNDU1MxQ29tcGF0ID0gKChkb2N1bWVudC5jb21wYXRNb2RlIHx8ICcnKSA9PT0gJ0NTUzFDb21wYXQnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB4OiBzdXBwb3J0UGFnZU9mZnNldCA/IHdpbmRvdy5wYWdlWE9mZnNldCA6IGlzQ1NTMUNvbXBhdCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IDogZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0LFxyXG4gICAgICAgICAgICAgICAgeTogc3VwcG9ydFBhZ2VPZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBpc0NTUzFDb21wYXQgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIDogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3BcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIDQuIE5BTUVTUEFDRVxyXG4gICAgcmV0dXJuIG5zO1xyXG5cclxufSh3aW5kb3cualF1ZXJ5LCB3aW5kb3cuTHViZSB8fCB7fSkpO1xyXG4iLCIoZnVuY3Rpb24gKCQsIG5zLCBfKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIGNmZyA9IHtcclxuICAgICAgICBjYWNoZToge1xyXG4gICAgICAgICAgICBnb29nbGVtYXA6ICdbZGF0YS1jb21wb25lbnQ9XCJMdWJlLkdvb2dsZU1hcHNcIl0nLFxyXG4gICAgICAgICAgICBhY3Rpb246ICdbZGF0YS1hY3Rpb25dJyxcclxuICAgICAgICAgICAgZGF0ZUlucHV0OiAnLmFjdGlvbi1maWx0ZXItZGF0ZScsXHJcbiAgICAgICAgICAgIGRhdGVNaW5JbnB1dDogJy5hY3Rpb24tZmlsdGVyLWRhdGUtbWluJyxcclxuICAgICAgICAgICAgZGF0ZU1heElucHV0OiAnLmFjdGlvbi1maWx0ZXItZGF0ZS1tYXgnLFxyXG4gICAgICAgICAgICBidG5DbGVhcjogJy5idG4tY2xlYXInXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgICAgIGhpZGU6ICdoaWRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBhY3Rpb246ICdhY3Rpb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7fSxcclxuICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgY2xpY2s6ICdjbGljaycsXHJcbiAgICAgICAgICAgIGNoYW5nZTogJ2NoYW5nZScsXHJcbiAgICAgICAgICAgIG1hcExvYWRlZDogJ2dvb2dsZW1hcHMubG9hZGVkJyxcclxuICAgICAgICAgICAgcGxhY2VNYXJrZXJzOiAnZ29vZ2xlbWFwcy5wbGFjZS1tYXJrZXJzJyxcclxuICAgICAgICAgICAgcGxhY2VNYXJrZXJzQW5kRml0OiAnZ29vZ2xlbWFwcy5wbGFjZS1tYXJrZXJzLWZpdCcsXHJcbiAgICAgICAgICAgIHBsYWNlTWFya2VyOiAnZ29vZ2xlbWFwcy5wbGFjZS1tYXJrZXInLFxyXG4gICAgICAgICAgICBzZXRNYXJrZXJBY3RpdmU6ICdnb29nbGVtYXBzLnNldC1tYXJrZXItYWN0aXZlJyxcclxuICAgICAgICAgICAgbG9jYXRpb25VcGRhdGU6ICdnb29nbGVtYXBzLmxvY2F0aW9uLXVwZGF0ZScsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uUGxhY2VkOiAnZ29vZ2xlbWFwcy5sb2NhdGlvbi1wbGFjZWQnLFxyXG4gICAgICAgICAgICBsb2NhdGlvbkVycm9yOiAnZ29vZ2xlbWFwcy5sb2NhdGlvbi1lcnJvcicsXHJcbiAgICAgICAgICAgIGJvdW5kc3VwZGF0ZWQ6ICdnb29nbGVtYXBzLmJvdW5kcy11cGRhdGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRlcGlja2VyT3B0aW9uczoge1xyXG4gICAgICAgICAgICBmb3JtYXQ6ICdkZC9tbS95eXl5JyxcclxuICAgICAgICAgICAgd2Vla1N0YXJ0OiAxLFxyXG4gICAgICAgICAgICBrZWVwRW1wdHlWYWx1ZXM6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG5zLkFjdGlvbkZpbHRlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gY2ZnO1xyXG5cclxuICAgICAgICB0aGlzLmNhY2hlSXRlbXMoKTtcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIG5zLkFjdGlvbkZpbHRlci5wcm90b3R5cGUgPSB7XHJcbiAgICAgICAgY2FjaGVJdGVtczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgY2FjaGUgPSBzZXR0aW5ncy5jYWNoZSxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBzZXR0aW5ncy5kYXRhO1xyXG5cclxuICAgICAgICAgICAgLy8gQmFzZVxyXG4gICAgICAgICAgICB0aGlzLmh0bWxCb2R5ID0gJCgnaHRtbCwgYm9keScpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9ICQoY2FjaGUuZ29vZ2xlbWFwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpbHRlcnNcclxuICAgICAgICAgICAgdGhpcy5kYXRlSW5wdXQgPSB0aGlzLmNvbnRhaW5lci5maW5kKGNhY2hlLmRhdGVJbnB1dCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZU1pbklucHV0ID0gdGhpcy5jb250YWluZXIuZmluZChjYWNoZS5kYXRlTWluSW5wdXQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVNYXhJbnB1dCA9IHRoaXMuY29udGFpbmVyLmZpbmQoY2FjaGUuZGF0ZU1heElucHV0KTtcclxuICAgICAgICAgICAgdGhpcy5idG5DbGVhciA9IHRoaXMuY29udGFpbmVyLmZpbmQoY2FjaGUuYnRuQ2xlYXIpO1xyXG5cclxuICAgICAgICAgICAgLy9BY3Rpb25zXHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RBY3Rpb25EYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0QWN0aW9uRGF0ZSA9IG5ldyBEYXRlKCcxLzEvMjAxNycpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5maW5kKGNhY2hlLmFjdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uTWFya2VycyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25EYXRhID0gdGhpcy5hY3Rpb25zLmVxKGkpLmRhdGEoZGF0YS5hY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbkRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkRhdGEuaGFuZGxlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25DbGlja0hhbmRsZXIodGhpcy5hY3Rpb25zLmVxKGkpLCB0aGlzLmFjdGlvbk1hcmtlcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uRGF0YS5pZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uRGF0YS5lbGVtZW50ID0gdGhpcy5hY3Rpb25zLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uTWFya2Vycy5wdXNoKGFjdGlvbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGFjdGlvbkRhdGEuZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGUgPCB0aGlzLmZpcnN0QWN0aW9uRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0QWN0aW9uRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlID4gdGhpcy5sYXN0QWN0aW9uRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RBY3Rpb25EYXRlID0gZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYnRuQ2xlYXIub24oZXZlbnRzLmNsaWNrLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVNaW5JbnB1dC5kYXRlcGlja2VyKCd1cGRhdGUnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVNYXhJbnB1dC5kYXRlcGlja2VyKCd1cGRhdGUnLCAnJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kYXRlTWluSW5wdXQub24oZXZlbnRzLmNoYW5nZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb0ZpbHRlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlTWF4SW5wdXQub24oZXZlbnRzLmNoYW5nZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb0ZpbHRlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFwLm9uKGV2ZW50cy5ib3VuZHN1cGRhdGVkLCBfLmRlYm91bmNlKChlLCBwYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJvdW5kcyA9IHBhcmFtcztcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXIoKTtcclxuICAgICAgICAgICAgfSwgMzAwKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhY3Rpb25DbGlja0hhbmRsZXI6IGZ1bmN0aW9uIChhY3Rpb25FbGVtZW50LCBhY3Rpb25NYXJrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5odG1sQm9keS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogYWN0aW9uRWxlbWVudC5vZmZzZXQoKS50b3BcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBzZXR0aW5ncy5ldmVudHMsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gc2V0dGluZ3MuZGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBsYWNlIGluaXRpYWwgbWFya2Vyc1xyXG4gICAgICAgICAgICB0aGlzLm1hcC50cmlnZ2VyKGV2ZW50cy5wbGFjZU1hcmtlcnNBbmRGaXQsIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlcnM6IHRoaXMuYWN0aW9uTWFya2Vyc1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXQgZmlsdGVyc1xyXG4gICAgICAgICAgICAvLyBJbml0IGRhdGVwaWNrZXJzXHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgc2V0dGluZ3MuZGF0ZXBpY2tlck9wdGlvbnMsIHtcclxuICAgICAgICAgICAgICAgIGlucHV0czogJCgpLmFkZCh0aGlzLmRhdGVNaW5JbnB1dCkuYWRkKHRoaXMuZGF0ZU1heElucHV0KSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5maXJzdEFjdGlvbkRhdGUsXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlOiB0aGlzLmxhc3RBY3Rpb25EYXRlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJJbnN0YW5jZSA9IHRoaXMuZGF0ZUlucHV0LmRhdGVwaWNrZXIob3B0aW9ucyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkb0ZpbHRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9uTWFya2VycyA9IHRoaXMuYWN0aW9uTWFya2VycztcclxuXHJcbiAgICAgICAgICAgIGxldCBtaW5EYXRlID0gdGhpcy5kYXRlTWluSW5wdXQuZGF0ZXBpY2tlcignZ2V0VVRDRGF0ZScpO1xyXG4gICAgICAgICAgICBsZXQgbWF4RGF0ZSA9IHRoaXMuZGF0ZU1heElucHV0LmRhdGVwaWNrZXIoJ2dldFVUQ0RhdGUnKTtcclxuXHJcbiAgICAgICAgICAgIGFjdGlvbk1hcmtlcnMgPSB0aGlzLmZpbHRlckxvY2F0aW9uKHRoaXMuY3VycmVudEJvdW5kcywgYWN0aW9uTWFya2Vycyk7XHJcbiAgICAgICAgICAgIGlmIChtaW5EYXRlIHx8IG1heERhdGUpIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbk1hcmtlcnMgPSB0aGlzLmZpbHRlckRhdGVzKG1pbkRhdGUsIG1heERhdGUsIGFjdGlvbk1hcmtlcnMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVZpc2libGl0eUFjdGlvbnMoYWN0aW9uTWFya2Vycyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWx0ZXJMb2NhdGlvbjogZnVuY3Rpb24gKGJvdW5kc09iamVjdCwgYWN0aW9ucykge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmaWx0ZXJNZXRob2QoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnBvc2l0aW9uLmxhdCA+PSBib3VuZHNPYmplY3Quc291dGggJiZcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucG9zaXRpb24ubGF0IDw9IGJvdW5kc09iamVjdC5ub3J0aFxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTGF0aXR1ZGUgbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnBvc2l0aW9uLmxuZyA+PSBib3VuZHNPYmplY3Qud2VzdCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucG9zaXRpb24ubG5nIDw9IGJvdW5kc09iamVjdC5lYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnMuZmlsdGVyKGZpbHRlck1ldGhvZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWx0ZXJEYXRlczogZnVuY3Rpb24gKG1pbkRhdGUsIG1heERhdGUsIGFjdGlvbnMpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZmlsdGVyTWV0aG9kKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShhY3Rpb24uZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgKCFtYXhEYXRlICYmIG1pbkRhdGUgJiYgZGF0ZSA+PSBtaW5EYXRlKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICghbWluRGF0ZSAmJiBtYXhEYXRlICYmIGRhdGUgPD0gbWF4RGF0ZSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAobWluRGF0ZSAmJiBtYXhEYXRlICYmIGRhdGUgPj0gbWluRGF0ZSAmJiBkYXRlIDw9IG1heERhdGUpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9ucy5maWx0ZXIoZmlsdGVyTWV0aG9kKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvZ2dsZVZpc2libGl0eUFjdGlvbnM6IGZ1bmN0aW9uICh0b1Nob3dNYXJrZXJzKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxNYXJrZXJzID0gdGhpcy5hY3Rpb25NYXJrZXJzO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudE1hcmtlciA9IGFsbE1hcmtlcnNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodG9TaG93TWFya2Vycy5pbmRleE9mKGN1cnJlbnRNYXJrZXIpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd01hcmtlcihjdXJyZW50TWFya2VyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlTWFya2VyKGN1cnJlbnRNYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93TWFya2VyOiBmdW5jdGlvbiAobWFya2VyKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc2VzID0gdGhpcy5zZXR0aW5ncy5jbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgbWFya2VyLmVsZW1lbnQuc2hvdygpO1xyXG4gICAgICAgICAgICBtYXJrZXIuZWxlbWVudC5yZW1vdmVDbGFzcyhjbGFzc2VzLmhpZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZU1hcmtlcjogZnVuY3Rpb24gKG1hcmtlcikge1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NlcyA9IHRoaXMuc2V0dGluZ3MuY2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgIG1hcmtlci5lbGVtZW50LmFkZENsYXNzKGNsYXNzZXMuaGlkZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyLmVsZW1lbnQuaGlkZSgpO1xyXG4gICAgICAgICAgICB9LCAxODApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5zO1xyXG59KSh3aW5kb3cualF1ZXJ5LCB3aW5kb3cuTHViZSB8fCB7fSwgd2luZG93Ll8gfHwge30pO1xyXG4iLCJmdW5jdGlvbiBhc3luY0dvb2dsZU1hcHMoKSB7fVxyXG4oZnVuY3Rpb24gKCQsIGdvb2dsZSwgbnMpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgY2ZnID0ge1xyXG4gICAgICAgIGNhY2hlOiB7fSxcclxuICAgICAgICBjbGFzc2VzOiB7fSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHN0YXJ0TG9jYXRpb246ICdzdGFydC1sb2NhdGlvbicsXHJcbiAgICAgICAgICAgIGdlb2NvZGVDb3VudHJ5QmlhczogJ2dlb2NvZGUtY291bnRyeS1iaWFzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cmlidXRlczoge30sXHJcbiAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgIGNsaWNrOiAnY2xpY2snLFxyXG4gICAgICAgICAgICBzaG93bjogJ3Nob3duLmJzLm1vZGFsJyxcclxuICAgICAgICAgICAgZHJhZ2VuZDogJ2RyYWdlbmQnLFxyXG4gICAgICAgICAgICByZXNpemU6ICdyZXNpemUnLFxyXG4gICAgICAgICAgICB6b29tQ2hhbmdlZDogJ3pvb21fY2hhbmdlZCcsXHJcbiAgICAgICAgICAgIGJvdW5kc0NoYW5nZWQ6ICdib3VuZHNfY2hhbmdlZCcsXHJcbiAgICAgICAgICAgIG1hcExvYWRlZDogJ2dvb2dsZW1hcHMubG9hZGVkJyxcclxuICAgICAgICAgICAgcGxhY2VNYXJrZXJzOiAnZ29vZ2xlbWFwcy5wbGFjZS1tYXJrZXJzJyxcclxuICAgICAgICAgICAgcGxhY2VNYXJrZXJzQW5kRml0OiAnZ29vZ2xlbWFwcy5wbGFjZS1tYXJrZXJzLWZpdCcsXHJcbiAgICAgICAgICAgIHBsYWNlTWFya2VyOiAnZ29vZ2xlbWFwcy5wbGFjZS1tYXJrZXInLFxyXG4gICAgICAgICAgICBzZXRNYXJrZXJBY3RpdmU6ICdnb29nbGVtYXBzLnNldC1tYXJrZXItYWN0aXZlJyxcclxuICAgICAgICAgICAgbG9jYXRpb25VcGRhdGU6ICdnb29nbGVtYXBzLmxvY2F0aW9uLXVwZGF0ZScsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uUGxhY2VkOiAnZ29vZ2xlbWFwcy5sb2NhdGlvbi1wbGFjZWQnLFxyXG4gICAgICAgICAgICBsb2NhdGlvbkVycm9yOiAnZ29vZ2xlbWFwcy5sb2NhdGlvbi1lcnJvcicsXHJcbiAgICAgICAgICAgIGJvdW5kc3VwZGF0ZWQ6ICdnb29nbGVtYXBzLmJvdW5kcy11cGRhdGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHpvb206IDgsXHJcbiAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXHJcbiAgICAgICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHt9LFxyXG4gICAgICAgICAgICAvL21pblpvb206IDUsXHJcbiAgICAgICAgICAgIGdlc3R1cmVIYW5kbGluZzogJ2dyZWVkeScsXHJcbiAgICAgICAgICAgIHN0eWxlczogW3tcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUuY291bnRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbC5sYW5kY292ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsLnRlcnJhaW5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndlaWdodFwiOiBcIjAuNTBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjVcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC41XCJcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM1M2IyZTFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY3JpcHRzOiB7XHJcbiAgICAgICAgICAgIG1hcHM6ICcvL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/c2lnbmVkX2luPXRydWUmdj0zJmxpYnJhcmllcz1nZW9tZXRyeSZrZXk9QUl6YVN5RDhTX1lOX1A0OXBLTUIyR1dLLXVFbHZmOFdnM1hyY2s4JmNhbGxiYWNrPWFzeW5jR29vZ2xlTWFwcycsXHJcbiAgICAgICAgICAgIGluZm9Cb3g6ICdkZXNpZ24vanMvdmVuZG9yL2dvb2dsZW1hcHMvaW5mb2JveC5taW4uanMnXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBucy5Hb29nbGVNYXBzID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBjZmc7XHJcblxyXG4gICAgICAgIHRoaXMuY2FjaGVJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBucy5Hb29nbGVNYXBzLnByb3RvdHlwZSA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBzY3JpcHRzID0gc2V0dGluZ3Muc2NyaXB0cyxcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cyxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBzZXR0aW5ncy5kYXRhO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZUNvdW50cnlCaWFzID0gdGhpcy5jb250YWluZXIuZGF0YShkYXRhLmdlb2NvZGVDb3VudHJ5QmlhcykgfHwgJ0JFJztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNvbnRhaW5lci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnb29nbGUgJiYgZ29vZ2xlLmhhc093blByb3BlcnR5KCdtYXBzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNjcmlwdHMoc2NyaXB0cywgdGhpcy5pbml0LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWNoZUl0ZW1zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBjYWNoZSA9IHNldHRpbmdzLmNhY2hlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXAgPSB0aGlzLmNvbnRhaW5lci5jaGlsZHJlbigpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VzdE1vZGFsID0gdGhpcy5jb250YWluZXIuY2xvc2VzdChjYWNoZS5tb2RhbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBzZXR0aW5ncy5ldmVudHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5vbihldmVudHMucGxhY2VNYXJrZXJzLCAoZSwgcGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5tYXJrZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5JZkxvYWRlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2VNYXJrZXJBcnJheShwYXJhbXMubWFya2Vycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIub24oZXZlbnRzLnBsYWNlTWFya2Vyc0FuZEZpdCwgKGUsIHBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubWFya2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuSWZMb2FkZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlTWFya2VyQXJyYXkocGFyYW1zLm1hcmtlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvb21Ub01hcmtlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKHdpbmRvdy5Eb20pLm9uKGV2ZW50cy5yZXNpemUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFJlY2FsY3VsYXRlIG1hcCBvbiByZXNpemUgb2YgdGhlIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuaGVpZ2h0KHRoaXMuY29udGFpbmVyLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJldHVybklmTG9hZGVkOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIub24oZXZlbnRzLm1hcExvYWRlZCwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGFjZU1hcmtlckFycmF5OiBmdW5jdGlvbiAobWFya2Vycykge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyTWFya2VycygpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcmtlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gbWFya2Vyc1tpXS5Jc0FjdGl2ZSA/ICdhY3RpdmUnIDogJ2RlZmF1bHQnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZU1hcmtlcihcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzW2ldLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1tpXS5pZCxcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzW2ldLmhhbmRsZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRNYXBFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuYWRkTGlzdGVuZXIoZXZlbnRzLmJvdW5kc0NoYW5nZWQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIudHJpZ2dlcihldmVudHMuYm91bmRzdXBkYXRlZCwgdGhpcy5pbnN0YW5jZS5nZXRCb3VuZHMoKS50b0pTT04oKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5tYXAubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcEVsZW1lbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRNYXBFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIudHJpZ2dlcihldmVudHMubWFwTG9hZGVkKTtcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRTY3JpcHRzOiBmdW5jdGlvbiAoc2NyaXB0cywgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKG4sIHQsIHNjcmlwdHMpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzY3JpcHRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJC5nZXRTY3JpcHQoc2NyaXB0cy5tYXBzKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdvb2dsZSA9IHdpbmRvdy5nb29nbGUgfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbChlcnJvckhhbmRsZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlTWFwRWxlbWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9ICQoJzxkaXY+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmhlaWdodCh0aGlzLmNvbnRhaW5lci5vdXRlckhlaWdodCgpKTtcclxuICAgICAgICAgICAgdGhpcy5tYXAud2lkdGgoJzEwMCUnKTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMubWFwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlck1hcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHNldHRpbmdzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gc2V0dGluZ3MuZGF0YSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0TG9jYXRpb24gPSB0aGlzLmNvbnRhaW5lci5kYXRhKGRhdGEuc3RhcnRMb2NhdGlvbikgfHwgWzUwLjg2MjY1MSwgNC4zNjE0MDhdLFxyXG4gICAgICAgICAgICAgICAgbWFwID0gJC5leHRlbmQoe30sIG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoc3RhcnRMb2NhdGlvblswXSwgc3RhcnRMb2NhdGlvblsxXSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcclxuICAgICAgICAgICAgICAgICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5UT1BfTEVGVFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLm1hcC5nZXQoMCksIG1hcCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZW9jb2RlQWRkcmVzczogZnVuY3Rpb24gKGFkZHJlc3MsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZVBvc3RhbENvZGUoYWRkcmVzcywgbG9jYXRpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZUNpdHkoYWRkcmVzcywgbG9jYXRpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdHZW9jb2RlIHdhcyBub3Qgc3VjY2Vzc2Z1bCBmb3IgdGhlIGZvbGxvd2luZyByZWFzb246ICcgKyBzdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci50cmlnZ2VyKHRoaXMuc2V0dGluZ3MuZXZlbnRzLmxvY2F0aW9uRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZW9jb2RlUG9zdGFsQ29kZTogZnVuY3Rpb24gKHBvc3RhbENvZGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50UmVzdHJpY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IHRoaXMuZ2VvY29kZUNvdW50cnlCaWFzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0YWxDb2RlOiBwb3N0YWxDb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09ICdPSycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdlb2NvZGVDaXR5OiBmdW5jdGlvbiAoY2l0eSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5nZW9jb2Rlci5nZW9jb2RlKHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBjaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmdlb2NvZGVDb3VudHJ5Qmlhc1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0cywgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSAnT0snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGVhck1hcmtlcnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hcmtlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50TG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VNYXJrZXIodGhpcy5jdXJyZW50TG9jYXRpb24sICdsb2NhdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGFjZU1hcmtlcjogZnVuY3Rpb24gKHBvc2l0aW9uLCB0eXBlLCBpZCwgaGFuZGxlcikge1xyXG4gICAgICAgICAgICAvL3ZhciBtYXJrZXJTaGFwZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXJTaGFwZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hcmtlck9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIG1hcDogdGhpcy5pbnN0YW5jZSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpZCAmJiBpZC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlck9iamVjdC5pZCA9IGlkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXJPYmplY3QuekluZGV4ID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlck9iamVjdC56SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcGxhY2VkTWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcihtYXJrZXJPYmplY3QpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHBsYWNlZE1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2gocGxhY2VkTWFya2VyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBsYWNlZE1hcmtlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHpvb21Ub01hcmtlcnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1hcmtlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGJvdW5kcy5leHRlbmQodGhpcy5tYXJrZXJzW2ldLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmZpdEJvdW5kcyhib3VuZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5zO1xyXG59KSh3aW5kb3cualF1ZXJ5LCB3aW5kb3cuZ29vZ2xlIHx8IHVuZGVmaW5lZCwgd2luZG93Lkx1YmUgfHwge30pO1xyXG4iLCIoZnVuY3Rpb24gKCQsIG5zKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbnMuY2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9O1xyXG5cclxuICAgIG5zLm1vZHVsZXMgPSBmdW5jdGlvbiAoKSB7fTtcclxuIFxyXG4gICAgbnMuZGF0YUNvbXBvbmVudEluaXRpYWxpemVyID0gZnVuY3Rpb24gKHJvb3RFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGRhdGFDb21wb25lbnRzID1cclxuICAgICAgICAgICAgcm9vdEVsZW1lbnQgPT09IHVuZGVmaW5lZCA/XHJcbiAgICAgICAgICAgICQoJ1tkYXRhLWNvbXBvbmVudF0nKSA6XHJcbiAgICAgICAgICAgIHJvb3RFbGVtZW50LmZpbmQoJ1tkYXRhLWNvbXBvbmVudF0nKS5hZGRCYWNrKCdbZGF0YS1jb21wb25lbnRdJyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YUNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFDb21wb25lbnQgPSBkYXRhQ29tcG9uZW50cy5lcShpKSxcclxuICAgICAgICAgICAgICAgIGRhdGFBdHRyID0gZGF0YUNvbXBvbmVudC5kYXRhKCdjb21wb25lbnQnKTtcclxuICAgICAgICAgICAgZGF0YUF0dHIgPSBkYXRhQXR0ci5zcGxpdCgnLicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFBdHRyLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50RnVuY3Rpb24gPSBuc1tkYXRhQXR0clsxXV07XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBjb21wb25lbnRGdW5jdGlvbiBleGlzdHMsXHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50RnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJbml0IGl0IGlmIGl0IGRvZXNcclxuICAgICAgICAgICAgICAgICAgICBuZXcgY29tcG9uZW50RnVuY3Rpb24oZGF0YUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5zLmNsYXNzZXMoKTtcclxuICAgICAgICBucy5tb2R1bGVzKCk7XHJcbiAgICAgICAgbnMuZGF0YUNvbXBvbmVudEluaXRpYWxpemVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5yZWFkeS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh3aW5kb3cuTHViZSkudHJpZ2dlcignbG9hZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93Lkx1YmUgPSBucztcclxufSkod2luZG93LmpRdWVyeSwgd2luZG93Lkx1YmUgfHwge30pO1xyXG4iXX0=
