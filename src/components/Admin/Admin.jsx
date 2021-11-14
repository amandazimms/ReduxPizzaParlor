import { useState } from "react";
import DataTable from '../DataTable/DataTable';

function Admin( props ){
    // const[ name, setName ]=useState( null );

    return(
        <div>
            <h1>Admin</h1>
            <p> props: { JSON.stringify( props ) } </p>
            


            <DataTable/>

        </div>
    )
}

export default Admin;