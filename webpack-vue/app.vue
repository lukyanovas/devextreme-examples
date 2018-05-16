<template>
    <div>
        <data-grid-overview />
        <pivot-grid-overview />
        <tree-list-overview />
    </div>
</template>

<script>

import DataGridOverview from "./components/data-grid-overview";
import PivotGridOverview from "./components/pivot-grid-overview";
import TreeListOverview from "./components/tree-list-overview";

export default {
    components: {
        DataGridOverview,
        PivotGridOverview,
        TreeListOverview
    },
    name: "app"
}
</script>