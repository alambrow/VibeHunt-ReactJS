import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { VibeHunt } from "./components/VibeHunt"
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VibeHunt />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);