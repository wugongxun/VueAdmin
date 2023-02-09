<template>
    <div class="container">
        <el-card>
            <Category :show="scene != 0" @getSpuList="getSpuList"></Category>
        </el-card>
        <el-card>
            <!--spu列表-->
            <div v-show="scene == 0">
                <!--添加按钮-->
                <el-button type="primary" icon="el-icon-plus" @click="addSpu()" :disabled="form.category3Id == ''">添加SPU</el-button>

                <!--表格-->
                <el-table border style="width: 100%;" :data="spuList">
                    <el-table-column
                        type="index"
                        align="center"
                        label="序号"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="spuName"
                        align="center"
                        label="spu名称">
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        align="center"
                        label="spu描述">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template v-slot="{row, $index}">
                            <hint-button type="success" icon="el-icon-plus" title="添加sku" @click="addSku(row)"></hint-button>
                            <hint-button type="warning" icon="el-icon-edit" title="修改spu" @click="updateSpu(row)"></hint-button>
                            <hint-button type="info" icon="el-icon-info" title="查看当前spu全部sku列表"></hint-button>
                            <el-popconfirm :title="`确认删除${row.spuName}吗？`" @onConfirm="deleteSpu(row)">
                                <hint-button type="danger" icon="el-icon-delete" title="删除spu" slot="reference"></hint-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>

                <!--分页器-->
                <el-pagination
                    background
                    layout="prev, pager, next, jumper, ->, sizes, total"
                    :page-sizes="[5, 10, 20, 30]"
                    :current-page="pager.page"
                    :page-size="pager.limit"
                    :total="total"
                    @current-change="currentChange"
                    @size-change="sizeChange">
                </el-pagination>
            </div>

            <!--修改或者添加spu-->
            <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spuForm" @refreshSpuList="getSpuList"></SpuForm>

            <!--添加sku-->
            <SkuForm v-show="scene == 2" @changeScene="changeScene" ref="skuForm">

            </SkuForm>
        </el-card>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import SpuForm from "@/views/product/spu/SpuForm";
import SkuForm from "@/views/product/spu/SkuForm";

export default {
    name: "Spu",
    components: {SkuForm, SpuForm},
    data() {
        return {
            pager: {
                page: 1,
                limit: 5
            },
            scene: 0 //0展示spu列表，1展示修改或者添加spu，2展示添加sku
        }
    },
    computed: {
        ...mapState("category", ["form"]),
        total() {
            return this.$store.getters.total;
        },
        spuList() {
            return this.$store.getters.spuList;
        }
    },
    methods: {
        ...mapActions("spu", ["toSpuList", "toDeleteSpu"]),
        ...mapActions("tradeMark", ["toAllTradeMark"]),
        getSpuList(page) {
            if (page) {
                this.pager.page = page;
            }
            this.toSpuList(Object.assign(this.pager, this.form));
        },
        currentChange(page) {
            this.pager.page = page;
            this.getSpuList();
        },
        sizeChange(limit) {
            this.pager.limit = limit;
            this.getSpuList();
        },
        changeScene(scene) {
            this.scene = scene;
        },
        addSpu() {
            this.$refs.spuForm.init();
            this.scene = 1;
            this.isShowTable = false;
        },
        updateSpu(row) {
            this.$refs.spuForm.init(row);
            this.scene = 1;
            this.isShowTable = false;
        },
        async deleteSpu(row) {
            await this.toDeleteSpu(row.id);
            if (this.spuList.length == 1) {
                this.pager.page--;
            }
            this.getSpuList();
        },
        addSku(row) {
            this.$refs.skuForm.init(row);
            this.scene = 2;
        }
    }
}
</script>

<style scoped lang="less">
.container {

    .el-card {
        margin: 20px;

        .el-table {
            margin: 20px 0;
        }

        .el-pagination {
            text-align: center;
        }
    }

}
</style>
