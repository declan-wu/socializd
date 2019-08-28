$(() => {
  $('a').on('click', function(event) {
    const pollId = event.target.id;
    $(".donut").load(`result/${pollId}`, function() {
      $(".header-result").remove();
      $(".head").remove();
      $(".legend-container-group").remove();
    });
  });
});