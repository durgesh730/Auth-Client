import React, { useContext } from 'react'
import './header.css'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const history = useNavigate();

    const logoutuser = () => {
        history("/");
        setLoginData(false)
        localStorage.removeItem("usersdatatoken");
    }

    return (
        <>
            <header>
                <nav><h1>Durgesh</h1>
                    <div className='avtar' >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <button
                                        onClick={() => {
                                            logoutuser()
                                        }}
                                    >Logout</button>
                                    <Avatar style={{ backgroundColor: "salmon", fontWeight: "bold", textTransform: "capitalize" }}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar>
                                </>) : (<Avatar style={{ backgroundColor: "blue" }}></Avatar>)
                        }
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header
