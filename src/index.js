import React from 'react';
import ReactDOM from 'react-dom';
import Chess from './chess/Chess';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer);


ReactDOM.render(
<Provider store={store}>
    <Chess />
</Provider>
, document.getElementById('root'));

serviceWorker.unregister();
