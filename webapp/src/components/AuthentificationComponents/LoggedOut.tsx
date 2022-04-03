import {ReactSession} from 'react-client-session';

export default function LoggedOut({ children }:any) {
    const loggedOut = ():boolean => {return ReactSession.get("username")===undefined};
    return loggedOut() ? children : null;
}