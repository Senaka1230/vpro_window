import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  Typography,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop:"20px",
    margin:"20px"
  },
  customSelect: {
    '& .MuiOutlinedInput-root': {
      padding:0,
      width:"300px",
      height:"40px",
      color:"black",
      backgroundColor:"white",
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(12, 179, 229)'
      },
      "& .MuiSelect-root" : {
        paddingTop:"7px",
        paddingBottom:"7px"
      }
    }
},
}));

const measurementOptions = [
  {label : "Inside", value : "inside"}, 
  {label : "Outside", value : "outside"}
];

function Security({ className, ...rest }) {
  const classes = useStyles();

  const [measureOption, setMeasureOption] = useState("inside");

  return (
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Grid container spacing={1} style={{marginLeft:"10%"}}>
                <Grid item lg={2} xs={2}>
                  <Typography style={{marginTop:"5px"}}>
                    Measurement taken from
                  </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  value={measureOption}
                  onChange={(event) =>setMeasureOption(event.target.value)}
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                >
                  {measurementOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Frame Type
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                   Flex Color
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Exterior color
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Interior color
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Brick mould
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Brick mould color
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Jamb extension
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Casing
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Rosset
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Glass type
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Glass Thickness
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Grill Material
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               <Grid item lg={2} xs={2}>
                <Typography style={{marginTop:"5px"}}>
                  Grill pattern
                </Typography>
                </Grid>
                <Grid item lg={10} xs={10}>
                  <TextField              
                  select
                  variant="outlined"
                  className={classes.customSelect}
                  SelectProps={{
                    MenuProps: {
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    },
                  }}
                />
               </Grid>
               </Grid>
            </CardContent>
          </Card>
  );
}

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
