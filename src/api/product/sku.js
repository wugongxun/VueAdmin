import request from "@/utils/request";

//根据id获取spu图片列表
export const reqSpuImageList = spuId => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get"
});

//获取销售属性列表
export const reqSaleAttrList = spuId => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get"
});

//获取商品基础属性
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get"
});

/**
 * 保存skuInfo
 * @param skuInfo {
 *   "category3Id": 0,
 *   "createTime": "2023-02-09T07:55:45.951Z",
 *   "id": 0,
 *   "isSale": 0,
 *   "price": 0,
 *   "skuAttrValueList": [
 *     {
 *       "attrId": 0,
 *       "attrName": "string",
 *       "id": 0,
 *       "skuId": 0,
 *       "valueId": 0,
 *       "valueName": "string"
 *     }
 *   ],
 *   "skuDefaultImg": "string",
 *   "skuDesc": "string",
 *   "skuImageList": [
 *     {
 *       "id": 0,
 *       "imgName": "string",
 *       "imgUrl": "string",
 *       "isDefault": "string",
 *       "skuId": 0,
 *       "spuImgId": 0
 *     }
 *   ],
 *   "skuName": "string",
 *   "skuSaleAttrValueList": [
 *     {
 *       "id": 0,
 *       "saleAttrId": 0,
 *       "saleAttrName": "string",
 *       "saleAttrValueId": 0,
 *       "saleAttrValueName": "string",
 *       "skuId": 0,
 *       "spuId": 0
 *     }
 *   ],
 *   "spuId": 0,
 *   "tmId": 0,
 *   "weight": "string"
 * }
 * @returns {*}
 */
export const reqSaveSkuInfo = skuInfo => request({
    url: "/admin/product/saveSkuInfo",
    method: "post",
    data: skuInfo
});

//根据spuId查询sku列表
export const reqSkuListBySpuId = spuId => request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get"
});

//分页查询skuInfo
export const reqSkuInfoList = (page, limit) => request({
    url: `/admin/product/list/${page}/${limit}`,
    method: "get"
});

//上架
export const reqOnSale = skuId => request({
    url: `/admin/product/onSale/${skuId}`,
    method: "get"
});

//下架
export const reqCancelSale = skuId => request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: "get"
});

//根据id获取sku
export const reqSkuById = skuId => request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: "get"
});
