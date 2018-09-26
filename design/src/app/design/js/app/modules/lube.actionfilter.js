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
        cacheItems: function () {
            let settings = this.settings,
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

            for (let i = 0; i < this.actions.length; i++) {
                let actionData = this.actions.eq(i).data(data.action);
                if (actionData !== undefined) {
                    actionData.handler = () => {
                        this.actionClickHandler(this.actions.eq(i), this.actionMarkers[i]);
                    };
                    actionData.id = i;
                    actionData.element = this.actions.eq(i);
                    this.actionMarkers.push(actionData);

                    let date = new Date(actionData.date);
                    if (date < this.firstActionDate) {
                        this.firstActionDate = date;
                    } else if (date > this.lastActionDate) {
                        this.lastActionDate = date;
                    }
                }
            }
        },
        bindEvents: function () {
            let settings = this.settings,
                events = settings.events;

            this.btnClear.on(events.click, () => {
                this.dateMinInput.datepicker('update', '');
                this.dateMaxInput.datepicker('update', '');
            });

            this.dateMinInput.on(events.change, () => {
                this.doFilter();
            });
            this.dateMaxInput.on(events.change, () => {
                this.doFilter();
            });

            this.map.on(events.boundsupdated, _.debounce((e, params) => {
                this.currentBounds = params;
                this.doFilter();
            }, 300));
        },
        actionClickHandler: function (actionElement, actionMarker) {
            this.htmlBody.animate({
                scrollTop: actionElement.offset().top
            }, 500);
        },
        activate: function () {
            let settings = this.settings,
                events = settings.events,
                data = settings.data;

            // Place initial markers
            this.map.trigger(events.placeMarkersAndFit, {
                markers: this.actionMarkers
            });

            // Init filters
            // Init datepickers
            let options = {};
            Object.assign(options, settings.datepickerOptions, {
                inputs: $().add(this.dateMinInput).add(this.dateMaxInput),
                startDate: this.firstActionDate,
                endDate: this.lastActionDate
            });
            this.datePickerInstance = this.dateInput.datepicker(options);
        },
        doFilter: function () {
            let actionMarkers = this.actionMarkers;

            let minDate = this.dateMinInput.datepicker('getUTCDate');
            let maxDate = this.dateMaxInput.datepicker('getUTCDate');

            actionMarkers = this.filterLocation(this.currentBounds, actionMarkers);
            if (minDate || maxDate) {
                actionMarkers = this.filterDates(minDate, maxDate, actionMarkers);
            }

            this.toggleVisiblityActions(actionMarkers);
        },
        filterLocation: function (boundsObject, actions) {
            function filterMethod(action) {
                if (
                    action.position.lat >= boundsObject.south &&
                    action.position.lat <= boundsObject.north
                ) {
                    // Latitude matches
                    if (
                        action.position.lng >= boundsObject.west &&
                        action.position.lng <= boundsObject.east
                    ) {
                        return true;
                    }
                }
                return false;
            }

            return actions.filter(filterMethod);
        },
        filterDates: function (minDate, maxDate, actions) {
            function filterMethod(action) {
                let date = new Date(action.date);
                if (
                    (!maxDate && minDate && date >= minDate) ||
                    (!minDate && maxDate && date <= maxDate) ||
                    (minDate && maxDate && date >= minDate && date <= maxDate)
                ) {
                    return true;
                } else {
                    return false;
                }
            }

            return actions.filter(filterMethod);
        },
        toggleVisiblityActions: function (toShowMarkers) {
            let allMarkers = this.actionMarkers;

            for (let i = 0; i < allMarkers.length; i++) {
                let currentMarker = allMarkers[i];
                if (toShowMarkers.indexOf(currentMarker) !== -1) {
                    this.showMarker(currentMarker);
                } else {
                    this.hideMarker(currentMarker);
                }
            }
        },
        showMarker: function (marker) {
            let classes = this.settings.classes;

            marker.element.show();
            marker.element.removeClass(classes.hide);
        },
        hideMarker: function (marker) {
            let classes = this.settings.classes;

            marker.element.addClass(classes.hide);
            setTimeout(() => {
                marker.element.hide();
            }, 180);
        }
    };

    return ns;
})(window.jQuery, window.Lube || {}, window._ || {});
