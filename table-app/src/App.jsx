import './App.css'

function App() {

  let employees = [
    {id:101, name:'Aaa', role:'dev', salary:12345},
    {id:102, name:'Bbb', role:'dev', salary:12345},
    {id:103, name:'Ccc', role:'dev', salary:12345},
    {id:104, name:'Ddd', role:'dev', salary:12345},
  ]


  return (
    <>
      <center>
        <h2>Table App</h2>

        <table border={2}>

          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
              <th>Salary</th>
            </tr>
          </thead>

          <tbody>
            {
              employees.map((e)=>(
                <tr key={e.id} >
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.role}</td>
                  <td>{e.salary}</td>
                </tr>
              ))
            }

          </tbody>



        </table>






      </center>
    </>
  )
}

export default App
