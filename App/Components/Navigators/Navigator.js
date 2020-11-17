/** 
 * Navigation manager. Including the navigator`s action
 * Crate by Charlie on 2019-08-19
*/

import { StackActions } from 'react-navigation';

/** 
 * push to next navigation page
 * @param component  rootView         (component)
 * @param routeName  target view name (String)
 * @param params     params           (Dictionary)
*/
export function jump (component, routeName, params){
    if(!params){
        params = {};
    }
    
    let router;
    if(component && component.props.navigation){
        router = component.props.navigation;
    }

    if(router && routeName){
        router.navigate(routeName,params);
        RecordPagePathData(router.state.routeName,routeName);
    }
}

/** 
 * back to last view page
 * @param component  rootView  (component)
*/
export function back (component){
    let router;
    if(component && component.props.navigation){
        router = component.props.navigation;
    }

    if(router){
        router.goBack();
    }
};

/** 
 * record the page`s path information
 * @param  rootPageName  
 * @param  targetPageName
 * @param  type(jump、back)
*/
RecordPagePathData = (rootPageName = '',targetPageName = '',type = 'jump') =>{
}

