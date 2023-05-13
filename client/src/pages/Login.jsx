import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/authContext.jsx";

const Login = () => {
    const [inputs,setInputs] = useState({
        username:'',
        password:''
    })
    const [err,setErr] = useState(null)
    const [submitting,setSubmitting] = useState(false);
    const navigate = useNavigate();

    const {currentUser , login} = useContext(AuthContext);
    console.log(currentUser);
    const handleChange = (e)=>{
        console.log(inputs)
        setInputs(prev=>(
            {
                ...prev,
                [e.target.name]:e.target.value
            }
        ))
    }
    useEffect(() => {
        const interval = setTimeout(()=>{
            setErr('');
        },2000)
        return () => {
            clearTimeout(interval)
        };
    }, [err]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSubmitting(true);
        try {
            login(inputs)
            await axios.post("http://localhost:8000/v1/api/auth/login" , {...inputs},{
                withCredentials:true
            } )
            navigate('/');
        }catch (error){
            setErr(error.response?.data)
            console.error("err",error,"error message",error.response?.data)
        }finally {
            setSubmitting(false)
        }
    }
    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="username">Ismingigz:</label>
                    <input required onChange={handleChange} type="text" name="username" placeholder="Ismingiz..." />
                    <span></span>
                </div>
               <div>
                   <label htmlFor="password">Parolingiz:</label>
                   <input required onChange={handleChange} type="password" name="password" placeholder="Parolingiz..." />
                   <span></span>
               </div>
                {err && <p>{err}</p>}
                <span>
                    Don't you hav account? <Link  to="../register">Register</Link>
                </span>
                <button disabled={submitting} onClick={handleSubmit} type="submit">{submitting ? 'Submitting...':'Login'}</button>
            </form>
        </div>
    );
};

export default Login;
