import React, { useState } from 'react'



const EmpForm = () => {

    let [employee, setEmployee] = useState({ id: '', empname: '', salary: '' })


    const handleChange = (e) => {
        setEmployee({...employee, [e.target.name]: e.target.value});

    }


    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("Emp Info: ",employee);

        setEmployee({ id: '',empname: '', salary: '' })
        

    }



    return (
        <div>

            <h2>Employee Form</h2>

            <form action="" onSubmit={handleSubmit} >

                id: <input type='text' name='id' value={employee.id} onChange={handleChange} required /> <br /> <br />
                empname: <input type='text' name='empname' value={employee.name} onChange={handleChange} required /> <br /> <br />
                salary: <input type='text' name='salary' value={employee.salary} onChange={handleChange} required /> <br /> <br />

                <button>Submit</button>


            </form>



        </div>
    )
}

export default EmpForm
