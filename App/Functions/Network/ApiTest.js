/**
 * ApiHelper
 * Info:Network request base components
 * Crate by Charlie on 2019-08-18
 * */
import Network from '../../Config/Network';

const timeOut = 10 * 1000;

const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

/**
* GET request
* @param url     url
* @param headers header`s parameter
* @param apiDic  parameters
*/
export const get = async ({ url, headers, apiDic }) => {
    if (isContains(url, 'http') || isContains(url, 'https')) {
        url = `${url}?${joinPathParam(apiDic)}`;
    } else {
        url = `${Network.DOMAIN}${url}?${joinPathParam(apiDic)}`;
    }

    return await asyncGet(url, headers);
}

/**
* POST request
* @param url      url
* @param headers  eader`s parameter
* @param body     parameters body
* @param apiDic   parameters
*/
/*
export const post = ({ url, headers, body, apiDic }) => {
    if (isContains(url, 'http') || isContains(url, 'https')) {
        url = `${url}?${joinPathParam(apiDic)}`;
    } else {
        url = `${Network.DOMAIN}${url}?${joinPathParam(apiDic)}`;
    }

    return postFetch(url, headers, body);
};
*/

/**
* perform the get request
* @param url
* @param headers
* @returns {*|Promise.<json>|Promise.<json>}
*/
const asyncGet = async (url, headers) => {
    let timeoutId;

    if (headers) {
        headers = {
            ...HEADERS,
            ...headers,

        }
    } else {
        headers = {
            ...HEADERS,
        };
    }

    let timeoutPromise = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
            reject('{ "msg": "request timeOut!" }');
            clearTimeout(timeoutId);
        }, timeOut);
    });

    let fetchPromise = await fetch(url, {
        headers: headers,
        method: 'GET',
    });

    let dataPromise = await fetchPromise.json();

    return Promise.race([timeoutPromise, dataPromise]);

    /*
    let fetchPromise = new Promise(function (resolve, reject) {
        const timeoutId = setTimeout(() => {
            reject({ msg: "request timeOut!" });
            clearTimeout(timeoutId);
        }, timeOut);

        fetch(url, {
            headers: headers,
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseJson => {
                resolve(responseJson);
                clearTimeout(timeoutId);
            })
            .catch(error => {
                reject(error);
                clearTimeout(timeoutId);
            });
    });
    */

    //return fetchPromise;
};

/**
* perform the post request
* @param url
* @param headers
* @param body
* @returns {*|Promise.<json>|Promise.<json>}
*/
/*
const asyncPost = (url, headers, body) => {
    if (headers) {
        headers = {
            ...HEADERS,
            ...headers,
        }
    } else {
        headers = {
            ...HEADERS,
        };
    }

    body = {
        ...body
    };

    let apiDic = {};
    if (body) {
        let serialzeBody = serializeJSON(body);
        apiDic = {
            method: 'POST',
            headers: headers,
            body: serialzeBody
        };
    } else {
        apiDic = {
            method: 'POST',
            headers: headers
        }
    }

    let fetchPromise = new Promise(function (resolve, reject) {
        const timeoutId = setTimeout(() => {
            reject({ msg: "request timeOut!" });
            clearTimeout(timeoutId);
        }, timeOut);

        fetch(url, apiDic)
            .then(response => response.json())
            .then(responseJson => {
                resolve(responseJson);
                clearTimeout(timeoutId);
            })
            .catch(error => {
                reject(error);
                clearTimeout(timeoutId);
            });
    });

    return fetchPromise;
};
*/

/** 
* check the string including the target or not
* @param   str
* @param   substr
* 
* @returns {bool*}
*/
const isContains = (str, substr) => {
    return str.indexOf(substr) >= 0;
}

/**
* Splice the parameters after the url path
* @param   data
* @returns {string|*}
*/
const joinPathParam = (data) => {
    if (!data) {
        return '';
    }

    return Object.entries(data).map(([key, value]) => {
        return `${key}=${value}`;
    }).join('&');
};

/** 
 * serialize the JSON data
 * @param   data
 * @returns {encodeData}
 * 
*/
const serializeJSON = (data) => {
    if (!data) {
        return '';
    }
    return Object.entries(data).map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    }).join('&');
};