import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  makeStyles
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    margin:"10px",
    paddingTop:"50px"
  },
  rangeField: {
    width:"35%",
    '& .MuiOutlinedInput-root': {
      height: '50px'
    },
  },
}));

function Security({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        quoteNumber: '',
        date: moment().format("YYYY-MM-DD"),
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        pcZip : "",
        email:"",
        homeTel:"",
        workTel:"",
        fax:"",
        cell :"",
        quoteValid :"",
        depositType :"",
        depositDollar :"",
        discountType:"",
        discount : "",
        Salesperson :"",
        estimateDateRange : "",
        leadSource :"",
        statusValue :"",
        note :""
      }}
      validationSchema={Yup.object().shape({
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Box display='flex' justifyContent='center'>
                  <TextField
                    label="Quote Number"
                    name="quoteNumber"
                    placeholder='Quote Number'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete='off'
                    type="Number"
                    value={values.quoteNumber}
                    style={{marginRight:"10%"}}
                    className={classes.rangeField}
                    variant="outlined"
                  />
                  <TextField
                    label="Date"
                    name="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="date"
                    value={values.date}
                    className={classes.rangeField}
                    variant="outlined"
                  />
               </Box>
               <Box style={{marginLeft:"10%", marginRight:"10%", marginTop:"70px", border:"solid 1px black", padding:"70px", paddingTop:"5px"}}>
                  <Typography>
                    Customer
                  </Typography>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='First Name'
                      type="text"
                      value={values.firstName}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Last Name'
                      type="text"
                      value={values.lastName}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="Address"
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Address'
                      type="text"
                      value={values.address}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                    <TextField
                      label="City"
                      name="city"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='City'
                      type="text"
                      value={values.city}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="PC/ZIP"
                      name="pcZip"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='PC/ZIP'
                      type="number"
                      value={values.pcZip}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                    <TextField
                      label="E - mail"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='E - mail'
                      type="email"
                      value={values.email}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="Home Tel"
                      name="homeTel"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Home Tel'
                      type="text"
                      value={values.homeTel}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                    <TextField
                      label="Work Tel"
                      name="workTel"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Work Tel'
                      type="email"
                      value={values.workTel}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="Cell"
                      name="cell"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Cell'
                      type="text"
                      value={values.cell}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                    <TextField
                      label="Fax"
                      name="fax"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Fax'
                      type="text"
                      value={values.fax}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
               </Box>
               <Box style={{marginLeft:"10%", marginRight:"10%", marginTop:"70px", border:"solid 1px black", padding:"70px", paddingTop:"5px"}}>
                  <Typography>
                    Order Info
                  </Typography>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="Quote Valid for"
                      name="quoteValid"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Quote Valid for'
                      type="text"
                      value={values.quoteValid}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="Deposit type"
                      name="depositType"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Deposit type'
                      type="text"
                      value={values.depositType}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                    <TextField
                      label="Deposit $"
                      name="depositDollar"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Deposit $'
                      type="text"
                      value={values.depositDollar}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="Discount"
                      name="discount"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Discount'
                      type="number"
                      value={values.discount}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                    <TextField
                      label="Discount Type"
                      name="discountType"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Discount Type'
                      type="text"
                      value={values.discountType}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="Salesperson"
                      name="Salesperson"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Salesperson'
                      type="text"
                      value={values.Salesperson}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                    <TextField
                      label="Lead Source"
                      name="leadSource"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Lead Source'
                      type="text"
                      value={values.leadSource}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="Status"
                      name="statusValue"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Status'
                      type="text"
                      value={values.statusValue}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                      label="Estimate Date Range For Install"
                      name="estimateDateRange"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Estimate Date Range For Install'
                      type="text"
                      value={values.estimateDateRange}
                      className={classes.rangeField}
                      variant="outlined"
                    />
                  </Box>
                  <Box display='flex' justifyContent='space-between' style={{marginTop:"30px"}}>
                    <TextField
                     fullWidth
                      label="Note"
                      name="note"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='off'
                      multiline={true}
                      rows={8}
                      type="text"
                      value={values.note}
                      variant="outlined"
                    />
                  </Box>
               </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
}

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
