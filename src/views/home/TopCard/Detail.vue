<template>
    <el-card class="container">
        <div class="card-header">
            <span>{{title}}</span>
            <span class="iconfont icon-info-circle"></span>
        </div>
        <div class="card-content">{{content}}</div>
        <div class="card-charts">
            <slot name="charts"></slot>
        </div>
        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "Detail",
    props: ["title", "content"]
}
</script>

<style scoped lang="less">
.container {
    width: 100%;

    /deep/.el-card__body {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 10px;

        .card-header {
            display: flex;
            justify-content: space-between;
            color: #8a8a8a;
        }

        .card-content {
            font-size: 26px;
            color: #333;
        }

        .card-charts {
            font-size: 12px;
            height: 40px;
            display: flex;
            align-items: end;
        }

        .card-footer {
            border-top: 1px solid #dedddd;
            padding-top: 10px;
        }
    }


}
</style>
