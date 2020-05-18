import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types/index'

// Muestra una alerta
export function mostrarAlerta(alerta) {
    return (dispatch) => {
        dispatch(crearAlerta(alerta))
    }
}

const crearAlerta = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})


// Muestra una alerta
export function ocultarAlerta() {
    return (dispatch) => {
        dispatch(ocultarAlertaAction())
    }
}

const ocultarAlertaAction = () => ({
    type: OCULTAR_ALERTA
})