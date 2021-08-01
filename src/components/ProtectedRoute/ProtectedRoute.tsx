import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TStore } from '../../redux/reducers';

interface IProtectedRouteProps {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}

export const ProtectedRoute = ({ exact, children }: IProtectedRouteProps) =>
{
    const isAuth = useSelector((store: TStore) => store.access.isAuth);

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