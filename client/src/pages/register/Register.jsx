// import axios from "axios";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import {Link} from 'react-router-dom';

// import Navbar from '../../components/navbar/Navbar'



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db} from '../../firebase/Firebase';
import { setDoc, Timestamp, doc } from "firebase/firestore"; 

import Navbar from '../../components/navbar/Navbar'
import './Register.css'


const Register = () => {

    const navigate = useNavigate();

    const user = auth.currentUser;

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        errorMsg: [],
        successMsg: "",
        loading: false,
    });

    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        }); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setData({ ...data, errorMsg: null, loading: true });

        if (password !== passwordConfirm) {
            setData({ ...data, errorMsg: "Passwords do not match.", loading: true });
        }

        else if (password !== /^[A-Za-z]\w{7,14}$/) {
            setData({ ...data, errorMsg: "Passwords should be equal to 6 letters.", loading: true});
        }


        try {
            const signup = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName: username

            });

            await setDoc(doc(db, 'users', signup.user.uid), {
                uid: signup.user.uid,
                username,
                email, 
                password, 
                passwordConfirm, 
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
                displayName: username,
            });

            setData({
                username,
                email: "",
                password: "",
                passwordConfirm: "",
                errorMsg: "",
                loading: false,

            });

            navigate('/')
            
        } catch (error) {
            setData({ ...data,errorMsg: error.message,  loading: false });
        }   
    }
    const {username, email, password, passwordConfirm, errorMsg, successMsg, loading } = data;


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


                        <div className="formGroup">
                            <label>Confirm Password</label>
                            <br />
                            <input
                                type='password'
                                required
                                id="passwordConfirm"
                                name='passwordConfirm'
                                onChange={handleChange}
                            />
                        </div>

                        <div className="continue" disabled={loading} onClick={handleSubmit}>
                            <button>Register</button>
                        </div>

                        {/* {data && <span>{data.errorMsg}</span>} */}
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