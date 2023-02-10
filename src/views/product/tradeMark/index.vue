<template>
    <div class="container">
        <!--按钮-->
        <div>
            <el-button type="primary" icon="el-icon-plus" class="plus-btn" @click="dialogFormVisible = true">添加品牌</el-button>
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
                <template v-slot="{row}">
                    <ImagePopover :url="row.logoUrl" :height="50"></ImagePopover>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
            >
                <template v-slot="scope">
                    <el-button @click="updateTradeMark(scope.row)" type="warning" icon="el-icon-edit">修改</el-button>
                    <el-button @click="deleteTradeMark(scope.row.id)" type="danger" icon="el-icon-delete">删除</el-button>
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

        <!--添加或者修改品牌弹窗-->
        <el-dialog :title="form.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible" @close="closeDialog()">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
                    <el-input v-model="form.tmName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" :label-width="formLabelWidth" prop="logoUrl">
                    <el-upload
                        class="avatar-uploader"
                        action="/dev-api/admin/product/fileUpload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
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
            },
            dialogFormVisible: false,
            formLabelWidth: "100px",
            form: {
                id: "",
                tmName: "",
                logoUrl: ""
            },
            rules: {
                tmName: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
                ],
                logoUrl: [
                    { required: true, message: '请选择品牌的图片' }
                ]
            }
        }
    },
    computed: {
        ...mapState("tradeMark", ["tradeMarkList"])
    },
    methods: {
        ...mapActions("tradeMark", ["toTradeMarkList", "toSaveTradeMark", "toUpdateTradeMark", "toDeleteTradeMark"]),
        pageChange(changePage) {
            this.pager.page = changePage;
            this.toTradeMarkList(this.pager);
        },
        limitChange(changeLimit) {
            this.pager.limit = changeLimit;
            this.toTradeMarkList(this.pager);
        },
        handleAvatarSuccess(res, /*file*/) {
            this.form.logoUrl = res.data;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        closeDialog() {
            for (let key in this.form) {
                this.form[key] = "";
            }
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.form.id) {
                        this.toUpdateTradeMark(this.form);
                        this.$message.success('更新成功');
                    } else {
                        this.toSaveTradeMark(this.form);
                        this.$message.success('添加成功');
                    }
                    this.toTradeMarkList(this.pager);
                    this.dialogFormVisible = false;
                }
            });
        },
        updateTradeMark(row) {
            this.form = {...row};
            this.dialogFormVisible = true;
        }   ,
        deleteTradeMark(id) {
            this.$confirm('是否删除该品牌?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.toDeleteTradeMark(id);
                if (this.tradeMarkList.records.length == 1) {
                    this.pager.page--;
                }
                await this.toTradeMarkList(this.pager);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    mounted() {
        this.toTradeMarkList();
    }
}
</script>

<style lang="less">
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

    .avatar-uploader {
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        &:hover {
            border-color: #409EFF;
        }
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>
