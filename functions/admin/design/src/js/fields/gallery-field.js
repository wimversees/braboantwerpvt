jQuery(document).ready(function ($) {

    jQuery('input.wiver-gallery-remove').click(function (e) {
        e.preventDefault();
        var fieldSlug = e.currentTarget.dataset.gallery;
        jQuery('.' + fieldSlug).val('');
        jQuery('.holder-' + fieldSlug).html('');
    });

    jQuery('input.wiver-gallery-manager').click(function (e) {

        e.preventDefault();
        var gallery_frame;
        var fieldSlug = e.currentTarget.dataset.gallery;

        if (gallery_frame) {
            gallery_frame.open();
        }
        // Define gallery_frame as wp.media object
        gallery_frame = wp.media({
            title: 'Select Media',
            multiple: true,
            library: {
                type: 'image',
            }
        });

        gallery_frame.on('close', function () {
            // On close, get selections and save to the hidden input
            // plus other AJAX stuff to refresh the gallery preview
            var selection = gallery_frame.state().get('selection');
            var gallery_ids = new Array();
            var my_index = 0;
            selection.each(function (attachment) {
                gallery_ids[my_index] = attachment['id'];
                my_index++;
            });
            var ids = gallery_ids.join(",");
            jQuery('.' + fieldSlug).val(ids);
            Refresh_Gallery(ids, fieldSlug);
        }, fieldSlug);

        gallery_frame.on('open', function () {
            // On open, get the id from the hidden input
            // and select the appropiate gallerys in the media manager
            var selection = gallery_frame.state().get('selection');
            var ids = jQuery('.' + fieldSlug)[0].value.split(',');
            ids.forEach(function (id) {
                var attachment = wp.media.attachment(id);
                attachment.fetch();
                selection.add(attachment ? [attachment] : []);
            });

        }, fieldSlug);

        gallery_frame.open();
    });

});

// Ajax request to refresh the gallery preview
function Refresh_Gallery(the_id, fieldSlug) {
    var data = {
        action: 'wiverGalleryRefresh',
        id: the_id
    };

    jQuery.get(ajaxurl, data, function (response) {

        if (response.success === true) {
            var galleryHtml = '';
            for (var i = 0; i < response.data.gallery.length; i++) {
                galleryHtml += response.data.gallery[i];
            }
            jQuery('.holder-' + fieldSlug).html(galleryHtml);
        }
    });
}
