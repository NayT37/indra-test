(function ($, Drupal) {
  Drupal.behaviors.swiper = {
    attach: function (context, settings) {
      $(function () {
        let $swiperEl = $('.swiper-container', context).each(function (index) {
          let $swiper = $(this);
          let $swiperPag = $swiper.find(".swiper-pagination", context);
          let $swiperNext = $swiper.find(".swiper-button-next", context);
          let $swiperPrev = $swiper.find(".swiper-button-prev", context);
          if ($swiper[0] !== undefined) {
            var swiper = new Swiper($swiper[0], {
              slidesPerView: 1,
              spaceBetween: 10,
              loop: $swiper.hasClass('no-loop') ? false : true,
              speed: 600,
              pagination: {
                el: $swiperPag[0],
                clickable: true,
              },
              navigation: {
                nextEl: $swiperNext[0],
                prevEl: $swiperPrev[0],
              },
              autoplay: {
                delay: 3500,
                disableOnInteraction: false,
              },
            });
            // Use this modifier class in order to diplay items based in viewport's width
            if ($swiper.hasClass('use-breakpoints')) {
              swiper.params.breakpoints = {
                '@0.75': {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                '@1.00': {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                '@1.50': {
                  slidesPerView: 3,
                  spaceBetween: 50,
                }
              }
              //Update swiping
              swiper.update();
            }
            //Start swiping
            swiper.init();
          }
        });
      });
    }
  };
})(jQuery, Drupal);