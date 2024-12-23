import React from 'react';
import { useHistory } from 'react-router';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80
  },
  // card: {
  //   overflow: 'visible',
  //   display: 'flex',
  //   position: 'relative',
  //   '& > *': {
  //     flexGrow: 1,
  //     flexBasis: '50%',
  //     width: '50%'
  //   }
  // },
  // content: {
  //   padding: theme.spacing(2, 2, 2, 2)
  // },
  blueUnderline: {
    textDecoration: 'none',
    borderBottom: '4px solid #0cb3e5', 
    display: 'inline', 
    textAlign:"center",
    fontWeight : "bold",
    fontSize:"80px", 
    height:"103px"
  },
  subtext: {
    textAlign:"center"
  },
}));

function LoginView() {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = () => {
    history.push('/app');
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container maxWidth="md">
        {/* <Card className={classes.card}>
          <CardContent className={classes.content}> */}
            <Box display='flex' justifyContent='center' >
              <Typography
                color="textPrimary"
                className={classes.blueUnderline}
              >
              1000
              </Typography>
            </Box>
            <Box display='flex' justifyContent='center' >
            <Typography
             variant='h2'
              color="textPrimary"
              className={classes.subtext}
            >
              CONTAINERS.COM
            </Typography>
            </Box>
            <Typography
              variant='body2'
              color="textSecondary"
              style={{textAlign:"center", fontStyle:"italic"}}
            >
              SUN - BY THE PALLET OR BUY THE TON
            </Typography>
              <LoginForm onSubmitSuccess={handleSubmitSuccess} />
          {/* </CardContent> */}        
        {/* </Card> */}
      </Container>
    </Page>
  );
}

export default LoginView;
