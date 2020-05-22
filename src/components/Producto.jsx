import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

// Redux
import { useDispatch } from 'react-redux'
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productosActions'

const Producto = ({producto}) => {
    const { nombre, precio, _id } = producto

    // Usar hook 
    const dispatch = useDispatch()

    // Habilitar history para redireccionar
    const history = useHistory()

    // Confirmar eliminación
    const confirmarEliminarProducto = id => {
        // Preguntar al usuario
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un producto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#a5dc86',
            cancelButtonColor: '#f27474',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                // Pasar al action
                dispatch( borrarProductoAction(id))

                Swal.fire({
                    title: 'Eliminado',
                    text: 'El producto se eliminó correctamente',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
          })
    }

    // función que redireccionar de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto))
        history.push(`/productos/editar/${producto._id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button 
                    type="button" 
                    className="btn btn-primary mr-2"
                    onClick={ () => redireccionarEdicion(producto) }
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(_id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}
 
export default Producto