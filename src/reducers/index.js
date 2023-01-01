import { combineReducers }from 'redux';
import ProductoReducer from './ProductoReducer';
import alertaReducer from './alertaReducer';

export default combineReducers({
    productos:ProductoReducer,
    alerta:alertaReducer
});