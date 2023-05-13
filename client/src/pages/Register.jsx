import React, {useEffect, useState} from 'react';
import {Link , useNavigate} from "react-router-dom";
import {register} from "../apis/authApi.js";
import axios from "axios";
function Register() {
    const [inputs,setInputs] = useState({
        username:'',
        email:'',
        password:''
    })
    const [submitting,setSubmitting] = useState(false);
    const navigate = useNavigate();
    const [err,setErr] = useState(null)


    const handleChange = (e)=>{
        setInputs(prev=>(
            {
                ...prev,
                [e.target.name]:e.target.value
            }
        ))
        console.log(inputs)
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
            await axios.post("http://localhost:8000/v1/api/auth/register" , {...inputs} )
            navigate('../login' , {replace:true});
        }catch (err){
            setErr(err.response.data.message)
            console.error("err",err)
        }finally {
            setSubmitting(false)
        }
    }
    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <div>
                    <label htmlFor="username">Ismingigz:</label>
                    <input onChange={handleChange} required type="text" name="username" placeholder="Ismingiz..." />
                    <span></span>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleChange} required type="email" name="email"  placeholder="Emailingiz..." />
                    <span></span>
                </div>
                <div>
                    <label htmlFor="username">Parolingiz:</label>
                    <input onChange={handleChange} required type="password"  name="password" placeholder="Parolingiz..." />
                    <span></span>
                </div>
                {err && <p>{err}</p>}
                <span>
                    Do you have an account? <Link  to="../login">Login</Link>
                </span>
                <button disabled={submitting} onClick={handleSubmit} type="submit">{submitting ? 'Registering...':'Register'}</button>
            </form>
        </div>
    );
}

export default Register;