'use strict';

window.Lube = function (ns) {
    'use strict';

    var cfg = {
        cache: {},
        classes: {
            scrolling: 'scrolling',
            show: 'show'
        },
        events: {
            scroll: 'scroll',
            click: 'click'
        }
    };

    ns.Dom = {
        init: function init() {
            this.windowsPhoneViewportFix();
            this.bindScrollTopEvent();
            this.bindDataHref();
            this.dataToggle();
            this.asyncImageLoading();
            this.initAnimations();
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
        bindScrollTopEvent: function bindScrollTopEvent() {
            document.querySelectorAll('a[href="#top"]').forEach(function (link) {
                return link.addEventListener('click', function () {
                    window.scrollTo(0, 0);
                    return false;
                });
            });
        },
        bindDataHref: function bindDataHref() {
            document.querySelectorAll('[data-href]').forEach(function (link) {
                link.addEventListener('click', function (e) {
                    if (!e.currentTarget.matches('a')) {
                        window.location = link.dataset.href;
                        return false;
                    }
                });
                link.addEventListener('mousedown', function (e) {
                    if (!e.currentTarget.matches('a')) {
                        window.open(link.dataset.href, '_blank');
                        return false;
                    }
                });
            });
        },
        dataToggle: function dataToggle() {
            var settings = cfg,
                events = settings.events,
                classes = settings.classes;

            document.querySelectorAll('[data-toggle]').forEach(function (clickTarget) {
                var target = clickTarget.dataset.target;
                if (!target || !target.length) {
                    target = clickTarget.dataset.toggle;
                    if (!target || !target.length) {
                        return;
                    }
                }

                target = document.querySelectorAll(target);
                var singleTarget = target[0];

                clickTarget.addEventListener(events.click, function (e) {
                    var clickElement = e.currentTarget;

                    ns.fn.toggleAttributeValue(clickElement, 'aria-expanded');

                    var currentHeight = singleTarget.offsetHeight;
                    // Disable transition
                    ns.fn.removeClass(singleTarget, 'animate-on-height');
                    // Force last state
                    singleTarget.style.height = '';
                    if (ns.fn.toggleClass(target, classes.show)) {
                        ns.fn.addClass(target, 'show-in');
                    } else {
                        ns.fn.addClass(target, 'show-out');
                    }

                    // Get last state
                    var futureHeight = singleTarget.offsetHeight;
                    // Force first state
                    ns.fn.toggleClass(target, classes.show);
                    singleTarget.style.height = currentHeight + 'px';

                    setTimeout(function () {
                        // Enable transition
                        ns.fn.addClass(singleTarget, 'animate-on-height');
                        // Set last state
                        singleTarget.style.height = futureHeight + 'px';

                        ns.fn.toggleClass(target, classes.show);

                        setTimeout(function () {
                            ns.fn.removeClass(target, 'show-out');
                            ns.fn.removeClass(target, 'show-in');
                        }, 400);
                    }), 50;
                });
            });
        },
        asyncImageLoading: function asyncImageLoading() {
            document.querySelectorAll('img[data-src]').forEach(ns.fn.loadImageAsync);
        },
        initAnimations: function initAnimations() {
            var onLoad = function onLoad() {
                document.getElementsByTagName('body')[0].classList.add('page-loaded');
            };

            if (window.addEventListener) {
                window.addEventListener('load', onLoad);
            } else {
                window.attachEvent('onload', onLoad);
            }
        }
    };

    return ns;
}(window.Lube || {});

/**
 * @author       [Stef Coenen]
 * @date         [2016]
 * @namespace    [Lube.fn]
 * @type         [Functions]
 * @requires     [Lube]
 * @revision     [0.1]
 */

// @param (ns): window.Lube
window.Lube = function (ns) {
    // 1. ECMA-262/5
    'use strict';

    // 3. FUNCTIONS OBJECT

    ns.fn = {
        loadImageAsync: function loadImageAsync(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.setAttribute('data-async-loaded', '');
            img.onload = function () {
                img.removeAttribute('data-src');
            };
        },

        hide: function hide(element) {
            if (element.constructor == Array || element.constructor == NodeList) {
                for (var i = 0; i < element.length; i++) {
                    this.hide(element[i]);
                }
                return;
            }

            if (element && element.style && element.style.display !== undefined) {
                element.style.display = 'none';
            }
        },

        show: function show(element) {
            if (element.constructor == Array || element.constructor == NodeList) {
                for (var i = 0; i < element.length; i++) {
                    this.show(element[i]);
                }
                return;
            }

            if (element && element.style && element.style.display !== undefined) {
                element.style.display = 'block';
            }
        },

        addClass: function addClass(element, cssClass) {
            if (element.constructor == Array || element.constructor == NodeList) {
                for (var i = 0; i < element.length; i++) {
                    this.addClass(element[i], cssClass);
                }
                return;
            }

            element.classList.add(cssClass);
        },

        toggleClass: function toggleClass(element, cssClass) {
            if (element.constructor == Array || element.constructor == NodeList) {
                var returnValue = void 0;
                for (var i = 0; i < element.length; i++) {
                    returnValue = this.toggleClass(element[i], cssClass);
                }
                return returnValue;
            }

            if (element.classList.contains(cssClass)) {
                this.removeClass(element, cssClass);
                return false;
            } else {
                this.addClass(element, cssClass);
                return true;
            }
        },

        removeClass: function removeClass(element, cssClass) {
            if (element.constructor == Array || element.constructor == NodeList) {
                for (var i = 0; i < element.length; i++) {
                    this.removeClass(element[i], cssClass);
                }
                return;
            }

            element.classList.remove(cssClass);
        },

        toggleAttribute: function toggleAttribute(element, attribute) {
            element[element.getAttribute(attribute) ? 'removeAttribute' : 'setAttribute'](attribute, '');
        },

        toggleAttributeValue: function toggleAttributeValue(element, attribute) {
            element.setAttribute(attribute, !(element.getAttribute(attribute) === 'true'));
        },

        closest: function closest(element, selector) {
            if (!element || !selector) {
                return [];
            }

            if (element.constructor == Array || element.constructor == NodeList) {
                var matchingElements = [];
                for (var i = 0; i < element.length; i++) {
                    matchingElements = matchingElements.concat(this.closest(element[i], selector));
                }

                return matchingElements;
            }

            return element.closest(selector);
        },

        renderTemplate: function renderTemplate(obj, template) {
            return template.replace(/{{(\w*)}}/g, // or /{(\w*)}/g for "{this} instead of %this%"
            function (m, key) {
                return obj.hasOwnProperty(key) && obj[key] ? obj[key] : '';
            });
        }
    };

    // 4. NAMESPACE
    return ns;
}(window.Lube || {});

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

/**
 * [window.Lube]
 *
 * @author       [Stef Coenen]
 * @date         [2017]
 * @namespace    [Lube]
 * @requires     [jQuery]
 * @revision     [0.1]
 */

window.Lube = function (ns) {
    // 1. ECMA-262/5
    'use strict';

    // 2. LOAD COMPONENTS

    ns.components = function () {
        ns.Dom.init();
    };

    // 3. LOAD DATACOMPONENTS
    ns.dataComponentInitializer = function () {
        var dataComponents = document.querySelectorAll('[data-component]');
        for (var i = 0; i < dataComponents.length; i++) {
            var dataComponent = dataComponents[i];
            var dataAttr = dataComponent.dataset.component;
            dataAttr = dataAttr.split('.');

            if (dataAttr.length >= 2) {
                var componentFunction = ns[dataAttr[1]];
                if (componentFunction) {
                    new componentFunction(dataComponent);
                }
            }
        }
    };

    // 4. ONCE THE DOM IS READY
    ns.components();
    ns.dataComponentInitializer();

    // 5. TRIGGER LOAD EVENT ON NS
    // This is required as of jQuery 3.0 as jQuery no longer
    //   supports load event binding form inside a ready event handler
    // window.addEventListener(
    //     'load',
    //     function() {
    //         $.ready.then(function() {
    //             $(ns).trigger('load');
    //         });
    //     },
    //     false
    // );

    // // 6. REGISTER SW
    // if ('serviceWorker' in navigator) {
    //     // Register a service worker hosted at the root of the
    //     // site using the default scope.
    //     navigator.serviceWorker
    //         .register('/app/sw.js')
    //         .then(function(registration) {
    //             console.info('Service worker registration succeeded:', registration);
    //             registration.update();
    //         })
    //         .catch(function(error) {
    //             console.info('Service worker registration failed:', error);
    //         });
    // } else {
    //     console.info('Service workers are not supported.');
    // }

    // 8. GLOBALIZE NAMESPACE
    return ns;
}(window.Lube || {});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImx1YmUuZG9tLmpzIiwibHViZS5mbi5qcyIsImx1YmUuYWN0aW9uZmlsdGVyLmpzIiwibHViZS5nb29nbGVtYXBzLmpzIiwibHViZS5zdHJhcG9uLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIkx1YmUiLCJucyIsImNmZyIsImNhY2hlIiwiY2xhc3NlcyIsInNjcm9sbGluZyIsInNob3ciLCJldmVudHMiLCJzY3JvbGwiLCJjbGljayIsIkRvbSIsImluaXQiLCJ3aW5kb3dzUGhvbmVWaWV3cG9ydEZpeCIsImJpbmRTY3JvbGxUb3BFdmVudCIsImJpbmREYXRhSHJlZiIsImRhdGFUb2dnbGUiLCJhc3luY0ltYWdlTG9hZGluZyIsImluaXRBbmltYXRpb25zIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJtc1ZpZXdwb3J0U3R5bGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwibGluayIsImFkZEV2ZW50TGlzdGVuZXIiLCJzY3JvbGxUbyIsImUiLCJjdXJyZW50VGFyZ2V0IiwibWF0Y2hlcyIsImxvY2F0aW9uIiwiZGF0YXNldCIsImhyZWYiLCJvcGVuIiwic2V0dGluZ3MiLCJ0YXJnZXQiLCJjbGlja1RhcmdldCIsImxlbmd0aCIsInRvZ2dsZSIsInNpbmdsZVRhcmdldCIsImNsaWNrRWxlbWVudCIsImZuIiwidG9nZ2xlQXR0cmlidXRlVmFsdWUiLCJjdXJyZW50SGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwicmVtb3ZlQ2xhc3MiLCJzdHlsZSIsImhlaWdodCIsInRvZ2dsZUNsYXNzIiwiYWRkQ2xhc3MiLCJmdXR1cmVIZWlnaHQiLCJzZXRUaW1lb3V0IiwibG9hZEltYWdlQXN5bmMiLCJvbkxvYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNsYXNzTGlzdCIsImFkZCIsImF0dGFjaEV2ZW50IiwiaW1nIiwic2V0QXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwib25sb2FkIiwicmVtb3ZlQXR0cmlidXRlIiwiaGlkZSIsImVsZW1lbnQiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiTm9kZUxpc3QiLCJpIiwiZGlzcGxheSIsInVuZGVmaW5lZCIsImNzc0NsYXNzIiwicmV0dXJuVmFsdWUiLCJjb250YWlucyIsInJlbW92ZSIsInRvZ2dsZUF0dHJpYnV0ZSIsImF0dHJpYnV0ZSIsImNsb3Nlc3QiLCJzZWxlY3RvciIsIm1hdGNoaW5nRWxlbWVudHMiLCJjb25jYXQiLCJyZW5kZXJUZW1wbGF0ZSIsIm9iaiIsInRlbXBsYXRlIiwicmVwbGFjZSIsIm0iLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIiQiLCJfIiwiZ29vZ2xlbWFwIiwiYWN0aW9uIiwiZGF0ZUlucHV0IiwiZGF0ZU1pbklucHV0IiwiZGF0ZU1heElucHV0IiwiYnRuQ2xlYXIiLCJkYXRhIiwiYXR0cmlidXRlcyIsImNoYW5nZSIsIm1hcExvYWRlZCIsInBsYWNlTWFya2VycyIsInBsYWNlTWFya2Vyc0FuZEZpdCIsInBsYWNlTWFya2VyIiwic2V0TWFya2VyQWN0aXZlIiwibG9jYXRpb25VcGRhdGUiLCJsb2NhdGlvblBsYWNlZCIsImxvY2F0aW9uRXJyb3IiLCJib3VuZHN1cGRhdGVkIiwiZGF0ZXBpY2tlck9wdGlvbnMiLCJmb3JtYXQiLCJ3ZWVrU3RhcnQiLCJrZWVwRW1wdHlWYWx1ZXMiLCJBY3Rpb25GaWx0ZXIiLCJjb250YWluZXIiLCJjYWNoZUl0ZW1zIiwiYmluZEV2ZW50cyIsImFjdGl2YXRlIiwicHJvdG90eXBlIiwiaHRtbEJvZHkiLCJtYXAiLCJmaW5kIiwiZmlyc3RBY3Rpb25EYXRlIiwiRGF0ZSIsImxhc3RBY3Rpb25EYXRlIiwiYWN0aW9ucyIsImFjdGlvbk1hcmtlcnMiLCJhY3Rpb25EYXRhIiwiZXEiLCJoYW5kbGVyIiwiYWN0aW9uQ2xpY2tIYW5kbGVyIiwiaWQiLCJwdXNoIiwiZGF0ZSIsIm9uIiwiZGF0ZXBpY2tlciIsImRvRmlsdGVyIiwiZGVib3VuY2UiLCJwYXJhbXMiLCJjdXJyZW50Qm91bmRzIiwiYWN0aW9uRWxlbWVudCIsImFjdGlvbk1hcmtlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJ0cmlnZ2VyIiwibWFya2VycyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJpbnB1dHMiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiZGF0ZVBpY2tlckluc3RhbmNlIiwibWluRGF0ZSIsIm1heERhdGUiLCJmaWx0ZXJMb2NhdGlvbiIsImZpbHRlckRhdGVzIiwidG9nZ2xlVmlzaWJsaXR5QWN0aW9ucyIsImJvdW5kc09iamVjdCIsImZpbHRlck1ldGhvZCIsInBvc2l0aW9uIiwibGF0Iiwic291dGgiLCJub3J0aCIsImxuZyIsIndlc3QiLCJlYXN0IiwiZmlsdGVyIiwidG9TaG93TWFya2VycyIsImFsbE1hcmtlcnMiLCJjdXJyZW50TWFya2VyIiwiaW5kZXhPZiIsInNob3dNYXJrZXIiLCJoaWRlTWFya2VyIiwibWFya2VyIiwialF1ZXJ5IiwiYXN5bmNHb29nbGVNYXBzIiwiZ29vZ2xlIiwic3RhcnRMb2NhdGlvbiIsImdlb2NvZGVDb3VudHJ5QmlhcyIsInNob3duIiwiZHJhZ2VuZCIsInJlc2l6ZSIsInpvb21DaGFuZ2VkIiwiYm91bmRzQ2hhbmdlZCIsInpvb20iLCJkaXNhYmxlRGVmYXVsdFVJIiwiem9vbUNvbnRyb2wiLCJ6b29tQ29udHJvbE9wdGlvbnMiLCJnZXN0dXJlSGFuZGxpbmciLCJzdHlsZXMiLCJzY3JpcHRzIiwibWFwcyIsImluZm9Cb3giLCJHb29nbGVNYXBzIiwiZ2VvY29kZXIiLCJHZW9jb2RlciIsImdldFNjcmlwdHMiLCJiaW5kIiwiY2hpbGRyZW4iLCJmaXJzdCIsImNsb3Nlc3RNb2RhbCIsIm1vZGFsIiwicmV0dXJuSWZMb2FkZWQiLCJwbGFjZU1hcmtlckFycmF5Iiwiem9vbVRvTWFya2VycyIsIm91dGVySGVpZ2h0IiwiY2FsbGJhY2siLCJpc0xvYWRlZCIsImNsZWFyTWFya2VycyIsInR5cGUiLCJJc0FjdGl2ZSIsImJpbmRNYXBFdmVudHMiLCJpbnN0YW5jZSIsImFkZExpc3RlbmVyIiwiZ2V0Qm91bmRzIiwidG9KU09OIiwiY3JlYXRlTWFwRWxlbWVudCIsInJlbmRlck1hcCIsImVycm9ySGFuZGxlciIsIm4iLCJ0IiwiRXJyb3IiLCJnZXRTY3JpcHQiLCJkb25lIiwiZmFpbCIsIndpZHRoIiwiYXBwZW5kIiwiZXh0ZW5kIiwiY2VudGVyIiwiTGF0TG5nIiwibWFwVHlwZUlkIiwiTWFwVHlwZUlkIiwiUk9BRE1BUCIsIkNvbnRyb2xQb3NpdGlvbiIsIlRPUF9MRUZUIiwiTWFwIiwiZ2V0IiwiZ2VvY29kZUFkZHJlc3MiLCJhZGRyZXNzIiwiZ2VvY29kZVBvc3RhbENvZGUiLCJnZW9jb2RlQ2l0eSIsImNvbnNvbGUiLCJlcnJvciIsInN0YXR1cyIsInBvc3RhbENvZGUiLCJnZW9jb2RlIiwiY29tcG9uZW50UmVzdHJpY3Rpb25zIiwiY291bnRyeSIsInJlc3VsdHMiLCJnZW9tZXRyeSIsImNpdHkiLCJzZXRNYXAiLCJjdXJyZW50TG9jYXRpb24iLCJtYXJrZXJPYmplY3QiLCJ6SW5kZXgiLCJwbGFjZWRNYXJrZXIiLCJNYXJrZXIiLCJib3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJnZXRQb3NpdGlvbiIsImZpdEJvdW5kcyIsImNvbXBvbmVudHMiLCJkYXRhQ29tcG9uZW50SW5pdGlhbGl6ZXIiLCJkYXRhQ29tcG9uZW50cyIsImRhdGFDb21wb25lbnQiLCJkYXRhQXR0ciIsImNvbXBvbmVudCIsInNwbGl0IiwiY29tcG9uZW50RnVuY3Rpb24iXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQUFDLElBQUEsR0FBQSxVQUFBQyxFQUFBLEVBQUE7QUFDQTs7QUFFQSxRQUFBQyxNQUFBO0FBQ0FDLGVBQUEsRUFEQTtBQUVBQyxpQkFBQTtBQUNBQyx1QkFBQSxXQURBO0FBRUFDLGtCQUFBO0FBRkEsU0FGQTtBQU1BQyxnQkFBQTtBQUNBQyxvQkFBQSxRQURB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QUFBK1EsU0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLG9CQUFBRyxpQkFBQSxFQUFBO0FBQ0Esd0JBQUFBLGlCQUFBLENBQUFKLGFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQWRBOztBQWdCQTtBQUNBOVEsT0FBQTJRLFVBQUE7QUFDQTNRLE9BQUE0USx3QkFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFBNVEsRUFBQTtBQUNBLENBOURBLENBOERBRixPQUFBQyxJQUFBLElBQUEsRUE5REEsQ0FBQSIsImZpbGUiOiJhcHBsaWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuTHViZSA9IChmdW5jdGlvbihucykge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBjZmcgPSB7XHJcbiAgICAgICAgY2FjaGU6IHt9LFxyXG4gICAgICAgIGNsYXNzZXM6IHtcclxuICAgICAgICAgICAgc2Nyb2xsaW5nOiAnc2Nyb2xsaW5nJyxcclxuICAgICAgICAgICAgc2hvdzogJ3Nob3cnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgc2Nyb2xsOiAnc2Nyb2xsJyxcclxuICAgICAgICAgICAgY2xpY2s6ICdjbGljaydcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG5zLkRvbSA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3dzUGhvbmVWaWV3cG9ydEZpeCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRTY3JvbGxUb3BFdmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmREYXRhSHJlZigpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFUb2dnbGUoKTtcclxuICAgICAgICAgICAgdGhpcy5hc3luY0ltYWdlTG9hZGluZygpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRBbmltYXRpb25zKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgd2luZG93c1Bob25lVmlld3BvcnRGaXg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBDb3B5cmlnaHQgMjAxNC0yMDE1IFR3aXR0ZXIsIEluYy5cclxuICAgICAgICAgICAgLy8gTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcclxuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0lFTW9iaWxlXFwvMTBcXC4wLykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtc1ZpZXdwb3J0U3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgbXNWaWV3cG9ydFN0eWxlLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdALW1zLXZpZXdwb3J0e3dpZHRoOmF1dG8haW1wb3J0YW50fScpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmFwcGVuZENoaWxkKG1zVmlld3BvcnRTdHlsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRTY3JvbGxUb3BFdmVudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZj1cIiN0b3BcIl0nKS5mb3JFYWNoKGxpbmsgPT5cclxuICAgICAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRGF0YUhyZWY6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ocmVmXScpLmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlLmN1cnJlbnRUYXJnZXQubWF0Y2hlcygnYScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGxpbmsuZGF0YXNldC5ocmVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZS5jdXJyZW50VGFyZ2V0Lm1hdGNoZXMoJ2EnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihsaW5rLmRhdGFzZXQuaHJlZiwgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YVRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IGNmZyxcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cyxcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBzZXR0aW5ncy5jbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlXScpLmZvckVhY2goY2xpY2tUYXJnZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGNsaWNrVGFyZ2V0LmRhdGFzZXQudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQgfHwgIXRhcmdldC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBjbGlja1RhcmdldC5kYXRhc2V0LnRvZ2dsZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCB8fCAhdGFyZ2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGxldCBzaW5nbGVUYXJnZXQgPSB0YXJnZXRbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgY2xpY2tUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudHMuY2xpY2ssIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGlja0VsZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5zLmZuLnRvZ2dsZUF0dHJpYnV0ZVZhbHVlKGNsaWNrRWxlbWVudCwgJ2FyaWEtZXhwYW5kZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRIZWlnaHQgPSBzaW5nbGVUYXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERpc2FibGUgdHJhbnNpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIG5zLmZuLnJlbW92ZUNsYXNzKHNpbmdsZVRhcmdldCwgJ2FuaW1hdGUtb24taGVpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yY2UgbGFzdCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZVRhcmdldC5zdHlsZS5oZWlnaHQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAobnMuZm4udG9nZ2xlQ2xhc3ModGFyZ2V0LCBjbGFzc2VzLnNob3cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5zLmZuLmFkZENsYXNzKHRhcmdldCwgJ3Nob3ctaW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucy5mbi5hZGRDbGFzcyh0YXJnZXQsICdzaG93LW91dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGxhc3Qgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZnV0dXJlSGVpZ2h0ID0gc2luZ2xlVGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGb3JjZSBmaXJzdCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIG5zLmZuLnRvZ2dsZUNsYXNzKHRhcmdldCwgY2xhc3Nlcy5zaG93KTtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVUYXJnZXQuc3R5bGUuaGVpZ2h0ID0gY3VycmVudEhlaWdodCArICdweCc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbmFibGUgdHJhbnNpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBucy5mbi5hZGRDbGFzcyhzaW5nbGVUYXJnZXQsICdhbmltYXRlLW9uLWhlaWdodCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgbGFzdCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVUYXJnZXQuc3R5bGUuaGVpZ2h0ID0gZnV0dXJlSGVpZ2h0ICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5zLmZuLnRvZ2dsZUNsYXNzKHRhcmdldCwgY2xhc3Nlcy5zaG93KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnMuZm4ucmVtb3ZlQ2xhc3ModGFyZ2V0LCAnc2hvdy1vdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5zLmZuLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3Nob3ctaW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICA1MDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jSW1hZ2VMb2FkaW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nW2RhdGEtc3JjXScpLmZvckVhY2gobnMuZm4ubG9hZEltYWdlQXN5bmMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdEFuaW1hdGlvbnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb25Mb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5jbGFzc0xpc3QuYWRkKCdwYWdlLWxvYWRlZCcpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ29ubG9hZCcsIG9uTG9hZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBucztcclxufSkod2luZG93Lkx1YmUgfHwge30pO1xyXG4iLCIvKipcclxuICogQGF1dGhvciAgICAgICBbU3RlZiBDb2VuZW5dXHJcbiAqIEBkYXRlICAgICAgICAgWzIwMTZdXHJcbiAqIEBuYW1lc3BhY2UgICAgW0x1YmUuZm5dXHJcbiAqIEB0eXBlICAgICAgICAgW0Z1bmN0aW9uc11cclxuICogQHJlcXVpcmVzICAgICBbTHViZV1cclxuICogQHJldmlzaW9uICAgICBbMC4xXVxyXG4gKi9cclxuXHJcbi8vIEBwYXJhbSAobnMpOiB3aW5kb3cuTHViZVxyXG53aW5kb3cuTHViZSA9IChmdW5jdGlvbihucykge1xyXG4gICAgLy8gMS4gRUNNQS0yNjIvNVxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIC8vIDMuIEZVTkNUSU9OUyBPQkpFQ1RcclxuICAgIG5zLmZuID0ge1xyXG4gICAgICAgIGxvYWRJbWFnZUFzeW5jOiBmdW5jdGlvbihpbWcpIHtcclxuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XHJcbiAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtYXN5bmMtbG9hZGVkJywgJycpO1xyXG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoaWRlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNvbnN0cnVjdG9yID09IEFycmF5IHx8IGVsZW1lbnQuY29uc3RydWN0b3IgPT0gTm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShlbGVtZW50W2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5zdHlsZSAmJiBlbGVtZW50LnN0eWxlLmRpc3BsYXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jb25zdHJ1Y3RvciA9PSBBcnJheSB8fCBlbGVtZW50LmNvbnN0cnVjdG9yID09IE5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coZWxlbWVudFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuc3R5bGUgJiYgZWxlbWVudC5zdHlsZS5kaXNwbGF5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24oZWxlbWVudCwgY3NzQ2xhc3MpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29uc3RydWN0b3IgPT0gQXJyYXkgfHwgZWxlbWVudC5jb25zdHJ1Y3RvciA9PSBOb2RlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhlbGVtZW50W2ldLCBjc3NDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIGNzc0NsYXNzKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNvbnN0cnVjdG9yID09IEFycmF5IHx8IGVsZW1lbnQuY29uc3RydWN0b3IgPT0gTm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50W2ldLCBjc3NDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoZWxlbWVudCwgY3NzQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhlbGVtZW50LCBjc3NDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbGVtZW50LCBjc3NDbGFzcykge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jb25zdHJ1Y3RvciA9PSBBcnJheSB8fCBlbGVtZW50LmNvbnN0cnVjdG9yID09IE5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnRbaV0sIGNzc0NsYXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzc0NsYXNzKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0b2dnbGVBdHRyaWJ1dGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICBlbGVtZW50W2VsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSkgPyAncmVtb3ZlQXR0cmlidXRlJyA6ICdzZXRBdHRyaWJ1dGUnXShcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSxcclxuICAgICAgICAgICAgICAgICcnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdG9nZ2xlQXR0cmlidXRlVmFsdWU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsICEoZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSA9PT0gJ3RydWUnKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2VzdDogZnVuY3Rpb24oZWxlbWVudCwgc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50IHx8ICFzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jb25zdHJ1Y3RvciA9PSBBcnJheSB8fCBlbGVtZW50LmNvbnN0cnVjdG9yID09IE5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdFbGVtZW50cyA9IG1hdGNoaW5nRWxlbWVudHMuY29uY2F0KHRoaXMuY2xvc2VzdChlbGVtZW50W2ldLCBzZWxlY3RvcikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGluZ0VsZW1lbnRzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXJUZW1wbGF0ZTogZnVuY3Rpb24ob2JqLCB0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZShcclxuICAgICAgICAgICAgICAgIC97eyhcXHcqKX19L2csIC8vIG9yIC97KFxcdyopfS9nIGZvciBcInt0aGlzfSBpbnN0ZWFkIG9mICV0aGlzJVwiXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihtLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KGtleSkgJiYgb2JqW2tleV0gPyBvYmpba2V5XSA6ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gNC4gTkFNRVNQQUNFXHJcbiAgICByZXR1cm4gbnM7XHJcbn0pKHdpbmRvdy5MdWJlIHx8IHt9KTtcclxuIiwiKGZ1bmN0aW9uICgkLCBucywgXykge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBjZmcgPSB7XHJcbiAgICAgICAgY2FjaGU6IHtcclxuICAgICAgICAgICAgZ29vZ2xlbWFwOiAnW2RhdGEtY29tcG9uZW50PVwiTHViZS5Hb29nbGVNYXBzXCJdJyxcclxuICAgICAgICAgICAgYWN0aW9uOiAnW2RhdGEtYWN0aW9uXScsXHJcbiAgICAgICAgICAgIGRhdGVJbnB1dDogJy5hY3Rpb24tZmlsdGVyLWRhdGUnLFxyXG4gICAgICAgICAgICBkYXRlTWluSW5wdXQ6ICcuYWN0aW9uLWZpbHRlci1kYXRlLW1pbicsXHJcbiAgICAgICAgICAgIGRhdGVNYXhJbnB1dDogJy5hY3Rpb24tZmlsdGVyLWRhdGUtbWF4JyxcclxuICAgICAgICAgICAgYnRuQ2xlYXI6ICcuYnRuLWNsZWFyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xhc3Nlczoge1xyXG4gICAgICAgICAgICBoaWRlOiAnaGlkZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnYWN0aW9uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cmlidXRlczoge30sXHJcbiAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgIGNsaWNrOiAnY2xpY2snLFxyXG4gICAgICAgICAgICBjaGFuZ2U6ICdjaGFuZ2UnLFxyXG4gICAgICAgICAgICBtYXBMb2FkZWQ6ICdnb29nbGVtYXBzLmxvYWRlZCcsXHJcbiAgICAgICAgICAgIHBsYWNlTWFya2VyczogJ2dvb2dsZW1hcHMucGxhY2UtbWFya2VycycsXHJcbiAgICAgICAgICAgIHBsYWNlTWFya2Vyc0FuZEZpdDogJ2dvb2dsZW1hcHMucGxhY2UtbWFya2Vycy1maXQnLFxyXG4gICAgICAgICAgICBwbGFjZU1hcmtlcjogJ2dvb2dsZW1hcHMucGxhY2UtbWFya2VyJyxcclxuICAgICAgICAgICAgc2V0TWFya2VyQWN0aXZlOiAnZ29vZ2xlbWFwcy5zZXQtbWFya2VyLWFjdGl2ZScsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uVXBkYXRlOiAnZ29vZ2xlbWFwcy5sb2NhdGlvbi11cGRhdGUnLFxyXG4gICAgICAgICAgICBsb2NhdGlvblBsYWNlZDogJ2dvb2dsZW1hcHMubG9jYXRpb24tcGxhY2VkJyxcclxuICAgICAgICAgICAgbG9jYXRpb25FcnJvcjogJ2dvb2dsZW1hcHMubG9jYXRpb24tZXJyb3InLFxyXG4gICAgICAgICAgICBib3VuZHN1cGRhdGVkOiAnZ29vZ2xlbWFwcy5ib3VuZHMtdXBkYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0ZXBpY2tlck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZm9ybWF0OiAnZGQvbW0veXl5eScsXHJcbiAgICAgICAgICAgIHdlZWtTdGFydDogMSxcclxuICAgICAgICAgICAga2VlcEVtcHR5VmFsdWVzOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBucy5BY3Rpb25GaWx0ZXIgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IGNmZztcclxuXHJcbiAgICAgICAgdGhpcy5jYWNoZUl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBucy5BY3Rpb25GaWx0ZXIucHJvdG90eXBlID0ge1xyXG4gICAgICAgIGNhY2hlSXRlbXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIGNhY2hlID0gc2V0dGluZ3MuY2FjaGUsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gc2V0dGluZ3MuZGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJhc2VcclxuICAgICAgICAgICAgdGhpcy5odG1sQm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcclxuICAgICAgICAgICAgdGhpcy5tYXAgPSAkKGNhY2hlLmdvb2dsZW1hcCk7XHJcblxyXG4gICAgICAgICAgICAvLyBGaWx0ZXJzXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUlucHV0ID0gdGhpcy5jb250YWluZXIuZmluZChjYWNoZS5kYXRlSW5wdXQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVNaW5JbnB1dCA9IHRoaXMuY29udGFpbmVyLmZpbmQoY2FjaGUuZGF0ZU1pbklucHV0KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlTWF4SW5wdXQgPSB0aGlzLmNvbnRhaW5lci5maW5kKGNhY2hlLmRhdGVNYXhJbnB1dCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQ2xlYXIgPSB0aGlzLmNvbnRhaW5lci5maW5kKGNhY2hlLmJ0bkNsZWFyKTtcclxuXHJcbiAgICAgICAgICAgIC8vQWN0aW9uc1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0QWN0aW9uRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdEFjdGlvbkRhdGUgPSBuZXcgRGF0ZSgnMS8xLzIwMTcnKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gdGhpcy5jb250YWluZXIuZmluZChjYWNoZS5hY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbk1hcmtlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uRGF0YSA9IHRoaXMuYWN0aW9ucy5lcShpKS5kYXRhKGRhdGEuYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25EYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25EYXRhLmhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uQ2xpY2tIYW5kbGVyKHRoaXMuYWN0aW9ucy5lcShpKSwgdGhpcy5hY3Rpb25NYXJrZXJzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkRhdGEuaWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkRhdGEuZWxlbWVudCA9IHRoaXMuYWN0aW9ucy5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbk1hcmtlcnMucHVzaChhY3Rpb25EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShhY3Rpb25EYXRhLmRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRlIDwgdGhpcy5maXJzdEFjdGlvbkRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdEFjdGlvbkRhdGUgPSBkYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZSA+IHRoaXMubGFzdEFjdGlvbkRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0QWN0aW9uRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBzZXR0aW5ncy5ldmVudHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ0bkNsZWFyLm9uKGV2ZW50cy5jbGljaywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlTWluSW5wdXQuZGF0ZXBpY2tlcigndXBkYXRlJywgJycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlTWF4SW5wdXQuZGF0ZXBpY2tlcigndXBkYXRlJywgJycpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZU1pbklucHV0Lm9uKGV2ZW50cy5jaGFuZ2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZU1heElucHV0Lm9uKGV2ZW50cy5jaGFuZ2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1hcC5vbihldmVudHMuYm91bmRzdXBkYXRlZCwgXy5kZWJvdW5jZSgoZSwgcGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCb3VuZHMgPSBwYXJhbXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyKCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWN0aW9uQ2xpY2tIYW5kbGVyOiBmdW5jdGlvbiAoYWN0aW9uRWxlbWVudCwgYWN0aW9uTWFya2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHRtbEJvZHkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGFjdGlvbkVsZW1lbnQub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhY3RpdmF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRzID0gc2V0dGluZ3MuZXZlbnRzLFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHNldHRpbmdzLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBQbGFjZSBpbml0aWFsIG1hcmtlcnNcclxuICAgICAgICAgICAgdGhpcy5tYXAudHJpZ2dlcihldmVudHMucGxhY2VNYXJrZXJzQW5kRml0LCB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXJzOiB0aGlzLmFjdGlvbk1hcmtlcnNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0IGZpbHRlcnNcclxuICAgICAgICAgICAgLy8gSW5pdCBkYXRlcGlja2Vyc1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHNldHRpbmdzLmRhdGVwaWNrZXJPcHRpb25zLCB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dHM6ICQoKS5hZGQodGhpcy5kYXRlTWluSW5wdXQpLmFkZCh0aGlzLmRhdGVNYXhJbnB1dCksXHJcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IHRoaXMuZmlyc3RBY3Rpb25EYXRlLFxyXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogdGhpcy5sYXN0QWN0aW9uRGF0ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlUGlja2VySW5zdGFuY2UgPSB0aGlzLmRhdGVJbnB1dC5kYXRlcGlja2VyKG9wdGlvbnMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZG9GaWx0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGFjdGlvbk1hcmtlcnMgPSB0aGlzLmFjdGlvbk1hcmtlcnM7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWluRGF0ZSA9IHRoaXMuZGF0ZU1pbklucHV0LmRhdGVwaWNrZXIoJ2dldFVUQ0RhdGUnKTtcclxuICAgICAgICAgICAgbGV0IG1heERhdGUgPSB0aGlzLmRhdGVNYXhJbnB1dC5kYXRlcGlja2VyKCdnZXRVVENEYXRlJyk7XHJcblxyXG4gICAgICAgICAgICBhY3Rpb25NYXJrZXJzID0gdGhpcy5maWx0ZXJMb2NhdGlvbih0aGlzLmN1cnJlbnRCb3VuZHMsIGFjdGlvbk1hcmtlcnMpO1xyXG4gICAgICAgICAgICBpZiAobWluRGF0ZSB8fCBtYXhEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25NYXJrZXJzID0gdGhpcy5maWx0ZXJEYXRlcyhtaW5EYXRlLCBtYXhEYXRlLCBhY3Rpb25NYXJrZXJzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50b2dnbGVWaXNpYmxpdHlBY3Rpb25zKGFjdGlvbk1hcmtlcnMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmlsdGVyTG9jYXRpb246IGZ1bmN0aW9uIChib3VuZHNPYmplY3QsIGFjdGlvbnMpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZmlsdGVyTWV0aG9kKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5wb3NpdGlvbi5sYXQgPj0gYm91bmRzT2JqZWN0LnNvdXRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnBvc2l0aW9uLmxhdCA8PSBib3VuZHNPYmplY3Qubm9ydGhcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIExhdGl0dWRlIG1hdGNoZXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5wb3NpdGlvbi5sbmcgPj0gYm91bmRzT2JqZWN0Lndlc3QgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnBvc2l0aW9uLmxuZyA8PSBib3VuZHNPYmplY3QuZWFzdFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb25zLmZpbHRlcihmaWx0ZXJNZXRob2QpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmlsdGVyRGF0ZXM6IGZ1bmN0aW9uIChtaW5EYXRlLCBtYXhEYXRlLCBhY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpbHRlck1ldGhvZChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoYWN0aW9uLmRhdGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICghbWF4RGF0ZSAmJiBtaW5EYXRlICYmIGRhdGUgPj0gbWluRGF0ZSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAoIW1pbkRhdGUgJiYgbWF4RGF0ZSAmJiBkYXRlIDw9IG1heERhdGUpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1pbkRhdGUgJiYgbWF4RGF0ZSAmJiBkYXRlID49IG1pbkRhdGUgJiYgZGF0ZSA8PSBtYXhEYXRlKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnMuZmlsdGVyKGZpbHRlck1ldGhvZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVWaXNpYmxpdHlBY3Rpb25zOiBmdW5jdGlvbiAodG9TaG93TWFya2Vycykge1xyXG4gICAgICAgICAgICBsZXQgYWxsTWFya2VycyA9IHRoaXMuYWN0aW9uTWFya2VycztcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTWFya2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRNYXJrZXIgPSBhbGxNYXJrZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvU2hvd01hcmtlcnMuaW5kZXhPZihjdXJyZW50TWFya2VyKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dNYXJrZXIoY3VycmVudE1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1hcmtlcihjdXJyZW50TWFya2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd01hcmtlcjogZnVuY3Rpb24gKG1hcmtlcikge1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NlcyA9IHRoaXMuc2V0dGluZ3MuY2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgIG1hcmtlci5lbGVtZW50LnNob3coKTtcclxuICAgICAgICAgICAgbWFya2VyLmVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xhc3Nlcy5oaWRlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVNYXJrZXI6IGZ1bmN0aW9uIChtYXJrZXIpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzZXMgPSB0aGlzLnNldHRpbmdzLmNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICBtYXJrZXIuZWxlbWVudC5hZGRDbGFzcyhjbGFzc2VzLmhpZGUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5lbGVtZW50LmhpZGUoKTtcclxuICAgICAgICAgICAgfSwgMTgwKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBucztcclxufSkod2luZG93LmpRdWVyeSwgd2luZG93Lkx1YmUgfHwge30sIHdpbmRvdy5fIHx8IHt9KTtcclxuIiwiZnVuY3Rpb24gYXN5bmNHb29nbGVNYXBzKCkge31cclxuKGZ1bmN0aW9uICgkLCBnb29nbGUsIG5zKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIGNmZyA9IHtcclxuICAgICAgICBjYWNoZToge30sXHJcbiAgICAgICAgY2xhc3Nlczoge30sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBzdGFydExvY2F0aW9uOiAnc3RhcnQtbG9jYXRpb24nLFxyXG4gICAgICAgICAgICBnZW9jb2RlQ291bnRyeUJpYXM6ICdnZW9jb2RlLWNvdW50cnktYmlhcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxyXG4gICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICBjbGljazogJ2NsaWNrJyxcclxuICAgICAgICAgICAgc2hvd246ICdzaG93bi5icy5tb2RhbCcsXHJcbiAgICAgICAgICAgIGRyYWdlbmQ6ICdkcmFnZW5kJyxcclxuICAgICAgICAgICAgcmVzaXplOiAncmVzaXplJyxcclxuICAgICAgICAgICAgem9vbUNoYW5nZWQ6ICd6b29tX2NoYW5nZWQnLFxyXG4gICAgICAgICAgICBib3VuZHNDaGFuZ2VkOiAnYm91bmRzX2NoYW5nZWQnLFxyXG4gICAgICAgICAgICBtYXBMb2FkZWQ6ICdnb29nbGVtYXBzLmxvYWRlZCcsXHJcbiAgICAgICAgICAgIHBsYWNlTWFya2VyczogJ2dvb2dsZW1hcHMucGxhY2UtbWFya2VycycsXHJcbiAgICAgICAgICAgIHBsYWNlTWFya2Vyc0FuZEZpdDogJ2dvb2dsZW1hcHMucGxhY2UtbWFya2Vycy1maXQnLFxyXG4gICAgICAgICAgICBwbGFjZU1hcmtlcjogJ2dvb2dsZW1hcHMucGxhY2UtbWFya2VyJyxcclxuICAgICAgICAgICAgc2V0TWFya2VyQWN0aXZlOiAnZ29vZ2xlbWFwcy5zZXQtbWFya2VyLWFjdGl2ZScsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uVXBkYXRlOiAnZ29vZ2xlbWFwcy5sb2NhdGlvbi11cGRhdGUnLFxyXG4gICAgICAgICAgICBsb2NhdGlvblBsYWNlZDogJ2dvb2dsZW1hcHMubG9jYXRpb24tcGxhY2VkJyxcclxuICAgICAgICAgICAgbG9jYXRpb25FcnJvcjogJ2dvb2dsZW1hcHMubG9jYXRpb24tZXJyb3InLFxyXG4gICAgICAgICAgICBib3VuZHN1cGRhdGVkOiAnZ29vZ2xlbWFwcy5ib3VuZHMtdXBkYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICB6b29tOiA4LFxyXG4gICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgICAgICB6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB7fSxcclxuICAgICAgICAgICAgLy9taW5ab29tOiA1LFxyXG4gICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdncmVlZHknLFxyXG4gICAgICAgICAgICBzdHlsZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmNvdW50cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImh1ZVwiOiBcIiNmZjAwMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm5hdHVyYWwubGFuZGNvdmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbC50ZXJyYWluXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogXCIwLjUwXCJcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IFwiMC41XCJcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndlaWdodFwiOiBcIjAuNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNTNiMmUxXCJcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2NyaXB0czoge1xyXG4gICAgICAgICAgICBtYXBzOiAnLy9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP3NpZ25lZF9pbj10cnVlJnY9MyZsaWJyYXJpZXM9Z2VvbWV0cnkma2V5PUFJemFTeUQ4U19ZTl9QNDlwS01CMkdXSy11RWx2ZjhXZzNYcmNrOCZjYWxsYmFjaz1hc3luY0dvb2dsZU1hcHMnLFxyXG4gICAgICAgICAgICBpbmZvQm94OiAnZGVzaWduL2pzL3ZlbmRvci9nb29nbGVtYXBzL2luZm9ib3gubWluLmpzJ1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbnMuR29vZ2xlTWFwcyA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gY2ZnO1xyXG5cclxuICAgICAgICB0aGlzLmNhY2hlSXRlbXMoKTtcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH07XHJcblxyXG4gICAgbnMuR29vZ2xlTWFwcy5wcm90b3R5cGUgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgc2NyaXB0cyA9IHNldHRpbmdzLnNjcmlwdHMsXHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBzZXR0aW5ncy5ldmVudHMsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gc2V0dGluZ3MuZGF0YTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFya2VycyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVDb3VudHJ5QmlhcyA9IHRoaXMuY29udGFpbmVyLmRhdGEoZGF0YS5nZW9jb2RlQ291bnRyeUJpYXMpIHx8ICdCRSc7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ29vZ2xlICYmIGdvb2dsZS5oYXNPd25Qcm9wZXJ0eSgnbWFwcycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTY3JpcHRzKHNjcmlwdHMsIHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGVJdGVtczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgY2FjaGUgPSBzZXR0aW5ncy5jYWNoZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gdGhpcy5jb250YWluZXIuY2hpbGRyZW4oKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3Nlc3RNb2RhbCA9IHRoaXMuY29udGFpbmVyLmNsb3Nlc3QoY2FjaGUubW9kYWwpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRzID0gc2V0dGluZ3MuZXZlbnRzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIub24oZXZlbnRzLnBsYWNlTWFya2VycywgKGUsIHBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubWFya2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuSWZMb2FkZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlTWFya2VyQXJyYXkocGFyYW1zLm1hcmtlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm9uKGV2ZW50cy5wbGFjZU1hcmtlcnNBbmRGaXQsIChlLCBwYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLm1hcmtlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVybklmTG9hZGVkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZU1hcmtlckFycmF5KHBhcmFtcy5tYXJrZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b29tVG9NYXJrZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCh3aW5kb3cuRG9tKS5vbihldmVudHMucmVzaXplLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZWNhbGN1bGF0ZSBtYXAgb24gcmVzaXplIG9mIHRoZSB3aW5kb3dcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmhlaWdodCh0aGlzLmNvbnRhaW5lci5vdXRlckhlaWdodCgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXR1cm5JZkxvYWRlZDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBzZXR0aW5ncy5ldmVudHM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm9uKGV2ZW50cy5tYXBMb2FkZWQsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxhY2VNYXJrZXJBcnJheTogZnVuY3Rpb24gKG1hcmtlcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhck1hcmtlcnMoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXJrZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IG1hcmtlcnNbaV0uSXNBY3RpdmUgPyAnYWN0aXZlJyA6ICdkZWZhdWx0JztcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VNYXJrZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1tpXS5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlcnNbaV0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1tpXS5oYW5kbGVyXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kTWFwRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBzZXR0aW5ncy5ldmVudHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmFkZExpc3RlbmVyKGV2ZW50cy5ib3VuZHNDaGFuZ2VkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0xvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnRyaWdnZXIoZXZlbnRzLmJvdW5kc3VwZGF0ZWQsIHRoaXMuaW5zdGFuY2UuZ2V0Qm91bmRzKCkudG9KU09OKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBzZXR0aW5ncy5ldmVudHM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMubWFwLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXBFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kTWFwRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnRyaWdnZXIoZXZlbnRzLm1hcExvYWRlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0U2NyaXB0czogZnVuY3Rpb24gKHNjcmlwdHMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihuLCB0LCBzY3JpcHRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2NyaXB0cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQuZ2V0U2NyaXB0KHNjcmlwdHMubWFwcylcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBnb29nbGUgPSB3aW5kb3cuZ29vZ2xlIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZXJyb3JIYW5kbGVyKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZU1hcEVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAgPSAkKCc8ZGl2PjwvZGl2PicpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5oZWlnaHQodGhpcy5jb250YWluZXIub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLndpZHRoKCcxMDAlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLm1hcCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXJNYXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBzZXR0aW5ncy5vcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHNldHRpbmdzLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBzdGFydExvY2F0aW9uID0gdGhpcy5jb250YWluZXIuZGF0YShkYXRhLnN0YXJ0TG9jYXRpb24pIHx8IFs1MC44NjI2NTEsIDQuMzYxNDA4XSxcclxuICAgICAgICAgICAgICAgIG1hcCA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHN0YXJ0TG9jYXRpb25bMF0sIHN0YXJ0TG9jYXRpb25bMV0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uVE9QX0xFRlRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBnb29nbGUubWFwcy5NYXAodGhpcy5tYXAuZ2V0KDApLCBtYXApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2VvY29kZUFkZHJlc3M6IGZ1bmN0aW9uIChhZGRyZXNzLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVQb3N0YWxDb2RlKGFkZHJlc3MsIGxvY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVDaXR5KGFkZHJlc3MsIGxvY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR2VvY29kZSB3YXMgbm90IHN1Y2Nlc3NmdWwgZm9yIHRoZSBmb2xsb3dpbmcgcmVhc29uOiAnICsgc3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIudHJpZ2dlcih0aGlzLnNldHRpbmdzLmV2ZW50cy5sb2NhdGlvbkVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2VvY29kZVBvc3RhbENvZGU6IGZ1bmN0aW9uIChwb3N0YWxDb2RlLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmdlb2NvZGVDb3VudHJ5QmlhcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGFsQ29kZTogcG9zdGFsQ29kZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0cywgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSAnT0snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZW9jb2RlQ2l0eTogZnVuY3Rpb24gKGNpdHksIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogY2l0eSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeTogdGhpcy5nZW9jb2RlQ291bnRyeUJpYXNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gJ09LJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXJNYXJrZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcnNbaV0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFya2Vycy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudExvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlTWFya2VyKHRoaXMuY3VycmVudExvY2F0aW9uLCAnbG9jYXRpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxhY2VNYXJrZXI6IGZ1bmN0aW9uIChwb3NpdGlvbiwgdHlwZSwgaWQsIGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgLy92YXIgbWFya2VyU2hhcGUgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyU2hhcGUoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXJrZXJPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBtYXA6IHRoaXMuaW5zdGFuY2UsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoaWQgJiYgaWQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXJPYmplY3QuaWQgPSBpZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyT2JqZWN0LnpJbmRleCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXJPYmplY3QuekluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHBsYWNlZE1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIobWFya2VyT2JqZWN0KTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZWRNYXJrZXIuYWRkTGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFya2Vycy5wdXNoKHBsYWNlZE1hcmtlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGFjZWRNYXJrZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB6b29tVG9NYXJrZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBib3VuZHMuZXh0ZW5kKHRoaXMubWFya2Vyc1tpXS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5maXRCb3VuZHMoYm91bmRzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBucztcclxufSkod2luZG93LmpRdWVyeSwgd2luZG93Lmdvb2dsZSB8fCB1bmRlZmluZWQsIHdpbmRvdy5MdWJlIHx8IHt9KTtcclxuIiwiLyoqXHJcbiAqIFt3aW5kb3cuTHViZV1cclxuICpcclxuICogQGF1dGhvciAgICAgICBbU3RlZiBDb2VuZW5dXHJcbiAqIEBkYXRlICAgICAgICAgWzIwMTddXHJcbiAqIEBuYW1lc3BhY2UgICAgW0x1YmVdXHJcbiAqIEByZXF1aXJlcyAgICAgW2pRdWVyeV1cclxuICogQHJldmlzaW9uICAgICBbMC4xXVxyXG4gKi9cclxuXHJcbndpbmRvdy5MdWJlID0gKGZ1bmN0aW9uKG5zKSB7XHJcbiAgICAvLyAxLiBFQ01BLTI2Mi81XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLy8gMi4gTE9BRCBDT01QT05FTlRTXHJcbiAgICBucy5jb21wb25lbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbnMuRG9tLmluaXQoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gMy4gTE9BRCBEQVRBQ09NUE9ORU5UU1xyXG4gICAgbnMuZGF0YUNvbXBvbmVudEluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGRhdGFDb21wb25lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tcG9uZW50XScpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGRhdGFDb21wb25lbnQgPSBkYXRhQ29tcG9uZW50c1tpXTtcclxuICAgICAgICAgICAgdmFyIGRhdGFBdHRyID0gZGF0YUNvbXBvbmVudC5kYXRhc2V0LmNvbXBvbmVudDtcclxuICAgICAgICAgICAgZGF0YUF0dHIgPSBkYXRhQXR0ci5zcGxpdCgnLicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFBdHRyLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50RnVuY3Rpb24gPSBuc1tkYXRhQXR0clsxXV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50RnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgY29tcG9uZW50RnVuY3Rpb24oZGF0YUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIDQuIE9OQ0UgVEhFIERPTSBJUyBSRUFEWVxyXG4gICAgbnMuY29tcG9uZW50cygpO1xyXG4gICAgbnMuZGF0YUNvbXBvbmVudEluaXRpYWxpemVyKCk7XHJcblxyXG4gICAgLy8gNS4gVFJJR0dFUiBMT0FEIEVWRU5UIE9OIE5TXHJcbiAgICAvLyBUaGlzIGlzIHJlcXVpcmVkIGFzIG9mIGpRdWVyeSAzLjAgYXMgalF1ZXJ5IG5vIGxvbmdlclxyXG4gICAgLy8gICBzdXBwb3J0cyBsb2FkIGV2ZW50IGJpbmRpbmcgZm9ybSBpbnNpZGUgYSByZWFkeSBldmVudCBoYW5kbGVyXHJcbiAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgIC8vICAgICAnbG9hZCcsXHJcbiAgICAvLyAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICAgICQucmVhZHkudGhlbihmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICAgICAgICQobnMpLnRyaWdnZXIoJ2xvYWQnKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBmYWxzZVxyXG4gICAgLy8gKTtcclxuXHJcbiAgICAvLyAvLyA2LiBSRUdJU1RFUiBTV1xyXG4gICAgLy8gaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcclxuICAgIC8vICAgICAvLyBSZWdpc3RlciBhIHNlcnZpY2Ugd29ya2VyIGhvc3RlZCBhdCB0aGUgcm9vdCBvZiB0aGVcclxuICAgIC8vICAgICAvLyBzaXRlIHVzaW5nIHRoZSBkZWZhdWx0IHNjb3BlLlxyXG4gICAgLy8gICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyXHJcbiAgICAvLyAgICAgICAgIC5yZWdpc3RlcignL2FwcC9zdy5qcycpXHJcbiAgICAvLyAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlZ2lzdHJhdGlvbikge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5pbmZvKCdTZXJ2aWNlIHdvcmtlciByZWdpc3RyYXRpb24gc3VjY2VlZGVkOicsIHJlZ2lzdHJhdGlvbik7XHJcbiAgICAvLyAgICAgICAgICAgICByZWdpc3RyYXRpb24udXBkYXRlKCk7XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5pbmZvKCdTZXJ2aWNlIHdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOicsIGVycm9yKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAgIGNvbnNvbGUuaW5mbygnU2VydmljZSB3b3JrZXJzIGFyZSBub3Qgc3VwcG9ydGVkLicpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIDguIEdMT0JBTElaRSBOQU1FU1BBQ0VcclxuICAgIHJldHVybiBucztcclxufSkod2luZG93Lkx1YmUgfHwge30pO1xyXG4iXX0=
