$(() => {
  // Jquery for the initial polling form
  //
  // Counter to keep track of ids of textareas
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

  // target the submit button, on submit, manually submit the form
  $("#form__submit").click(function() {
    // console.log($("#form").serialize());
    $.post(
      "/",
      $("#form").serialize(),
      function(data) {
        const poll_id = data.poll_id;
        $("#copyLink").html(`<button
          class= "btn btn-lg btn-success"
          id = "copyLink"
          style = "margin:20px;"
          >
          https://socializd.herokuapp.com/poll/${poll_id}
          </button >`);
      },
      "json" // I expect a JSON response
    );
  });
});
