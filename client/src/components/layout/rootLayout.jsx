import React from 'react';
import {Outlet} from 'react-router-dom'
import {Footer, Navbar} from "../index.js";

function RootLayout(props) {
    return (
        <div className="app">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default RootLayout;