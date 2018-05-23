<template>
  <div>
    <h2>Gauges</h2>
    <div id="gauge-demo">
        <div id="gauge-container">
            <div class="left-section">
                <dx-circular-gauge
                    :value="speedValue / 2"
                    :size="indicatorSize"
                    :valueIndicator="indicatorColor"
                    :scale="scale"
                    :geometry="coolantGeometry"
                />
                <dx-circular-gauge
                    :value="speedValue / 2"
                    :size="indicatorSize"
                    :valueIndicator="indicatorColor"
                    :scale="invertedScale"
                    :geometry="rpmGeometry"
                />
            </div>
            <div class="center-section">
                <div class="speed-value">
                    <span>{{speedValue}}</span>
                </div>
                <dx-circular-gauge
                    id="speed-gauge"
                    :value="speedValue"
                    :geometry="speedGeometry"
                    :scale="speedScale"
                    :size="speedSize"
                    :valueIndicator="speedValueIndicator"
                />
                <dx-linear-gauge
                    id="fuel-gauge"
                    :value="50 - speedValue * 0.24"
                    :scale="fuelScale"
                    :size="fuelSize"
                    :valueIndicator="fuelValueIndicator"
                />
            </div>
            <div class="right-section">
                <dx-circular-gauge
                    :value="speedValue / 2"
                    :size="indicatorSize"
                    :valueIndicator="indicatorColor"
                    :scale="invertedScale"
                    :geometry="psiGeometry"
                />
                <dx-circular-gauge
                    :value="speedValue / 2"
                    :size="indicatorSize"
                    :valueIndicator="indicatorColor"
                    :scale="scale"
                    :geometry="instantFuelGeometry"
                />
            </div>
        </div>
        <dx-slider 
            id="slider"
            v-model="speedValue"
            :width="155"
            :min="0"
            :max="200"
        />
    </div>
    <br />
  </div>  
</template>

<script>

import { DxCircularGauge, DxLinearGauge, DxSlider } from "devextreme-vue";

export default {
  components: {
    DxCircularGauge,
    DxLinearGauge,
    DxSlider
  },
  data: function() {
    return {
        speedValue: 40,
        indicatorSize: {
            width: 90,
            height:90
        },
        indicatorColor: {
            color: "#f05b41"
        },
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 10
        },
        invertedScale: {
            startValue: 100,
            endValue: 0,
            tickInterval: 10
        },
        coolantGeometry: {
            startAngle: 180,
            endAngle: 90
        },
        rpmGeometry: {
            startAngle: -90,
            endAngle: -180
        },
        psiGeometry: {
            startAngle: 90,
            endAngle: 0
        },
        instantFuelGeometry: {
            startAngle: 0,
            endAngle: -90
        },
        speedGeometry: {
            startAngle: 225,
            endAngle: 315
        },
        speedScale: {
            startValue: 20,
            endValue: 200,
            tickInterval: 20,
            minorTickInterval: 10
        },
        speedValueIndicator: {
            type: "twoColorNeedle",
            color: "transparent",
            secondFraction: 0.24,
            secondColor: "#f05b41",
        },
        speedSize: {
            width: 260 
        },
        fuelScale: {
            startValue: 0,
            endValue: 50,
            tickInterval: 25,
            minorTickInterval: 12.5,
            minorTick: {
                visible: true
            },
            label: {
                visible: false
            }
        },
        fuelValueIndicator: {
            color: "#f05b41",
            size: 8,
            offset: 7 
        },
        fuelSize: {
            width: 90,
            height: 20
        }
    };
  }
};

</script>

<style>

#gauge-demo {
    height: 500px;
}

#gauge-container {
    text-align: center;
    margin: 20px auto;
    background-image: url('images/mask.png');
    background-repeat: no-repeat;
    width: 786px;
    height: 500px;
}

#gauge-container > div {
    display: inline-block;
    position: relative;
}

.left-section {
    top: -20px;
    left: -40px;
}

.center-section {
    top: 25px;
}

.right-section {
    top: -20px;
    right: -40px;
}

.speed-value {
    position: absolute;
    border: 2px solid #f05b41;
    border-radius: 50%;
    width: 110px;
    height: 110px;
    left: 28%;
    top: 36%;
    line-height: 100px;
}

.speed-value > span {
    font-size: 50px;
    font-weight: lighter;
    color: #f05b41;
}

#fuel-gauge {
    position: absolute;
    left: 34%;
    bottom: 5%;
}

#slider {
    position: relative;
    top: -105px;
    margin: 0 auto;
}

#slider .dx-slider-handle {
    background-color: #f05b41;
    width: 16px;
    height: 16px;
    margin-top: -8px;
    margin-right: -8px;
    border-radius: 50%;
    border: none;
}

#slider .dx-slider-handle .dx-inkripple-wave {
    background: none;
}

#slider .dx-slider-handle:after {
    background-color: #f05b41;
}

#slider .dx-slider-range.dx-slider-range-visible {
    border-color: #f05b41;
    background-color: #f05b41;
}
</style>
