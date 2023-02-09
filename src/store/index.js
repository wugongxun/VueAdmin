import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tradeMark from "@/store/modules/product/tradeMark";
import category from "@/store/modules/product/category";
import attr from "@/store/modules/product/attr";
import spu from "@/store/modules/product/spu";
import sku from "@/store/modules/product/sku";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user,
        tradeMark,
        category,
        attr,
        spu,
        sku
    },
    getters
})

export default store
