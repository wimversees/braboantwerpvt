"use strict";function asyncGoogleMaps(){}window.Lube=function(c){var t={cache:{},classes:{scrolling:"scrolling",show:"show"},events:{scroll:"scroll",click:"click"}};return c.Dom={init:function(){this.windowsPhoneViewportFix(),this.bindScrollTopEvent(),this.bindDataHref(),this.dataToggle(),this.asyncImageLoading(),this.initAnimations()},windowsPhoneViewportFix:function(){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var t=document.createElement("style");t.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.querySelector("head").appendChild(t)}},bindScrollTopEvent:function(){},bindDataHref:function(){Array.prototype.slice.call(document.querySelectorAll("[data-href]")).forEach(function(e){e.addEventListener("click",function(t){if(!t.currentTarget.matches("a"))return window.location=e.dataset.href,!1}),e.addEventListener("mousedown",function(t){if(!t.currentTarget.matches("a"))return window.open(e.dataset.href,"_blank"),!1})})},dataToggle:function(){var e=t.events,r=t.classes;Array.prototype.slice.call(document.querySelectorAll("[data-toggle]")).forEach(function(t){var i=t.dataset.target;if(i&&i.length||(i=t.dataset.toggle)&&i.length&&"dropdown"!=i){var s=(i=document.querySelectorAll(i))[0];t.addEventListener(e.click,function(t){var e=t.currentTarget;c.fn.toggleAttributeValue(e,"aria-expanded");var n=s.offsetHeight;c.fn.removeClass(s,"animate-on-height"),s.style.height="",c.fn.toggleClass(i,r.show)?c.fn.addClass(i,"show-in"):c.fn.addClass(i,"show-out");var a=s.offsetHeight;c.fn.toggleClass(i,r.show),s.style.height=n+"px";var o=a<n;setTimeout(function(){c.fn.addClass(s,"animate-on-height"),s.style.height=a+"px",c.fn.toggleClass(i,r.show),setTimeout(function(){c.fn.removeClass(i,"show-out"),c.fn.removeClass(i,"show-in")},400),o&&c.fn.removeClass(i,"show")})})}})},asyncImageLoading:function(){Array.prototype.slice.call(document.querySelectorAll("img[data-src]")).forEach(c.fn.loadImageAsync),Array.prototype.slice.call(document.querySelectorAll("[data-bgsrc]")).forEach(c.fn.loadBackgroundImageAsync),Array.prototype.slice.call(document.querySelectorAll("iframe[data-src]")).forEach(c.fn.loadImageAsync)},initAnimations:function(){function t(){document.getElementsByTagName("body")[0].classList.add("page-loaded")}window.addEventListener?window.addEventListener("load",t):window.attachEvent("onload",t)}},c}(window.Lube||{}),window.Lube=function(t){return t.fn={loadImageAsync:function(t){t.setAttribute("src",t.getAttribute("data-src")),t.setAttribute("data-async-loaded",""),t.onload=function(){t.removeAttribute("data-src")}},loadBackgroundImageAsync:function(t){var e=t.getAttribute("style");e&&0<e.length?t.setAttribute("style",e+';background-image:url("'+t.getAttribute("data-bgsrc")+'");'):t.setAttribute("style",'background-image:url("'+t.getAttribute("data-bgsrc")+'");'),t.setAttribute("data-async-loaded",""),t.onload=function(){t.removeAttribute("data-bgsrc")}},hide:function(t){if(t.constructor!=Array&&t.constructor!=NodeList)t&&t.style&&void 0!==t.style.display&&(t.style.display="none");else for(var e=0;e<t.length;e++)this.hide(t[e])},show:function(t){if(t.constructor!=Array&&t.constructor!=NodeList)t&&t.style&&void 0!==t.style.display&&(t.style.display="block");else for(var e=0;e<t.length;e++)this.show(t[e])},addClass:function(t,e){if(t.constructor!=Array&&t.constructor!=NodeList)t.classList.add(e);else for(var n=0;n<t.length;n++)this.addClass(t[n],e)},toggleClass:function(t,e){if(t.constructor!=Array&&t.constructor!=NodeList)return t.classList.contains(e)?(this.removeClass(t,e),!1):(this.addClass(t,e),!0);for(var n,a=0;a<t.length;a++)n=this.toggleClass(t[a],e);return n},removeClass:function(t,e){if(t.constructor!=Array&&t.constructor!=NodeList)t.classList.remove(e);else for(var n=0;n<t.length;n++)this.removeClass(t[n],e)},toggleAttribute:function(t,e){t[t.getAttribute(e)?"removeAttribute":"setAttribute"](e,"")},toggleAttributeValue:function(t,e){t.setAttribute(e,!("true"===t.getAttribute(e)))},closest:function(t,e){if(!t||!e)return[];if(t.constructor!=Array&&t.constructor!=NodeList)return t.closest(e);for(var n=[],a=0;a<t.length;a++)n=n.concat(this.closest(t[a],e));return n},renderTemplate:function(n,t){return t.replace(/{{(\w*)}}/g,function(t,e){return n.hasOwnProperty(e)&&n[e]?n[e]:""})}},t}(window.Lube||{}),function(s,t,e){var n={cache:{googlemap:'[data-component="Lube.GoogleMaps"]',action:"[data-action]",dateInput:".action-filter-date",dateMinInput:".action-filter-date-min",dateMaxInput:".action-filter-date-max",btnClear:".btn-clear"},classes:{hide:"hide"},data:{action:"action"},attributes:{},events:{click:"click",change:"change",mapLoaded:"googlemaps.loaded",placeMarkers:"googlemaps.place-markers",placeMarkersAndFit:"googlemaps.place-markers-fit",placeMarker:"googlemaps.place-marker",setMarkerActive:"googlemaps.set-marker-active",locationUpdate:"googlemaps.location-update",locationPlaced:"googlemaps.location-placed",locationError:"googlemaps.location-error",boundsupdated:"googlemaps.bounds-update"},datepickerOptions:{format:"dd/mm/yyyy",weekStart:1,keepEmptyValues:!0}};t.ActionFilter=function(t){this.container=t,this.settings=n,this.cacheItems(),this.bindEvents(),this.activate()},t.ActionFilter.prototype={cacheItems:function(){var a=this,t=this.settings,e=t.cache,o=t.data;this.htmlBody=s("html, body"),this.map=s(e.googlemap),this.dateInput=this.container.find(e.dateInput),this.dateMinInput=this.container.find(e.dateMinInput),this.dateMaxInput=this.container.find(e.dateMaxInput),this.btnClear=this.container.find(e.btnClear),this.firstActionDate=new Date,this.lastActionDate=new Date("1/1/2017"),this.actions=this.container.find(e.action),this.actionMarkers=[];for(var n=function(t){var e=a.actions.eq(t).data(o.action);if(void 0!==e){e.handler=function(){a.actionClickHandler(a.actions.eq(t),a.actionMarkers[t])},e.id=t,e.element=a.actions.eq(t),a.actionMarkers.push(e);var n=new Date(e.date);n<a.firstActionDate?a.firstActionDate=n:n>a.lastActionDate&&(a.lastActionDate=n)}},i=0;i<this.actions.length;i++)n(i)},bindEvents:function(){var n=this,t=this.settings.events;this.btnClear.on(t.click,function(){n.dateMinInput.datepicker("update",""),n.dateMaxInput.datepicker("update","")}),this.dateMinInput.on(t.change,function(){n.doFilter()}),this.dateMaxInput.on(t.change,function(){n.doFilter()}),this.map.on(t.boundsupdated,e.debounce(function(t,e){n.currentBounds=e,n.doFilter()},300))},actionClickHandler:function(t){this.htmlBody.animate({scrollTop:t.offset().top},500)},activate:function(){var t=this.settings,e=t.events;t.data;this.map.trigger(e.placeMarkersAndFit,{markers:this.actionMarkers});var n={};Object.assign(n,t.datepickerOptions,{inputs:s().add(this.dateMinInput).add(this.dateMaxInput),startDate:this.firstActionDate,endDate:this.lastActionDate}),this.datePickerInstance=this.dateInput.datepicker(n)},doFilter:function(){var t=this.actionMarkers,e=this.dateMinInput.datepicker("getUTCDate"),n=this.dateMaxInput.datepicker("getUTCDate");t=this.filterLocation(this.currentBounds,t),(e||n)&&(t=this.filterDates(e,n,t)),this.toggleVisiblityActions(t)},filterLocation:function(e,t){return t.filter(function(t){return t.position.lat>=e.south&&t.position.lat<=e.north&&t.position.lng>=e.west&&t.position.lng<=e.east})},filterDates:function(n,a,t){return t.filter(function(t){var e=new Date(t.date);return!!(!a&&n&&n<=e||!n&&a&&e<=a||n&&a&&n<=e&&e<=a)})},toggleVisiblityActions:function(t){for(var e=this.actionMarkers,n=0;n<e.length;n++){var a=e[n];-1!==t.indexOf(a)?this.showMarker(a):this.hideMarker(a)}},showMarker:function(t){var e=this.settings.classes;t.element.show(),t.element.removeClass(e.hide)},hideMarker:function(t){var e=this.settings.classes;t.element.addClass(e.hide),setTimeout(function(){t.element.hide()},180)}}}(window.jQuery,window.Lube||{},window._||{}),function(i,s,t){var e={cache:{},classes:{},data:{startLocation:"start-location",geocodeCountryBias:"geocode-country-bias"},attributes:{},events:{click:"click",shown:"shown.bs.modal",dragend:"dragend",resize:"resize",zoomChanged:"zoom_changed",boundsChanged:"bounds_changed",mapLoaded:"googlemaps.loaded",placeMarkers:"googlemaps.place-markers",placeMarkersAndFit:"googlemaps.place-markers-fit",placeMarker:"googlemaps.place-marker",setMarkerActive:"googlemaps.set-marker-active",locationUpdate:"googlemaps.location-update",locationPlaced:"googlemaps.location-placed",locationError:"googlemaps.location-error",boundsupdated:"googlemaps.bounds-update"},options:{zoom:8,disableDefaultUI:!0,zoomControl:!0,zoomControlOptions:{},gestureHandling:"greedy",styles:[{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"simplified"},{hue:"#ff0000"}]},{featureType:"landscape.natural.landcover",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"landscape.natural.terrain",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{weight:"0.50"}]},{featureType:"road.highway",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels",stylers:[{weight:"0.5"}]},{featureType:"road.local",elementType:"labels.text",stylers:[{weight:"0.5"}]},{featureType:"road.local",elementType:"labels.icon",stylers:[{visibility:"on"}]},{featureType:"transit",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#53b2e1"}]},{featureType:"water",elementType:"geometry.stroke",stylers:[{visibility:"off"}]}]},scripts:{maps:"//maps.googleapis.com/maps/api/js?signed_in=true&v=3&libraries=geometry&key=AIzaSyD8S_YN_P49pKMB2GWK-uElvf8Wg3Xrck8&callback=asyncGoogleMaps",infoBox:"design/js/vendor/googlemaps/infobox.min.js"}};t.GoogleMaps=function(t){this.container=t,this.settings=e,this.cacheItems(),this.bindEvents(),this.init()},t.GoogleMaps.prototype={init:function(){var t=this.settings,e=t.scripts,n=(t.events,t.data);this.markers=[],this.geocodeCountryBias=this.container.data(n.geocodeCountryBias)||"BE",this.container&&this.container.length&&(s&&s.hasOwnProperty("maps")?(this.geocoder=new s.maps.Geocoder,this.activate()):this.getScripts(e,this.init.bind(this)))},cacheItems:function(){var t=this.settings.cache;this.map=this.container.children().first(),this.closestModal=this.container.closest(t.modal)},bindEvents:function(){var n=this,t=this.settings.events;this.container.on(t.placeMarkers,function(t,e){e&&e.markers&&n.returnIfLoaded(function(){n.placeMarkerArray(e.markers)})}),this.container.on(t.placeMarkersAndFit,function(t,e){e&&e.markers&&n.returnIfLoaded(function(){n.placeMarkerArray(e.markers),n.zoomToMarkers()})}),i(window.Dom).on(t.resize,function(){n.activate(),n.map.height(n.container.outerHeight())})},returnIfLoaded:function(t){var e=this.settings.events;this.isLoaded?t():this.container.on(e.mapLoaded,t)},placeMarkerArray:function(t){this.clearMarkers();for(var e=0;e<t.length;e++){var n=t[e].IsActive?"active":"default";this.placeMarker(t[e].position,n,t[e].id,t[e].handler)}},bindMapEvents:function(){var t=this,e=this.settings.events;this.instance.addListener(e.boundsChanged,function(){t.isLoaded&&t.container.trigger(e.boundsupdated,t.instance.getBounds().toJSON())})},activate:function(){var t=this.settings.events;this.map.length||this.createMapElement(),this.renderMap(),this.bindMapEvents(),this.container.trigger(t.mapLoaded),this.isLoaded=!0},getScripts:function(t,e){i.getScript(t.maps).done(function(){s=window.google||{},e()}).fail(function(t,e,n){throw new Error(n)})},createMapElement:function(){this.map=i("<div></div>"),this.map.height(this.container.outerHeight()),this.map.width("100%"),this.container.append(this.map)},renderMap:function(){var t=this.settings,e=t.options,n=t.data,a=this.container.data(n.startLocation)||[50.862651,4.361408],o=i.extend({},e,{center:new s.maps.LatLng(a[0],a[1]),mapTypeId:s.maps.MapTypeId.ROADMAP,zoomControlOptions:{position:s.maps.ControlPosition.TOP_LEFT}});this.instance=new s.maps.Map(this.map.get(0),o)},geocodeAddress:function(e,n){var a=this;this.geocodePostalCode(e,function(t){t?n(t):a.geocodeCity(e,function(t){t?n(t):(console.error("Geocode was not successful for the following reason: "+status),a.container.trigger(a.settings.events.locationError))})})},geocodePostalCode:function(t,n){this.geocoder.geocode({componentRestrictions:{country:this.geocodeCountryBias,postalCode:t}},function(t,e){n("OK"==e?t[0].geometry.location:void 0)})},geocodeCity:function(t,n){this.geocoder.geocode({address:t,componentRestrictions:{country:this.geocodeCountryBias}},function(t,e){n("OK"==e?t[0].geometry.location:void 0)})},clearMarkers:function(){for(var t=0;t<this.markers.length;t++)this.markers[t].setMap(null);this.markers.length=0,this.currentLocation&&this.placeMarker(this.currentLocation,"location")},placeMarker:function(t,e,n,a){var o={position:t,map:this.instance};n&&n.length&&(o.id=n),o.zIndex="default"===e?1:0;var i=new s.maps.Marker(o);return"function"==typeof a&&i.addListener("click",a),this.markers.push(i),i},zoomToMarkers:function(){for(var t=new s.maps.LatLngBounds,e=0;e<this.markers.length;e++)t.extend(this.markers[e].getPosition());this.instance.fitBounds(t)}}}(window.jQuery,window.google||void 0,window.Lube||{}),window.Lube=function(i){return i.components=function(){i.Dom.init()},i.dataComponentInitializer=function(){for(var t=document.querySelectorAll("[data-component]"),e=0;e<t.length;e++){var n=t[e],a=n.dataset.component;if(2<=(a=a.split(".")).length){var o=i[a[1]];o&&new o(n)}}$(".content-gallery a").simpleLightbox()},i.components(),i.dataComponentInitializer(),i}(window.Lube||{});