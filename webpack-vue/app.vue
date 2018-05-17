<template>
    <div>
        <data-grid-overview />
        <pivot-grid-overview />
        <tree-list-overview />
        <scheduler-overview />
    </div>
</template>

<script>

import DataGridOverview from "./components/data-grid-overview";
import PivotGridOverview from "./components/pivot-grid-overview";
import TreeListOverview from "./components/tree-list-overview";
import SchedulerOverview from "./components/scheduler-overview";

export default {
    components: {
        DataGridOverview,
        PivotGridOverview,
        TreeListOverview,
        SchedulerOverview
    },
    name: "app"
}
</script>