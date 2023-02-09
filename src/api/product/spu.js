import request from "@/utils/request";

//获取SPU列表
export const reqSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: {category3Id}
});

//根据id获取spuInfo
export const reqSpuInfo = spuId => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: "get"
});

//根据id获取spu图片列表
export const reqSpuImageList = spuId => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get"
});

//获取平台的所有销售属性
export const reqBaseSaleAttrList = () => request({
    url: "/admin/product/baseSaleAttrList",
    method: "get"
});

//保存spuInfo
/**
 * {
 *   "category3Id": 0,
 *   "description": "string",
 *   "id": 0,
 *   "spuImageList": [
 *     {
 *       "id": 0,
 *       "imgName": "string",
 *       "imgUrl": "string",
 *       "spuId": 0
 *     }
 *   ],
 *   "spuName": "string",
 *   "spuSaleAttrList": [
 *     {
 *       "baseSaleAttrId": 0,
 *       "id": 0,
 *       "saleAttrName": "string",
 *       "spuId": 0,
 *       "spuSaleAttrValueList": [
 *         {
 *           "baseSaleAttrId": 0,
 *           "id": 0,
 *           "isChecked": "string",
 *           "saleAttrName": "string",
 *           "saleAttrValueName": "string",
 *           "spuId": 0
 *         }
 *       ]
 *     }
 *   ],
 *   "tmId": 0
 * }
 * @param data
 * @returns {*}
 */
export const reqSaveSpuInfo = data => request({
    url: "/admin/product/saveSpuInfo",
    method: "post",
    data
});

//更新spuInfo
export const reqUpdateSpuInfo = data => request({
    url: "/admin/product/updateSpuInfo",
    method: "post",
    data
});

//删除spu
export const reqDeleteSpu = spuId => request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: "delete"
});
