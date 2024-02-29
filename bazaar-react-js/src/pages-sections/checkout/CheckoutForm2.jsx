/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutline, ModeEditOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Card1 from "components/Card1";
import { FlexBetween, FlexBox } from "components/flex-box";
import LazyImage from "components/LazyImage";
import { H6, Paragraph } from "components/Typography";
import { months, years } from "data/months-years";
import { format } from "date-fns";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";
import EditAddressForm from "./EditAddressForm";
import NewAddressForm from "./NewAddressForm";
import api from "utils/__api__/checkouts";

// ====================================================================
// date types

// ====================================================================

const Heading = ({ number, title }) => {
  return (
    <FlexBox gap={1.5} alignItems="center" mb={3.5}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          color: "primary.text",
          backgroundColor: "primary.main",
        }}
      >
        {number}
      </Avatar>
      <Typography fontSize="20px">{title}</Typography>
    </FlexBox>
  );
};
const CheckoutForm2 = () => {
  const router = useRouter();
  const [hasVoucher, setHasVoucher] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [dateList, setDateList] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selected, setSelected] = useState(false);
  const handleFormSubmit = async (values) => {
    const paramEmail = {
      phone:values.phoneNumber,
      customerName:values.fullName,
      address:values.address,
      note:values.note,
    };
    var result = await api.sendEmailFunc(paramEmail);
    router.push("/payment");
  };
  const toggleHasVoucher = () => setHasVoucher((has) => !has);
  useEffect(() => {
  }, []);
  const initialValues = {
    fullName: "",
    note: "",
    phoneNumber: "",
    address: ""
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        handleBlur
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1
            sx={{
              mb: 3,
            }}
          >
            <Heading title="Delivery Information" />

            <Box mb={3.5}>
              {/* <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    type="text"
                    name="date"
                    label="Delivery Date"
                    onChange={handleChange}
                    value={values.date}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                  >
                    {dateList.map((item) => (
                      <MenuItem value={item.value} key={item.label}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    type="text"
                    name="time"
                    label="Delivery Time"
                    onChange={handleChange}
                    value={values.time}
                    error={!!touched.time && !!errors.time}
                    helperText={touched.time && errors.time}
                  >
                    {timeList.map((item) => (
                      <MenuItem value={item.value} key={item.value}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid> */}
              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    sx={{
                      mb: 2,
                    }}
                    label="Full Name"
                    onBlur={handleBlur}
                    name="fullName"
                    onChange={handleChange}
                    value={values.fullName}
                    error={!!touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="address"
                    value={values.address}
                    error={
                      !!touched.address && !!errors.address
                    }
                    helperText={
                      touched.address && errors.address
                    }
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    sx={{
                      mb: 2,
                    }}
                    onBlur={handleBlur}
                    label="Phone Number"
                    onChange={handleChange}
                    name="phoneNumber"
                    value={values.phoneNumber}
                    error={
                      !!touched.phoneNumber && !!errors.phoneNumber
                    }
                    helperText={
                      touched.phoneNumber && errors.phoneNumber
                    }
                  />

                  <TextField
                    fullWidth
                    label="Note"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="note"
                    value={values.note}
                    error={
                      !!touched.note && !!errors.note
                    }
                    helperText={
                      touched.note && errors.note
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Card1>

          {/* <Card1
            sx={{
              mb: 3,
            }}
          >
            <FlexBetween>
              <Heading number={2} title="Delivery Address" />

              <NewAddressForm setNewAddress={setNewAddress} />
            </FlexBetween>

            <Typography mb={1.5}>Delivery Address</Typography>
            <Grid container spacing={3}>
              {addressData.map((item, ind) => (
                <Grid item md={4} sm={6} xs={12} key={ind}>
                  <Card
                    sx={{
                      padding: 2,
                      boxShadow: "none",
                      cursor: "pointer",
                      border: "1px solid",
                      position: "relative",
                      backgroundColor: "grey.100",
                      borderColor:
                        item.street1 === values.address
                          ? "primary.main"
                          : "transparent",
                    }}
                    onClick={handleFieldValueChange(
                      item.street1,
                      "address",
                      setFieldValue
                    )}
                  >
                    <FlexBox
                      justifyContent="flex-end"
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                      }}
                    >
                      {selected && (
                        <EditAddressForm
                          selected={selected}
                          addressData={addressData}
                          openEditForm={openEditForm}
                          setOpenEditForm={setOpenEditForm}
                          setAddressData={setAddressData}
                        />
                      )}

                      <IconButton
                        size="small"
                        sx={{
                          mr: 1,
                        }}
                        onClick={() => editHandler(item.name)}
                      >
                        <ModeEditOutline
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => deleteAddress(item.name)}
                      >
                        <DeleteOutline
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      </IconButton>
                    </FlexBox>

                    <H6 mb={0.5}>{item.name}</H6>
                    <Paragraph color="grey.700">{item.street1}</Paragraph>
                    {item.street2 && (
                      <Paragraph color="grey.700">{item.address2}</Paragraph>
                    )}
                    <Paragraph color="grey.700">{item.phone}</Paragraph>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card1> */}

          <Card1
            sx={{
              mb: 3,
            }}
          >
            <Button
              sx={{
                color: "primary.main",
                mt: 3,
                lineHeight: 1,
              }}
              onClick={toggleHasVoucher}
            >
              I have a voucher
            </Button>

            {hasVoucher && (
              <FlexBox mt={3} gap={2} maxWidth="400px">
                <TextField
                  fullWidth
                  name="voucher"
                  value={values.voucher}
                  onChange={handleChange}
                  placeholder="Enter voucher code here"
                />
                <Button variant="contained" color="primary" type="button">
                  Apply
                </Button>
              </FlexBox>
            )}

            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                mt: 3,
              }}
            >
              Place Order
            </Button>
          </Card1>
        </form>
      )}
    </Formik>
  );
};
const checkoutSchema = yup.object().shape({
  // date: yup.string().required("required"),
  // time: yup.string().required("required"),
  // address: yup.string().required("required"),
  // voucher: yup.string(),
  fullName: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  phoneNumber: yup.string().required("required"),
  address: yup.string().required("required"),
});
export default CheckoutForm2;
