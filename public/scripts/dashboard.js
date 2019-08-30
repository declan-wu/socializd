$(() => {
  $(".view").on("click", function(event) {
    event.preventDefault();
    const pollId = event.target.id;
    $(".close").show();
    $(".view-btn").show();
    $(".delete-btn").show();

    $.post(`/dashboard/${pollId}`, ({options}) => {
      let donutData = {
        data: []
      };
      options.forEach(([name, quantity]) => {
        donutData.data.push({ name, quantity });
      });

      function createDonutChart() {
        let donutChart = britecharts.donut(),
          donutContainer = d3.select(".donut"),
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
        donutContainer.datum(donutData.data).call(donutChart);
        donutChart.highlightSliceById(3).isAnimated(true); //not working
        donutContainer.datum(donutData.data).call(donutChart);
      }
      createDonutChart();
    });
  });

  $('.view').on('click', function(event) {
    event.preventDefault();
    const pollId = event.target.id;
    $.get(`/result/${pollId}`)
    .done(function(data) {
      console.log(data);
    });
  });

  $(".close").on("click", function(event) {
    $(this).hide();
    $(".view-btn").hide();
    $(".delete-btn").hide();
    $(".donut").empty();
  });

  $(".copy").on("click", function(event) {
    const link = event.target.id;
    const tempInput = document.createElement("input");
    tempInput.style = "position:absolute; left: -1000px; top: -1000px";
    tempInput.value = link;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    alert('Success! Poll link copied to clipboard');
    document.body.removeChild(tempInput);
  });
});