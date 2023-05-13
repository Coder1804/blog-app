import React from 'react';
import {Link} from "react-router-dom";
import {navLinks} from "../../data/index.js";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";

function Navbar() {
    const {currentUser , logout} = useContext(AuthContext);
    return (
        <header>
          <div className="container">
              <Link to="/" className="logo">BLOG APP</Link>
              <nav>
                  <ul>
                      {navLinks.map(link=>(
                          <li key={link.name}>
                              <Link to={`../?cat=${link.name.toLowerCase()}`}>
                                  {link.name.toUpperCase()}
                              </Link>
                          </li>
                      ))}
                  </ul>
                  <span>{currentUser?.username}</span>
                  {currentUser ? (<span onClick={logout}>Log out</span>) : (<span><Link to="/login">Log in</Link></span>)
                  }
                  <span id="write">
                      <Link to="../write">Write</Link>
                  </span>
              </nav>
          </div>
        </header>
    );
}

export default Navbar;