$(() => {
  //reveals next button uppon entering text
$('.form-control').keyup(function () {
    $('.nxt').removeClass("hide fadeOutDown").addClass("fadeInUp");
})

//on click (next)
$('.nxt').click(function () {
    $('.nxt').removeClass("fdeInUp").addClass('fadeOutDown');
    if ($('.progress-form li').hasClass('activate')) {
      const $activate = $('li.activate');
      const $inactive = $('li.inactive');
      $activate.removeClass("fadeInRightBig activate").addClass('fadeOutLeftBig');
      $inactive.removeClass("hide inactive").addClass("activate fadeInRightBig").next().addClass('inactive');
      $('.submit').click(function () {
        event.preventDefault();
        const darken = '<div class="darken" style="display:none;"></div>';
        $('body').prepend(darken);
        $(".darken").delay().show(0).animate({
          opacity: 0.8
        }, "fast");
        $('.thanks').removeClass('hide').addClass('fadeInDownBig');
      });
    }
  });

  // Jquery for the initial polling form
  //
  // Counter to keep track of ids of textareas
  let optionId = 3;

  $(".form__option").on("keyup", function(event) {
    event.preventDefault();
    if (event.which === 13 && optionId <= 5) {
      $("form")
        .find(".form__email")
        .before(
          $("<input />")
            .attr("id", "option" + optionId.toString())
            .attr("type", "textarea")
            .attr("placeholder", "Option")
            .addClass("form__option")
        );
      optionId++;
    }
  });

  // give the submit / reset buttons the effect of being pressed
  // down when clicked
  // const clicked = (target) => {
  //   $(target).addClass('clicked').delay(200).queue(function() {
  //     $(target).removeClass('clicked').dequeue();
  //   });
  // };

  $('.form__reset').on('click', function(event) {
    clicked(this);
    // TODO: Be able to remove text boxes that have been added on
    $('.form__option').val('');
    $('.form__title').val('');
  });

  // $('.form__submit').on('click', function(event) {
  //   event.preventPropagation();
  //   clicked(this);
  // });

});
