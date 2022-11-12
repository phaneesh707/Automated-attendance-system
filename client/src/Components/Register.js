import React from 'react'
import { useState } from 'react';
const Register = () => {
  const [obj, setObj] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setObj({
      ...obj,
      [e.target.name]: e.target.value
    })
  }

  //write a unit test case for registration form
  test('Checking the register Component', () => {
    const { name, email, password } = obj;
    expect(name).toBe('');
    expect(email).toBe('');
    expect(password).toBe('');
  });


  console.log(obj);
  return (
    <div onChange={handleChange}>
      {/* Create a sign in form */}
      <h1 className='text-2xl'>Register</h1>
      <div className='flex flex-col'>

        <div style={{ marginTop: "12px" }}>
          <label style={{ marginRight: "10px" }} htmlFor="email">Name</label>
          <input type="text" name="name" id="name" value={obj.name} /> <br />
        </div>

        <div style={{ marginTop: "12px" }}>
          <label style={{ marginRight: "10px" }} htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={obj.email} /> <br />
        </div>

        <div style={{ marginTop: "12px" }}>
          <label style={{ marginRight: "10px" }} htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={obj.password} /> <br />
        </div>


        <button style={{}} type="submit">Register</button>
      </div>
    </div>
  )
}

export default Register;