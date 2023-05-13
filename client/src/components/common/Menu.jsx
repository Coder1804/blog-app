import React , {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import noimage from '../../assets/noimage.jpg'


function Menu({cat , postId}) {
    const [posts , setPosts] = useState([])
    useEffect(() => {
        const fetchData = async ()=>{
            try {
                const res = await axios.get('http://localhost:8000/v1/api/posts?cat=' + cat);
                const data = res.data.filter(item=> item.id !== postId)
                setPosts(data);
                console.log(data)
            }
            catch (err)
            {
                console.log(err)
            }
        }
        fetchData();
    }, [postId , cat]);



    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {
                posts.map(post=>(
                    <div key={post.id} className="post">
                        <img src={post.img.length ? `../uploads/${post.img}` : noimage} onError={(currentTarget)=>{
                            currentTarget.onerror = null;
                            currentTarget.src = noimage;
                        }} alt={post.title}/>
                        <h2>{post.title}</h2>
                        <div style={{
                            display:'flex',
                            justifyContent:'space-between'
                        }}>
                            <button >
                                <Link  to={`/post/${post.id}`}>Read More</Link>
                            </button>
                            <span>{post.cat}</span>
                        </div>

                    </div>
                ))
            }
        </div>
    );
}

export default Menu;