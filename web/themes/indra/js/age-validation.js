(function ($, Drupal) {
  Drupal.behaviors.age_validation = {
    attach: function (context, settings) {
      $(function () {
        $('.mini-form--age-validation', context).each(function () {
          let $form = $(this);
          let $inputs = $form.find('.mini-form__num-inp', context);
          let $cta = $form.find('.mini-form__cta', context);

          function validateInput($input) {
            $parent = $input.closest('.mini-form__num-inp');
            $input.is(':valid') && $input.val() !== '' ? $parent.removeClass('input-error') : $parent.addClass('input-error');
          }

          function validateCTA() {
            let dd, mm, yy = undefined;
            let now = new Date();
            let yyDiff = 0;
            $inputs.each(function (index, input) {
              $input = $(input).find('input');
              if ($input.is(':valid') == true && $input.val() !== '') {
                switch ($input.attr('name')) {
                  case 'año':
                    yyDiff = now.getFullYear() - $input.val();
                    yy = yyDiff >= 18 && yyDiff < 100 ? $input.val() : 0;
                    break;
                  case 'mes':
                    mm = $input.val();
                    break;
                  case 'dia':
                    dd = $input.val();
                    break;
                }

              } validateInput($input);
            });

            if (yyDiff > 18 ||
              yyDiff === 18 &&
              mm - (now.getMonth() + 1) < 0 ||
              yyDiff === 18 &&
              mm - (now.getMonth() + 1) <= 0 &&
              dd - now.getDate() <= 0
            ) {
              window.location.href = "/home";
            }
          }

          if ($form[0] !== undefined && $inputs[0] !== undefined) {
            $cta.click(validateCTA);
          }

        });
      });

    }
  };
})(jQuery, Drupal);