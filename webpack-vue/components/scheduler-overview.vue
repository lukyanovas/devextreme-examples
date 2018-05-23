<template>
  <div>
    <h2>Scheduler</h2>
    <dx-scheduler
      :dataSource="dataSource"
      :currentDate="currentDate"
      :views="views"
      :groups="groups"
      :resources="resources"
      :height="600"
      :showAllDayPanel="true"
      :firstDayOfWeek="1"
      :startDayHour="8"
      :endDayHour="18"
      currentView="month"
      dataCellTemplate="dataCellTemplate"
      resourceCellTemplate="resourceCellTemplate"
    >
      <div slot="dataCellTemplate" slot-scope="cellData" :class="markWeekEnd(cellData)">
        <div :class="markTraining(cellData)">
            {{cellData.text}}
        </div>
      </div>

      <div slot="resourceCellTemplate" slot-scope="employee">
        <div class='name' :style="'background:' + employee.color">
            <h2>{{employee.text}}</h2>
        </div>
        <div class='avatar'>
            <img :src="employee.data.avatar" />
        </div>
        <div class='info' :style="'color:' + employee.color">
            Age: {{employee.data.age}}
            <br/>
            <b>{{employee.data.discipline}}</b>
        </div>
      </div>
    </dx-scheduler>
    <br />
  </div>  
</template>

<script>

import { DxScheduler } from "devextreme-vue/ui/scheduler";;

export default {
  components: {
    DxScheduler
  },
  methods: {
    markWeekEnd(cellData) {
        function isWeekEnd (date) {
            const day = date.getDay();
            return day === 0 || day === 6;
        }
        const classObject = {}
        classObject["employee-" + cellData.groups.employeeID] = true;
        classObject['employee-weekend-' + cellData.groups.employeeID] = isWeekEnd(cellData.startDate)
        return classObject;
    },
    markTraining(cellData) {
        const classObject = {
            "day-cell": true
        }
        
        classObject[this.getCurrentTraining(cellData.startDate.getDate(), cellData.groups.employeeID)] = true;
        return classObject;
    },
    getCurrentTraining(index, employeeID) {
        var currentTraining,
            result = (index + employeeID) % 3;

        switch(result) {
            case 0:
                currentTraining = "abs-background";
                break;
            case 1:
                currentTraining = "step-background";
                break;
            case 2:
                currentTraining = "fitball-background";
                break;
            default:
                currentTraining = "";
        }

        return currentTraining;
    }
  },
  data: function() {
    return {
        groups: ['employeeID'],
        views: ['month'],
        currentDate: new Date(2016, 7, 2, 11, 30),
        resources: [
            {
                fieldExpr: 'employeeID',
                allowMultiple: false,
                dataSource: employees,
                label: 'Employee'
            }
        ],
        dataSource: data
    };
  }
};

//data.js

var employees = [{
    text : "John Heart",
    id: 1,
    color: "#56ca85",
    avatar: "images/gym/coach-man.png",
    age: 27,
    discipline: "ABS, Fitball, StepFit"
}, {
    text : "Sandra Johnson",
    id: 2,
    color: "#ff9747",
    avatar: "images/gym/coach-woman.png",
    age: 25,
    discipline: "ABS, Fitball, StepFit"
}];

var data = [{ 
        text: "Helen",
        employeeID: 2,
        startDate: new Date(2016, 7, 2, 9, 30),
        endDate: new Date(2016, 7, 2, 11, 30)
    }, {
        text: "Helen",
        employeeID: 2,
       startDate: new Date(2016, 7, 11, 9, 30),
        endDate: new Date(2016, 7, 12, 11, 30)
    }, {
        text: "Alex",
        employeeID: 1,
        startDate: new Date(2016, 7, 3, 9, 30),
        endDate: new Date(2016, 7, 3, 11, 30)
    }, {
        text: "Alex",
        employeeID: 1,
        startDate: new Date(2016, 7, 12, 12, 0),
        endDate: new Date(2016, 7, 12, 13, 0)
    }, {
        text: "Alex",
        employeeID: 2,
        startDate: new Date(2016, 7, 17, 9, 30),
        endDate: new Date(2016, 7, 17, 11, 30)
    }, {
        text: "Stan",
        employeeID: 1,
        startDate: new Date(2016, 7, 8, 9, 30),
        endDate: new Date(2016, 7, 8, 11, 30)
    }, {
        text: "Stan",
        employeeID: 1,
        startDate: new Date(2016, 7, 29, 9, 30),
        endDate: new Date(2016, 7, 29, 11, 30)
    }, {
        text: "Stan",
        employeeID: 1,
        startDate: new Date(2016, 7, 31, 9, 30),
        endDate: new Date(2016, 7, 31, 11, 30)
    },
     {
        text: "Rachel",
        employeeID: 2,
        startDate: new Date(2016, 7, 5, 9, 30),
        endDate: new Date(2016, 7, 5, 11, 30)
    }, {
        text: "Rachel",
        employeeID: 2,
        startDate: new Date(2016, 7, 8, 9, 30),
        endDate: new Date(2016, 7, 8, 11, 30)
    }, {
        text: "Rachel",
        employeeID: 1,
        startDate: new Date(2016, 7, 22, 9, 30),
        endDate: new Date(2016, 7, 22, 11, 30)
    }, {
        text: "Kelly",
        employeeID: 2,
        startDate: new Date(2016, 7, 16, 9, 30),
        endDate: new Date(2016, 7, 16, 11, 30)
    }, {
        text: "Kelly",
        employeeID: 2,
        startDate: new Date(2016, 7, 30, 9, 30),
        endDate: new Date(2016, 7, 30, 11, 30)
    }];


</script>

<style scoped>

.dx-scheduler-date-table-other-month.dx-scheduler-date-table-cell {
    opacity: 1;
    color: rgba(0, 0, 0, 0.3);
}

.dx-template-wrapper {
    position: relative;
}

.avatar{
    width: 155px;
    float: left;
    overflow: hidden;
    position: relative;
    height: 125px;
}

.name {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}

.name h2{
	color: #fff;
    text-align: left;
    padding: 0 0 5px 175px;      
}

.info{
    width: auto;
    text-align: left;
    height: 100%;
    font-size: 11pt;
    font-weight: normal;
    padding: 25px 20px;
    color: #707070;
}
    
.dx-color-scheme-contrast .info{
    color: #FFF;
}

.userInfo div{
    margin: 20px;      
}      

    
.day-cell{
    width: 100%;
    height: 60px;        
    background-position: center bottom;
    background-repeat: no-repeat;
}

.employee-1{
    background-color: rgba(86, 202, 133, 0.1);
}
    
.employee-2{
    background-color: rgba(255, 151, 71, 0.1);
}

.employee-weekend-1{
    background-color: rgba(86, 202, 133, 0.2);
}

.employee-weekend-2{
    background-color: rgba(255, 151, 71, 0.2);
}

.abs-background{
    background-image: url("images/gym/icon-abs.png");
}

.step-background{
    background-image: url("images/gym/icon-step.png");
}

.fitball-background{
    background-image: url("images/gym/icon-fitball.png");
}
</style>
