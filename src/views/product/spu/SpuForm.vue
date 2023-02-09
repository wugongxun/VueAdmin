<template>
    <div class="container">
        <el-form :model="spuForm" label-width="80px" ref="spuForm">
            <el-form-item label="SPU名称">
                <el-input v-model="spuForm.spuName" placeholder="SPU名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select placeholder="品牌" v-model="spuForm.tmId">
                    <el-option :value="tradeMark.id" :label="tradeMark.tmName" v-for="tradeMark in allTradeMarkList" :key="tradeMark.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" rows="4" v-model="spuForm.description" placeholder="SPU描述"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload
                    action="/dev-api/admin/product/fileUpload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :file-list="changedImageList"
                    :on-success="uploadFile">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unselectedSaleAttr.length}个未选择`" v-model="newSelectedSaleAttrId" style="margin-right: 20px;">
                    <el-option :value="saleAttr.id" :label="saleAttr.name" v-for="saleAttr in unselectedSaleAttr" :key="saleAttr.id"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" :disabled="!newSelectedSaleAttrId" @click="addSaleAttr()">添加销售属性</el-button>

                <el-table border style="width: 100%;margin-top: 20px" :data="spuForm.spuSaleAttrList">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="saleAttrName"
                        label="属性名"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="属性名称列表"
                        align="center">
                        <template v-slot="{row, $index}">
                            <el-tag
                                v-for="(tag, index) in row.spuSaleAttrValueList"
                                :key="tag.id"
                                closable
                                type="success"
                                @close="removeTag(row, index)">
                                {{tag.saleAttrValueName}}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="row.inputVisible"
                                v-model="row.inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="$event.target.blur()"
                                @blur="handleInputConfirm(row)">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="row.inputVisible = true">+ 新增属性名称</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="180">
                        <template v-slot="{row, $index}">
                            <el-button type="danger" icon="el-icon-delete" @click="removeSaleAttr($index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-button type="primary" @click="saveSpuInfo()">保存</el-button>
            <el-button type="normal" @click="cancel()">取消</el-button>
        </el-form>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import cloneDeep from "lodash/cloneDeep";
import item from "@/layout/components/Sidebar/Item";

export default {
    name: "SpuForm",
    data() {
        return {
            spuForm: {
                id: "",
                category3Id: "",
                description: "",
                spuImageList: [],
                spuName: "",
                spuSaleAttrList: [],
                tmId: ""
            },
            dialogVisible: false,
            dialogImageUrl: "",
            newSelectedSaleAttrId: "",
            changedImageList: []
        }
    },
    computed: {
        ...mapState("spu", ["spuInfo", "spuImageList", "baseSaleAttrList"]),
        ...mapState("category", ["form"]),
        ...mapState("tradeMark", ["allTradeMarkList"]),
        unselectedSaleAttr() {
            return this.baseSaleAttrList.filter(item => {
                return this.spuForm.spuSaleAttrList.every(selected => {
                     return item.id != selected.baseSaleAttrId;
                });
            });
        }
    },
    methods: {
        ...mapActions("tradeMark", ["toAllTradeMark"]),
        ...mapActions("spu", ["toSpuInfo", "toSpuImageList", "toBaseSaleAttrList", "toSaveOrUpdateSpuInfo"]),
        handleRemove(file, fileList) {
            this.changedImageList = fileList;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        cancel() {
            this.$emit('changeScene', 0)
            this.spuForm = {
                id: "",
                category3Id: "",
                description: "",
                spuImageList: [],
                spuName: "",
                spuSaleAttrList: [],
                tmId: ""
            };
            this.changedImageList = [];
            this.newSelectedSaleAttrId = "";
            this.$refs.spuForm.resetFields();
        },
        async init(row) {
            this.toAllTradeMark();
            this.toBaseSaleAttrList();
            if (row) {
                this.toSpuInfo(row.id).then(res => {
                    this.spuForm = {...this.spuInfo};
                    this.spuForm.spuSaleAttrList.forEach(item => {
                        this.$set(item, "inputVisible", false);
                        this.$set(item, "inputValue", "");
                    });
                });
                this.toSpuImageList(row.id).then(res => {
                    this.changedImageList = this.spuImageList;
                    this.changedImageList.forEach(item => {
                        item.name = item.imgName;
                        item.url = item.imgUrl;
                    });
                });
            }
        },
        handleInputConfirm(row) {
            if (row.inputValue.trim() != "" && !row.spuSaleAttrValueList.some(item => item.saleAttrValueName == row.inputValue)) {
                const {baseSaleAttrId, saleAttrName, spuId, inputValue} = row;
                row.spuSaleAttrValueList.push({baseSaleAttrId, saleAttrName, spuId, saleAttrValueName: inputValue});
            }
            row.inputValue = "";
            row.inputVisible = false;
        },
        removeTag(row, index) {
            row.spuSaleAttrValueList.splice(index, 1);
        },
        removeSaleAttr(index) {
            this.spuForm.spuSaleAttrList.splice(index, 1);
        },
        uploadFile(response, file, fileList) {
            if (response.code == 200) {
                file.url = response.data

            } else {
                fileList.pop();
                this.$message.error(response.message);
            }
            this.changedImageList = fileList;
        },
        addSaleAttr() {
            let find = this.unselectedSaleAttr.find(item => {
                return item.id = this.newSelectedSaleAttrId;
            });
            let newSaleAttr = {
                saleAttrName: find.name,
                baseSaleAttrId: find.id,
                spuId: this.spuForm.id,
                inputVisible: false,
                inputValue: "",
                spuSaleAttrValueList: []
            }
            this.spuForm.spuSaleAttrList.push(newSaleAttr);
            this.newSelectedSaleAttrId = "";
        },
        saveSpuInfo() {
            this.spuForm.spuImageList = this.changedImageList.map(item => {
                return {
                    id: item.id,
                    spuId: item.spuId,
                    imgName: item.name,
                    imgUrl: item.url
                }
            });
            this.spuForm.category3Id = this.form.category3Id;
            this.toSaveOrUpdateSpuInfo(this.spuForm).then(res => {
                let page = this.spuForm.id ? null : 1;
                this.$emit("refreshSpuList", page);
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
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
