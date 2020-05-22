// Los actions son las funciones que se van a ejecutar de acuerdo al mapeo de types
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    COMENZAR_DESCARGA_EXITO,
    COMENZAR_DESCARGA_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types'

import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

// NUEVO PRODUCTO
// Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto())

        try {
            // Insertar en la API
            const respuesta = await clienteAxios.post('/productos', producto)
            
            // Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(respuesta.data))

            // Alerta exitosa
            Swal.fire({
                title: 'Correcto',
                text: 'El producto se agregó correctamente',
                icon: 'success',
                confirmButtonColor: '#a5dc86'
            })

        } catch (error) {
            console.log(error)
            // Si hay erorr, cambiar el statef
            dispatch(agregarProductoError(true))

            // Alerta error
            Swal.fire({
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo.',
                icon: 'error',
                confirmButtonColor: '#f27474'
            })
        }
    }
}

// Agrega un nuevo producto
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

// Si el producto se guarda en la BD
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si hubo algún error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


// LISTADO DE PRODUCTOS
// Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargaProductosExitosa(respuesta.data.productos))
        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError(true))
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: COMENZAR_DESCARGA_EXITO,
    payload: productos
})

const descargaProductosError = (estado) => ({
    type: COMENZAR_DESCARGA_ERROR,
    payload: estado
})


// ELIMINAR PRODUCTO
// Elimina un producto
export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())
        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError())
            
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})


// OBTENER EDITAR PRODUCTO
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})


// EDITA PRODUCTO EN API Y STATE
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto())
        
        try {
            await clienteAxios.put(`/productos/${producto._id}`, producto)
            dispatch(editarProductoExito(producto))
        } catch (error) {
            console.log(error.response)
            dispatch(editarProductoError(producto))
        }
    }
}

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: producto
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})