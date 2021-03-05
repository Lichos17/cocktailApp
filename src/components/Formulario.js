import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriaContext';
import { RecetasContext } from '../context/RecetasContext';

export const Formulario = () => {
    
    const [ error, setError ] = useState(false);

    const [ busqueda, guardarBusqueda ] = useState({
        nombre: '',
        categoria: ''
    })

    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext( RecetasContext );
    //Funcion para leer los contenidos
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if( busqueda.nombre === '' || busqueda.categoria === '' ){
            setError(true);
            return
        }
        buscarRecetas(busqueda);
        guardarConsultar(true);
        setError(false);
    }

    

    return (
            <form
                autoComplete="off"
                className="col-12"
                onSubmit={ e => {
                    handleSubmit(e);
                } }
            >
                <fieldset className="text-center">
                    <legend> Busca Bebidas por Categoria o Ingredientes</legend>
                </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar Por Ingrediente"
                        onChange={obtenerDatosReceta}
                        />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">-- Selecciona Categoria</option>
                        {
                            categorias.map(categoria => (
                                <option
                                    key={categoria.strCategory}
                                    value={categoria.strCategory}
                                >
                                    {categoria.strCategory}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Recetas"
                    />
                </div>

            </div>

            {error ? 
                <p className="text-center alert alert-danger mt-4">Es Necesario Llenar Todos Los Campos</p>
                : null
            }

            </form>
    )
}
