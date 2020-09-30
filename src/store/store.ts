import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/reducer';

// создаём store, в котором будет храниться состояние всего приложения

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
