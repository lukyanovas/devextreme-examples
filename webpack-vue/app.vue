<template>
    <div>
        <data-grid-overview />
        <pivot-grid-overview />
    </div>
</template>

<script>

import DataGridOverview from "./components/data-grid-overview";
import PivotGridOverview from "./components/pivot-grid-overview";

export default {
    components: {
        DataGridOverview,
        PivotGridOverview
    },
    name: "app"
}
</script>