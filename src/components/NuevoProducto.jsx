import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'

// actions de redux
import { crearNuevoProductoAction } from '../actions/productosActions'
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions'


const NuevoProducto = ({history}) => {
    // State del componente
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    // utilizar useDispatch y retorna una función
    const dispatch = useDispatch()

    // Acceder al state del store
    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector(state => state.alerta.alerta)
    
    // Crear función de redux que mande a llamar la función del action
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))
    
    // Cuando usuario haga submit
    const handleSubmit = e => {
        e.preventDefault()
    
        // Validar formulario
        if(nombre.trim() === '' || precio <= 0){
            const respuesta = {
                msg: 'Ambos campos son obligatorios',
                clases: 'alert alert-danger text-center text-uppercase p-3'
            }
            dispatch(mostrarAlerta(respuesta))
            return
        }
    
        // Si no hay errores 
        dispatch(ocultarAlerta())
    
        // Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })

        // Redireccionar
        history.push('/')
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>

                        { alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null }

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
                                    onChange={ e => setNombre(e.target.value)}
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
                                    onChange={ e => setPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="subtmit"
                                className="btn btn-primary btn-block font-weight-bold text-uppercase"
                            >
                                Agregar
                            </button>
                            { cargando ? <Spinner/> : null }
                            { error ? <p className="alert alert-danger text-center p2 mt-4">Hubo un error</p> : null }
                        </form>
                    </div>
                </div>
            </div>
        </div>      
    )
}
 
export default NuevoProducto