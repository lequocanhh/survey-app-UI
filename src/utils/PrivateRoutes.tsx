import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/store";


const PrivateRoutes = () => {
  const {isAuthenticated} = useAuthStore()
    
  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes