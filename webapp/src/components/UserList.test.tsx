import { render } from "@testing-library/react";
import UserList from "./UserList";
import {User} from "../shared/sharedtypes";

test('check that the list of users renders propertly', async () => {
    const userList:User[] = [{username: 'Pablo', email: 'gonzalezgpablo@uniovi.es', token: '', password:'' }];
    const {getByText} = render(<UserList users={userList}/>);
    expect(getByText(userList[0].username)).toBeInTheDocument();
    //expect(getByText(userList[0].email)).toBeInTheDocument();
  });