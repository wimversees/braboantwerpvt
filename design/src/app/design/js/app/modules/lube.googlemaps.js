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
                        },
                        {
                            "hue": "#ff0000"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural.landcover",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                },
                {
                    "featureType": "landscape.natural.terrain",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "on"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "weight": "0.50"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels",
                    "stylers": [{
                        "weight": "0.5"
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text",
                    "stylers": [{
                        "weight": "0.5"
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "on"
                    }]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#53b2e1"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }
            ]
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
        init: function () {
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
        cacheItems: function () {
            var settings = this.settings,
                cache = settings.cache;

            this.map = this.container.children().first();
            this.closestModal = this.container.closest(cache.modal);
        },
        bindEvents: function () {
            var settings = this.settings,
                events = settings.events;

            this.container.on(events.placeMarkers, (e, params) => {
                if (params && params.markers) {
                    this.returnIfLoaded(() => {
                        this.placeMarkerArray(params.markers);
                    });
                }
            });

            this.container.on(events.placeMarkersAndFit, (e, params) => {
                if (params && params.markers) {
                    this.returnIfLoaded(() => {
                        this.placeMarkerArray(params.markers);
                        this.zoomToMarkers();
                    });
                }
            });

            $(window.Dom).on(events.resize, () => {
                // Recalculate map on resize of the window
                this.activate();
                this.map.height(this.container.outerHeight());
            });
        },
        returnIfLoaded: function (callback) {
            var settings = this.settings,
                events = settings.events;

            if (this.isLoaded) {
                callback();
            } else {
                this.container.on(events.mapLoaded, callback);
            }
        },
        placeMarkerArray: function (markers) {
            this.clearMarkers();
            for (let i = 0; i < markers.length; i++) {
                var type = markers[i].IsActive ? 'active' : 'default';
                this.placeMarker(
                    markers[i].position,
                    type,
                    markers[i].id,
                    markers[i].handler
                );
            }
        },
        bindMapEvents: function () {
            var settings = this.settings,
                events = settings.events;

            this.instance.addListener(events.boundsChanged, () => {
                if (this.isLoaded) {
                    this.container.trigger(events.boundsupdated, this.instance.getBounds().toJSON());
                }
            });
        },
        activate: function () {
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
        getScripts: function (scripts, callback) {
            function errorHandler(n, t, scripts) {
                throw new Error(scripts);
            }

            $.getScript(scripts.maps)
                .done(function () {
                    google = window.google || {};
                    callback();
                })
                .fail(errorHandler);
        },
        createMapElement: function () {
            this.map = $('<div></div>');
            this.map.height(this.container.outerHeight());
            this.map.width('100%');
            this.container.append(this.map);
        },
        renderMap: function () {
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
        geocodeAddress: function (address, callback) {
            this.geocodePostalCode(address, location => {
                if (!location) {
                    this.geocodeCity(address, location => {
                        if (!location) {
                            console.error(
                                'Geocode was not successful for the following reason: ' + status
                            );
                            this.container.trigger(this.settings.events.locationError);
                        } else {
                            callback(location);
                        }
                    });
                } else {
                    callback(location);
                }
            });
        },
        geocodePostalCode: function (postalCode, callback) {
            this.geocoder.geocode({
                    componentRestrictions: {
                        country: this.geocodeCountryBias,
                        postalCode: postalCode
                    }
                },
                (results, status) => {
                    if (status == 'OK') {
                        callback(results[0].geometry.location);
                    } else {
                        callback(undefined);
                    }
                });
        },
        geocodeCity: function (city, callback) {
            this.geocoder.geocode({
                    address: city,
                    componentRestrictions: {
                        country: this.geocodeCountryBias
                    }
                },
                (results, status) => {
                    if (status == 'OK') {
                        callback(results[0].geometry.location);
                    } else {
                        callback(undefined);
                    }
                });
        },
        clearMarkers: function () {
            for (let i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers.length = 0;

            if (this.currentLocation) {
                this.placeMarker(this.currentLocation, 'location');
            }
        },
        placeMarker: function (position, type, id, handler) {
            //var markerShape = new google.maps.MarkerShape();

            var markerObject = {
                position: position,
                map: this.instance,
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
        zoomToMarkers: function () {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < this.markers.length; i++) {
                bounds.extend(this.markers[i].getPosition());
            }

            this.instance.fitBounds(bounds);
        }
    };

    return ns;
})(window.jQuery, window.google || undefined, window.Lube || {});
