import {useState} from "react";

function Pete(props){
    //const[name, setName] = useState(null);
    return(
        <div>
            <h1>Pete blah blah blah</h1>
            <p>props: {JSON.stringify(props)}</p>
        </div>
    )
}

export default Pete;