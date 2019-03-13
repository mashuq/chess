import React from 'react';
import ReactDOM from 'react-dom';
import Chess from './chess/Chess';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Chess />, document.getElementById('root'));

serviceWorker.unregister();
