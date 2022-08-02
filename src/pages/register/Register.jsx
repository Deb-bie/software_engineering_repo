import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Link} from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar'
import './Register.css'

const Register = () => {

    const [credentials, setCredentials] = useState({
        email: undefined,
        username: undefined,
        password: undefined
      });
    
      const { loading, error, dispatch } = useContext(AuthContext);
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER_START" });
        try {
          const res = await axios.post("/auth/register", credentials);
          dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
          navigate("/")
        } catch (err) {
          dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
        }
    };


    return (
        <div className="registerContainer">
            <div classname="registerWrapper">
                <Navbar hides="none" />

                <div className="mainRegisterWrapper">
                    <div className="create">Register</div>

                    <form>
                        <div className="formGroup">
                            <label>Username</label>
                            <br />
                            <input
                                type='text'
                                required
                                id="username"
                                name='username'
                                onChange={handleChange}
                            />
                        </div>

                        <div className="formGroup">
                            <label>Email address</label>
                            <br />
                            <input
                                type='email'
                                required
                                id="email"
                                name='email'
                                onChange={handleChange}
                            />
                        </div>

                        <div className="formGroup">
                            <label>Password</label>
                            <br />
                            <input
                                type='password'
                                required
                                id="password"
                                name='password'
                                onChange={handleChange}
                            />
                        </div>

                        <div className="continue" disabled={loading} onClick={handleClick}>
                            <button>Register</button>
                        </div>

                        {error && <span>{error.message}</span>}
                    </form>

                    <div className="already">
                        Already have an account? <Link to='/login'>Log In </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register