<template>
    <div class="container">
        <el-card class="card">
            <Category :show="!isShowTable"></Category>
        </el-card>
        <el-card class="card">

            <div v-show="isShowTable">
                <!--按钮-->
                <el-button type="primary" icon="el-icon-plus" class="plus-btn" @click="addAttr()" :disabled="!form.category3Id">添加属性</el-button>

                <!--表格-->
                <el-table
                    :data="attrInfoList"
                    border
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="attrName"
                        label="属性名称"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="属性值列表"
                        align="center">
                        <template v-slot="scope">
                            <el-tag class="tag" type="success" v-for="attrValue in scope.row.attrValueList" :key="attrValue.id">{{attrValue.valueName}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="180">
                        <template v-slot="{row}">
                            <el-button type="warning" icon="el-icon-edit" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`确认删除${row.attrName}吗？`" @onConfirm="deleteAttr(row.id)">
                                <el-button type="danger" icon="el-icon-delete" slot="reference"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--添加或者修改属性-->
            <div v-show="!isShowTable">
                <el-form inline ref="form" label-width="60px">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
                    </el-form-item>
                </el-form>

                <el-button type="primary" icon="el-icon-plus" @click="addAttrValue()" :disabled="attrInfo.attrName == ''">添加属性值</el-button>
                <el-button type="normal">取消</el-button>

                <el-table border style="width: 100%" :data="attrInfo.attrValueList">
                    <el-table-column
                        label="序号"
                        type="index"
                        align="center"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="valueName"
                        label="属性值名称"
                        align="center">
                        <template v-slot="{row, $index}">
                            <el-input placeholder="请输入属性值名称"
                                      size="mini"
                                      v-model="row.valueName"
                                      v-if="row.flag || row.valueName.length == 0"
                                      @blur="row.flag = false"
                                      @keyup.native.enter="row.flag = false"
                                      :ref="`input${$index}`"/>
                            <p v-else style="margin: 0;" @click="toEdit(row, $index)">{{row.valueName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template v-slot="{row, $index}">
                            <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                                <el-button type="danger"
                                           icon="el-icon-delete"
                                           size="mini"
                                           slot="reference">
                                </el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>

                <el-button type="primary" @click="saveAttrInfo()" :disabled="attrInfo.attrValueList.length == 0">保存</el-button>
                <el-button type="normal" @click="isShowTable = true">取消</el-button>
            </div>


        </el-card>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import cloneDeep from "lodash/cloneDeep"

export default {
    name: "Attr",
    data() {
        return {
            isShowTable: true,
            attrInfo: {
                attrName: "",
                attrValueList: [],
                categoryId: "",
                categoryLevel: 3,
                id: ""
            }
        }
    },
    computed: {
        ...mapState("attr", ["attrInfoList"]),
        ...mapState("category", ["form"])
    },
    watch: {
        isShowTable(newValue, oldVal) {
            if (newValue) {
                this.attrInfo = {
                    attrName: "",
                    attrValueList: [],
                    categoryId: "",
                    categoryLevel: 3,
                    id: ""
                };
            }
        }
    },
    methods: {
        ...mapActions("attr", ["toSaveAttrInfo", "toAttrInfoList", "toDeleteAttrInfo"]),
        addAttr() {
            this.attrInfo.categoryId = this.form.category3Id;
            this.isShowTable = false;
        },
        updateAttr(row) {
            this.attrInfo = cloneDeep(row);
            this.attrInfo.attrValueList.forEach(item => {
                //item.flag = false;添加属性不是响应式的
                this.$set(item, "flag", false);
            });
            this.isShowTable = false;
        },
        async deleteAttr(attrId) {
            await this.toDeleteAttrInfo(attrId);
            await this.toAttrInfoList(this.form);
        },
        addAttrValue() {
            this.attrInfo.attrValueList.push({attrId: this.attrInfo.id, valueName: "", flag: true});
            this.$nextTick(() => {
                this.$refs[`input${this.attrInfo.attrValueList.length - 1}`].focus();
            });
        },
        deleteAttrValue(index) {
            this.attrInfo.attrValueList.splice(index, 1);
        },
        toEdit(row, index) {
            row.flag = true;
            this.$nextTick(() => {
                this.$refs[`input${index}`].focus();
            });
        },
        saveAttrInfo() {
            this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
                if (item.valueName != '') {
                    delete item.flag;
                    return true;
                }
            });

            this.toSaveAttrInfo(this.attrInfo).then(() => {
                this.$message.success("保存成功");
                this.toAttrInfoList(this.form);
                this.isShowTable = true;
            }).catch(res => {
                this.$message.error(res);
            });
        }
    }
}
</script>

<style scoped lang="less">
.container {
    .card {
        margin: 20px 0;

        .el-table {
            margin: 20px 0;

            .el-button {
                margin: 0 5px;
            }
        }

        .el-tag {
            margin: 0 5px;
        }
    }
}


</style>
