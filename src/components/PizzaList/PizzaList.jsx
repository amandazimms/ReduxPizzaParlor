import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

function PizzaList( props ){
    // const[ name, setName ]=useState( null );

    return(
        <div>
            <h1>PizzaList</h1>
            <p> props: { JSON.stringify( props ) } </p>
        </div>
    )
}

export default PizzaList;