//import { createStore, applyMiddleware } from 'redux';
//import rootReducer from './reducers';
//
//export default function appStore(initalState) {
//    const store = createStore(rootReducer, initalState);
//
//    if (module.hot) {
//        // Enable Webpack hot module replacement for reducers
//        module.hot.accept('./reducers', () => {
//            const nextReducer = require('./reducers');
//            store.replaceReducer(nextReducer);
//        });
//    }
//    return store;
//}



import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import rootReducer from './reducers';

const logger = loggerMiddleware({
    predicate: (getState, action) => true, // log all actions
    level: `info`,
    duration: true,
    actionTransformer: (action) => {
        return {
            ...action,
            type: String(action.type)
        };
    }
});

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

export default function appStore(initalState = {}) {
    const store = createStoreWithMiddleware(rootReducer, initalState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
