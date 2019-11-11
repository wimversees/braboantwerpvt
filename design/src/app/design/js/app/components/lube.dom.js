window.Lube = (function(ns) {
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
        init: function() {
            this.windowsPhoneViewportFix();
            this.bindScrollTopEvent();
            this.bindDataHref();
            this.dataToggle();
            this.asyncImageLoading();
            this.initAnimations();
        },

        windowsPhoneViewportFix: function() {
            // Copyright 2014-2015 Twitter, Inc.
            // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement('style');
                msViewportStyle.appendChild(
                    document.createTextNode('@-ms-viewport{width:auto!important}')
                );
                document.querySelector('head').appendChild(msViewportStyle);
            }
        },
        bindScrollTopEvent: function() {
            document.querySelectorAll('a[href="#top"]').forEach(link =>
                link.addEventListener('click', () => {
                    window.scrollTo(0, 0);
                    return false;
                })
            );
        },
        bindDataHref: function() {
            document.querySelectorAll('[data-href]').forEach(link => {
                link.addEventListener('click', e => {
                    if (!e.currentTarget.matches('a')) {
                        window.location = link.dataset.href;
                        return false;
                    }
                });
                link.addEventListener('mousedown', e => {
                    if (!e.currentTarget.matches('a')) {
                        window.open(link.dataset.href, '_blank');
                        return false;
                    }
                });
            });
        },
        dataToggle: function() {
            let settings = cfg,
                events = settings.events,
                classes = settings.classes;

            document.querySelectorAll('[data-toggle]').forEach(clickTarget => {
                let target = clickTarget.dataset.target;
                if (!target || !target.length) {
                    target = clickTarget.dataset.toggle;
                    if (!target || !target.length || target == "dropdown") {
                        return;
                    }
                }

                target = document.querySelectorAll(target);
                let singleTarget = target[0];

                clickTarget.addEventListener(events.click, e => {
                    let clickElement = e.currentTarget;

                    ns.fn.toggleAttributeValue(clickElement, 'aria-expanded');

                    let currentHeight = singleTarget.offsetHeight;
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
                    let futureHeight = singleTarget.offsetHeight;
                    // Force first state
                    ns.fn.toggleClass(target, classes.show);
                    singleTarget.style.height = currentHeight + 'px';

                    setTimeout(() => {
                        // Enable transition
                        ns.fn.addClass(singleTarget, 'animate-on-height');
                        // Set last state
                        singleTarget.style.height = futureHeight + 'px';

                        ns.fn.toggleClass(target, classes.show);

                        setTimeout(() => {
                            ns.fn.removeClass(target, 'show-out');
                            ns.fn.removeClass(target, 'show-in');
                        }, 400);
                    }),
                    50;
                });
            });
        },
        asyncImageLoading: function() {
            document.querySelectorAll('img[data-src]').forEach(ns.fn.loadImageAsync);
        },
        initAnimations: function() {
            var onLoad = () => {
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
})(window.Lube || {});
