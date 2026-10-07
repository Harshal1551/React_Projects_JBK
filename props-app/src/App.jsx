import './App.css'
import UserCard from './UserCard'
import User from "./components/User";
import Product from "./components/Product";
import Student from "./components/Student";
import Button from "./components/Button";
import Counter from "./components/Counter";


function App() {

  const student = {
    name: "Rahul",
    age: 21,
    course: "Computer Engineering"
  };

  const handleClick = () => {
    console.log("Button clicked");
  };

  const handleCount = (value) => {
    console.log("Child sent:", value);
  };

  return (
    <>
      <center>
        <h1>Welcome to Props </h1>

        <UserCard
          name="Harshal"
          age={22}
          city="Jalgaon"
        />

        <h1>React Props Practice</h1>

        <hr />

        {/* 1. Basic Props */}
        <User
          name="Harshal"
          age={22}
          city="Jalgaon"
        />

        <hr />

        {/* 2. Multiple Props */}
        <Product
          productName="Laptop"
          price={50000}
          category="Electronics"
        />

        <hr />

        {/* 3. Object Props */}
        <Student student={student} />

        <hr />

        {/* 4. Function Props */}
        <Button onClick={handleClick} />

        <hr />

        {/* 5. Child → Parent */}
        <Counter sendCount={handleCount} />

      




    </center >

    </>
  )
}

export default App
