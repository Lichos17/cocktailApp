import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ( props ) => {

    const [ idReceta, guardarIdReceta ] = useState(null);
    const [ informacion, guardarReceta ] = useState({});

    //Una vez tenemos una receta llamamos a la api
    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idReceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

            const resultado = await axios.get(url);

            guardarReceta(resultado.data.drinks[0]);

        }

        obtenerReceta();

    }, [idReceta])

    return (
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}

        </ModalContext.Provider>

    )

}