import { useState } from "react";

function Mimi( props ){
    // const[ name, setName ]=useState( null );

    return(
        <div>
            <h1>Mimi</h1>
            <p> props: { JSON.stringify( props ) } </p>
        </div>
    )
}

export default Mimi;