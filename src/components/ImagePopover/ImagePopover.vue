<template>
    <el-popover placement="top-start" title="" trigger="hover">
        <div style="width: 150px;height: 150px;text-align: center;">
            <img :src="url" alt="" style="width: 150px;margin-top: 50%;transform: translateY(-50%);">
        </div>
        <img slot="reference" :src="url" :style="`height: ${height}px`">
    </el-popover>
</template>

<script>
export default {
    name: "ImagePopover",
    props: ["url", "height"]
}
</script>

<style scoped>

</style>
