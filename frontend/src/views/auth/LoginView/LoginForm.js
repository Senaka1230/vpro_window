import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
  makeStyles
} from '@material-ui/core';
import { login } from 'src/actions/accountActions';
import {TrendingUp} from 'react-feather';

const useStyles = makeStyles(() => ({
  root: {},
  inputField: {
    padding:"2px",
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px', 
      borderColor : "white"
    },
    "& .MuiInputBase-input MuiOutlinedInput-input" : {
      padding : "3px"
    }
  },

  middleText: {
    display:"flex", 
    alignItems:"center"
  },
  largeText: {
    fontSize: '24px',
  },
  smallText: {
    fontSize: '16px',
  },
}));

function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(login(values.email));
          onSubmitSuccess();
        } catch (error) {
          const message = (error.response && error.response.data.message) || 'Something went wrong';

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            placeholder='Please enter company email'
            variant="outlined"
            className={classes.inputField}
          />
           <Box display='flex' justifyContent='center'>
            <Typography variant="body2" className={classes.middleText}>
                Sep 1.2023 - 
            </Typography>
            <Typography variant="subtitle1" style={{color : "#0cb3e5"}}>
                989,758,621 
            </Typography>
            <Typography variant="body2" style={{color : "#0cb3e5"}} className={classes.middleText}>
                w
            </Typography>
            <Typography variant="body2" className={classes.middleText}>
                available and rising
            </Typography>
            <TrendingUp style={{color : "#0cb3e5"}} width='18px' height='25px'/>
            </Box>
            {errors.submit && (
              <Box display='flex' justifyContent='center'>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
          <Box mt={1} display='flex' justifyContent='center'>
            <Button
              color="primary"
              disabled={isSubmitting}
              size="medium"
              type="submit"
              variant="contained"
              style={{backgroundColor : "#0cb3e5"}}
            >
              Enter site
            </Button>
            </Box>
        </form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {}
};

export default LoginForm;
