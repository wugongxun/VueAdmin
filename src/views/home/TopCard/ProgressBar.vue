<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
    name: "ProgressBar",
    mounted() {
        echarts.init(this.$refs.echarts).setOption({
            xAxis: {
                show: false,
                min: 0,
                max: 100
            },
            yAxis: {
                show: false,
                type: "category"
            },
            series: [
                {
                    type: "bar",
                    barWidth: 15,
                    color: "#99bf2e",
                    showBackground: true,
                    label: {
                        show: true,
                        formatter: "|",
                        position: "right",
                        color: "#99bf2e"
                    },
                    data: [78]
                }
            ],
            grid: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
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
