import Login from './pages/Login'; 
import { useContext } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctor from './pages/Admin/AddDoctor';
import { DoctorContext } from './context/DoctorContext';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';


const App = () => {
  const {aToken}= useContext(AdminContext)
  const {dToken}= useContext(DoctorContext)
 
  return aToken || dToken? (
    
    <div className='bg-[#F8F9FD]'> 
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
      <Sidebar/>
      <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard'element={<Dashboard/>}/>
          <Route path='/all-appointments'element={<AllAppointments/>}/>
          <Route path='/add-doctor'element={<AddDoctor/>}/>
          <Route path='/doctor-list'element={<DoctorsList/>}/>


          <Route path='/doctor-profile'element={<DoctorProfile/>}/>
          <Route path='/doctor-appointments'element={<DoctorAppointment/>}/>
          <Route path='/doctor-dashboard'element={<DoctorDashboard/>}/>
        </Routes>
      </div>
    </div>
  ):(
   <>
    <Login/>
    <ToastContainer/>
   </>
  )
  
}

export default App

