import { Divider, Button, Grid } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
import { currency } from "lib";
import Link from "next/link";
import { useAppContext } from "contexts/AppContext";
const PaymentSummary = () => {
  const { state } = useAppContext();
  const cartList = state.cart;
  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };
  return (
    <Card1>
      {cartList.map((item) => (
        <FlexBetween mb={1.5} key={item.name}>
          <Paragraph>
            <Span fontWeight="700" fontSize="14px">
              {item.qty}
            </Span>{" "}
            x {item.name}
          </Paragraph>
          <Paragraph>{currency(item.price)}</Paragraph>
        </FlexBetween>
      ))}
      {/* <FlexBetween mb={1}>
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(2610)}
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Shipping:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          -
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Tax:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(40)}
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={2}>
        <Paragraph color="grey.600">Discount:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          -
        </Paragraph>
      </FlexBetween>

      <Divider
        sx={{
          mb: 2,
        }}
      /> */}

      <Paragraph
        fontSize={25}
        fontWeight={600}
        lineHeight={1}
        textAlign="right"
      >
        {currency(getTotalPrice())}
      </Paragraph>
      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Button
            LinkComponent={Link}
            variant="contained"
            color="primary"
            href="/"
            type="submit"
            fullWidth
          >
            Back To Shop
          </Button>
        </Grid>
      </Grid>
    </Card1>
  );
};
export default PaymentSummary;
