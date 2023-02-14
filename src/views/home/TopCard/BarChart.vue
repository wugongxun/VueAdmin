<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
    name: "BarChart",
    mounted() {
        echarts.init(this.$refs.echarts).setOption({
            xAxis: {
                show: false,
                type: "category"
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: "bar",
                    data: [3, 8, 19, 5, 22, 45, 12]
                }
            ],
            grid: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },
            tooltip: {
                show: true
            }
        });
    }
}
</script>

<style scoped>
.echarts {
    width: 100%;
    height: 100%;
}
</style>
