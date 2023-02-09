<template>
    <a :title="title" class="hint-button">
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
</template>

<script>
export default {
    name: "HintButton",
    props: ["title"]
}
</script>

<style scoped>
.hint-button {
    margin: 0 5px;
}
</style>
