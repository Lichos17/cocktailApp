import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

//Creamos el context
export const CategoriasContext = createContext();

//Provider es donde se encuentra las funciones y state

export const CategoriasProvider = ( props ) => {
    // Crear el state del context
    const [ categorias, guardarCategorias ] = useState([]);
    
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios.get(url);

            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();

    }, []);

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            { props.children }
        </CategoriasContext.Provider>

    )

}