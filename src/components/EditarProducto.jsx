import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editarProductoAction } from '../actions/productosActions'
import { useHistory } from 'react-router-dom'

const EditarProducto = () => {
    // State de nuevo producto
    const [producto, setProducto] = useState({
        nombre: '',
        precio: 0
    })

    // Hook dispatch redux
    const dispatch = useDispatch()

    // History de router
    const history = useHistory()

    // Hook para obtener producto
    const productoEditar = useSelector(state => state.productos.productoEditar )

    useEffect(() => {
        setProducto(productoEditar)
    }, [productoEditar])

    // Destructuring
    const { nombre, precio } = producto

    // Enviar form
    const handleSubmit = e => {
        e.preventDefault()

        dispatch(editarProductoAction(producto))

        history.push('/')
    }

    // Llenar datos del formulario
    const handleChange = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar producto
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombre">Precio producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio del producto"
                                    name="precio"
                                    value={precio}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="subtmit"
                                className="btn btn-primary btn-block font-weight-bold text-uppercase"
                            >
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    )
}
 
export default EditarProducto