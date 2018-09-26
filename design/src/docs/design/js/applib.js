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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImx1YmUuZG9tLmpzIiwibHViZS5mbi5qcyIsImx1YmUuYWN0aW9uZmlsdGVyLmpzIiwibHViZS5nb29nbGVtYXBzLmpzIiwibHViZS5zdHJhcG9uLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIkx1YmUiLCIkIiwibnMiLCJjZmciLCJjYWNoZSIsInRvcEVxdWFsSGVpZ2h0Qm94ZXMiLCJjbGFzc2VzIiwic2Nyb2xsaW5nIiwiZXZlbnRzIiwic2Nyb2xsIiwiRG9tIiwiaW5pdCIsInNldHRpbmdzIiwid2luIiwiYm9keSIsImRvY3VtZW50IiwiYmluZEV2ZW50cyIsIndpbmRvd3NQaG9uZVZpZXdwb3J0Rml4IiwiZml4SGVhZGVyVG9wT25TY3JvbGwiLCJiaW5kU2Nyb2xsVG9wRXZlbnQiLCJzZWxmIiwib24iLCJhZGRDbGFzcyIsImZuIiwiZGVsYXllZEV2ZW50IiwicmVtb3ZlQ2xhc3MiLCJyZXNpemUiLCJ0b3BFcXVhbEhlaWdodEhhbmRsZXIiLCJsb2FkIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJtc1ZpZXdwb3J0U3R5bGUiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVUZXh0Tm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJmaXhlZEVsZW1lbnQiLCJmaXhtZVRvcCIsIm9mZnNldCIsInRvcCIsImN1cnJlbnRTY3JvbGwiLCJzY3JvbGxUb3AiLCJjc3MiLCJwb3NpdGlvbiIsImxlZnQiLCJjbGljayIsImFuaW1hdGUiLCJqUXVlcnkiLCJwYXR0ZXJucyIsIm1vYmlsZSIsIlJlZ0V4cCIsIm1vYmlsZTIiLCJ0YWJsZXQiLCJkZXZpY2VzIiwiZGVza3RvcCIsImRlbGltaXRlciIsImtleSIsInZhbCIsImRldmljZURldGVjdGlvbiIsImR2YyIsImNmZ1BhdHRlcm5zIiwiY2ZnRGV2aWNlIiwidGVzdCIsInN1YnN0ciIsInZlbmRvciIsIm9wZXJhIiwicmVuZGVyVGVtcGxhdGUiLCJvYmoiLCJ0ZW1wbGF0ZSIsInRlbXBLZXkiLCJyZWciLCJoYXNPd25Qcm9wZXJ0eSIsIlN0cmluZyIsInJlcGxhY2UiLCJub3ciLCJEYXRlIiwiZ2V0VGltZSIsImRlZmVyIiwiZnVuYyIsImRlbGF5IiwiYXBwbHkiLCJjb25jYXQiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJ3YWl0IiwiYXJncyIsInNldFRpbWVvdXQiLCJ0aHJvdHRsZSIsIm9wdGlvbnMiLCJjb250ZXh0IiwicmVzdWx0IiwidGltZW91dCIsInByZXZpb3VzIiwibGF0ZXIiLCJsZWFkaW5nIiwicmVtYWluaW5nIiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJkZWJvdW5jZSIsImltbWVkaWF0ZSIsInRpbWVzdGFtcCIsImxhc3QiLCJjYWxsTm93IiwidGltZXJzIiwiaWQiLCJlcXVhbEhlaWdodCIsImVsZW1lbnRzIiwiZWwiLCJsZW4iLCJsZW5ndGgiLCJoZWlnaGVzdCIsImgiLCJlcSIsIm91dGVySGVpZ2h0IiwiY29udmVydFFzVG9MaXRlcmFsIiwicXMiLCJrZXlEZWxpbWl0ZXIiLCJ2YWxEZWxpbWl0ZXIiLCJhcnJQYXJhbXMiLCJzcGxpdCIsImVhY2giLCJpIiwicGFpciIsImFyclBhaXIiLCJnZXRPYmplY3RQcm9wZXJ0eSIsImlzVHlwZUNvbXBhcmlzb24iLCJwcm9wZXJ0eSIsIm8iLCJ1bmRlZmluZWQiLCJwYWdlT2Zmc2V0Iiwic3VwcG9ydFBhZ2VPZmZzZXQiLCJwYWdlWE9mZnNldCIsImlzQ1NTMUNvbXBhdCIsImNvbXBhdE1vZGUiLCJ4IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsTGVmdCIsInkiLCJwYWdlWU9mZnNldCIsIl8iLCJnb29nbGVtYXAiLCJhY3Rpb24iLCJkYXRlSW5wdXQiLCJkYXRlTWluSW5wdXQiLCJkYXRlTWF4SW5wdXQiLCJidG5DbGVhciIsImhpZGUiLCJkYXRhIiwiYXR0cmlidXRlcyIsImNoYW5nZSIsIm1hcExvYWRlZCIsInBsYWNlTWFya2VycyIsInBsYWNlTWFya2Vyc0FuZEZpdCIsInBsYWNlTWFya2VyIiwic2V0TWFya2VyQWN0aXZlIiwibG9jYXRpb25VcGRhdGUiLCJsb2NhdGlvblBsYWNlZCIsImxvY2F0aW9uRXJyb3IiLCJib3VuZHN1cGRhdGVkIiwiZGF0ZXBpY2tlck9wdGlvbnMiLCJmb3JtYXQiLCJ3ZWVrU3RhcnQiLCJrZWVwRW1wdHlWYWx1ZXMiLCJBY3Rpb25GaWx0ZXIiLCJjb250YWluZXIiLCJjYWNoZUl0ZW1zIiwiYWN0aXZhdGUiLCJwcm90b3R5cGUiLCJodG1sQm9keSIsIm1hcCIsImZpbmQiLCJmaXJzdEFjdGlvbkRhdGUiLCJsYXN0QWN0aW9uRGF0ZSIsImFjdGlvbnMiLCJhY3Rpb25NYXJrZXJzIiwiYWN0aW9uRGF0YSIsImhhbmRsZXIiLCJhY3Rpb25DbGlja0hhbmRsZXIiLCJlbGVtZW50IiwicHVzaCIsImRhdGUiLCJkYXRlcGlja2VyIiwiZG9GaWx0ZXIiLCJlIiwicGFyYW1zIiwiY3VycmVudEJvdW5kcyIsImFjdGlvbkVsZW1lbnQiLCJhY3Rpb25NYXJrZXIiLCJ0cmlnZ2VyIiwibWFya2VycyIsIk9iamVjdCIsImFzc2lnbiIsImlucHV0cyIsImFkZCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJkYXRlUGlja2VySW5zdGFuY2UiLCJtaW5EYXRlIiwibWF4RGF0ZSIsImZpbHRlckxvY2F0aW9uIiwiZmlsdGVyRGF0ZXMiLCJ0b2dnbGVWaXNpYmxpdHlBY3Rpb25zIiwiYm91bmRzT2JqZWN0IiwiZmlsdGVyTWV0aG9kIiwibGF0Iiwic291dGgiLCJub3J0aCIsImxuZyIsIndlc3QiLCJlYXN0IiwiZmlsdGVyIiwidG9TaG93TWFya2VycyIsImFsbE1hcmtlcnMiLCJjdXJyZW50TWFya2VyIiwiaW5kZXhPZiIsInNob3dNYXJrZXIiLCJoaWRlTWFya2VyIiwibWFya2VyIiwic2hvdyIsImFzeW5jR29vZ2xlTWFwcyIsImdvb2dsZSIsInN0YXJ0TG9jYXRpb24iLCJnZW9jb2RlQ291bnRyeUJpYXMiLCJzaG93biIsImRyYWdlbmQiLCJ6b29tQ2hhbmdlZCIsImJvdW5kc0NoYW5nZWQiLCJ6b29tIiwiZGlzYWJsZURlZmF1bHRVSSIsInpvb21Db250cm9sIiwiem9vbUNvbnRyb2xPcHRpb25zIiwiZ2VzdHVyZUhhbmRsaW5nIiwic3R5bGVzIiwic2NyaXB0cyIsIm1hcHMiLCJpbmZvQm94IiwiR29vZ2xlTWFwcyIsImdlb2NvZGVyIiwiR2VvY29kZXIiLCJnZXRTY3JpcHRzIiwiYmluZCIsImNoaWxkcmVuIiwiZmlyc3QiLCJjbG9zZXN0TW9kYWwiLCJjbG9zZXN0IiwibW9kYWwiLCJyZXR1cm5JZkxvYWRlZCIsInBsYWNlTWFya2VyQXJyYXkiLCJ6b29tVG9NYXJrZXJzIiwiaGVpZ2h0IiwiY2FsbGJhY2siLCJpc0xvYWRlZCIsImNsZWFyTWFya2VycyIsInR5cGUiLCJJc0FjdGl2ZSIsImJpbmRNYXBFdmVudHMiLCJpbnN0YW5jZSIsImFkZExpc3RlbmVyIiwiZ2V0Qm91bmRzIiwidG9KU09OIiwiY3JlYXRlTWFwRWxlbWVudCIsInJlbmRlck1hcCIsImVycm9ySGFuZGxlciIsIm4iLCJ0IiwiRXJyb3IiLCJnZXRTY3JpcHQiLCJkb25lIiwiZmFpbCIsIndpZHRoIiwiYXBwZW5kIiwiZXh0ZW5kIiwiY2VudGVyIiwiTGF0TG5nIiwibWFwVHlwZUlkIiwiTWFwVHlwZUlkIiwiUk9BRE1BUCIsIkNvbnRyb2xQb3NpdGlvbiIsIlRPUF9MRUZUIiwiTWFwIiwiZ2V0IiwiZ2VvY29kZUFkZHJlc3MiLCJhZGRyZXNzIiwiZ2VvY29kZVBvc3RhbENvZGUiLCJsb2NhdGlvbiIsImdlb2NvZGVDaXR5IiwiY29uc29sZSIsImVycm9yIiwic3RhdHVzIiwicG9zdGFsQ29kZSIsImdlb2NvZGUiLCJjb21wb25lbnRSZXN0cmljdGlvbnMiLCJjb3VudHJ5IiwicmVzdWx0cyIsImdlb21ldHJ5IiwiY2l0eSIsInNldE1hcCIsImN1cnJlbnRMb2NhdGlvbiIsIm1hcmtlck9iamVjdCIsInpJbmRleCIsInBsYWNlZE1hcmtlciIsIk1hcmtlciIsImJvdW5kcyIsIkxhdExuZ0JvdW5kcyIsImdldFBvc2l0aW9uIiwiZml0Qm91bmRzIiwibW9kdWxlcyIsImRhdGFDb21wb25lbnRJbml0aWFsaXplciIsInJvb3RFbGVtZW50IiwiZGF0YUNvbXBvbmVudHMiLCJhZGRCYWNrIiwiZGF0YUNvbXBvbmVudCIsImRhdGFBdHRyIiwiY29tcG9uZW50RnVuY3Rpb24iLCJyZWFkeSIsInRoZW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBQUMsSUFBQSxHQUFBLFVBQUFDLENBQUEsRUFBQUMsRUFBQSxFQUFBO0FBQ0E7O0FBRUEsUUFBQUMsTUFBQTtBQUNBQyxlQUFBO0FBQ0FDLGlDQUFBO0FBQ0E7QUFEQTtBQURBLFNBREE7QUFNQUMsaUJBQUE7QUFDQUMsdUJBQUE7QUFEQSxTQU5BO0FBU0FDLGdCQUFBO0FBQ0FDLG9CQUFBO0FBREE7QUFUQSxLQUFBOztBQWNBUCxPQUFBUSxHQUFBLEdBQUE7QUFDQUMsY0FBQSxnQkFBQTtBQUNBLGdCQUFBQyxXQUFBVCxHQUFBO0FBQUEsZ0JBQ0FHLFVBQUFNLFNBQUFOLE9BREE7QUFBQSxnQkFFQUUsU0FBQUksU0FBQUosTUFGQTtBQUFBLGdCQUdBSixRQUFBUSxTQUFBUixLQUhBOztBQUtBLGlCQUFBUyxHQUFBLEdBQUFaLEVBQUFGLE1BQUEsQ0FBQTtBQUNBLGlCQUFBZSxJQUFBLEdBQUFiLEVBQUFjLFNBQUFELElBQUEsQ0FBQTs7QUFFQSxpQkFBQUUsVUFBQSxDQUFBVixPQUFBLEVBQUFFLE1BQUE7QUFDQSxpQkFBQVMsdUJBQUE7QUFDQSxpQkFBQUMsb0JBQUE7QUFDQSxpQkFBQUMsa0JBQUE7QUFDQSxTQWRBOztBQWdCQUgsb0JBQUEsb0JBQUFWLE9BQUEsRUFBQUUsTUFBQSxFQUFBO0FBQ0EsZ0JBQUFZLE9BQUEsSUFBQTtBQUFBLGdCQUNBUixXQUFBVCxHQURBO0FBQUEsZ0JBRUFDLFFBQUFRLFNBQUFSLEtBRkE7O0FBSUEsaUJBQUFTLEdBQUEsQ0FBQVEsRUFBQSxDQUFBYixPQUFBQyxNQUFBLEVBQUEsWUFBQTtBQUNBVyxxQkFBQU4sSUFBQSxDQUFBUSxR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QUE4TCxnQkFBQUYsZUFBQXJNLEVBQUEsQ0FBQVMsQ0FBQSxDQUFBO0FBQUEsZ0JBQ0ErTCxXQUFBRCxjQUFBcEssSUFBQSxDQUFBLFdBQUEsQ0FEQTtBQUVBcUssdUJBQUFBLFNBQUFqTSxLQUFBLENBQUEsR0FBQSxDQUFBOztBQUVBLGdCQUFBaU0sU0FBQTNNLE1BQUEsSUFBQSxDQUFBLEVBQUE7QUFDQSxvQkFBQTRNLG9CQUFBelQsR0FBQXdULFNBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQTtBQUNBLG9CQUFBQyxpQkFBQSxFQUFBO0FBQ0E7QUFDQSx3QkFBQUEsaUJBQUEsQ0FBQUYsYUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBcEJBOztBQXNCQXhULE1BQUEsWUFBQTtBQUNBQyxXQUFBSSxPQUFBO0FBQ0FKLFdBQUFrVCxPQUFBO0FBQ0FsVCxXQUFBbVQsd0JBQUE7QUFDQSxLQUpBOztBQU1BcFQsTUFBQUYsTUFBQSxFQUFBc0IsRUFBQSxDQUFBLE1BQUEsRUFBQSxZQUFBO0FBQ0FwQixVQUFBMlQsS0FBQSxDQUFBQyxJQUFBLENBQUEsWUFBQTtBQUNBNVQsY0FBQUYsT0FBQUMsSUFBQSxFQUFBOEwsT0FBQSxDQUFBLE1BQUE7QUFDQSxTQUZBO0FBR0EsS0FKQTs7QUFNQS9MLFdBQUFDLElBQUEsR0FBQUUsRUFBQTtBQUNBLENBNUNBLEVBNENBSCxPQUFBaUQsTUE1Q0EsRUE0Q0FqRCxPQUFBQyxJQUFBLElBQUEsRUE1Q0EiLCJmaWxlIjoiYXBwbGliLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lkx1YmUgPSAoZnVuY3Rpb24oJCwgbnMpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgY2ZnID0ge1xyXG4gICAgICAgIGNhY2hlOiB7XHJcbiAgICAgICAgICAgIHRvcEVxdWFsSGVpZ2h0Qm94ZXM6IFtcclxuICAgICAgICAgICAgICAgIC8veyBzZWxlY3RvcjogJy50ZXN0aW1vbmlhbCA+IHAnLCByZXNwb25zaXZlOiB0cnVlLCBpZ25vcmVPZmZzZXQ6IHRydWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgICAgIHNjcm9sbGluZzogJ3Njcm9sbGluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICBzY3JvbGw6ICdzY3JvbGwnXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBucy5Eb20gPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IGNmZyxcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBzZXR0aW5ncy5jbGFzc2VzLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRzID0gc2V0dGluZ3MuZXZlbnRzLFxyXG4gICAgICAgICAgICAgICAgY2FjaGUgPSBzZXR0aW5ncy5jYWNoZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luID0gJCh3aW5kb3cpO1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkgPSAkKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKGNsYXNzZXMsIGV2ZW50cyk7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93c1Bob25lVmlld3BvcnRGaXgoKTtcclxuICAgICAgICAgICAgdGhpcy5maXhIZWFkZXJUb3BPblNjcm9sbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRTY3JvbGxUb3BFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKGNsYXNzZXMsIGV2ZW50cykge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IGNmZyxcclxuICAgICAgICAgICAgICAgIGNhY2hlID0gc2V0dGluZ3MuY2FjaGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbi5vbihldmVudHMuc2Nyb2xsLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYm9keS5hZGRDbGFzcyhjbGFzc2VzLnNjcm9sbGluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbnMuZm4uZGVsYXllZEV2ZW50KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYm9keS5yZW1vdmVDbGFzcyhjbGFzc2VzLnNjcm9sbGluZyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAsIGV2ZW50cy5zY3JvbGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luLm9uKGV2ZW50cy5yZXNpemUsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbnMuZm4uZGVsYXllZEV2ZW50KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudG9wRXF1YWxIZWlnaHRIYW5kbGVyKGNhY2hlLnRvcEVxdWFsSGVpZ2h0Qm94ZXMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjAwLCAncmVzaXplRXF1YWxIZWlnaHQnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndpbi5vbihldmVudHMubG9hZCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRvcEVxdWFsSGVpZ2h0SGFuZGxlcihjYWNoZS50b3BFcXVhbEhlaWdodEJveGVzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHdpbmRvd3NQaG9uZVZpZXdwb3J0Rml4OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gQ29weXJpZ2h0IDIwMTQtMjAxNSBUd2l0dGVyLCBJbmMuXHJcbiAgICAgICAgICAgIC8vIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXHJcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9JRU1vYmlsZVxcLzEwXFwuMC8pKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbXNWaWV3cG9ydFN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIG1zVmlld3BvcnRTdHlsZS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0AtbXMtdmlld3BvcnR7d2lkdGg6YXV0byFpbXBvcnRhbnR9J1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQobXNWaWV3cG9ydFN0eWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpeEhlYWRlclRvcE9uU2Nyb2xsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGZpeGVkRWxlbWVudCA9ICQoJ2hlYWRlciBocicpO1xyXG4gICAgICAgICAgICB2YXIgZml4bWVUb3AgPSBmaXhlZEVsZW1lbnQub2Zmc2V0KCkudG9wOyAvLyBnZXQgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudFxyXG5cclxuICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHsgLy8gYXNzaWduIHNjcm9sbCBldmVudCBsaXN0ZW5lclxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpOyAvLyBnZXQgY3VycmVudCBwb3NpdGlvblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2Nyb2xsID49IGZpeG1lVG9wKSB7IC8vIGFwcGx5IHBvc2l0aW9uOiBmaXhlZCBpZiB5b3VcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZEVsZW1lbnQuY3NzKHsgLy8gc2Nyb2xsIHRvIHRoYXQgZWxlbWVudCBvciBiZWxvdyBpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gYXBwbHkgcG9zaXRpb246IHN0YXRpY1xyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkRWxlbWVudC5jc3MoeyAvLyBpZiB5b3Ugc2Nyb2xsIGFib3ZlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnc3RhdGljJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kU2Nyb2xsVG9wRXZlbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoJ2FbaHJlZj1cIiN0b3BcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYm9keS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIFwic2xvd1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbnM7XHJcbn0od2luZG93LmpRdWVyeSwgd2luZG93Lkx1YmUgfHwge30pKTtcclxuIiwiLyoqXG4qIEBhdXRob3IgICAgICAgW1N0ZWYgQ29lbmVuICYgVGltIFZlcm1hZWxlbl1cbiogQGRhdGUgICAgICAgICBbMjAxNl1cbiogQG5hbWVzcGFjZSAgICBbTHViZS5mbl1cbiogQHR5cGUgICAgICAgICBbRnVuY3Rpb25zXVxuKiBAcmVxdWlyZXMgICAgIFtqUXVlcnksIEx1YmVdXG4qIEByZXZpc2lvbiAgICAgWzAuMV1cbiovXG5cbi8vIEBwYXJhbSAoJCk6IHdpbmRvdy5qUXVlcnlcbi8vIEBwYXJhbSAobnMpOiB3aW5kb3cuTHViZVxud2luZG93Lkx1YmUgPSAoZnVuY3Rpb24gKCQsIG5zKSB7XG5cbiAgICAvLyAxLiBFQ01BLTI2Mi81XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gMi4gQ09ORklHVVJBVElPTlxuICAgIHZhciBjZmcgPSB7XG4gICAgICAgIHBhdHRlcm5zOiB7XG4gICAgICAgICAgICBtb2JpbGU6IG5ldyBSZWdFeHAoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIChjZXxwaG9uZSl8eGRhfHhpaW5vL2kpLFxuICAgICAgICAgICAgbW9iaWxlMjogbmV3IFJlZ0V4cCgvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vKSxcbiAgICAgICAgICAgIHRhYmxldDogbmV3IFJlZ0V4cCgvYW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaSlcbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlczoge1xuICAgICAgICAgICAgbW9iaWxlOiAnbW9iaWxlJyxcbiAgICAgICAgICAgIHRhYmxldDogJ3RhYmxldCcsXG4gICAgICAgICAgICBkZXNrdG9wOiAnZGVza3RvcCdcbiAgICAgICAgfSxcbiAgICAgICAgZGVsaW1pdGVyOiB7XG4gICAgICAgICAgICBrZXk6ICcmJyxcbiAgICAgICAgICAgIHZhbDogJz0nXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gMy4gRlVOQ1RJT05TIE9CSkVDVFxuICAgIG5zLmZuID0ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gRGV2aWNlIGRldGVjdGlvblxuICAgICAgICAgKiBodHRwOi8vZGV0ZWN0bW9iaWxlYnJvd3NlcnMuY29tXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkdmMgOiB1c2VyIGFnZW50IHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IG1vYmlsZSB8IHRhYmxldCB8IGRlc2t0b3BcbiAgICAgICAgICovXG4gICAgICAgIGRldmljZURldGVjdGlvbjogKGZ1bmN0aW9uIChkdmMpIHtcbiAgICAgICAgICAgIHZhciBjZmdQYXR0ZXJucyA9IGNmZy5wYXR0ZXJucyxcbiAgICAgICAgICAgICAgICBjZmdEZXZpY2UgPSBjZmcuZGV2aWNlcztcblxuICAgICAgICAgICAgcmV0dXJuIGNmZ1BhdHRlcm5zLm1vYmlsZS50ZXN0KGR2YykgfHwgY2ZnUGF0dGVybnMubW9iaWxlMi50ZXN0KGR2Yy5zdWJzdHIoMCwgNCkpID8gY2ZnRGV2aWNlLm1vYmlsZSA6IGNmZ1BhdHRlcm5zLnRhYmxldC50ZXN0KGR2YykgPyBjZmdEZXZpY2UudGFibGV0IDogY2ZnRGV2aWNlLmRlc2t0b3A7XG4gICAgICAgIH0obmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSkpLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gUmVuZGVyIGh0bWwgdGVtcGxhdGUgd2l0aCBqc29uIGRhdGFcbiAgICAgICAgICogQHNlZSBoYW5kbGViYXJzIG9yIG11c3RhY2hlIGlmIHlvdSBuZWVkIG1vcmUgYWR2YW5jZWQgZnVuY3Rpb25saXR5XG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHRlbXBsYXRlIDogaHRtbCB0ZW1wbGF0ZSB3aXRoIHt7a2V5c319IG1hdGNoaW5nIHRoZSBvYmplY3RcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSB0ZW1wbGF0ZSA6IHRoZSB0ZW1wbGF0ZSBzdHJpbmcgcmVwbGFjZWQgYnkga2V5OnZhbHVlIHBhaXJzIGZyb20gdGhlIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyVGVtcGxhdGU6IGZ1bmN0aW9uIChvYmosIHRlbXBsYXRlKSB7XG4gICAgICAgICAgICB2YXIgdGVtcEtleSwgcmVnLCBrZXk7XG5cbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wS2V5ID0gU3RyaW5nKCd7eycgKyBrZXkgKyAnfX0nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVnID0gbmV3IFJlZ0V4cCh0ZW1wS2V5LCAnZycpO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UocmVnLCBvYmpba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBBIChwb3NzaWJseSBmYXN0ZXIpIHdheSB0byBnZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIGFuIGludGVnZXIuXG4gICAgICAgICAqL1xuICAgICAgICBub3c6IERhdGUubm93IHx8IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIERlZmVycyBhIGZ1bmN0aW9uLCBzY2hlZHVsaW5nIGl0IHRvIHJ1biBhZnRlciB0aGUgY3VycmVudCBjYWxsIHN0YWNrIGhhcyBjbGVhcmVkLlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXG4gICAgICAgICAqL1xuICAgICAgICBkZWZlcjogZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlbGF5LmFwcGx5KG51bGwsIFtmdW5jLCAxXS5jb25jYXQoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xuICAgICAgICAgKiBAcGFyYW0gKEludGVnZXIpIHdhaXQgOiBtaWxsaXNlY29uZHNcbiAgICAgICAgICovXG4gICAgICAgIGRlbGF5OiBmdW5jdGlvbiAoZnVuYywgd2FpdCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgIH0sIHdhaXQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gd2FpdCA6IG1pbGxpc2Vjb25kc1xuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMubGVhZGluZyA6IGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLiBUbyBkaXNhYmxlIGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSwgZGl0dG8uXG4gICAgICAgICAqL1xuICAgICAgICB0aHJvdHRsZTogZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gICAgICAgICAgICB2YXIgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXMgPSAwO1xuXG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBMdWJlLmZuLm5vdygpO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IEx1YmUuZm4ubm93KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICAgICAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90IGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3IgTiBtaWxsaXNlY29uZHMuXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmNcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSB3YWl0IDogbWlsbGlzZWNvbmRzXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW1tZWRpYXRlIDogaWYgaW1tZWRpYXRlIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gICAgICAgICAqL1xuICAgICAgICBkZWJvdW5jZTogZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xuXG4gICAgICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSBzZWxmLm5vdygpIC0gdGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0IDwgd2FpdCkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgdGltZXN0YW1wID0gc2VsZi5ub3coKTtcblxuICAgICAgICAgICAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICAgICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIGRlbGF5IGV2ZW50cyB3aXRoIHRoZSBzYW1lIGlkLCBnb29kIGZvciB3aW5kb3cgcmVzaXplIGV2ZW50cywga2V5c3Ryb2tlLCBldGMgLi4uXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgOiBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBydW4gd2hlbiBkb25lXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gd2FpdCA6IGludGVnZXIgaW4gbWlsbGlzZWNvbmRzXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZCA6IHVuaXF1ZSBldmVudCBpZFxuICAgICAgICAgKi9cbiAgICAgICAgZGVsYXllZEV2ZW50OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRpbWVycyA9IHt9O1xuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIGlkKSB7XG4gICAgICAgICAgICAgICAgd2FpdCA9IHdhaXQgfHwgMjAwO1xuICAgICAgICAgICAgICAgIGlkID0gaWQgfHwgJ2Fub255bW91cyc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGltZXJzW2lkXSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJzW2lkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGltZXJzW2lkXSA9IHNldFRpbWVvdXQoZnVuYywgd2FpdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSgpLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gRXF1YWxseSBzZXQgaGVpZ2h0IG9uIGl0ZW1zXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50cyA6IGpxdWVyeSBsaXN0XG4gICAgICAgICAqL1xuICAgICAgICBlcXVhbEhlaWdodDogZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSAkKGVsZW1lbnRzKSxcbiAgICAgICAgICAgICAgICBsZW4gPSBlbC5sZW5ndGggfHwgMCxcbiAgICAgICAgICAgICAgICBoZWlnaGVzdCA9IDA7XG5cbiAgICAgICAgICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGxlbi0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoID0gZWwuZXEobGVuKS5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaCA+IGhlaWdoZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaGVzdCA9IGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbC5vdXRlckhlaWdodChoZWlnaGVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBDb252ZXJ0IGEgcXVlcnkgYWxpa2Ugc3RyaW5nIHRvIGFuIG9iamVjdCBsaXRlcmFsXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBxcyA6IGEgcXVlcnkgc3RyaW5nIG9mIGtleSB2YWx1ZSBwYWlycyAod2l0aG91dCA/KVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5RGVsaW1pdGVyIDogY2hhcmFjdGVyIGJldHdlZW4gdmFsdWVzIGFuZCBrZXlzXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWxEZWxpbWl0ZXIgOiBjaGFyYWN0ZXIgYmV0d2VlbiBrZXlzIGFuZCB2YWx1ZXNcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBvYmogOiBvYmplY3QgbGl0ZXJhbCByZXByZXNlbnRpbmcgdGhlIHF1ZXJ5IHN0cmluZ1xuICAgICAgICAgKiBAZXhhbXBsZToga2V5MT12YWwxJmtleTI9dmFsMiZrZXkzPXZhbDNcbiAgICAgICAgICovXG4gICAgICAgIGNvbnZlcnRRc1RvTGl0ZXJhbDogZnVuY3Rpb24gKHFzLCBrZXlEZWxpbWl0ZXIsIHZhbERlbGltaXRlcikge1xuICAgICAgICAgICAgdmFyIGFyclBhcmFtcywgb2JqID0ge307XG5cbiAgICAgICAgICAgIGlmIChxcyAmJiBxcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBrZXlEZWxpbWl0ZXIgPSBrZXlEZWxpbWl0ZXIgfHwgY2ZnLmRlbGltaXRlci5rZXk7XG4gICAgICAgICAgICAgICAgdmFsRGVsaW1pdGVyID0gdmFsRGVsaW1pdGVyIHx8IGNmZy5kZWxpbWl0ZXIudmFsO1xuICAgICAgICAgICAgICAgIGFyclBhcmFtcyA9IHFzLnNwbGl0KGtleURlbGltaXRlcik7XG5cbiAgICAgICAgICAgICAgICAkLmVhY2goYXJyUGFyYW1zLCBmdW5jdGlvbiAoaSwgcGFpcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyUGFpciA9IHBhaXIuc3BsaXQodmFsRGVsaW1pdGVyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGFyclBhaXJbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBhcnJQYWlyWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gR2V0IGFuIG9iamVjdCBmcm9tIGEgbGlzdCBvZiBvYmplY3RzIGJ5IHNlYXJjaGluZyBmb3IgYSBrZXk6dmFsdWUgcGFpclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIDogLWxpdGVyYWwsIGpzb25cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbCA6IHRoZSB2YWx1ZSB5b3Ugc2Vla1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IDogdGhlIGtleVxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzVHlwZUNvbXBhcmlzb24gOiBpZiBzZXQgdG8gdHJ1ZSwgdGhlIGtleSBhbmQgdmFsdWUgd2lsbCBiZSBjaGVja2VkIGFnYWluc3QgaXQncyB0eXBlIGFzIHdlbGxcbiAgICAgICAgICovXG4gICAgICAgIGdldE9iamVjdFByb3BlcnR5OiBmdW5jdGlvbiAob2JqLCB2YWwsIGtleSwgaXNUeXBlQ29tcGFyaXNvbikge1xuICAgICAgICAgICAgdmFyIHByb3BlcnR5LCBvO1xuXG4gICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW3Byb3BlcnR5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gPSB0aGlzLmdldE9iamVjdFByb3BlcnR5KG9ialtwcm9wZXJ0eV0sIHZhbCwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3VuZCBhIHByb3BlcnR5IHdoaWNoIGlzIG5vdCBhbiBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1R5cGVDb21wYXJpc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09PSBrZXkgJiYgb2JqW3Byb3BlcnR5XSA9PT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIGdvdCBhIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IGtleSAmJiBvYmpbcHJvcGVydHldID09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBnb3QgYSBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvID0gb2JqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgfSxcblxuICAgICAgICBwYWdlT2Zmc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzdXBwb3J0UGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWE9mZnNldCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIGlzQ1NTMUNvbXBhdCA9ICgoZG9jdW1lbnQuY29tcGF0TW9kZSB8fCAnJykgPT09ICdDU1MxQ29tcGF0Jyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogc3VwcG9ydFBhZ2VPZmZzZXQgPyB3aW5kb3cucGFnZVhPZmZzZXQgOiBpc0NTUzFDb21wYXQgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICB5OiBzdXBwb3J0UGFnZU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGlzQ1NTMUNvbXBhdCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyA0LiBOQU1FU1BBQ0VcbiAgICByZXR1cm4gbnM7XG5cbn0od2luZG93LmpRdWVyeSwgd2luZG93Lkx1YmUgfHwge30pKTtcbiIsIihmdW5jdGlvbiAoJCwgbnMsIF8pIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgY2ZnID0ge1xuICAgICAgICBjYWNoZToge1xuICAgICAgICAgICAgZ29vZ2xlbWFwOiAnW2RhdGEtY29tcG9uZW50PVwiTHViZS5Hb29nbGVNYXBzXCJdJyxcbiAgICAgICAgICAgIGFjdGlvbjogJ1tkYXRhLWFjdGlvbl0nLFxuICAgICAgICAgICAgZGF0ZUlucHV0OiAnLmFjdGlvbi1maWx0ZXItZGF0ZScsXG4gICAgICAgICAgICBkYXRlTWluSW5wdXQ6ICcuYWN0aW9uLWZpbHRlci1kYXRlLW1pbicsXG4gICAgICAgICAgICBkYXRlTWF4SW5wdXQ6ICcuYWN0aW9uLWZpbHRlci1kYXRlLW1heCcsXG4gICAgICAgICAgICBidG5DbGVhcjogJy5idG4tY2xlYXInXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgICAgIGhpZGU6ICdoaWRlJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhY3Rpb246ICdhY3Rpb24nXG4gICAgICAgIH0sXG4gICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgIGNsaWNrOiAnY2xpY2snLFxuICAgICAgICAgICAgY2hhbmdlOiAnY2hhbmdlJyxcbiAgICAgICAgICAgIG1hcExvYWRlZDogJ2dvb2dsZW1hcHMubG9hZGVkJyxcbiAgICAgICAgICAgIHBsYWNlTWFya2VyczogJ2dvb2dsZW1hcHMucGxhY2UtbWFya2VycycsXG4gICAgICAgICAgICBwbGFjZU1hcmtlcnNBbmRGaXQ6ICdnb29nbGVtYXBzLnBsYWNlLW1hcmtlcnMtZml0JyxcbiAgICAgICAgICAgIHBsYWNlTWFya2VyOiAnZ29vZ2xlbWFwcy5wbGFjZS1tYXJrZXInLFxuICAgICAgICAgICAgc2V0TWFya2VyQWN0aXZlOiAnZ29vZ2xlbWFwcy5zZXQtbWFya2VyLWFjdGl2ZScsXG4gICAgICAgICAgICBsb2NhdGlvblVwZGF0ZTogJ2dvb2dsZW1hcHMubG9jYXRpb24tdXBkYXRlJyxcbiAgICAgICAgICAgIGxvY2F0aW9uUGxhY2VkOiAnZ29vZ2xlbWFwcy5sb2NhdGlvbi1wbGFjZWQnLFxuICAgICAgICAgICAgbG9jYXRpb25FcnJvcjogJ2dvb2dsZW1hcHMubG9jYXRpb24tZXJyb3InLFxuICAgICAgICAgICAgYm91bmRzdXBkYXRlZDogJ2dvb2dsZW1hcHMuYm91bmRzLXVwZGF0ZSdcbiAgICAgICAgfSxcbiAgICAgICAgZGF0ZXBpY2tlck9wdGlvbnM6IHtcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkL21tL3l5eXknLFxuICAgICAgICAgICAgd2Vla1N0YXJ0OiAxLFxuICAgICAgICAgICAga2VlcEVtcHR5VmFsdWVzOiB0cnVlXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbnMuQWN0aW9uRmlsdGVyID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IGNmZztcblxuICAgICAgICB0aGlzLmNhY2hlSXRlbXMoKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICB9O1xuXG4gICAgbnMuQWN0aW9uRmlsdGVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgY2FjaGVJdGVtczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcbiAgICAgICAgICAgICAgICBjYWNoZSA9IHNldHRpbmdzLmNhY2hlLFxuICAgICAgICAgICAgICAgIGRhdGEgPSBzZXR0aW5ncy5kYXRhO1xuXG4gICAgICAgICAgICAvLyBCYXNlXG4gICAgICAgICAgICB0aGlzLmh0bWxCb2R5ID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICAgICAgdGhpcy5tYXAgPSAkKGNhY2hlLmdvb2dsZW1hcCk7XG5cbiAgICAgICAgICAgIC8vIEZpbHRlcnNcbiAgICAgICAgICAgIHRoaXMuZGF0ZUlucHV0ID0gdGhpcy5jb250YWluZXIuZmluZChjYWNoZS5kYXRlSW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5kYXRlTWluSW5wdXQgPSB0aGlzLmNvbnRhaW5lci5maW5kKGNhY2hlLmRhdGVNaW5JbnB1dCk7XG4gICAgICAgICAgICB0aGlzLmRhdGVNYXhJbnB1dCA9IHRoaXMuY29udGFpbmVyLmZpbmQoY2FjaGUuZGF0ZU1heElucHV0KTtcbiAgICAgICAgICAgIHRoaXMuYnRuQ2xlYXIgPSB0aGlzLmNvbnRhaW5lci5maW5kKGNhY2hlLmJ0bkNsZWFyKTtcblxuICAgICAgICAgICAgLy9BY3Rpb25zXG4gICAgICAgICAgICB0aGlzLmZpcnN0QWN0aW9uRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RBY3Rpb25EYXRlID0gbmV3IERhdGUoJzEvMS8yMDE3Jyk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSB0aGlzLmNvbnRhaW5lci5maW5kKGNhY2hlLmFjdGlvbik7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbk1hcmtlcnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uRGF0YSA9IHRoaXMuYWN0aW9ucy5lcShpKS5kYXRhKGRhdGEuYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkRhdGEuaGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uQ2xpY2tIYW5kbGVyKHRoaXMuYWN0aW9ucy5lcShpKSwgdGhpcy5hY3Rpb25NYXJrZXJzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uRGF0YS5pZCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkRhdGEuZWxlbWVudCA9IHRoaXMuYWN0aW9ucy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25NYXJrZXJzLnB1c2goYWN0aW9uRGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShhY3Rpb25EYXRhLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZSA8IHRoaXMuZmlyc3RBY3Rpb25EYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0QWN0aW9uRGF0ZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZSA+IHRoaXMubGFzdEFjdGlvbkRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEFjdGlvbkRhdGUgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cztcblxuICAgICAgICAgICAgdGhpcy5idG5DbGVhci5vbihldmVudHMuY2xpY2ssICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVNaW5JbnB1dC5kYXRlcGlja2VyKCd1cGRhdGUnLCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlTWF4SW5wdXQuZGF0ZXBpY2tlcigndXBkYXRlJywgJycpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZU1pbklucHV0Lm9uKGV2ZW50cy5jaGFuZ2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZU1heElucHV0Lm9uKGV2ZW50cy5jaGFuZ2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5tYXAub24oZXZlbnRzLmJvdW5kc3VwZGF0ZWQsIF8uZGVib3VuY2UoKGUsIHBhcmFtcykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJvdW5kcyA9IHBhcmFtcztcbiAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyKCk7XG4gICAgICAgICAgICB9LCAzMDApKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWN0aW9uQ2xpY2tIYW5kbGVyOiBmdW5jdGlvbiAoYWN0aW9uRWxlbWVudCwgYWN0aW9uTWFya2VyKSB7XG4gICAgICAgICAgICB0aGlzLmh0bWxCb2R5LmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogYWN0aW9uRWxlbWVudC5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cyxcbiAgICAgICAgICAgICAgICBkYXRhID0gc2V0dGluZ3MuZGF0YTtcblxuICAgICAgICAgICAgLy8gUGxhY2UgaW5pdGlhbCBtYXJrZXJzXG4gICAgICAgICAgICB0aGlzLm1hcC50cmlnZ2VyKGV2ZW50cy5wbGFjZU1hcmtlcnNBbmRGaXQsIHtcbiAgICAgICAgICAgICAgICBtYXJrZXJzOiB0aGlzLmFjdGlvbk1hcmtlcnNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBJbml0IGZpbHRlcnNcbiAgICAgICAgICAgIC8vIEluaXQgZGF0ZXBpY2tlcnNcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge307XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHNldHRpbmdzLmRhdGVwaWNrZXJPcHRpb25zLCB7XG4gICAgICAgICAgICAgICAgaW5wdXRzOiAkKCkuYWRkKHRoaXMuZGF0ZU1pbklucHV0KS5hZGQodGhpcy5kYXRlTWF4SW5wdXQpLFxuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5maXJzdEFjdGlvbkRhdGUsXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogdGhpcy5sYXN0QWN0aW9uRGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJJbnN0YW5jZSA9IHRoaXMuZGF0ZUlucHV0LmRhdGVwaWNrZXIob3B0aW9ucyk7XG4gICAgICAgIH0sXG4gICAgICAgIGRvRmlsdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgYWN0aW9uTWFya2VycyA9IHRoaXMuYWN0aW9uTWFya2VycztcblxuICAgICAgICAgICAgbGV0IG1pbkRhdGUgPSB0aGlzLmRhdGVNaW5JbnB1dC5kYXRlcGlja2VyKCdnZXRVVENEYXRlJyk7XG4gICAgICAgICAgICBsZXQgbWF4RGF0ZSA9IHRoaXMuZGF0ZU1heElucHV0LmRhdGVwaWNrZXIoJ2dldFVUQ0RhdGUnKTtcblxuICAgICAgICAgICAgYWN0aW9uTWFya2VycyA9IHRoaXMuZmlsdGVyTG9jYXRpb24odGhpcy5jdXJyZW50Qm91bmRzLCBhY3Rpb25NYXJrZXJzKTtcbiAgICAgICAgICAgIGlmIChtaW5EYXRlIHx8IG1heERhdGUpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25NYXJrZXJzID0gdGhpcy5maWx0ZXJEYXRlcyhtaW5EYXRlLCBtYXhEYXRlLCBhY3Rpb25NYXJrZXJzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50b2dnbGVWaXNpYmxpdHlBY3Rpb25zKGFjdGlvbk1hcmtlcnMpO1xuICAgICAgICB9LFxuICAgICAgICBmaWx0ZXJMb2NhdGlvbjogZnVuY3Rpb24gKGJvdW5kc09iamVjdCwgYWN0aW9ucykge1xuICAgICAgICAgICAgZnVuY3Rpb24gZmlsdGVyTWV0aG9kKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnBvc2l0aW9uLmxhdCA+PSBib3VuZHNPYmplY3Quc291dGggJiZcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnBvc2l0aW9uLmxhdCA8PSBib3VuZHNPYmplY3Qubm9ydGhcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTGF0aXR1ZGUgbWF0Y2hlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucG9zaXRpb24ubG5nID49IGJvdW5kc09iamVjdC53ZXN0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucG9zaXRpb24ubG5nIDw9IGJvdW5kc09iamVjdC5lYXN0XG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9ucy5maWx0ZXIoZmlsdGVyTWV0aG9kKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyRGF0ZXM6IGZ1bmN0aW9uIChtaW5EYXRlLCBtYXhEYXRlLCBhY3Rpb25zKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBmaWx0ZXJNZXRob2QoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShhY3Rpb24uZGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAoIW1heERhdGUgJiYgbWluRGF0ZSAmJiBkYXRlID49IG1pbkRhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICghbWluRGF0ZSAmJiBtYXhEYXRlICYmIGRhdGUgPD0gbWF4RGF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKG1pbkRhdGUgJiYgbWF4RGF0ZSAmJiBkYXRlID49IG1pbkRhdGUgJiYgZGF0ZSA8PSBtYXhEYXRlKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9ucy5maWx0ZXIoZmlsdGVyTWV0aG9kKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlVmlzaWJsaXR5QWN0aW9uczogZnVuY3Rpb24gKHRvU2hvd01hcmtlcnMpIHtcbiAgICAgICAgICAgIGxldCBhbGxNYXJrZXJzID0gdGhpcy5hY3Rpb25NYXJrZXJzO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE1hcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudE1hcmtlciA9IGFsbE1hcmtlcnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRvU2hvd01hcmtlcnMuaW5kZXhPZihjdXJyZW50TWFya2VyKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TWFya2VyKGN1cnJlbnRNYXJrZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1hcmtlcihjdXJyZW50TWFya2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dNYXJrZXI6IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgICAgIGxldCBjbGFzc2VzID0gdGhpcy5zZXR0aW5ncy5jbGFzc2VzO1xuXG4gICAgICAgICAgICBtYXJrZXIuZWxlbWVudC5zaG93KCk7XG4gICAgICAgICAgICBtYXJrZXIuZWxlbWVudC5yZW1vdmVDbGFzcyhjbGFzc2VzLmhpZGUpO1xuICAgICAgICB9LFxuICAgICAgICBoaWRlTWFya2VyOiBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgICAgICBsZXQgY2xhc3NlcyA9IHRoaXMuc2V0dGluZ3MuY2xhc3NlcztcblxuICAgICAgICAgICAgbWFya2VyLmVsZW1lbnQuYWRkQ2xhc3MoY2xhc3Nlcy5oaWRlKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1hcmtlci5lbGVtZW50LmhpZGUoKTtcbiAgICAgICAgICAgIH0sIDE4MCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5zO1xufSkod2luZG93LmpRdWVyeSwgd2luZG93Lkx1YmUgfHwge30sIHdpbmRvdy5fIHx8IHt9KTtcbiIsImZ1bmN0aW9uIGFzeW5jR29vZ2xlTWFwcygpIHt9XG4oZnVuY3Rpb24gKCQsIGdvb2dsZSwgbnMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgY2ZnID0ge1xuICAgICAgICBjYWNoZToge30sXG4gICAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzdGFydExvY2F0aW9uOiAnc3RhcnQtbG9jYXRpb24nLFxuICAgICAgICAgICAgZ2VvY29kZUNvdW50cnlCaWFzOiAnZ2VvY29kZS1jb3VudHJ5LWJpYXMnXG4gICAgICAgIH0sXG4gICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgIGNsaWNrOiAnY2xpY2snLFxuICAgICAgICAgICAgc2hvd246ICdzaG93bi5icy5tb2RhbCcsXG4gICAgICAgICAgICBkcmFnZW5kOiAnZHJhZ2VuZCcsXG4gICAgICAgICAgICByZXNpemU6ICdyZXNpemUnLFxuICAgICAgICAgICAgem9vbUNoYW5nZWQ6ICd6b29tX2NoYW5nZWQnLFxuICAgICAgICAgICAgYm91bmRzQ2hhbmdlZDogJ2JvdW5kc19jaGFuZ2VkJyxcbiAgICAgICAgICAgIG1hcExvYWRlZDogJ2dvb2dsZW1hcHMubG9hZGVkJyxcbiAgICAgICAgICAgIHBsYWNlTWFya2VyczogJ2dvb2dsZW1hcHMucGxhY2UtbWFya2VycycsXG4gICAgICAgICAgICBwbGFjZU1hcmtlcnNBbmRGaXQ6ICdnb29nbGVtYXBzLnBsYWNlLW1hcmtlcnMtZml0JyxcbiAgICAgICAgICAgIHBsYWNlTWFya2VyOiAnZ29vZ2xlbWFwcy5wbGFjZS1tYXJrZXInLFxuICAgICAgICAgICAgc2V0TWFya2VyQWN0aXZlOiAnZ29vZ2xlbWFwcy5zZXQtbWFya2VyLWFjdGl2ZScsXG4gICAgICAgICAgICBsb2NhdGlvblVwZGF0ZTogJ2dvb2dsZW1hcHMubG9jYXRpb24tdXBkYXRlJyxcbiAgICAgICAgICAgIGxvY2F0aW9uUGxhY2VkOiAnZ29vZ2xlbWFwcy5sb2NhdGlvbi1wbGFjZWQnLFxuICAgICAgICAgICAgbG9jYXRpb25FcnJvcjogJ2dvb2dsZW1hcHMubG9jYXRpb24tZXJyb3InLFxuICAgICAgICAgICAgYm91bmRzdXBkYXRlZDogJ2dvb2dsZW1hcHMuYm91bmRzLXVwZGF0ZSdcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgem9vbTogOCxcbiAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXG4gICAgICAgICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgICAgICAgIHpvb21Db250cm9sT3B0aW9uczoge30sXG4gICAgICAgICAgICAvL21pblpvb206IDUsXG4gICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdncmVlZHknLFxuICAgICAgICAgICAgc3R5bGVzOiBbe1xuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUuY291bnRyeVwiLFxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiI2ZmMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsLmxhbmRjb3ZlclwiLFxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsLnRlcnJhaW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC41MFwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC41XCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjVcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzUzYjJlMVwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHNjcmlwdHM6IHtcbiAgICAgICAgICAgIG1hcHM6ICcvL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/c2lnbmVkX2luPXRydWUmdj0zJmxpYnJhcmllcz1nZW9tZXRyeSZrZXk9QUl6YVN5RDhTX1lOX1A0OXBLTUIyR1dLLXVFbHZmOFdnM1hyY2s4JmNhbGxiYWNrPWFzeW5jR29vZ2xlTWFwcycsXG4gICAgICAgICAgICBpbmZvQm94OiAnZGVzaWduL2pzL3ZlbmRvci9nb29nbGVtYXBzL2luZm9ib3gubWluLmpzJ1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIG5zLkdvb2dsZU1hcHMgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gY2ZnO1xuXG4gICAgICAgIHRoaXMuY2FjaGVJdGVtcygpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfTtcblxuICAgIG5zLkdvb2dsZU1hcHMucHJvdG90eXBlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgICAgICAgIHNjcmlwdHMgPSBzZXR0aW5ncy5zY3JpcHRzLFxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cyxcbiAgICAgICAgICAgICAgICBkYXRhID0gc2V0dGluZ3MuZGF0YTtcblxuICAgICAgICAgICAgdGhpcy5tYXJrZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVDb3VudHJ5QmlhcyA9IHRoaXMuY29udGFpbmVyLmRhdGEoZGF0YS5nZW9jb2RlQ291bnRyeUJpYXMpIHx8ICdCRSc7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ29vZ2xlICYmIGdvb2dsZS5oYXNPd25Qcm9wZXJ0eSgnbWFwcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2NyaXB0cyhzY3JpcHRzLCB0aGlzLmluaXQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYWNoZUl0ZW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgICAgICAgIGNhY2hlID0gc2V0dGluZ3MuY2FjaGU7XG5cbiAgICAgICAgICAgIHRoaXMubWFwID0gdGhpcy5jb250YWluZXIuY2hpbGRyZW4oKS5maXJzdCgpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZXN0TW9kYWwgPSB0aGlzLmNvbnRhaW5lci5jbG9zZXN0KGNhY2hlLm1vZGFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcbiAgICAgICAgICAgICAgICBldmVudHMgPSBzZXR0aW5ncy5ldmVudHM7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm9uKGV2ZW50cy5wbGFjZU1hcmtlcnMsIChlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5tYXJrZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuSWZMb2FkZWQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZU1hcmtlckFycmF5KHBhcmFtcy5tYXJrZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm9uKGV2ZW50cy5wbGFjZU1hcmtlcnNBbmRGaXQsIChlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5tYXJrZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuSWZMb2FkZWQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZU1hcmtlckFycmF5KHBhcmFtcy5tYXJrZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvTWFya2VycygpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCh3aW5kb3cuRG9tKS5vbihldmVudHMucmVzaXplLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUmVjYWxjdWxhdGUgbWFwIG9uIHJlc2l6ZSBvZiB0aGUgd2luZG93XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLmhlaWdodCh0aGlzLmNvbnRhaW5lci5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZXR1cm5JZkxvYWRlZDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cztcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5vbihldmVudHMubWFwTG9hZGVkLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBsYWNlTWFya2VyQXJyYXk6IGZ1bmN0aW9uIChtYXJrZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTWFya2VycygpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBtYXJrZXJzW2ldLklzQWN0aXZlID8gJ2FjdGl2ZScgOiAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZU1hcmtlcihcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1tpXS5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1tpXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1tpXS5oYW5kbGVyXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYmluZE1hcEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcbiAgICAgICAgICAgICAgICBldmVudHMgPSBzZXR0aW5ncy5ldmVudHM7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuYWRkTGlzdGVuZXIoZXZlbnRzLmJvdW5kc0NoYW5nZWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0xvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci50cmlnZ2VyKGV2ZW50cy5ib3VuZHN1cGRhdGVkLCB0aGlzLmluc3RhbmNlLmdldEJvdW5kcygpLnRvSlNPTigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgZXZlbnRzID0gc2V0dGluZ3MuZXZlbnRzO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMubWFwLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwRWxlbWVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuYmluZE1hcEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIudHJpZ2dlcihldmVudHMubWFwTG9hZGVkKTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTY3JpcHRzOiBmdW5jdGlvbiAoc2NyaXB0cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihuLCB0LCBzY3JpcHRzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNjcmlwdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkLmdldFNjcmlwdChzY3JpcHRzLm1hcHMpXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBnb29nbGUgPSB3aW5kb3cuZ29vZ2xlIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZhaWwoZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlTWFwRWxlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5tYXAgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgdGhpcy5tYXAuaGVpZ2h0KHRoaXMuY29udGFpbmVyLm91dGVySGVpZ2h0KCkpO1xuICAgICAgICAgICAgdGhpcy5tYXAud2lkdGgoJzEwMCUnKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLm1hcCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlck1hcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gc2V0dGluZ3Mub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBkYXRhID0gc2V0dGluZ3MuZGF0YSxcbiAgICAgICAgICAgICAgICBzdGFydExvY2F0aW9uID0gdGhpcy5jb250YWluZXIuZGF0YShkYXRhLnN0YXJ0TG9jYXRpb24pIHx8IFs1MC44NjI2NTEsIDQuMzYxNDA4XSxcbiAgICAgICAgICAgICAgICBtYXAgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucywge1xuICAgICAgICAgICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoc3RhcnRMb2NhdGlvblswXSwgc3RhcnRMb2NhdGlvblsxXSksXG4gICAgICAgICAgICAgICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXG4gICAgICAgICAgICAgICAgICAgIHpvb21Db250cm9sT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5UT1BfTEVGVFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLm1hcC5nZXQoMCksIG1hcCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdlb2NvZGVBZGRyZXNzOiBmdW5jdGlvbiAoYWRkcmVzcywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZVBvc3RhbENvZGUoYWRkcmVzcywgbG9jYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW9jb2RlQ2l0eShhZGRyZXNzLCBsb2NhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0dlb2NvZGUgd2FzIG5vdCBzdWNjZXNzZnVsIGZvciB0aGUgZm9sbG93aW5nIHJlYXNvbjogJyArIHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIudHJpZ2dlcih0aGlzLnNldHRpbmdzLmV2ZW50cy5sb2NhdGlvbkVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhsb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdlb2NvZGVQb3N0YWxDb2RlOiBmdW5jdGlvbiAocG9zdGFsQ29kZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeTogdGhpcy5nZW9jb2RlQ291bnRyeUJpYXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0YWxDb2RlOiBwb3N0YWxDb2RlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSAnT0snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2VvY29kZUNpdHk6IGZ1bmN0aW9uIChjaXR5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5nZW9jb2Rlci5nZW9jb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50UmVzdHJpY3Rpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmdlb2NvZGVDb3VudHJ5Qmlhc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gJ09LJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyTWFya2VyczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcnNbaV0uc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXJrZXJzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRMb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VNYXJrZXIodGhpcy5jdXJyZW50TG9jYXRpb24sICdsb2NhdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwbGFjZU1hcmtlcjogZnVuY3Rpb24gKHBvc2l0aW9uLCB0eXBlLCBpZCwgaGFuZGxlcikge1xuICAgICAgICAgICAgLy92YXIgbWFya2VyU2hhcGUgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyU2hhcGUoKTtcblxuICAgICAgICAgICAgdmFyIG1hcmtlck9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgbWFwOiB0aGlzLmluc3RhbmNlLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGlkICYmIGlkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG1hcmtlck9iamVjdC5pZCA9IGlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgICAgICAgICAgbWFya2VyT2JqZWN0LnpJbmRleCA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hcmtlck9iamVjdC56SW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGxhY2VkTWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcihtYXJrZXJPYmplY3QpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VkTWFya2VyLmFkZExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1hcmtlcnMucHVzaChwbGFjZWRNYXJrZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHBsYWNlZE1hcmtlcjtcbiAgICAgICAgfSxcbiAgICAgICAgem9vbVRvTWFya2VyczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm91bmRzLmV4dGVuZCh0aGlzLm1hcmtlcnNbaV0uZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuZml0Qm91bmRzKGJvdW5kcyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5zO1xufSkod2luZG93LmpRdWVyeSwgd2luZG93Lmdvb2dsZSB8fCB1bmRlZmluZWQsIHdpbmRvdy5MdWJlIHx8IHt9KTtcbiIsIihmdW5jdGlvbiAoJCwgbnMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBucy5jbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfTtcblxuICAgIG5zLm1vZHVsZXMgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIG5zLmRhdGFDb21wb25lbnRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChyb290RWxlbWVudCkge1xuICAgICAgICBsZXQgZGF0YUNvbXBvbmVudHMgPVxuICAgICAgICAgICAgcm9vdEVsZW1lbnQgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICAkKCdbZGF0YS1jb21wb25lbnRdJykgOlxuICAgICAgICAgICAgcm9vdEVsZW1lbnQuZmluZCgnW2RhdGEtY29tcG9uZW50XScpLmFkZEJhY2soJ1tkYXRhLWNvbXBvbmVudF0nKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFDb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGF0YUNvbXBvbmVudCA9IGRhdGFDb21wb25lbnRzLmVxKGkpLFxuICAgICAgICAgICAgICAgIGRhdGFBdHRyID0gZGF0YUNvbXBvbmVudC5kYXRhKCdjb21wb25lbnQnKTtcbiAgICAgICAgICAgIGRhdGFBdHRyID0gZGF0YUF0dHIuc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgaWYgKGRhdGFBdHRyLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudEZ1bmN0aW9uID0gbnNbZGF0YUF0dHJbMV1dO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGNvbXBvbmVudEZ1bmN0aW9uIGV4aXN0cyxcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50RnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5pdCBpdCBpZiBpdCBkb2VzXG4gICAgICAgICAgICAgICAgICAgIG5ldyBjb21wb25lbnRGdW5jdGlvbihkYXRhQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG5zLmNsYXNzZXMoKTtcbiAgICAgICAgbnMubW9kdWxlcygpO1xuICAgICAgICBucy5kYXRhQ29tcG9uZW50SW5pdGlhbGl6ZXIoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJC5yZWFkeS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQod2luZG93Lkx1YmUpLnRyaWdnZXIoJ2xvYWQnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuTHViZSA9IG5zO1xufSkod2luZG93LmpRdWVyeSwgd2luZG93Lkx1YmUgfHwge30pO1xuIl19
