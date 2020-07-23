"use strict";

jQuery(document).ready(function ($) {
  jQuery('input.wiver-media-remove').click(function (e) {
    e.preventDefault();
    var fieldSlug = e.currentTarget.dataset.image;
    jQuery('.' + fieldSlug).val('');
    jQuery('.holder-' + fieldSlug).html('');
  });
  jQuery('input.wiver-media-manager').click(function (e) {
    e.preventDefault();
    var image_frame;
    var fieldSlug = e.currentTarget.dataset.image;

    if (image_frame) {
      image_frame.open();
    } // Define image_frame as wp.media object


    image_frame = wp.media({
      title: 'Select Media',
      multiple: false,
      library: {
        type: 'image'
      }
    });
    image_frame.on('close', function () {
      // On close, get selections and save to the hidden input
      // plus other AJAX stuff to refresh the image preview
      var selection = image_frame.state().get('selection');
      var gallery_ids = new Array();
      var my_index = 0;
      selection.each(function (attachment) {
        gallery_ids[my_index] = attachment['id'];
        my_index++;
      });
      var ids = gallery_ids.join(",");
      jQuery('.' + fieldSlug).val(ids);
      Refresh_Image(ids, fieldSlug);
    }, fieldSlug);
    image_frame.on('open', function () {
      // On open, get the id from the hidden input
      // and select the appropiate images in the media manager
      var selection = image_frame.state().get('selection');
      var ids = jQuery('.' + fieldSlug)[0].value.split(',');
      ids.forEach(function (id) {
        var attachment = wp.media.attachment(id);
        attachment.fetch();
        selection.add(attachment ? [attachment] : []);
      });
    }, fieldSlug);
    image_frame.open();
  });
}); // Ajax request to refresh the image preview

function Refresh_Image(the_id, fieldSlug) {
  var data = {
    action: 'wiverImageRefresh',
    id: the_id
  };
  jQuery.get(ajaxurl, data, function (response) {
    if (response.success === true) {
      jQuery('.holder-' + fieldSlug).html(response.data.image);
    }
  });
}