import { useState } from 'react'
import {createBrowserRouter , RouterProvider , Route} from "react-router-dom";
import {Home, Login, Register, Single, Write} from "./pages";
import {RootLayout} from "./components/index.js";


const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path:'post/:id',
        element:<Single/>,
        errorElemen:<h1>Bunday Foydalanuvchi yo'q</h1>
      },
      {
        path:'write',
        element:<Write/>
      },
    ]
  },
  {
    path:'/register',
    element: <Register/>
  },
  {
    path:'/login',
    element: <Login/>
  },
])

function App() {

  return (
      <RouterProvider router = {router}/>
  )
}

export default App;
