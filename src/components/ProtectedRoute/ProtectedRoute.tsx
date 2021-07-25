import { useAuth } from '../../services/auth';
import { Redirect, Route } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

interface IProtectedRouteProps {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}

export const ProtectedRoute = ({ path, exact, children, ...rest }: IProtectedRouteProps) =>
{
    const useAuthRes = useAuth();
    let { user }: any = useAuthRes;
    const { getUser }: any = useAuthRes;
    
    const [isUserLoaded, setUserLoaded] = useState(false);

    const userRef = useRef(user);

    const init = useCallback(async function ()
    {
        userRef.current = await getUser();
        setUserLoaded(true);
    }, [getUser, setUserLoaded]);

    useEffect(() =>
    {
        init();
    }, [init]);

    if (!isUserLoaded)
        return null;

    return (
        <Route
            path={path}
            exact={exact === true}
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