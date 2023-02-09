import {
    reqAllTradeMark,
    reqDeleteTradeMark,
    reqSaveTradeMark,
    reqTradeMarkList,
    reqUpdateTradeMark
} from "@/api/product/tradeMark";

const actions = {
    async toTradeMarkList({commit}, {page, limit} = {page: 1, limit: 5}) {
        let res = await reqTradeMarkList(page, limit);
        if (res.code == 200) {
            commit("TOTRADEMARKLIST", res.data);
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    async toSaveTradeMark({commit}, tradeMark) {
        let res = await reqSaveTradeMark(tradeMark);
        if (res.code == 200) {
            return res.message;
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    async toUpdateTradeMark({commit}, tradeMark) {
        let res = await reqUpdateTradeMark(tradeMark);
        if (res.code == 200) {
            return res.message;
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    async toDeleteTradeMark({commit}, id) {
        let res = await reqDeleteTradeMark(id);
        if (res.code == 200) {
            return res.message;
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    async toAllTradeMark({commit}) {
        let res = await reqAllTradeMark();
        if (res.code == 200) {
            commit("TOALLTRADEMARK", res.data);
        } else {
            return res;
        }
    }
};
const mutations = {
    TOTRADEMARKLIST(state, tradeMarkList) {
        state.tradeMarkList = tradeMarkList;
    },
    TOALLTRADEMARK(state, allTradeMarkList) {
        state.allTradeMarkList = allTradeMarkList;
    }
};
const state = {
    tradeMarkList: {},
    allTradeMarkList: []
};

export default {
    namespaced: true,
    actions, mutations, state
}
