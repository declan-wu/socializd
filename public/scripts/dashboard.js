$(() => {
  $("a").on("click", function(event) {
    event.preventDefault();
    const pollId = event.target.id;
    $(".close").show();
    $(".view-btn").show();
    $(".delete-btn").show();
    // $(".view-submit")
    //   .attr("action", `/result/${pollId}`)
    //   .attr("method", "GET");

    $.post(`/dashboard/${pollId}`, options => {
      let donutData = {
        data: []
      };
      options.forEach(([name, quantity]) => {
        donutData.data.push({ name, quantity });
      });

      function createDonutChart() {
        let donutChart = britecharts.donut(),
          donutContainer = d3.select(".js-donut-chart-container"),
          containerWidth = donutContainer.node()
            ? donutContainer.node().getBoundingClientRect().width
            : false;
        donutChart
          .isAnimated(true)
          .highlightSliceById(2)
          .hasFixedHighlightedSlice(true)
          .width(containerWidth)
          .height(containerWidth)
          .externalRadius(containerWidth / 2.5)
          .internalRadius(containerWidth / 5)
          .on("customMouseOver", function(data) {
            legendChart.highlight(data.data.id);
          })
          .on("customMouseOut", function() {
            legendChart.clearHighlight();
          });
        donutContainer.datum(donutData.data).call(donutChart);
        donutChart.highlightSliceById(3).isAnimated(true); //not working
        donutContainer.datum(donutData.data).call(donutChart);
      }
      createDonutChart();
    });
  });

  $(".close").on("click", function(event) {
    $(this).hide();
    $(".view-btn").hide();
    $(".delete-btn").hide();
    $(".donut").empty();
  });
});
