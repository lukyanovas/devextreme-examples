<template>
    <div>
        <data-grid-overview />
        <pivot-grid-overview />
        <tree-list-overview />
        <scheduler-overview />
        <charts-overview />
        <gauges-overview />
        <navigation-overview />
        <editors-overview />
        <forms-overview />
        <actions-overview />
    </div>
</template>

<script>

import DataGridOverview from "./components/data-grid-overview";
import PivotGridOverview from "./components/pivot-grid-overview";
import TreeListOverview from "./components/tree-list-overview";
import SchedulerOverview from "./components/scheduler-overview";
import ChartsOverview from "./components/charts-overview";
import GaugesOverview from "./components/gauges-overview";
import NavigationOverview from "./components/navigation-overview";
import EditorsOverview from "./components/editors-overview";
import FormsOverview from "./components/forms-overview";
import ActionsOverview from "./components/actions-overview";


export default {
    components: {
        DataGridOverview,
        PivotGridOverview,
        TreeListOverview,
        SchedulerOverview,
        ChartsOverview,
        GaugesOverview,
        NavigationOverview,
        EditorsOverview,
        FormsOverview,
        ActionsOverview
    },
    name: "app"
}
</script>