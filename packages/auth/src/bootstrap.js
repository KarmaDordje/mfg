import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createMemoryHistory, createBrowserHistory} from 'history';

const mount = (el, {onNavigate, onSignIn,  defaultHistory, initialPath}) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });
    if(onNavigate){
        history.listen(onNavigate);
    }
    console.log('AuthAPP bootsptarp', onSignIn)

    ReactDOM.render(
        <App onSignIn={onSignIn} history={history}/>,
        el
    );

    return {
        onParentNavigate({pathname: nextPathName}){
            const {pathname} = history.location;
            if(pathname !== nextPathName){
                history.push(nextPathName);
            }
        }
    }
};


if(process.env.NODE_ENV === 'development'){
    const el = document.querySelector('#_auth-dev-root');
    if(el){
        mount(el, {defaultHistory: createBrowserHistory()});
    }
}

export {mount};