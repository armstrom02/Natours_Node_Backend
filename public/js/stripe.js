/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_Dys9puapakNqonoQdfTQj5IL00uEFRuiGk');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API;
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 1) Create checkout form  + charge credit card;
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (error) {
    showAlert('error', err);
  }
};
