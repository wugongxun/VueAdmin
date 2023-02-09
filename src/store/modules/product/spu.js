import {
    reqBaseSaleAttrList, reqDeleteSpu,
    reqSaveSpuInfo,
    reqSpuImageList,
    reqSpuInfo,
    reqSpuList,
    reqUpdateSpuInfo
} from "@/api/product/spu";

const actions = {
    async toSpuList({commit}, {page, limit, category3Id}) {
        let res = await reqSpuList(page, limit, category3Id);
        if (res.code == 200) {
            commit("TOSPULIST", res.data);
        } else {
            return res;
        }
    },
    async toSpuInfo({commit}, spuId) {
        let res = await reqSpuInfo(spuId);
        if (res.code == 200) {
            commit("TOSPUINFO", res.data);
        } else {
            return res;
        }
    },
    async toSpuImageList({commit}, spuId) {
        let res = await reqSpuImageList(spuId);
        if (res.code == 200) {
            commit("TOSPUIMAGELIST", res.data);
        } else {
            return res;
        }
    },
    async toBaseSaleAttrList({commit}) {
        let res = await reqBaseSaleAttrList();
        if (res.code == 200) {
            commit("TOBASESALEATTRLIST", res.data);
        } else {
            return res;
        }
    },
    async toSaveOrUpdateSpuInfo({commit}, spuInfo) {
        let res;
        if (spuInfo.id) {
            res = await reqUpdateSpuInfo(spuInfo);
        } else {
            res = await reqSaveSpuInfo(spuInfo);
        }
        if (res.code == 200) {
            return res.message;
        } else {
            return res;
        }
    },
    async toDeleteSpu({commit}, spuId) {
        let res = await reqDeleteSpu(spuId);
        if (res.code == 200) {
            return res.message;
        } else {
            return res;
        }
    }
};

const mutations = {
    TOSPULIST(state, data) {
        state.data = data;
    },
    TOSPUINFO(state, spuInfo) {
        state.spuInfo = spuInfo;
    },
    TOSPUIMAGELIST(state, spuImageList) {
        state.spuImageList = spuImageList;
    },
    TOBASESALEATTRLIST(state, baseSaleAttrList) {
        state.baseSaleAttrList = baseSaleAttrList;
    }
};

const state = {
    data: {},
    spuInfo: {},
    spuImageList: [],
    baseSaleAttrList: []
};

export default {
    namespaced: true,
    actions, mutations, state
}
