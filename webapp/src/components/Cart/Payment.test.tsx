import { render } from "@testing-library/react";
import { BrowserRouter} from 'react-router-dom';
import Payment from "./Payment";

test('check the payment form render properly', async () => {
    const {getByText} = render(<BrowserRouter><Payment/></BrowserRouter>);
    expect(getByText("Payment")).toBeInTheDocument();
  });