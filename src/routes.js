import { Navigate, useRoutes } from 'react-router-dom';
// pages
import Main from './pages/Main';

export default function Router(){
    return useRoutes([
        {
            path: '/main',
            element: <Main/>,
        },
        {
            path: '*',
            element: <Navigate to='/main' />
        }
    ]);
}