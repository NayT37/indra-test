(function ($, Drupal) {
  Drupal.behaviors.local_age_validation = {
    attach: function (context, settings) {
      $(function () {
        if (typeof (Storage) !== 'undefined') {
          if (!sessionStorage.getItem('isAdult') && !window.location.href.includes('age-landing')) {
            window.location.href = "/age-landing";
          }
        } else {
          window.location.href = "/age-landing";
        }
      });
    }
  }
})(jQuery, Drupal);