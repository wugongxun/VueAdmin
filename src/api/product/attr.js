import request from "@/utils/request";

//获取商品属性列表
export const reqAttrInfoList = ({category1Id, category2Id, category3Id}) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get"
});

//保存商品属性
/*{
    "attrName": "string",       属性名
    "attrValueList": [          属性名中的属性值
        {
            "attrId": 0,
            "id": 0,
            "valueName": "string"
        }
    ],
    "categoryId": 0,
    "categoryLevel": 0,
    "id": 0
}*/
export const reqSaveAttrInfo = (attrInfo) => request({
    url: "/admin/product/saveAttrInfo",
    method: "post",
    data: attrInfo
});

//删除商品属性
export const reqDeleteAttrInfo = attrId => request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: "delete"
});
