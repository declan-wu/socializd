// for (let option in "<%= what %>") {
//   console.log(option);
//   // console.log("<%= what[option] %>");
// }

// const barData = [
//   { name: "<%= what[0][0] %>", value: <%= what[0][1] %> },
//   { name: "<%= what[1][0] %>", value: <%= what[1][1] %> }
//   // { name: "<%= what[2][0] %>", value: <%= what[2][1] %> },
//   // { name: "<%= what[3][0] %>", value: <%= what[3][1] %> },
//   // { name: "<%= what[4][0] %>", value: <%= what[4][1] %> }
// ];

// const dataset = [
//     { name: "<%= what[0][0] %>", value: <%= what[0][1] %> },
//     { name: "<%= what[1][0] %>", value: <%= what[1][1] %> },
//     { name: "<%= what[2][0] %>", value: <%= what[2][1] %> },
//     { name: "<%= what[3][0] %>", value: <%= what[3][1] %> },
//     { name: "<%= what[4][0] %>", value: <%= what[4][1] %> }
//   ];
// const containerWidth = 600;

// donutChart
//     .isAnimated(true)
//     .highlightSliceById(2)
//     // .width(containerWidth)
//     .width(containerWidth)
//     .height(containerWidth)
//     .externalRadius(containerWidth / 2.5)
//     .internalRadius(containerWidth / 5)
//     .on('customMouseOver', function (data) {
//       legendChart.highlight(data.data.id);
//     })
//     .on('customMouseOut', function () {
//       legendChart.clearHighlight();
//     });
// let donutContainer = d3.select('.bar-container');
// donutContainer.datum(dataset).call(donutChart);
// donutContainer.datum(dataset).call(legendChart);
