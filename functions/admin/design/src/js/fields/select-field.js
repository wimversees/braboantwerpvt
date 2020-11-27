jQuery(document).ready(function ($) {

    jQuery('input.wiver-select-remove').click(function (e) {
        e.preventDefault();
        var fieldSlug = e.currentTarget.dataset.select;
        jQuery('.' + fieldSlug).val('');
    });

});
