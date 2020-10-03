import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Request from './components/containers/Request';
import './style.css';

// осуществляем render контейнерного компонента
// Provider - WrappedComponent, обновляющийся автоматически при изменениях в store

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Request url="https://api.guildwars2.com/v2/account/bank?access_token=5BEB65D2-A037-804C-BFD6-E8318E466C4141F5FFC8-2127-4B29-957C-62A4E09727AF" />
    </Provider>,
    app,
);
