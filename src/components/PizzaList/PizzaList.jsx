import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import PizzaItem from "../PizzaItem/PizzaItem";

function PizzaList( props ){
    // const[ name, setName ]=useState( null );

    return(
        <div>
            <h1>PizzaList</h1>
            {
                props.pizzaList.map(pizza =>(
                    <PizzaItem pizza={pizza} />
                ))
            }
        </div>
    )
}

export default PizzaList;