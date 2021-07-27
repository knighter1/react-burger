import { useAuth } from '../../services/auth';
import { Redirect, Route } from 'react-router-dom';

interface IProtectedRouteProps {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}

export const ProtectedRoute = ({ path, exact, children, ...rest }: IProtectedRouteProps) =>
{
    const { isAuth }: any = useAuth();

    return (
        <Route
            path={path}
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