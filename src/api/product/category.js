import request from "@/utils/request";

//获取一级分类
export const reqCategory1 = () => request({
    url: "/admin/product/getCategory1",
    method: "get"
});

//获取二级分类
export const reqCategory2 = category1Id => request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get"
});

//获取三级分类
export const reqCategory3 = (category2Id) => request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get"
});
