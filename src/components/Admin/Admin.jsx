import { useState } from "react";

function Admin( props ){
    // const[ name, setName ]=useState( null );

    return(
        <div>
            <h1>Admin</h1>
            <p> props: { JSON.stringify( props ) } </p>
        </div>
    )
}

export default Admin;