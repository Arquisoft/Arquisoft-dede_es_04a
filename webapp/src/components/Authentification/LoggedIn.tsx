import {ReactSession} from 'react-client-session';

export default function LoggedIn({ children }:any) {
    const loggedIn = ():boolean => {return ReactSession.get("user")!==undefined};
    return loggedIn() ? children : null;
}