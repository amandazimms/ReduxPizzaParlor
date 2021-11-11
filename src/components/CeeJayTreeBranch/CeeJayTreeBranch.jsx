import {useState, useEffect } from 'react';


function CeeJayTreeBranch() {
  
  // const reducerName = useSelector(store => store.reducerName);
  const [newPet, setNewPet] = useState('');

  const nameChange = event => {
    console.log( 'in nameChange', event.target.value);
    setNewPet(event.target.value);
  }

  return (
    <div>
      <h1>CJ Tree Branch</h1>
      <p>Hi there from CJ's Branch</p>
    </div>
  )
}

export default CeeJayTreeBranch;