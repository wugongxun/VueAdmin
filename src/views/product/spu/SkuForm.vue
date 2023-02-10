<template>
    <div>
        <el-form label-width="80px" :model="skuInfo">
            <el-form-item label="SPU名称">
                {{ spuName }}
            </el-form-item>

            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
            </el-form-item>

            <el-form-item label="价格(元)">
                <el-input-number controls-position="right" :min="0" placeholder="价格(元)" v-model="skuInfo.price"></el-input-number>
            </el-form-item>

            <el-form-item label="重量(千克)">
                <el-input-number controls-position="right" :min="0" placeholder="重量(千克)" v-model="skuInfo.weight"></el-input-number>
            </el-form-item>

            <el-form-item label="规格描述">
                <el-input type="textarea" placeholder="规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
            </el-form-item>

            <el-form-item label="平台属性">
                <el-form label-width="80px" :inline="true">
                    <el-form-item :label="attrInfo.attrName" v-for="attrInfo in attrInfoList" :key="attrInfo.id">
                        <el-select v-model="attrInfo.selected" placeholder="请选择">
                            <el-option :value="`${attrInfo.id}:${attrValue.id}`"
                                       :label="attrValue.valueName"
                                       v-for="(attrValue, index) in attrInfo.attrValueList"
                                       :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>

            <el-form-item label="销售属性">
                <el-form label-width="80px" :inline="true">
                    <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in saleAttrList" :key="saleAttr.id">
                        <el-select v-model="saleAttr.selected" placeholder="请选择">
                            <el-option :value="`${saleAttr.id}:${saleAttrValue.id}`"
                                       :label="saleAttrValue.saleAttrValueName"
                                       v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
                                       :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>

            <el-form-item>
                <el-table border :data="spuImageList" @selection-change="handlerSelect">
                    <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        label="图片"
                        align="center">
                        <template v-slot="{row, $index}">
                            <ImagePopover :url="row.imgUrl" :height="50"></ImagePopover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="名称"
                        align="center"
                        prop="imgName">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template v-slot="{row, $index}">
                            <el-button type="primary" v-if="row.isDefault == '0'" @click="setDefault(row)">设为默认</el-button>
                            <el-tag type="success" disable-transitions v-else>默认</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveSkuInfo()">保存</el-button>
                <el-button @click="cancel()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "SkuForm",
    data() {
        return {
            spuName: "",
            selectedImage: [],
            skuInfo: {
                category3Id: "",
                id: "",
                price: 0,
                skuAttrValueList: [],
                skuDefaultImg: "",
                skuDesc: "",
                skuImageList: [],
                skuName: "",
                skuSaleAttrValueList: [],
                spuId: "",
                tmId: "",
                weight: 0
            }
        }
    },
    computed: {
        ...mapState("sku", ["spuImageList", "saleAttrList", "attrInfoList"]),
        ...mapState("category", ["form"])
    },
    methods: {
        ...mapActions("sku", ["toSpuImageList", "toSaleAttrList", "toAttrInfoList", "toSaveSkuInfo"]),
        cancel() {
            Object.assign(this._data, this.$options.data());
            this.$emit("changeScene", 0);
        },
        init(row) {
            this.spuName = row.spuName;
            this.skuInfo.spuId = row.id;
            this.skuInfo.tmId = row.tmId;
            this.skuInfo.category3Id = this.form.category3Id;
            this.toSpuImageList(row.id).then(res => {
                this.spuImageList.forEach(item => {
                    this.$set(item, "isDefault", "0");
                });
            });
            this.toSaleAttrList(row.id);
            this.toAttrInfoList(this.form);
        },
        handlerSelect(selection) {
            this.selectedImage = selection;
        },
        setDefault(row) {
            this.spuImageList.forEach(item => {
                item.isDefault = "0";
            });
            row.isDefault = "1";
            this.skuInfo.skuDefaultImg = row.imgUrl;
        },
        saveSkuInfo() {
            this.attrInfoList.forEach(item => {
                if (item.selected) {
                    let [attrId, valueId] = item.selected.split(":");
                    this.skuInfo.skuAttrValueList.push({
                        attrId,
                        valueId,
                        attrName: item.attrName,
                        valueName: item.attrValueList.find(item => item.id = valueId).valueName
                    });
                }
            });

            this.saleAttrList.forEach(item => {
                if (item.selected) {
                    let [saleAttrId, saleAttrValueId] = item.selected.split(":");
                    this.skuInfo.skuSaleAttrValueList.push({
                        saleAttrId,
                        saleAttrValueId,
                        saleAttrName: item.saleAttrName,
                        saleAttrValueName: item.spuSaleAttrValueList.find(item => item.id = saleAttrValueId).saleAttrValueName,
                        spuId: this.skuInfo.spuId
                    });
                }
            });

            this.skuInfo.skuImageList = this.selectedImage;
            this.toSaveSkuInfo(this.skuInfo).then(res => {
                this.$message.success(res);
                this.cancel();
            }).catch(res => {
                this.$message.error(res);
            });
        }
    }
}
</script>

<style scoped>

</style>
