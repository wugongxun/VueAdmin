import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tradeMark from "@/store/modules/product/tradeMark";
import category from "@/store/modules/product/category";
import attr from "@/store/modules/product/attr";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user,
        tradeMark,
        category,
        attr
    },
    getters
})

export default store
