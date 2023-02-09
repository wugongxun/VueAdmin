import {reqSpuImageList} from "@/api/product/spu";
import {reqAttrInfoList, reqSaleAttrList, reqSaveSkuInfo} from "@/api/product/sku";

const actions = {
    async toSpuImageList({commit}, spuId) {
        let res = await reqSpuImageList(spuId);
        if (res.code == 200) {
            commit("TOSPUIMAGELIST", res.data);
        } else {
            return res;
        }
    },
    async toSaleAttrList({commit}, spuId) {
        let res = await reqSaleAttrList(spuId);
        if (res.code == 200) {
            commit("TOSALEATTRLIST", res.data);
        } else {
            return res;
        }
    },
    async toAttrInfoList({commit}, {category1Id, category2Id, category3Id}) {
        let res = await reqAttrInfoList(category1Id, category2Id, category3Id);
        if (res.code == 200) {
            commit("TOATTRINFOLIST", res.data);
        } else {
            return res;
        }
    },
    async toSaveSkuInfo({commit}, skuInfo) {
        let res = await reqSaveSkuInfo(skuInfo);
        if (res.code == 200) {
            return res.message;
        } else {
            return res;
        }
    }
};


const mutations = {
    TOSPUIMAGELIST(state, spuImageList) {
        state.spuImageList = spuImageList;
    },
    TOSALEATTRLIST(state, saleAttrList) {
        state.saleAttrList = saleAttrList;
    },
    TOATTRINFOLIST(state, attrInfoList) {
        state.attrInfoList = attrInfoList;
    }
};


const state = {
    spuImageList: [],
    saleAttrList: [],
    attrInfoList: []
};

export default {
    namespaced: true,
    actions, mutations, state
}
