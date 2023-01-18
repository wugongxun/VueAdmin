import {reqTradeMarkList} from "@/api/product/tradeMark";

const actions = {
    async toTradeMarkList({commit}, {page, limit}) {
        let res = await reqTradeMarkList(page, limit);
        if (res.code == 200) {
            commit("TOTRADEMARKLIST", res.data);
        } else {
            return Promise.reject(new Error(res.message));
        }
    }
};
const mutations = {
    TOTRADEMARKLIST(state, tradeMarkList) {
        state.tradeMarkList = tradeMarkList;
    }
};
const state = {
    tradeMarkList: {}
};

export default {
    namespaced: true,
    actions, mutations, state
}
