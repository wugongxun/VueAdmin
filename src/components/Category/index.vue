<template>
    <el-form :inline="true" :model="form" class="demo-form-inline" ref="form" :disabled="show">
        <el-form-item label="一级分类">
            <el-select v-model="form.category1Id" placeholder="请选择" @change="selectedCategory1()">
                <el-option v-for="item in category1" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="form.category2Id" placeholder="请选择" @change="selectedCategory2()">
                <el-option v-for="item in category2" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select v-model="form.category3Id" placeholder="请选择" @change="selectedCategory3()">
                <el-option v-for="item in category3" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "Category",
    props: ["show"],
    computed: {
        ...mapState("category", ["form", "category1", "category2", "category3"]),
    },
    methods: {
        ...mapActions("category", ["toCategory1", "toCategory2", "toCategory3"]),
        ...mapActions("attr", ["toAttrInfoList"]),
        selectedCategory1() {
            this.form.category2Id = "";
            this.form.category3Id = "";
            this.$store.state.category.category3 = [];
            this.toCategory2(this.form.category1Id);
        },
        selectedCategory2() {
            this.form.category3Id = "";
            this.toCategory3(this.form.category2Id);
        },
        selectedCategory3() {
            this.toAttrInfoList(this.form);
        }
    },
    mounted() {
        this.toCategory1();
    }
}
</script>

<style scoped lang="less">
.demo-form-inline {
    display: flex;
    justify-content: space-around;
    justify-items: center;

    .el-form-item {
        margin: auto 0;
    }
}
</style>
