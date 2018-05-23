<template>
    <div>
        <data-grid-overview />
        <pivot-grid-overview />
        <tree-list-overview />
        <scheduler-overview />
        <charts-overview />
        <gauges-overview />
    </div>
</template>

<script>

import DataGridOverview from "./components/data-grid-overview";
import PivotGridOverview from "./components/pivot-grid-overview";
import TreeListOverview from "./components/tree-list-overview";
import SchedulerOverview from "./components/scheduler-overview";
import ChartsOverview from "./components/charts-overview";
import GaugesOverview from "./components/gauges-overview";


export default {
    components: {
        DataGridOverview,
        PivotGridOverview,
        TreeListOverview,
        SchedulerOverview,
        ChartsOverview,
        GaugesOverview
    },
    name: "app"
}
</script>