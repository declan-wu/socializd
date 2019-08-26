$(() => {
  // Jquery for the initial polling form
  //
  // Counter to keep track of ids of textareas
  let optionId = 3;

  $('.option-fields').on("keyup", "input", function(event) {
    event.preventDefault();
    console.log(event);
    if (event.which === 13 && optionId <= 5) {
      $(".option-fields")
        .find(".form__buttons")
        .before(
          $("<input />")
            .addClass("form__option")
            .attr("type", "textarea")
            .prop("required", true)
            .attr("name", "option_" + optionId.toString())
            .attr("placeholder", "Option")
        );
      optionId++;
    }
  });

  // target the submit button, on submit, manually submit the form
  $("#form__submit").click(function() {
    // console.log($("#form").serialize());
    $.post(
      "/",
      $("#form").serialize(),
      function(data) {
        //... do something with response from server
        // maybe trigger the thank you page
      },
      "json" // I expect a JSON response
    );
  });

  // give the submit / reset buttons the effect of being pressed
  // down when clicked
  // const clicked = (target) => {
  //   $(target).addClass('clicked').delay(200).queue(function() {
  //     $(target).removeClass('clicked').dequeue();
  //   });
  // };

  $(".form__reset").on("click", function(event) {
    // TODO: Be able to remove text boxes that have been added on
    $(".form__option").val("");
    $(".form__title").val("");
  });

  // $('.form__submit').on('click', function(event) {
  //   event.preventPropagation();
  //   clicked(this);
  // });
});
