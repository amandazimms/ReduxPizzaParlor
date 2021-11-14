import { useState } from "react";
import DataTable from '../DataTable/DataTable';

function Admin( props ){
    // const[ name, setName ]=useState( null );

    return(
        <div>
            <h1>Admin</h1>
            <DataTable/>
        </div>
    )
}

export default Admin;