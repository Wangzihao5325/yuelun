import React from 'react'
import { AsyncStorage } from 'react-native'

class StorageUtil {
    async constructor(storageKey, defaultValue = {}) {
        let instance = await StorageUtil.getInstance(storageKey, defaultValue)
        return instance
    }

    static async getInstance(storageKey, defaultValue) {
        if (!this.instance[storageKey]) {
            let storageObj = await AsyncStorage.getItem(`${storageKey}`)
            if (storageObj) {
                this.instance[storageKey] = storageObj
                return storageObj
            } else {
                this.instance[storageKey] = defaultValue
                await AsyncStorage.setItem(`${storageKey}`, defaultValue)
                return defaultValue
            }
        } else {
            return this.instance[storageKey]
        }
    }

    save(){

    }
}