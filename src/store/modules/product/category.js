import {reqCategory1, reqCategory2, reqCategory3} from "@/api/product/category";

const actions = {
    async toCategory1({commit}) {
        let res = await reqCategory1();
        if (res.code == 200) {
            commit("TOCATEGORY1", res.data);
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    async toCategory2({commit}, category1Id) {
        let res = await reqCategory2(category1Id);
        if (res.code == 200) {
            commit("TOCATEGORY2", res.data);
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    async toCategory3({commit}, category2Id) {
        let res = await reqCategory3(category2Id);
        if (res.code == 200) {
            commit("TOCATEGORY3", res.data);
        } else {
            return Promise.reject(new Error(res.message));
        }
    }
};

const mutations = {
    TOCATEGORY1(state, category1) {
        state.category1 = category1;
    },
    TOCATEGORY2(state, category2) {
        state.category2 = category2;
    },
    TOCATEGORY3(state, category3) {
        state.category3 = category3;
    }
};

const state = {
    form: {
        category1Id: "",
        category2Id: "",
        category3Id: ""
    },
    category1: [],
    category2: [],
    category3: []
};

export default {
    namespaced: true,
    actions, mutations, state
}
