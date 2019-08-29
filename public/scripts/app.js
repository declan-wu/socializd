$(() => {
  let optionId = 3;
  $(".option-fields").on("keyup", "input", function(event) {
    event.preventDefault();

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

  $(".form__reset").on("click", function() {
    $(".form__option").val("");
    $(".form__title").val("");
  });

  // target the submit button, on submit, manually submit the form on index.ejs
  $("#form__submit").click(function() {
    $.post(
      "/",
      $("#form").serialize(),
      function(data) {
        const poll_id = data.poll_id;
        $("#copyLink").html(`<em id = "lovely">
          https://socializd.herokuapp.com/poll/${poll_id}
          </em >`);
        $("#lovely-form").attr(
          "action",
          `https://socializd.herokuapp.com/poll/${poll_id}`
        );
      },
      "json" // I expect a JSON response
    );
  });

});
