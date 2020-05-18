import { combineReducers } from 'redux'

// Importar los reducers
import productosReducer from './productosReducer'
import alertaReducer from './alertaReducer'

// Exportar el combineReducers con los reduces de cada objeto
export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer
})
