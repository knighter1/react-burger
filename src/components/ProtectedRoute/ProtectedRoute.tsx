import { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from '../../hooks';

interface IProtectedRouteProps {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}

export const ProtectedRoute:FC<IProtectedRouteProps> = ({ exact, children }) =>
{
    const isAuth = useSelector(store => store.access.isAuth);

    return (
        <Route
            exact={exact === true}
            render={({ location }) =>
                isAuth ? (
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