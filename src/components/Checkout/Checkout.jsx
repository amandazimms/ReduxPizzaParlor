import { useState } from "react";

function Checkout( props ){
    // const[ name, setName ]=useState( null );

    return(
        <div>
            <h1>Checkout</h1>
            <p> props: { JSON.stringify( props ) } </p>
        </div>
    )
}

export default Checkout;