import { useState } from "react";
import { TextField } from '@material-ui/core';


function Admin( props ){
    // const[ name, setName ]=useState( null );

    return(
        <div>
            <h1>Admin</h1>
            <p> props: { JSON.stringify( props ) } </p>
            <TextField></TextField>
        </div>
    )
}

export default Admin;