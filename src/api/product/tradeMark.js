import request from "@/utils/request";

//获取品牌列表的接口
export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get"
});

//修改品牌信息
// export const reqUpdateTradeMark = (id, logoUrl, tmName) => request({
//     url: "/admin/product/baseTrademark/update",
//     method: "put"
// });
