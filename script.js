const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 18, value: 'Rs. 25' },
  { minDegree: 19, maxDegree: 54, value: 'Rs. 20' },
  { minDegree: 55, maxDegree: 90, value: 'Rs. 10' },
  { minDegree: 91, maxDegree: 126, value: 'Rs. 100' },
  { minDegree: 127, maxDegree: 162, value: 'Rs. 75' },
  { minDegree: 163, maxDegree: 198, value: 'Rs. 60' },
  { minDegree: 199, maxDegree: 234, value: 'Rs. 50' },
  { minDegree: 235, maxDegree: 270, value: 'Rs. 45' },
  { minDegree: 271, maxDegree: 306, value: 'Rs. 40' },
  { minDegree: 307, maxDegree: 342, value: 'Rs. 30' },
  { minDegree: 343, maxDegree: 360, value: 'Rs. 25' },
];

//Size of each piece
const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [`Rs. 10`, 'Rs. 20', 'Rs. 25', 'Rs. 30', 'Rs. 40', 'Rs. 45', 'Rs. 50', 'Rs. 60', 'Rs. 75', 'Rs. 100'],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
        borderWidth: 0,
      },
    ],
  },
  options: {
    //Responsive chart
    // rotation: 105,
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 18 },
      },
    },
  },
});
var xy = document.getElementById("myAudiofast");
var x = document.getElementById("myAudio");
var y = document.getElementById("myAudioWin");

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}
const uniqueNum = []
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //console.log('Angle Value', angleValue, i.minDegree, i.maxDegree)
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      startConfetti()
      y.play();
      setTimeout(() => {
        stopConfetti();
        if (uniqueNum.length > 98)
          location.reload()
        //spinBtn.click()
      }, 3000)
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  const randomDegreeNew = () => {
    const num = Math.floor(1 + Math.random() * (100 - 1))

    if (uniqueNum.indexOf(num) === -1) {
      console.log('value Selected', num)
      console.log('%ctimes', 'color: #f00', uniqueNum.length)
      uniqueNum.push(num)
      return parseInt(chance[num])
    }
    return randomDegreeNew()
  };
  let randomDegree = randomDegreeNew()
  //console.log('angle', randomDegree)
  let soundrepeat = 0
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    xy.pause();
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    if (resultValue > 5)
      xy.play();

    if (resultValue === 1) {
      soundrepeat += 1
      if (soundrepeat % 17 === 0)
        x.play()
    }
    myChart.options.rotation = myChart.options.rotation + resultValue;

    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 30);
});

