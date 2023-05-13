import React, {useEffect, useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import axios from "axios";
import noimage  from '../assets/noimage.jpg'
function Home(props) {
    const [posts , setPosts] = useState([])
    const [searchParams] = useSearchParams();
    const category = searchParams.get("cat") ? `?cat=${searchParams.get("cat")}` : '';
    useEffect(() => {
        const fetchData = async ()=>{
            try {
                const res = await axios.get('http://localhost:8000/v1/api/posts' + category);
                setPosts(res.data);
                console.log(res.data)
            }
            catch (err)
            {
                console.log(err)
            }
        }
        fetchData();
    }, [category]);

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }


    return (
        <div id="home">
            <div className="container">
               <div className="posts">
                   {posts.map(post=>(
                       <div key={post.id} className="post">
                           <div className="img">
                               <img loading="lazy" onError={({currentTarget})=>{
                                   currentTarget.onerror = null;
                                   currentTarget.src = noimage;
                               }} src={`../uploads/${post.img}`} alt={post.title}/>
                           </div>
                           <div className="content">
                               <h1>{post.title}</h1>
                               <p>{getText(post.des)}</p>
                               <button>
                                   <Link to={`../post/${post.id}`}>
                                       Read More
                                   </Link>
                               </button>
                           </div>
                       </div>
                   ))}
               </div>
            </div>
        </div>
    );
}

export default Home;