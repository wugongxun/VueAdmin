import request from "@/utils/request";

//获取品牌列表的接口
export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get"
});

//添加品牌信息
export const reqSaveTradeMark = tradeMark => request({
    url: "/admin/product/baseTrademark/save",
    method: "post",
    data: tradeMark
})

//修改品牌信息
export const reqUpdateTradeMark = tradeMark => request({
    url: "/admin/product/baseTrademark/update",
    method: "put",
    data: tradeMark
});

//删除品牌信息
export const reqDeleteTradeMark = id => request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete"
});
