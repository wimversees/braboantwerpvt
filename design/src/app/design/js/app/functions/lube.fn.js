// @param (ns): window.Lube
window.Lube = (function(ns) {
    // 1. ECMA-262/5
    'use strict';

    // 3. FUNCTIONS OBJECT
    ns.fn = {
        loadImageAsync: function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.setAttribute('data-async-loaded', '');
            img.onload = () => {
                img.removeAttribute('data-src');
            };
        },

        hide: function(element) {
            if (element.constructor == Array || element.constructor == NodeList) {
                for (let i = 0; i < element.length; i++) {
                    this.hide(element[i]);
                }
                return;
            }

            if (element && element.style && element.style.display !== undefined) {
                element.style.display = 'none';
            }
        },

        show: function(element) {
            if (element.constructor == Array || element.constructor == NodeList) {
                for (let i = 0; i < element.length; i++) {
                    this.show(element[i]);
                }
                return;
            }

            if (element && element.style && element.style.display !== undefined) {
                element.style.display = 'block';
            }
        },

        addClass: function(element, cssClass) {
            if (element.constructor == Array || element.constructor == NodeList) {
                for (let i = 0; i < element.length; i++) {
                    this.addClass(element[i], cssClass);
                }
                return;
            }

            element.classList.add(cssClass);
        },

        toggleClass: function(element, cssClass) {
            if (element.constructor == Array || element.constructor == NodeList) {
                let returnValue;
                for (let i = 0; i < element.length; i++) {
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

        removeClass: function(element, cssClass) {
            if (element.constructor == Array || element.constructor == NodeList) {
                for (let i = 0; i < element.length; i++) {
                    this.removeClass(element[i], cssClass);
                }
                return;
            }

            element.classList.remove(cssClass);
        },

        toggleAttribute: function(element, attribute) {
            element[element.getAttribute(attribute) ? 'removeAttribute' : 'setAttribute'](
                attribute,
                ''
            );
        },

        toggleAttributeValue: function(element, attribute) {
            element.setAttribute(attribute, !(element.getAttribute(attribute) === 'true'));
        },

        closest: function(element, selector) {
            if (!element || !selector) {
                return [];
            }

            if (element.constructor == Array || element.constructor == NodeList) {
                let matchingElements = [];
                for (let i = 0; i < element.length; i++) {
                    matchingElements = matchingElements.concat(this.closest(element[i], selector));
                }

                return matchingElements;
            }

            return element.closest(selector);
        },

        renderTemplate: function(obj, template) {
            return template.replace(
                /{{(\w*)}}/g, // or /{(\w*)}/g for "{this} instead of %this%"
                function(m, key) {
                    return obj.hasOwnProperty(key) && obj[key] ? obj[key] : '';
                }
            );
        }
    };

    // 4. NAMESPACE
    return ns;
})(window.Lube || {});
