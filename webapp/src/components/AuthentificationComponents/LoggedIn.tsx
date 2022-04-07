import {ReactSession} from 'react-client-session';

export default function LoggedIn({ children }:any) {
    const loggedIn = ():boolean => {return ReactSession.get("username")!==undefined};
    return loggedIn() ? children : null;
}