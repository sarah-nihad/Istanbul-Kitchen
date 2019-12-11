import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Home from '../main/Home';
import Users from '../main/Users';
import Section from '../main/Sections';
import Department from '../main/Department';
import Kitchen from '../main/Kitchen';
import Prepare from '../main/Prepare';
import Notification from '../main/Notification';
import Dashboard from '../Dashboard/Dashboard';
import User from '../Dashboard/User';
import Material from '../main/Material';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import { Link ,NavLink} from 'react-router-dom'
import { Navbar,Nav } from 'react-bootstrap';
import { Popover, Pane, Avatar } from 'evergreen-ui';
import Store from '../main/Store';
import Stores from '../main/Stores';
import { Redirect} from 'react-router-dom';
import Lottie from 'lottie-react-web';
import animation from '../../assets/js/animation.json';
import Context from '../../assets/js/context';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function rendertitile(props) {
   if (props.match.path === '/Home') {
        return ( <div> الواجهة الرئيسية  </div>)
      }

    else  if (props.match.path === '/Users') {
        return ( <div>  المستخدمين  </div>)
      }
         else  if (props.match.path === '/User') {
        return ( <div>  المستخدمين  </div>)
      }

      else  if (props.match.path === '/Kitchen') {
        return ( <div>  المطابخ  </div>)
      }

      else  if (props.match.path === '/Section') {
        return ( <div>  المواد والاصناف  </div>)
      }

      else  if (props.match.path === '/Material') {
        return ( <div>  المواد والاصناف  </div>)
      }

      else  if (props.match.path === '/Notification') {
        return ( <div>  التنبيهات   </div>)
      }

      else  if (props.match.path === '/Dashboard') {
        return ( <div>  Dashboard   </div>)
      }
         else  if (props.match.path === '/Prepare') {
        return ( <div>  المطابخ   </div>)
      }
     else  if (props.match.path === '/Store') {
        return ( <div>  المخزون   </div>)
      }
     else  if (props.match.path === '/Stores') {
        return ( <div>  المخازن   </div>)
      }
       else  if (props.match.path === '/Department') {
        return ( <div>  الاقسام   </div>)
      }
}








const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
 
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
        display: 'flex',
           
  },
  drawerPaper: {
    width: drawerWidth,
      overflowY: 'visible',
    backgroundColor:'#9bc2ef87',
    color:'#757575'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
   
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
 
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const renderPage = (props) => {
  if (props.match.path === '/Home') {
    return (<Home />)
  }
  if (props.match.path === '/Dashboard') {
    return (<Dashboard />)
  }
  else if (props.match.path === '/User') {
    return (<User/>)
  }
  else if (props.match.path === '/Users') {
    return (<Users/>)
  }
  else if (props.match.path === '/Section') {
    return (<Section />)
  }
  else if (props.match.path === '/Material') {
    return (<Material />)
  }
  else if (props.match.path === '/Kitchen') {
    return (<Kitchen/>)
  }
  else if (props.match.path === '/Notification') {
    return (<Notification  />)
  }
  else if (props.match.path === '/Dashboard') {
    return (<Dashboard  />)
  }
   else if (props.match.path === '/Prepare') {
    return (<Prepare  />)
  }
   else if (props.match.path === '/Store') {
    return (<Store  />)
  }
    else if (props.match.path === '/Stores') {
    return (<Stores />)
  }
     else if (props.match.path === '/Department') {
    return (<Department />)
  }
}
  return (

   <Context.Consumer>{ctx => {


        if (ctx.value.che==="notlogin") {
          return(
        <Redirect to="/"></Redirect>
          )
        }else if (ctx.value.che==="login") {
          return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar  id='abr'
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
      <Navbar  expand="lg" id="navmain">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

        {/* <Navbar.Brand >{rendericon(this.props)}</Navbar.Brand> */}
             
                      <Nav className="mr-auto">
                  
                      </Nav>
                      <div id='sarnavimg44'>
                <div id='nav_title' >   {rendertitile(props)} </div>
                   
                        <div id='ss'>
                             <Link to ='/Notification'>   <Box display="flex">
  <Box m={2}>
    <Badge badgeContent={ctx.value.data.length} color="secondary">
     <NotificationsIcon  style={{color:'white'}} />
    </Badge>
  </Box>
</Box>
</Link>
                    <div id='p1'>اسم المستخدم</div> 
                     <Popover 
              content={
                <Pane
                  width={200}
                  height={100}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
              
                >
                 <div  id='out' onClick={()=>{ 
                  cookies.remove("token");
                  window.location.href= "/"
                }}>تسجيل الخروج </div> 
                </Pane>
              }
            >
              <Avatar
                 src={require('../../assets/img/user-profile.png' )} 
                name=""
                size={30}
                id='hh'
              />
            </Popover>
    
            </div>
            </div>
                    
                
                 
              </Navbar>
         
             
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

          <div id='jj'>
               
                <div className={classes.toolbar} />
        
           
              
            

                <div className='logo-large' >
                <img src={require('../../assets/img/Logo.png')} alt='img' style={{height:100}}  />
</div>

<NavLink to='/Dashboard' activeClassName='active' >
                  <List className='sidefect' >

                    <ListItem >
                  <img src={require('../../assets/img/home.png')} alt='img' id='side_img'  />
                      <ListItemText ><span  className='sspan' style={{fontWeight: '500',fontSize:'18px' }}>Dashboard</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink> 
                <NavLink to='/Users' activeClassName='active' >
                  <List className='sidefect' >

                    <ListItem >
                  <img src={require('../../assets/img/user.png')} alt='img' id='side_img'  />
                      <ListItemText ><span  className='sspan' style={{fontWeight: '500',fontSize:'18px' }}>المستخدمين</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                       <NavLink to='/Department' activeClassName='active' >
                  <List className='sidefect' >

                    <ListItem >
                  <img src={require('../../assets/img/user.png')} alt='img' id='side_img'  />
                      <ListItemText ><span  className='sspan' style={{fontWeight: '500',fontSize:'18px' }}>الاقسام</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                <NavLink to='/Section' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/section.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}>المواد والاصناف</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                     <NavLink to='/Stores' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/cart.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}> المخازن</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                <NavLink to='/Kitchen' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/chef.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}> تجهيز المطابخ</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                <NavLink to='/Notification' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/bell.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}> التنبيهات</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>


              </div>
   
       
     
      </Drawer>
  <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        

          {renderPage(props)}

        
        </main>
    </div>
        
          )
        }else if (ctx.value.che==="") {
          return(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}  >
   
   <Lottie
                 options={{
                   animationData: animation,
                 }}
                width={300}
                height={300}
               />
</div>
          )
        }
    
      }}

      </Context.Consumer>


   
  );

}
