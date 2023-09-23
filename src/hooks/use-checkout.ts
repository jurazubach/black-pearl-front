import { useContext } from 'react';
import { CheckoutContext } from 'src/context/checkout-context';

const useCheckout = () => useContext(CheckoutContext);

export default useCheckout;
