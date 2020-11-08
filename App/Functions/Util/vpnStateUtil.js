import React from 'react'
import * as vpnModule from '../../Functions/NativeBridge/ApiModule';
export default async function VpnStateUtil(localData, id) {
    let res = await vpnModule.getTunnelState()
    let isAppAccele = false
    let isTheGameAccele = false
    let newLocalData = localData ? JSON.parse(JSON.stringify(localData)) : {};
    if (res.bacc) {
        //在加速
        isAppAccele = true
        if (id == res.gameid) {
            isTheGameAccele = true
        }
        Object.values(newLocalData).forEach(item => {
            if (item.id === res.gameid) {
                item.speedup = '1'
            } else {
                item.speedup = '0'
            }
        })
    } else {
        //不在加速
        Object.values(newLocalData).forEach(item => {
            item.speedup = '0'
        })
    }
    return Promise.resolve({
        isAppAccele,
        isTheGameAccele,
        newLocalData
    })
}