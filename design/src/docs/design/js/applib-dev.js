"use strict";

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

          if (!target || !target.length || target == "dropdown") {
            return;
          }
        }

        target = document.querySelectorAll(target);
        var singleTarget = target[0];
        clickTarget.addEventListener(events.click, function (e) {
          var clickElement = e.currentTarget;
          ns.fn.toggleAttributeValue(clickElement, 'aria-expanded');
          var currentHeight = singleTarget.offsetHeight; // Disable transition

          ns.fn.removeClass(singleTarget, 'animate-on-height'); // Force last state

          singleTarget.style.height = '';

          if (ns.fn.toggleClass(target, classes.show)) {
            ns.fn.addClass(target, 'show-in');
          } else {
            ns.fn.addClass(target, 'show-out');
          } // Get last state


          var futureHeight = singleTarget.offsetHeight; // Force first state

          ns.fn.toggleClass(target, classes.show);
          singleTarget.style.height = currentHeight + 'px';
          var closing = currentHeight > futureHeight;
          setTimeout(function () {
            // Enable transition
            ns.fn.addClass(singleTarget, 'animate-on-height'); // Set last state

            singleTarget.style.height = futureHeight + 'px';
            ns.fn.toggleClass(target, classes.show);
            setTimeout(function () {
              ns.fn.removeClass(target, 'show-out');
              ns.fn.removeClass(target, 'show-in');
            }, 400);
            if (closing) ns.fn.removeClass(target, 'show');
          }), 50;
        });
      });
    },
    asyncImageLoading: function asyncImageLoading() {
      document.querySelectorAll('img[data-src]').forEach(ns.fn.loadImageAsync);
      document.querySelectorAll('[data-bgsrc]').forEach(ns.fn.loadBackgroundImageAsync);
      document.querySelectorAll('iframe[data-src]').forEach(ns.fn.loadImageAsync);
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
}(window.Lube || {}); // @param (ns): window.Lube


window.Lube = function (ns) {
  // 1. ECMA-262/5
  'use strict'; // 3. FUNCTIONS OBJECT

  ns.fn = {
    loadImageAsync: function loadImageAsync(el) {
      el.setAttribute('src', el.getAttribute('data-src'));
      el.setAttribute('data-async-loaded', '');

      el.onload = function () {
        el.removeAttribute('data-src');
      };
    },
    loadBackgroundImageAsync: function loadBackgroundImageAsync(el) {
      var currentStyle = el.getAttribute('style');

      if (currentStyle && currentStyle.length > 0) {
        el.setAttribute('style', currentStyle + ';background-image:url("' + el.getAttribute('data-bgsrc') + '");');
      } else {
        el.setAttribute('style', 'background-image:url("' + el.getAttribute('data-bgsrc') + '");');
      }

      el.setAttribute('data-async-loaded', '');

      el.onload = function () {
        el.removeAttribute('data-bgsrc');
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
        var returnValue;

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
  }; // 4. NAMESPACE

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
          data = settings.data; // Base

      this.htmlBody = $('html, body');
      this.map = $(cache.googlemap); // Filters

      this.dateInput = this.container.find(cache.dateInput);
      this.dateMinInput = this.container.find(cache.dateMinInput);
      this.dateMaxInput = this.container.find(cache.dateMaxInput);
      this.btnClear = this.container.find(cache.btnClear); //Actions

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
          data = settings.data; // Place initial markers

      this.map.trigger(events.placeMarkersAndFit, {
        markers: this.actionMarkers
      }); // Init filters
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

window.Lube = function (ns) {
  // 1. ECMA-262/5
  'use strict'; // 2. LOAD COMPONENTS

  ns.components = function () {
    ns.Dom.init();
  }; // 3. LOAD DATACOMPONENTS


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
  }; // 4. ONCE THE DOM IS READY


  ns.components();
  ns.dataComponentInitializer(); // 5. TRIGGER LOAD EVENT ON NS
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