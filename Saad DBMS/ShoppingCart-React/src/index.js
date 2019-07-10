import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bulma/css/bulma.css';
import './css/sweetalert.css'; 

import {Provider} from "react-redux"
import reducer from "./store/CartStore"
import { createStore } from 'redux';

const store = createStore(reducer)

ReactDOM.render(<Provider store={store}><App /></Provider> , document.getElementById('root'));
registerServiceWorker();

