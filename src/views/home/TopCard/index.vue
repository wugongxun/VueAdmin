<template>
    <div class="container">
        <Detail title="总销售额" content="￥126500">
            <template slot="charts">
                <span>周同比 56.67%</span>
                <span class="iconfont icon-caret-up"></span>
                <span>同日比 19.16%</span>
                <span class="iconfont icon-caret-down"></span>
            </template>
            <template slot="footer">
                <span>日销售额￥12432</span>
            </template>
        </Detail>

        <Detail title="访问量" content="88460">
            <template slot="charts">
                <LineChart></LineChart>
            </template>
            <template slot="footer">
                <span>日访问12432</span>
            </template>
        </Detail>

        <Detail title="支付笔数" content="88460">
            <template slot="charts">
                <BarChart></BarChart>
            </template>
            <template slot="footer">
                <span>转化率65%</span>
            </template>
        </Detail>

        <Detail title="运营活动效果" content="76%">
            <template slot="charts">
                <ProgressBar></ProgressBar>
            </template>
            <template slot="footer">
                <span>周同比 12%</span>
                <span class="iconfont icon-caret-up"></span>
                <span>同日比 11%</span>
                <span class="iconfont icon-caret-down"></span>
            </template>
        </Detail>
    </div>
</template>

<script>
import Detail from "@/views/home/TopCard/Detail";
import LineChart from "@/views/home/TopCard/LineChart";
import BarChart from "@/views/home/TopCard/BarChart";
import ProgressBar from "@/views/home/TopCard/ProgressBar";

export default {
    name: "TopCard",
    components: {ProgressBar, BarChart, LineChart, Detail}
}
</script>

<style scoped lang="less">
    .container {
        display: flex;
        justify-content: space-around;
        gap: 20px;

        .iconfont {
            line-height: 12px;
            vertical-align: bottom;
        }

        .icon-caret-up {
            color: red;
            margin-right: 15px;
        }

        .icon-caret-down {
            color: #0ed829;
        }
    }
</style>
