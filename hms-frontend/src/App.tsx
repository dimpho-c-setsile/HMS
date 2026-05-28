
import { Routes, Route, BrowserRouter } from "react-router-dom";
import  Sidebar from "./Components/Sidebar";
import './index.css'
import PatientsPage from "./Pages/PatientsPage";
import Staff from "./Pages/Staff"
import Appointments from "./Pages/Appointment"
import Medicine from "./Pages/Medicine"
import Prescriptions from "./Pages/Prescriptions";
import Queue from "./Pages/Queue";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  return ( <>
  
  <BrowserRouter>
   <Sidebar/>
  
  <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/staff' element={<Staff/>}/>
    <Route path='/appointments' element={<Appointments/>}/>
    <Route path='/medicine' element={<Medicine />} />
    <Route path='/prescriptions' element={<Prescriptions/>}/>
    <Route path='/queue' element={<Queue />}/>
    <Route path='/patients' element={<PatientsPage/>}/>
    </Routes>
    

    </BrowserRouter>
 </> 
  )
}