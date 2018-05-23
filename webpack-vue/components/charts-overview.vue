<template>
  <div>
    <h2>Charts</h2>
    <dx-chart
        id="chart"
        palette="Harmony Light"
        title="Pizza Shop Complaints"
        :dataSource="dataSource"
        :argumentAxis="argumentAxis"
        :tooltip="tooltip"
        :valueAxis="valueAxis"
        :commonSeriesSettings="commonSeriesSettings"
        :series="series"
        :legend="legend"
    >
    </dx-chart>
    <br />
  </div>  
</template>

<script>

import { DxChart } from "devextreme-vue/ui/chart";

export default {
  components: {
    DxChart
  },
  computed: {
      dataSource() {
        let data = complaintsData.sort(function (a, b) {
                return b.count - a.count;
            }),
            totalCount = data.reduce(function (prevValue, item) {
                return prevValue + item.count;
            }, 0),
            cumulativeCount = 0;

        return data.map(function (item, index) {
            cumulativeCount += item.count;
            return {
                complaint: item.complaint,
                count: item.count,
                cumulativePercentage: Math.round(cumulativeCount * 100 / totalCount)
            };
        });
      }
  },
  data: function() {
    return {
        argumentAxis: {
            label: {
                overlappingBehavior: "stagger"
            }
        },
        tooltip: {
            enabled: true,
            shared: true,
            customizeTooltip: function (info) {
                return {
                    html: "<div><div class='tooltip-header'>" +
                    info.argumentText + "</div>" +
                    "<div class='tooltip-body'><div class='series-name'>" +
                    info.points[0].seriesName +
                    ": </div><div class='value-text'>" +
                    info.points[0].valueText +
                    "</div><div class='series-name'>" +
                    info.points[1].seriesName +
                    ": </div><div class='value-text'>" +
                    info.points[1].valueText +
                    "% </div></div></div>"
                };
            }
        },
        valueAxis: [{
            name: "frequency",
            position: "left",
            tickInterval: 300
        }, {
            name: "percentage",
            position: "right",
            showZero: true,
            label: {
                customizeText: function (info) {
                    return info.valueText + "%";
                }
            },
            constantLines: [{
                value: 80,
                color: "#fc3535",
                dashStyle: "dash",
                width: 2,
                label: { visible: false }
            }],
            tickInterval: 20,
            valueMarginsEnabled: false
        }],
        commonSeriesSettings: {
            argumentField: "complaint"
        },
        series: [{
            type: "bar",
            valueField: "count",
            axis: "frequency",
            name: "Complaints frequency",
            color: "#fac29a"
        }, {
            type: "spline",
            valueField: "cumulativePercentage",
            axis: "percentage",
            name: "Cumulative percentage",
            color: "#6b71c3"
        }],
        legend: {
            verticalAlignment: "top",
            horizontalAlignment: "center"
        }
    };
  }
};

//data.js

var complaintsData = [
    { complaint: "Pizza is cold", count: 780 },
    { complaint: "Inadequate cheese quantity", count: 120 },
    { complaint: "Not baked properly", count: 52 },
    { complaint: "Delayed delivery", count: 1123 },
    { complaint: "Damaged delivery", count: 321 },
    { complaint: "Incorrect billing", count: 89 },
    { complaint: "Wrong size delivered", count: 222 }
];

</script>

<style>

#chart {
    height: 440px;
}

.tooltip-header {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid #c5c5c5;
}

.tooltip-body {
    width: 170px;
}

.tooltip-body .series-name {
    font-weight: normal;
    opacity: 0.6;
    display: inline-block;
    line-height: 1.5;
    padding-right: 10px;
    width: 126px;
}

.tooltip-body .value-text {
    display: inline-block;
    line-height: 1.5;
    width: 30px;
}
</style>
