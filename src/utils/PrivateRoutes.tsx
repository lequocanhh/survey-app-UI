import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/store";
import { useEffect } from "react";


const PrivateRoutes = () => {
  const {isAuthenticated} = useAuthStore()

  useEffect(() => {
    if(!isAuthenticated){
      localStorage.removeItem('token')
    }
  }, [isAuthenticated])

  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes