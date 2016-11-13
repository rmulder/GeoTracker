import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, IndexRedirect, Redirect, browserHistory } from 'react-router';
import TrackList from './pages/TrackList.js';
import SingleTrack from './pages/SingleTrack.js';
import Tracking from './pages/Tracking.js';
import Settings from './pages/Settings.js';
import About from './pages/About.js';
import trackStorage from './models/trackStorage.js';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer as settingsReducer, mapSettingsToProps } from './models/settings';

const store = createStore(combineReducers({
    settings: settingsReducer,
}));

const trackStore = new trackStorage();

const createElement = function (Component, props) {
    const ReduxComponent = connect(mapSettingsToProps)(Component);
    return <ReduxComponent trackStore={trackStore} {...props} />
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} createElement={createElement}>
            <Route path="/" component={App}>
                <IndexRedirect to="/tracks" />
                <Route path="tracks" component={TrackList} />
                <Route path="tracks/:trackId" component={SingleTrack}></Route>
                <Route path="tracks/:trackId/tracking" component={Tracking}></Route>
                <Route path="settings" component={Settings}/>
                <Route path="about" component={About}/>
                <Redirect path="*" to="/"/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
