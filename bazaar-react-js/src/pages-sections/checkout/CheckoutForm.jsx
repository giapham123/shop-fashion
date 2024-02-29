import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Checkbox, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "components/Card1";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import countryList from "data/countryList";
import api from "utils/__api__/checkouts";
const CheckoutForm = () => {
  const router = useRouter();
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const handleFormSubmit = async (values) => {
    const paramEmail = {
      phone:values.phoneNumber,
      customerName:values.fullName,
      address:values.address,
      note:values.note,
    };
    var result = await api.sendEmailFunc(paramEmail);
    if(result.status == 200){
      router.push("/payment");
    }else{
      enqueueSnackbar("Cant Order Products", {
        variant: "error",
      }); 
    }
  };
  const handleCheckboxChange = (values, setFieldValue) => (e, _) => {
    const checked = e.currentTarget.checked;
    setSameAsShipping(checked);
    setFieldValue("same_as_shipping", checked);
    setFieldValue("billing_name", checked ? values.shipping_name : "");
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1
            sx={{
              mb: 4,
            }}
          >
            <Typography fontWeight="600" mb={2}>
              Shipping Address
            </Typography>

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
                
                {/* <TextField
                  fullWidth
                  type="number"
                  sx={{
                    mb: 2,
                  }}
                  label="Zip Code"
                  name="shipping_zip"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_zip}
                  error={!!touched.shipping_zip && !!errors.shipping_zip}
                  helperText={touched.shipping_zip && errors.shipping_zip}
                /> */}
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
                {/* <TextField
                  fullWidth
                  type="email"
                  sx={{
                    mb: 2,
                  }}
                  onBlur={handleBlur}
                  name="shipping_email"
                  label="Email Address"
                  onChange={handleChange}
                  value={values.shipping_email}
                  error={!!touched.shipping_email && !!errors.shipping_email}
                  helperText={touched.shipping_email && errors.shipping_email}
                /> */}
                {/* <TextField
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                  label="Company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_company"
                  value={values.shipping_company}
                  error={
                    !!touched.shipping_company && !!errors.shipping_company
                  }
                  helperText={
                    touched.shipping_company && errors.shipping_company
                  }
                /> */}

                {/* <Autocomplete
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                  options={countryList}
                  value={values.shipping_country}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) =>
                    setFieldValue("shipping_country", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      label="Country"
                      variant="outlined"
                      placeholder="Select Country"
                      error={
                        !!touched.shipping_country && !!errors.shipping_country
                      }
                      helperText={
                        touched.shipping_country && errors.shipping_country
                      }
                      {...params}
                    />
                  )}
                /> */}

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
          </Card1>

          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <Button
                LinkComponent={Link}
                variant="outlined"
                color="primary"
                type="button"
                href="/cart"
                fullWidth
              >
                Back to Cart
              </Button>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Place To Order
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
const initialValues = {
  fullName: "",
  phoneNumber: "",
  address: "",
  shipping_contact: "",
  shipping_company: "",
  shipping_address1: "",
  shipping_address2: "",
  shipping_country: countryList[229],
  billing_zip: "",
  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_address1: "",
  billing_address2: "",
  billing_country: countryList[229],
};

// uncomment these fields below for from validation
const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  phoneNumber: yup.string().required("required"),
  address: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.object().required("required"),
  // billing_address1: yup.string().required("required"),
});
export default CheckoutForm;
