export const storeData = (token=[]) =>({
    type:'STORE_DATA',
    token
})

export const storeMarketData = (token={}) =>({
    type:'MARKET_VALUE',
    token
})