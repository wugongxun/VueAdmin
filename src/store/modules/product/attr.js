import {reqAttrInfoList, reqDeleteAttrInfo, reqSaveAttrInfo} from "@/api/product/attr";

const actions = {
    async toAttrInfoList({commit}, from) {
        let res = await reqAttrInfoList(from);
        if (res.code == 200) {
            commit("TOATTRINFOLIST", res.data);
        } else {
            return res;
        }
    },
    async toSaveAttrInfo({commit}, attrInfo) {
        let res = await reqSaveAttrInfo(attrInfo);
        if (res.code == 200) {
            return res.data;
        } else {
            return res;
        }
    },
    async toDeleteAttrInfo({commit}, attrId) {
        let res = await reqDeleteAttrInfo(attrId);
        if (res.code == 200) {
            return res.message;
        } else {
            return res;
        }
    }
};
const mutations = {
    TOATTRINFOLIST(state, attrInfoList) {
        state.attrInfoList = attrInfoList;
    }
};
const state = {
    attrInfoList: []
};

export default {
    namespaced: true,
    actions, mutations, state
}
