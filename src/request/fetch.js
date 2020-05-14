import request from './baseAxios';


// 登录
export const goLogon = data => {
    return request({
        url: "do-login",
        method: 'get',
        params: data
    });
};

// 获取商户列表
export const allStores = data => {
    return request({
        url: 'store/allStores',
        method: 'POST',
        data
    })
}

// 获取商品列表
export const allGoods = data => {
    return request({
        url: 'store/allGoods',
        method: 'get',
        params: data
    })
}

// 获取订单列表
export const allOrder = data => {
    return request({
        url: 'order/allOrder',
        method: 'get',
        params: data
    })
}

