import { Component, OnInit, AfterViewInit } from "@angular/core";

//change import for chart.js to chart.js/auto
// import { Chart } from "chart.js";

import Chart from "chart.js/auto";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCharts();
  }

  initCharts() {
    this.drawLineChart();
    this.drawBarChart();
    this.drawRadarChart();
    this.drawDougnutChart();
  }
  //detail chart edit type by insert type HTMLCanvasElement and update option insert plugins
  drawDougnutChart() {
    const ctx = document.getElementById("canvasDoughnut") as HTMLCanvasElement;

    const canvasDoughnut = new Chart(ctx, {
      type: "doughnut",
      // tooltipFillColor: "rgba(51, 51, 51, 0.55)",
      data: {
        labels: [
          "Dark Grey",
          "Purple Color",
          "Gray Color",
          "Green Color",
          "Blue Color",
        ],
        datasets: [
          {
            data: [120, 50, 140, 180, 100],
            backgroundColor: [
              "#455C73",
              "#9B59B6",
              "#BDC3C7",
              "#26B99A",
              "#3498DB",
            ],
            hoverBackgroundColor: [
              "#34495E",
              "#B370CF",
              "#CFD4D8",
              "#36CAAB",
              "#49A9EA",
            ],
          },
        ],
      },

      options: {
        plugins: {
          subtitle: {
            display: false,
          },
        },
      },
    });
  }

  drawRadarChart() {
    const ctx = document.getElementById("canvasRadar") as HTMLCanvasElement;
    const canvasRadar = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Eating",
          "Drinking",
          "Sleeping",
          "Designing",
          "Coding",
          "Cycling",
          "Running",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 90, 81, 56, 55, 40],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
          {
            label: "My Second Dataset",
            data: [28, 48, 40, 19, 96, 27, 100],
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
          },
        ],
      },

      options: {
        plugins: {
          subtitle: {
            display: false,
          },
        },
      },
    });
  }

  drawBarChart() {
    const ctx = document.getElementById("barChart") as HTMLCanvasElement;
    const barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "# of Votes",
            backgroundColor: "#26B99A",
            data: [51, 30, 40, 28, 92, 50, 45],
          },
          {
            label: "# of Votes",
            backgroundColor: "#03586A",
            data: [41, 56, 25, 48, 72, 34, 12],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }

  drawLineChart() {
    var ctx = document.getElementById("lineChart") as HTMLCanvasElement;
    var lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [31, 74, 6, 39, 20, 85, 7],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(3, 88, 106, 0.3)",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            pointBorderWidth: 1,
            data: [82, 23, 66, 9, 99, 4, 2],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }
}
