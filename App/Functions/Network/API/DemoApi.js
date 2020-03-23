import { post, get } from '../ApiHelper';
import { get as testGet } from '../ApiTest';
import Network from '../../../Config/Network';

/*** 
 * demo data request by get
*/
export const getTheDemoData = () => {
    let promise = get({
        url: Network.TEST_MOVIE_URL
    });

    return promise;
}

export const getTheDemoDataByAsync = async () => {
    let promise = await testGet({
        url: Network.TEST_MOVIE_URL
    });

    return promise;
}

export const postTheDemoData = () => {
    let promise = post({
        url: Network.TEST_POST_URL,
        body: {
            firstParam: 'yourValue',
            secondParam: 'yourOtherValue'
        }
    });

    return dealPromise(promise);
}

const dealPromise = promise => {
    return promise.catch(e => {
        if (e.message && !e.errorMsg) {
            e.errorMsg = e.message;
        }
        return Promise.reject(e);
    })
};