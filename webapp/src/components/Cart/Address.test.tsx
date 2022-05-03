import { render } from "@testing-library/react";
import { BrowserRouter} from 'react-router-dom';
import Address from "./Address";

test('check the address form render properly', async () => {
    const {getByText} = render(<BrowserRouter><Address/></BrowserRouter>);
    expect(getByText("Your address")).toBeInTheDocument();
  });