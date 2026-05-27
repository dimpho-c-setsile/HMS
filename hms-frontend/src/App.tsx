
import { Routes, Route, BrowserRouter } from "react-router-dom";
import  Sidebar from "./Components/Sidebar";
import './index.css'


import PatientsPage from "./Pages/PatientsPage";
import Staff from "./Pages/Staff"

export default function App() {
  return (<>
  
  <BrowserRouter>
   <Sidebar/>
  
  <Routes>
    <Route path='/' element={<PatientsPage/>}/>
    <Route path='/motion' element={<Staff/>}/>
    </Routes>
    

    </BrowserRouter>
 </> 
  )
}