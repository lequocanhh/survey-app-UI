import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Form from "./pages/Form/Form"


function App() {


  return (
    <>
    <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/form' element={<Form/>}/>
          </Routes>  
    </BrowserRouter>
    </>
  )
}

export default App
