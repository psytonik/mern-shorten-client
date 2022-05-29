import React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Router>
        <App tab="home" />
    </Router>
);
