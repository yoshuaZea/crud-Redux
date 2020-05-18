import React, { Fragment, useEffect } from 'react'
import Spinner from './Spinner'
import Producto from './Producto'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { obtenerProductosAction } from '../actions/productosActions'

const Productos = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // Consultar API
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
        // eslint-disable-next-line 
    }, [])

    // Usando redux
    const productos = useSelector(state => state.productos.productos)
    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)

    return ( 
        <Fragment>
            <h2 className="text-center my-5">Listado de productos</h2>

            { error ? <p className="alert alert-danger font-weight-bold text-center mt-4">Hubo un error con tu petición</p> : null }

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { cargando ? <tr><td colSpan="3"><Spinner text="Cargando..."/></td></tr> : null }
                    { productos.length === 0 ? <tr><td colSpan="3">No hay productos</td></tr> : (
                        productos.map(producto => (
                            <Producto 
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}
 
export default Productos