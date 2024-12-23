import React, {useState} from 'react';
import { 
  Button,
  Box,
  makeStyles 
} from '@material-ui/core';
import Page from 'src/components/Page';
import DesignPage from './designPage';
import OrderInformation from './OrderInformation';
import WindowProperties from './windowProperties';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor : theme.palette.background.default,
    padding:"5px",
    border:"solid 1px black",
    width:"100%",
    height:"100vh",
    overflow:"hidden"
  },
  selectedTab : {
    backgroundColor:"white",
    borderRadius :"0px",
    fontWeight:"bold",
    paddingLeft:"10px",
    paddingRight:"10px"
  },
  unselectedTab : {
    backgroundColor:"lightgrey",
    borderRadius :"0px",
    fontWeight:"bold",
    paddingLeft:"20px",
    paddingRight:"10px"
  }
}));

function HomeView() {
  const classes = useStyles();

  const [selectedMenuItem, setSelectedMenuItem] = useState("design");
  const [subject, setSubject] = useState("newQuote");



  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };

  const handleSubjectClick = (item) => {
    setSubject(item);
  };

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <Box style={{margin:"5px", border:"solid 2px black"}}>
      <Box display='flex' justifyContent='left' style={{borderBottom : "solid 1px grey", paddingTop:"15px"}}>
       <Button
          onClick={() => handleSubjectClick('newQuote')}
          color={subject === 'newQuote' ? 'primary' : 'default'}
          className={subject === 'newQuote' ? classes.selectedTab : classes.unselectedTab}
        >
          New Quote
        </Button>
        <Button
          onClick={() => handleSubjectClick('openQuoate')}
          color={subject === 'openQuoate' ? 'primary' : 'default'}
          className={subject === 'openQuoate' ? classes.selectedTab : classes.unselectedTab}
        >
          Open Quoate
        </Button>
        <Button
          onClick={() => handleSubjectClick('viewQuoate')}
          color={subject === 'viewQuoate' ? 'primary' : 'default'}
          className={subject === 'viewQuoate' ? classes.selectedTab : classes.unselectedTab}
        >
          View Quoate
        </Button>
        <Button
          onClick={() => handleSubjectClick('setting')}
          color={subject === 'setting' ? 'primary' : 'default'}
          className={subject === 'setting' ? classes.selectedTab : classes.unselectedTab}
        >
          Setting
        </Button>
        <Button
          onClick={() => handleSubjectClick('saveQuoate')}
          color={subject === 'saveQuoate' ? 'primary' : 'default'}
          className={subject === 'saveQuoate' ? classes.selectedTab : classes.unselectedTab}
        >
          Save Quoate
        </Button>
        <Button
          onClick={() => handleSubjectClick('closeQuoate')}
          color={subject === 'closeQuoate' ? 'primary' : 'default'}
          className={subject === 'closeQuoate' ? classes.selectedTab : classes.unselectedTab}
        >
          Close Quoate
        </Button>
      </Box>
      <Box display='flex' justifyContent='left' style={{borderBottom : "solid 1px grey"}}>
        <Button
          onClick={() => handleMenuItemClick('orderInformation')}
          color={selectedMenuItem === 'orderInformation' ? 'primary' : 'default'}
          className={selectedMenuItem === 'orderInformation' ? classes.selectedTab : classes.unselectedTab}
        >
          Order Information
        </Button>
        <Button
          onClick={() => handleMenuItemClick('windowProperties')}
          color={selectedMenuItem === 'windowProperties' ? 'primary' : 'default'}
          className={selectedMenuItem === 'windowProperties' ? classes.selectedTab : classes.unselectedTab}
        >
          Window Properties
        </Button>
        <Button
          onClick={() => handleMenuItemClick('design')}
          color={selectedMenuItem === 'design' ? 'primary' : 'default'}
          className={selectedMenuItem === 'design' ? classes.selectedTab : classes.unselectedTab}
        >
          Design
        </Button>
        <Button
          onClick={() => handleMenuItemClick('items')}
          color={selectedMenuItem === 'items' ? 'primary' : 'default'}
          className={selectedMenuItem === 'items' ? classes.selectedTab : classes.unselectedTab}
        >
          Items
        </Button>
        <Button
          onClick={() => handleMenuItemClick('extra')}
          color={selectedMenuItem === 'extra' ? 'primary' : 'default'}
          className={selectedMenuItem === 'extra' ? classes.selectedTab : classes.unselectedTab}
        >
         Extra Items
        </Button>
        <Button
          onClick={() => handleMenuItemClick('notification')}
          color={selectedMenuItem === 'notification' ? 'primary' : 'default'}
          className={selectedMenuItem === 'notification' ? classes.selectedTab : classes.unselectedTab}
        >
         Notification
        </Button>
      </Box>

      {selectedMenuItem && (
        <div>
          {(selectedMenuItem === 'orderInformation' &&  subject === 'newQuote')&& <OrderInformation />}
          {(selectedMenuItem === 'windowProperties' &&  subject === 'newQuote')&& <WindowProperties />}
          {(selectedMenuItem === 'design' &&  subject === 'newQuote')&& <DesignPage />}
        </div>
      )}
      </Box>
    </Page>
  );
}

export default HomeView;
