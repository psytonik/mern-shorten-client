import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import './index.css';
import App from './App';

const container = document.getElementById('root');


ReactDOM.render(
	<Router>
		<App />
	</Router>,
	container);
