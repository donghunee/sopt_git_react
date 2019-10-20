import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GitHubLogin from 'react-github-login';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(
//   <GitHubLogin clientId="ffe80cd809142964f1bf"
//     redirectUri=""
//     onSuccess={onSuccess}
//     onFailure={onFailure}/>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
