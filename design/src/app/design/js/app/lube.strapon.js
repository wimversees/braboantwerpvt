window.Lube = (function(ns) {
    // 1. ECMA-262/5
    'use strict';

    // 2. LOAD COMPONENTS
    ns.components = function() {
        ns.Dom.init();
    };

    // 3. LOAD DATACOMPONENTS
    ns.dataComponentInitializer = function() {
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
        $('.content-gallery a').simpleLightbox();
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
})(window.Lube || {});
