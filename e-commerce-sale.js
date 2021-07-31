let ecommData = [
  {
    quarter: 'Q4',
    year: 2010,
    UnitPrice: 260521,
    Quantity: 342228
  },
  {
    quarter: 'Q1',
    year: 2011,
    UnitPrice: 471688,
    Quantity: 938827
  },
  {
    quarter: 'Q2',
    year: 2011,
    UnitPrice: 520567,
    Quantity: 1011112
  },
  {
    quarter: 'Q3',
    year: 2011,
    UnitPrice: 521527,
    Quantity: 1347132
  },
  {
    quarter: 'Q4',
    year: 2011,
    UnitPrice: 724499,
    Quantity: 1537151
  },
];

let years = new Set();
ecommData.forEach(d =>{
  years.add(d.year)
});


console.log(years);
years = Array.from(years);
console.log(years);

let yearlyData = [];
years.forEach(year => {
  let yearSum = 0;
  ecommData.forEach(d => {
    if (d.year == year) {
      yearSum += +d.UnitPrice;
    }
  });
  yearlyData.push(yearSum)
});
console.log(yearlyData);


// console.log(e,d)
d3.select('#years p')
  .text('Yearly Sales Amount')

w = 200;
h = 200;
const yearSvg = d3.select('#years svg').selectAll('rect');

yearSvg.data(yearlyData)
  .join('rect')
  .attr('x', 0)
  .attr('y', function (d, i) {
    return document.querySelector('#years svg').clientHeight / 4 * (i + 1);
  })
  .attr('height', function (d, i) {
    return document.querySelector('#years svg').clientHeight / 4 - 5;
  })
  .attr('width', d => d / 15000)
  .attr('id', (d, i) => `${years[i]}`)
  .style('fill', 'rgb(0,0,255)')
  .style('cursor', 'pointer');

yearSvg.data(yearlyData)
  .join('text')
  .attr('x', d => d / 15000 + 10)
  .attr('y', (d, i) => {
    return (document.querySelector('#years svg').clientHeight / 4 * (i + 1) +
      (document.querySelector('#years svg').clientHeight / 4) / 2)
  })
  .text((d, i) => `${years[i]} - $${d}`)
  .style('font-size', '12')
  .style('font-weight', '500')
  .style('fill', 'gray');

d3.select('#quarters p')
  .text('Click on year bar for more details')

d3.select('#years')
  .selectAll('rect')
  .on('click', function (e, d) {
    console.log(this);
    d3.select('#quarters p')
      .text(`${this.id}: Quarterly Break-Up`)


    let quarterlyData = [];
    ecommData.forEach(d => {
      if (this.id == d.year) {
        quarterlyData.push(d)
      }
    });

    const quartersSvg = d3.select('#quarters svg').selectAll('rect');

    quartersSvg.data(quarterlyData)
      .join('rect')
      .attr('x', '0')
      .attr('y', (d, i) => {
        return document.querySelector('#years svg').clientHeight / 6 * (i + 1);
      })
      .attr('height', (d) => {
        return document.querySelector('#years svg').clientHeight / 6 - 5;
      })
      .attr('width', (d) => {
        return (d.UnitPrice) / 3000;
      })
      .attr('id', d => `${d.quarter}`)
      .style('fill', 'skyblue')


    d3.select('#quarters svg')
      .selectAll('text')
      .data(quarterlyData)
      .join('text')
      .attr('x', d => (d.UnitPrice) / 3000 + 10)
      .attr('y', (d, i) => {
        return (document.querySelector('#years svg').clientHeight / 6 * (i + 1) +
          (document.querySelector('#years svg').clientHeight / 6) / 2);
      })
      .text((d, i) => `${d.quarter} - $${(d.UnitPrice)}`)
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('fill', 'gray');


  });

