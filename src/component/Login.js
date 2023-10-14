import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import './mix.css';
import { host } from '../Host';

const Login = () => {

    const Navigate = useNavigate()
    const [passShow, setPassshow] = useState(false);

    const [inpval, setInpval] = useState({
        email: '',
        password: '',
    })

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }


    const loginuser = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;
        if (email === "") {
            alert('please enter the email')
        } else if (!email.includes('@')) {
            alert('Enter valid email')
        } else if (password === " ") {
            alert('Enter your password')
        } else if (password.length < 6) {
            alert('password must be 6 char')
        } else {
            const data = await fetch(`${host}login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });
            const res = await data.json();
            if (res.msg) {
                alert(res.msg)
                localStorage.setItem('usersdatatoken', res.token)
                Navigate('/dashboard')
                setInpval({ ...inpval, email: " ", password: "" })
            } else {
                alert(res.error)
            }
        }
    }

    return (
        <>
            <section style={{ marginTop: "4rem" }}  >
                <div className='form_data' >
                    <div className='form_heading'>
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login</p>
                    </div>

                    <form>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name="email" value={inpval.email} id='email' placeholder='Email Address' onChange={setVal} />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two' >
                                <input type={!passShow ? "password" : "text"} value={inpval.password} name="password" id='password' placeholder='Password' onChange={setVal} />
                                <div className='showpass' onClick={() => setPassshow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser} >Login</button>
                        <p>Don't have an Account? <Link to="/register">Sign Up</Link></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
