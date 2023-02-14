<template>
    <div class="echarts" ref="echarts"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: "LineChart",
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
                    type: "line",
                    smooth: true,
                    itemStyle: {
                        opacity: 0
                    },
                    lineStyle: {
                        color: "#9673d8"
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#9673d8' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#fff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    data: [3, 33, 23, 4, 16, 42, 15]
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
