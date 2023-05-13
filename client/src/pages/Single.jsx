import React, {useContext, useEffect, useState} from 'react';
import {DeleteIcon, EditIcon} from "../utils/icons.jsx";
import {Link , useParams , useNavigate} from "react-router-dom";
import {Menu} from "../components/index.js";
import axios from "axios";
import noimage from '../assets/noimage.jpg'
import moment from "moment";
import {AuthContext} from "../context/authContext.jsx";
import DOMPurify from "dompurify";


function Single(props) {
    const [post , setPost] = useState([])
    const {id} = useParams();
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(currentUser);
    useEffect(() => {
        const fetchData = async ()=>{
            try {
                const res = await axios.get('http://localhost:8000/v1/api/posts/' + id);
                setPost(res.data);
                console.log(res.data)
            }
            catch (err)
            {
                console.log(err)
            }
        }
        fetchData();
    }, [id]);
    const handleDelete = async ()=>{
        try {
            await axios.delete('http://localhost:8000/v1/api/posts/' + id , {
                withCredentials:true
            })
            navigate('../');
        }catch (err)
        {
            console.log(err);
        }
    }
    return (
        <div id="single-post">
            <div className="container">
                <div className="content">
                    <img
                        onError={({currentTarget})=>{
                            currentTarget.onerror = null;
                            currentTarget.src = noimage;
                        }}
                        src={`../uploads/${post.img}`}
                        loading="lazy"
                        alt="post image"/>

                    <div className="user">
                            {post.userImg &&
                                <img
                                src={post.userImg}
                                alt="user-image"/>
                            }

                        <div className="info">
                            <span>{post.username}</span>
                            <p>posted {moment(post.date).fromNow()}</p>
                        </div>
                        {currentUser && currentUser.username === post.username &&
                            <div className="edit">
                                <Link className="edit-btn" to={`../write?edit=${post.id}`} state={post} >
                                    <EditIcon/>
                                </Link>
                                <div onClick={handleDelete} className="delete-btn">
                                    <DeleteIcon/>
                                </div>
                            </div>
                        }
                    </div>
                    <h1>{post.title}</h1>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.des),
                        }}
                    ></p>
                </div>
                <Menu cat={post.cat} postId={post.id}/>
            </div>
        </div>
    );
}

export default Single;