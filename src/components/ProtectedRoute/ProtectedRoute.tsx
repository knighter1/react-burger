import { useAuth } from '../../services/auth';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface IProtectedRouteProps {
    path: string;
    exact: boolean;
    children: React.ReactNode;
}

export const ProtectedRoute = ({ path, exact, children, ...rest }: IProtectedRouteProps) => {
    
    let { user, getUser }: any = useAuth();
    
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        user = await getUser();
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded)
        return null;

    return (
        <Route
            path={path}
            exact={exact}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}
                />
            )}
        />
    );
}