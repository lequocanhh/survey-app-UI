import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Form from "./pages/Form/Form"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import PrivateRoutes from "./utils/PrivateRoutes"



function App() {
  return (
    <>
    <BrowserRouter>
         <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route element={<Home/>} path="/"/>
              <Route element={<Form />} path="/form/create"/>
              <Route element={<Form/>} path="/do-form/:id"/>
              <Route element={<Form />} path="form/edit/:id"/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
          </Routes>  
    </BrowserRouter>
    </>
  )
}

export default App
