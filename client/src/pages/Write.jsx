import React, {useEffect, useState} from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import {navLinks} from "../data/index.js";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
function Write() {
    const state = useLocation().state
    const [inputs ,setInputs] = useState({
        title:state?.title || "",
        editorValue:state?.des || "",
    })
    const navigate = useNavigate()
    const [cat,setCat] = useState(state?.cat || '');
    const [file,setFile] = useState(null);
    const [errMessage , setErrorMessage] = useState(null)
    const handleChange  = (e) =>{
        console.log('aaa');
        const {name , value , checked , label} = e.target;
        setInputs({...inputs,[name]:value})
        console.log("name",name,"value",value , checked , label )
    }


    const handleUpdate = async (e)=> {
        e.preventDefault();
        if(!inputs.title || !inputs.editorValue || !cat) {
            setErrorMessage(true);
            return;
        }
        const imgUrl = await upload();
        try {
            state
                ? await axios.put(`http://localhost:8000/v1/api/posts/${state.id}`, {
                    title:inputs.title,
                    des: inputs.editorValue,
                    cat,
                    img: file ? imgUrl : "",
                },{
                    withCredentials:true
                })
                : await axios.post(`http://localhost:8000/v1/api/posts`, {
                    title:inputs.title,
                    des: inputs.editorValue,
                    cat,
                    img: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                },{
                    withCredentials:true
                });
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    };


    const upload =async ()=>{
        try {
            const formData = new FormData();
            formData.append('file',file);
            const res = await axios.post('http://localhost:8000/v1/api/upload', formData)
            console.log(res.data);
            return res.data;
        }catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() => {
        const interval = setTimeout(()=>setErrorMessage(false),3000);
        return () => clearTimeout(interval);
    }, [errMessage]);

return (
    <div id="write">
        {errMessage && <h3 style={{
            textAlign:'center',
            marginBottom:10,
            color:'red',
        }}>Sarlavha,post yoki kategoriya bo'sh joy bo'lishi mumkin emas!</h3>}

        <div className="container">
            <div className="content">
                <input  onChange={handleChange} name="title" value={inputs.title} type="text" placeholder="Title..." />
                <div className="editor-container">
                    <ReactQuill className="editor" theme="snow" value={inputs.editorValue}  onChange={(e)=>setInputs({...inputs,editorValue:e})}/>
                </div>
            </div>

            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                            <b>Status: </b> Draft
                        </span>
                    <span>
                            <b>Visibility: </b> Public
                        </span>
                    <input onChange={(e)=>setFile(e.target.files[0])} accept="image/png, image/gif, image/jpeg"  style={{display:'none'}} type="file" id="file" name="file"/>
                    <label  className="file" htmlFor="file">Upload image</label>
                    <div className="buttons">
                        <button>Save as Draft</button>
                        <button onClick={handleUpdate}>Update</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    {navLinks.map(category=>(
                        <div key={category.id} className="ctgry">
                            <input checked={cat === category.name.toLowerCase()} onChange={()=>setCat(category.name.toLowerCase())} type="radio" name="cat"  value={inputs.cat}
                                   id={category.name.toLowerCase()}/>
                            <label htmlFor="cat">{category.name.toUpperCase()}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
}

export default Write;