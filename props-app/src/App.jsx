import './App.css'
import UserCard from './UserCard'

function App() {

  return (
    <>
      <center>
        <h1>Welcome to Props </h1>

        <UserCard
          name="Harshal"
          age={22}
          city="Jalgaon"
        />
      </center>

    </>
  )
}

export default App
