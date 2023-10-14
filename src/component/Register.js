import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import './mix.css'
import { host } from '../Host';

const Register = () => {

    const [passShow, setPassshow] = useState(false);
    const [cpassShow, setCPassshow] = useState(false);
    const navigate = useNavigate()
    const [inpval, setInpval] = useState({
        fname: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === '') {
            alert("Enter Your name")
        } else if (email === "") {
            alert('Enter the email')
        } else if (!email.includes('@')) {
            alert('Please Enter valid email')
        } else if (password === " ") {
            alert('Enter your password')
        } else if (password.length < 6) {
            alert('Password must be 6 char')
        } else if (cpassword === " ") {
            alert('Enter your Confirm password')
        } else if (cpassword.length < 6) {
            alert('Confirm Password must be 6 char')
        } else if (password !== cpassword) {
            alert('Password is not matched')
        } else {
            const data = await fetch(`${host}register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });
            const res = await data.json();
            if (res.status === (201)) {
                alert("User Registration Done!")
                navigate('/')
                setInpval({ ...inpval, fname: " ", email: " ", password: "", cpassword: "" })
            } else {
                alert(res.error)
            }
        }
    }

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <span>Sign Up</span>
                    </div>

                    <form>
                        <div className='form_input'>
                            <label htmlFor='fname'>Name</label>
                            <input type='text' onChange={setVal} value={inpval.fname} name="fname" id='fname' placeholder='Name' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' onChange={setVal} value={inpval.email} name="email" id='email' placeholder='Email Address' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two' >
                                <input onChange={setVal} type={!passShow ? "password" : "text"} value={inpval.password} name="password" id='password' placeholder='Passsword' />
                                <div className='showpass' onClick={() => setPassshow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Confirm Password</label>
                            <div className='two' >
                                <input onChange={setVal} type={!cpassShow ? "password" : "text"} name="cpassword" value={inpval.cpassword} id='cpassword' placeholder='Confirm Password' />
                                <div className='showpass' onClick={() => setCPassshow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata} >Sign Up</button>
                        <p>Already have an Account? <Link to="/" >Log In</Link></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register
