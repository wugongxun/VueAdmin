import {reqSpuImageList} from "@/api/product/spu";
import {
    reqAttrInfoList, reqCancelSale,
    reqOnSale,
    reqSaleAttrList,
    reqSaveSkuInfo, reqSkuById,
    reqSkuInfoList,
    reqSkuListBySpuId
} from "@/api/product/sku";

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
    },
    async toSkuListBySpuId({commit}, spuId) {
        let res = await reqSkuListBySpuId(spuId);
        if (res.code == 200) {
            commit("TOSKULISTBYSPUID", res.data);
        } else {
            return res;
        }
    },
    async toSkuInfoList({commit}, {page, limit}) {
        let res = await reqSkuInfoList(page, limit);
        if (res.code == 200) {
            commit("TOSKUINFOLIST", res.data);
        } else {
            return res;
        }
    },
    async toOnSale({commit}, skuId) {
        let res = reqOnSale(skuId);
        if (res.code == 200) {
            return res.message;
        } else {
            return res;
        }
    },
    async toCancelSale({commit}, skuId) {
        let res = reqCancelSale(skuId);
        if (res.code == 200) {
            return res.message;
        } else {
            return res;
        }
    },
    async toSkuById({commit}, skuId) {
        let res = await reqSkuById(skuId);
        if (res.code == 200) {
            commit("TOSKUBYID", res.data);
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
    },
    TOSKULISTBYSPUID(state, skuList) {
        state.skuList = skuList;
    },
    TOSKUINFOLIST(state, skuInfoList) {
        state.skuInfoList = skuInfoList;
    },
    TOSKUBYID(state, skuInfo) {
        state.skuInfo = skuInfo;
    }
};


const state = {
    spuImageList: [],
    saleAttrList: [],
    attrInfoList: [],
    skuList: [],
    skuInfoList: {},
    skuInfo: {}
};

export default {
    namespaced: true,
    actions, mutations, state
}
