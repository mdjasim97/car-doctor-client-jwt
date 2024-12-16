
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../CustomHook/useAuth';

const PrivateRoute = ({ children }) => {
    const {user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div className='min-h-screen flex items-center justify-center'>
            <span className="text-9xl loading loading-spinner loading-lg"></span>
        </div>
    }

    if(user?.email){
        return children
    }

    return (
        <Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default PrivateRoute;