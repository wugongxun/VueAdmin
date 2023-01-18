<template>
    <div class="container">
        <!--按钮-->
        <div>
            <el-button type="primary" icon="el-icon-plus" class="plus-btn">添加商品</el-button>
        </div>

        <!--表格-->
        <el-table
            class="table"
            :data="tradeMarkList.records"
            border
        >
            <el-table-column
                type="index"
                label="序号"
                align="center"
                width="60"
            >
            </el-table-column>
            <el-table-column
                prop="tmName"
                label="品牌名称"
                align="center"
            >
            </el-table-column>
            <el-table-column
                label="品牌LOGO"
                align="center"
            >
                <template v-slot="scope">
                    <el-popover placement="top-start" title="" trigger="hover">
                        <div style="width: 150px;height: 150px;display: flex;align-items: center">
                            <img :src="scope.row.logoUrl" alt="" style="width: 150px;">
                        </div>
                        <img slot="reference" :src="scope.row.logoUrl" style="height: 50px;">
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
            >
                <template v-slot="scope">
                    <el-button @click="editHandle(scope.row)" type="warning" icon="el-icon-edit">修改</el-button>
                    <el-button @click="delHandle(scope.row)" type="danger" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页器-->
        <el-pagination
            class="pagination"
            background
            layout="prev, pager, next, jumper, ->, sizes, total"
            :current-page="tradeMarkList.current"
            :page-size="5"
            :page-sizes="[5, 10, 15]"
            :total="tradeMarkList.total"
            @current-change="pageChange"
            @size-change="limitChange"
        >
        </el-pagination>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "TradeMark",
    data() {
        return {
            pager: {
                page: 1,
                limit: 5
            }
        }
    },
    computed: {
        ...mapState("tradeMark", ["tradeMarkList"])
    },
    methods: {
        ...mapActions("tradeMark", ["toTradeMarkList"]),
        editHandle(row) {
            console.log(row);
        },
        delHandle(row) {
            console.log(row);
        },
        pageChange(changePage) {
            let {page, limit} = this.pager;
            page = changePage;
            this.toTradeMarkList({page, limit});
        },
        limitChange(changeLimit) {
            let {page, limit} = this.pager;
            limit = changeLimit;
            this.toTradeMarkList({page, limit});
        }
    },
    mounted() {
        let {page, limit} = this.pager;
        this.toTradeMarkList({page, limit});
    }
}
</script>

<style scoped lang="less">
.container {
    flex: 1;
    display: flex;
    flex-direction: column;

    .plus-btn {
        margin-bottom: 10px;
    }

    .table {
        flex: 1;
    }

    .pagination {
        margin-top: 10px;
        text-align: center;
    }
}
</style>
