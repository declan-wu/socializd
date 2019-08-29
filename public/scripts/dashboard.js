$(() => {
  $('a').on('click', function(event) {
    const pollId = event.target.id;
    $('.close').show();
    $('.view-btn').show();
    $('.delete-btn').show();
    $(".view-submit")
      .attr("action", `/result/${pollId}`)
      .attr("method", "GET");
    $(".donut").load(`result/${pollId}`, function() {
      $(".header-result").remove();
      $(".head").remove();
      $(".legend-container-group").remove();
    });
  });

  $('.close').on('click', function(event) {
    $(this).hide();
    $('.view-btn').hide();
    $(".donut").empty();
  });
});