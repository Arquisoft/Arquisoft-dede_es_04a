import {ReactSession} from 'react-client-session';
import { Roles } from '../../shared/sharedtypes';

export default function AdminRole({ children }:any) {
    const isAdmin = ():boolean => {return ReactSession.get("user").role===Roles.ROLE_ADMIN};
    return isAdmin() ? children : null;
}