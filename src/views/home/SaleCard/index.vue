<template>
    <el-card>
        <template slot="header">
            <el-tabs v-model="activeName">
                <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
                <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
            </el-tabs>

            <div class="header-right">
                <ul>
                    <li>今年</li>
                    <li>本周</li>
                    <li>本月</li>
                    <li>本年</li>
                </ul>

                <el-date-picker
                    class="date-picker"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00']"
                    size="mini">
                </el-date-picker>
            </div>
        </template>
        <div class="content-left" ref="charts"></div>
        <div class="content-right">
            <h3>门店销售额排名</h3>
            <ul>
                <li>
                    <span class="index top3">1</span>
                    <span class="name">肯德基</span>
                    <span class="num">14478</span>
                </li>
                <li>
                    <span class="index top3">2</span>
                    <span class="name">肯德基</span>
                    <span class="num">14478</span>
                </li>
                <li>
                    <span class="index top3">3</span>
                    <span class="name">肯德基</span>
                    <span class="num">14478</span>
                </li>
                <li>
                    <span class="index">4</span>
                    <span class="name">肯德基</span>
                    <span class="num">14478</span>
                </li>
                <li>
                    <span class="index">5</span>
                    <span class="name">肯德基</span>
                    <span class="num">14478</span>
                </li>
                <li>
                    <span class="index">6</span>
                    <span class="name">肯德基</span>
                    <span class="num">14478</span>
                </li>
                <li>
                    <span class="index">7</span>
                    <span class="name">肯德基</span>
                    <span class="num">14478</span>
                </li>
            </ul>
        </div>
    </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
    name: "SaleCard",
    data() {
        return {
            activeName: "销售额"
        }
    },
    mounted() {
        echarts.init(this.$refs.charts).setOption({
            title: {
                text: "销售额趋势",
                left: "20px",
                top: "20px"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '20%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220, 399, 255, 177, 256, 78]
                }
            ]
        });
    }
}
</script>

<style scoped lang="less">
.el-card {
    margin-top: 20px;


    /deep/ .el-card__header {
        padding: 0;
        border: 0;
        position: relative;

        .el-tabs {

            .el-tabs__header {
                margin-bottom: 0;
                border-bottom: 0;

                .el-tabs__nav-scroll {
                    padding: 0 20px;
                }

            }
        }

        .header-right {
            position: absolute;
            right: 0;
            top: 0;

            ul {
                display: inline-block;
                list-style: none;
                height: 100%;
                margin: 0;
                padding: 0;
                vertical-align: middle;

                li {
                    display: inline-block;
                    width: 60px;
                    line-height: 40px;
                    text-align: center;
                    padding: 0 10px;
                }
            }

            .date-picker {
                width: 200px;
                margin-right: 10px;
            }
        }
    }


    /deep/ .el-card__body {
        padding: 0;

        .content-left {
            float: left;
            width: 80%;
            height: 500px;
            overflow: hidden;
        }

        .content-right {
            box-sizing: border-box;
            padding: 10px 0;
            float: right;
            width: 20%;
            height: 500px;

            h3 {
                height: 8%;
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                height: 90%;
                font-size: 18px;


                li {
                    height: 12%;
                    vertical-align: middle;

                    .index {
                        display: inline-block;
                        margin-right: 30px;
                        width: 24px;
                        height: 24px;
                        line-height: 25px;
                        border-radius: 50%;
                        text-align: center;
                    }

                    .top3 {
                        background-color: black;
                        color: #ffffff;
                    }

                    .num {
                        float: right;
                        margin-right: 30px;
                    }
                }
            }
        }
    }

}
</style>
