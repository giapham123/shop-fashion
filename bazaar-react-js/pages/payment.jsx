import { Grid } from "@mui/material";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
const Checkout = () => {
  return (
    <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={4} md={4} xs={12}>
          {/* <PaymentForm /> */}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <PaymentSummary />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          {/* <PaymentForm /> */}
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};
export default Checkout;
