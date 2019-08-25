$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });

  // Jquery for the initial polling form
  //
  // Counter to keep track of ids of textareas
  let optionId = 3;

  $('form').on('keyup', ".form__option", function(event) {
    if (event.which === 13 && optionId <= 5) {
      $("form").find('.form__email').before(
        $('<input />').attr('id', 'option' + optionId.toString()).attr('type', 'textarea').attr('placeholder', 'Option').addClass('form__option')
      );
      optionId++;
    }
  });

  // give the submit / reset buttons the effect of being pressed
  // down when clicked
  const clicked = (target) => {
    $(target).addClass('clicked').delay(200).queue(function() {
      $(target).removeClass('clicked').dequeue();
    });
  };

  $('.form__reset').on('click', function(event) {
    clicked(this);
    // TODO: Be able to remove text boxes that have been added on
    $('.form__option').val('');
    $('.form__title').val('');
  });

  $('.form__submit').on('click', function(event) {
    clicked(this);
  });

  // drag and drop
  const sortable = new Sortable.create(draggable);

});

$("#draggable").on("change", () => {
  const optionsPos = {};
  let pos = 1;
  for (let i = 0; i < $('button').length; i++) {
    optionsPos[pos] = ($('button')[i].name);
    pos++;
  }
  console.log(optionsPos);
});
