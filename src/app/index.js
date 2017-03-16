import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute } from 'react-router';

import appStore from './appStore';
import App from './containers/App';

import NoMatch from './components/NoMatch';
import Welcome from './containers/Welcome';

import MakeBill from './containers/MakeBill';
import Uncomplete from './containers/Uncomplete';
import Complete from './containers/Complete';

const store = appStore();
ReactDom.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={MakeBill}/>
                <Route path="/welcome" component={Welcome}>
                </Route>
                <Route path="/make_bill" component={MakeBill}>
                </Route>
                <Route path="/uncomplete" component={Uncomplete}>
                </Route>
                <Route path="/complete" component={Complete}>
                </Route>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);

