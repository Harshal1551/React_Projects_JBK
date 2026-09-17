import { useState } from 'react';
import './App.css'

function App() {


  let [num, setNum] = useState(0);

  // const increment = () => {
  //   setNum(num + 1);
  //   console.log('Num = ', num);
  // }
  // const decrement = () => {
  //   setNum(num - 1);
  //   console.log('Num = ', num);
  // }
  // const reset = () => {
  //   setNum(0);
  //   console.log('Num = ', num);
  // }


  return (
    <>
      <center>
        <h1>Welcome to my app</h1>
        <h1>Counter app</h1>

        <h2>Num = {num} </h2>
        {/* 
        <button onClick={increment}>Increase</button>
        <button onClick={decrement}>Decrease</button>
        <button onClick={reset}>Reset</button> 
        */}

        <button onClick={()=>setNum(num+1)} >Increase</button>
        <button onClick={()=>setNum(num-1)} >Decrease</button>
        <button onClick={()=>setNum(0)} >Reset</button>


      </center>
    </>
  )
}

export default App
