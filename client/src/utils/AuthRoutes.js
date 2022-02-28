
import { Navigate,Outlet} from 'react-router-dom'
import { useAuthContext } from '../context/auth'

export default function AuthRoute({component: Component, ...rest}){
    const {user} = useAuthContext()

    return user ? <Navigate to="/" /> : <Outlet />
}