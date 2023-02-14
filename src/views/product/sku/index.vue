<template>
    <el-card>
        <!--表格-->
        <el-table border :data="skuInfoList.records">
            <el-table-column
                type="index"
                width="60"
                label="序号"
                align="center">
            </el-table-column>
            <el-table-column
                prop="skuName"
                width="240"
                label="名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="skuDesc"
                width="240"
                label="描述"
                align="center">
            </el-table-column>
            <el-table-column
                width="180"
                label="默认图片"
                align="center">
                <template v-slot="{row, $index}">
                    <ImagePopover :url="row.skuDefaultImg" :height="50"></ImagePopover>
                </template>
            </el-table-column>
            <el-table-column
                prop="weight"
                width="180"
                label="重量(KG)"
                align="center">
            </el-table-column>
            <el-table-column
                prop="price"
                width="180"
                label="价格(元)"
                align="center">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template v-slot="{row, $index}">
                    <el-button type="warning" icon="el-icon-bottom" v-if="row.isSale == 1" @click="cancelSale(row)"></el-button>
                    <el-button type="success" icon="el-icon-top" v-else @click="onSale(row)"></el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="$message.info('正在开发中~')"></el-button>
                    <el-button type="info" icon="el-icon-info" @click="showSku(row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--分页器-->
        <el-pagination
            background
            layout="prev, pager, next, jumper, ->, sizes, total"
            :current-page="skuInfoList.current"
            :page-size="pager.limit"
            :page-sizes="[5, 10, 15]"
            :total="skuInfoList.total"
            @current-change="pageChange"
            @size-change="limitChange">
        </el-pagination>

        <!--抽屉-->
        <el-drawer
            :withHeader="false"
            :visible.sync="drawer"
            size="50%">
            <div class="skuInfoDetail">
                <div class="row">
                    <label>名称</label>
                    <span>{{skuInfo.skuName}}</span>
                </div>
                <div class="row">
                    <label>描述</label>
                    <span>{{skuInfo.skuDesc}}</span>
                </div>
                <div class="row">
                    <label>价格</label>
                    <span>{{skuInfo.price}}</span>
                </div>
                <div class="row">
                    <label>平台属性</label>
                    <span>
                        <el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id">{{attr.valueName}}</el-tag>
                    </span>
                </div>
                <div class="row">
                    <label>商品图片</label>
                    <el-carousel height="500px">
                        <el-carousel-item v-for="img in skuInfo.skuImageList" :key="img.id">
                            <img :src="img.imgUrl" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </el-drawer>
    </el-card>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "Sku",
    data() {
        return {
            pager: {
                page: 1,
                limit: 10
            },
            drawer: false
        }
    },
    computed: {
        ...mapState("sku", ["skuInfoList", "skuInfo"])
    },
    methods: {
        ...mapActions("sku", ["toSkuInfoList", "toOnSale", "toCancelSale", "toSkuById"]),
        pageChange(changePage) {
            this.pager.page = changePage;
            this.toSkuInfoList(this.pager);
        },
        limitChange(changeLimit) {
            this.pager.limit = changeLimit;
            this.toSkuInfoList(this.pager);
        },
        onSale(row) {
            this.toOnSale(row.id).then(res => {
                this.$message.success("上架成功");
                row.isSale = 1;
            });
        },
        async cancelSale(row) {
            this.toCancelSale(row.id).then(res => {
                this.$message.success("下架成功");
                row.isSale = 0;
            });
        },
        async showSku(row) {
            await this.toSkuById(row.id);
            this.drawer = true;
        }
    },
    mounted() {
        this.toSkuInfoList(this.pager);
    }
}
</script>

<style scoped lang="less">
.el-pagination {
    text-align: center;
    margin-top: 20px;
}

.skuInfoDetail {
    height: 100%;
    padding: 20px;
    font-size: 18px;
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    flex-direction: column;

    .row {
        display: flex;

        label {
            width: 20%;
            margin-right: 20px;
            text-align: right;
            line-height: 32px;
        }

        span {
            flex: 1;
            line-height: 32px;

            .el-tag {
                margin-left: 10px;
            }
        }
        .el-carousel {
            flex: 1;

            .el-carousel__item {
                text-align: center;

                img {
                    height: 100%;
                }
            }

            /deep/.el-carousel__button {
                background-color: #1482f0;
                height: 30px;
                width: 30px;
                border-radius: 50%;
            }
        }
    }
}



</style>
