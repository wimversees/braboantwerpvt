jQuery(document).ready(function ($) {

    jQuery('.wiver-multiselect input[type=checkbox]').change(function (e) {
        var fieldSlug = $(this).data('group');
        var hiddenInput = $('#' + fieldSlug);
        var selection = ($(hiddenInput).val()).split('|');
        var selectedValue = $(this).val();

        if (this.checked) {
            selection.push(selectedValue);
        } else {
            var index = selection.indexOf(selectedValue)
            if (index > -1) { selection.splice(index, 1) }
        }

        selection = selection.filter(wiverMultiSelectOnlyUnique);

        $(hiddenInput).val(selection.join('|'));
    });

});

function wiverMultiSelectOnlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
