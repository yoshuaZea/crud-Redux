import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

/**
 * Crear el store 
 *  El store toma todos los reducers que se combinan
 *  El compose incluye el applyMiddleware con el thunk
 */
const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),
        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
                window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)

export default store
