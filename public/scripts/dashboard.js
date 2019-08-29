$(() => {
  $('a').on('click', function(event) {
    const pollId = event.target.id;
    $('.close').show();
    $('.view-btn').show();
    $('.delete-btn').show();
    $(".view-submit")
      .attr("action", `/result/${pollId}`)
      .attr("method", "GET");

    $.ajax({
      type: "GET",
      url: `/result/${pollId}`,
      success: function(data) {
        console.log(data);
      }
    });
 
    // $(".donut").load(`result/${pollId}`, function() {
    //   $(".header-result").remove();
    //   $(".head").remove();
    //   $(".legend-container-group").remove();
    //   $(".js-donut-chart-container").addClass('loaded-donut');
    // });


  });

  $('.close').on('click', function(event) {
    $(this).hide();
    $('.view-btn').hide();
    $('.delete-btn').hide();
    $(".donut").empty();
  });
});