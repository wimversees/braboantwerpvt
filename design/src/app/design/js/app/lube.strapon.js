(function ($, ns) {
    'use strict';

    ns.classes = function () {
        return {};
    };

    ns.modules = function () {};

    ns.dataComponentInitializer = function (rootElement) {
        let dataComponents =
            rootElement === undefined ?
            $('[data-component]') :
            rootElement.find('[data-component]').addBack('[data-component]');

        for (let i = 0; i < dataComponents.length; i++) {
            let dataComponent = dataComponents.eq(i),
                dataAttr = dataComponent.data('component');
            dataAttr = dataAttr.split('.');

            if (dataAttr.length >= 2) {
                let componentFunction = ns[dataAttr[1]];
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
