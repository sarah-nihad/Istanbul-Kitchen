
import React from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Prepare from '../main/Prepare';
// import Context from '../Context';
// import Login from '../login/login';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
// import Border_all from '@material-ui/icons/Border_all';

import { Navbar,Nav } from 'react-bootstrap';

import { Popover, Pane, Avatar } from 'evergreen-ui';

import { withStyles } from '@material-ui/core/styles';
import { Link ,NavLink} from 'react-router-dom'
// import Cookies from 'universal-cookie';

import Home from '../main/Home';
import Users from '../main/Users';
import Section from '../main/Sections';
import Kitchen from '../main/Kitchen';
import Notification from '../main/Notification';
import Dashboard from '../Dashboard/Dashboard';
import Material from '../main/Material';
// const cookies = new Cookies();
function rendericon(props) {
 
  // if (props.match.path === '/Home') {
  //   return ( <Link to='./Add' id='ll'><i className="fas fa-arrow-circle-left" id='ic'></i></Link>)
  // }
//   else if (props.match.path === '/Discountuser') {
//     return ( <Link to='./Add' id='ll'> <i className="fas fa-arrow-circle-left" id='ic'></i></Link>)
//   }
  if (props.match.path === '/Addcompany') {
    return ( <Link to='./Home' id='ll'> <i className="fas fa-arrow-circle-left" id='ic'></i></Link>)
  }
  

  else if (props.match.path === '/Addcard') {
    return ( <Link to='./Home' id='ll'> <i className="fas fa-arrow-circle-left" id='ic'></i></Link>)
  }
 
  
  else if (props.match.path === '/Resturant') {
    return ( <Link to='./Home' id='ll'> <i className="fas fa-arrow-circle-left" id='ic'></i></Link>)
  }
  
  

}

function rendertitile(props) {
   if (props.match.path === '/Home') {
        return ( <div> الواجهة الرئيسية  </div>)
      }

    else  if (props.match.path === '/Users') {
        return ( <div>  المستخدمين  </div>)
      }

      else  if (props.match.path === '/Kitchen') {
        return ( <div>  المطابخ  </div>)
      }

      else  if (props.match.path === '/Section') {
        return ( <div>  المواد والاقسام  </div>)
      }

      else  if (props.match.path === '/Material') {
        return ( <div>  المواد والاقسام  </div>)
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

}

const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
       display: 'flex',
    
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    overflowY: 'visible',
    backgroundColor:'#0080FF',
    color:'#fff'
   
  
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
  
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  render(props) {
    const { classes, theme } = this.props;

    return (
      // <Context.Consumer>
      //   {ctx => {
      //     if (ctx.value.session.role === 1) {
      //       return (

      <div className={classes.root} >

        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} id='abr' >
         
           
       
          <Navbar  expand="lg" id="navmain">
                 
          <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
                 <Navbar.Brand >{rendericon(this.props)}</Navbar.Brand>
             
                      <Nav className="mr-auto">
                  
                      </Nav>
                      <div id='sarnavimg44'>
                <div id='nav_title' >   {rendertitile(this.props)} </div>
                   
                        <div id='ss'>
                    <div id='p1'>اسم المستخدم</div> 
                     <Popover  style={{zIndex:'1122'}}
              content={
                <Pane
                  width={200}
                  height={100}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  zIndex="1101"
                >
                {/* <button  id='out' onClick={()=>{ 
                  cookies.remove("token");
                  window.location.href= "/"
                }}>Log out</button> */}
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

        <nav className={classes.drawer}>
        
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}

            >
              <div id='jj'>
                <div ></div>
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
                  <img src={require('../../assets/img/users.png')} alt='img' id='side_img'  />
                      <ListItemText ><span  className='sspan' style={{fontWeight: '500',fontSize:'18px' }}>المستخدمين</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                <NavLink to='/Section' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/rep.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}>المواد والاقسام</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                <NavLink to='/Kitchen' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/profile.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}> تجهيز المطابخ</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                <NavLink to='/Notification' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/list.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}> التدقيق</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>


              </div>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer 
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
              
            >
              
            
              <div id='jj' >
               
                <div className={classes.toolbar}   />

                

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
                  <img src={require('../../assets/img/users.png')} alt='img' id='side_img'  />
                      <ListItemText ><span  className='sspan' style={{fontWeight: '500',fontSize:'18px' }}>المستخدمين</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                <NavLink to='/Section' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/rep.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}>المواد والاقسام</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                <NavLink to='/Kitchen' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/profile.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}> تجهيز المطابخ</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>

                <NavLink to='/Notification' activeClassName='active' >
                  <List  className='sidefect' >

                    <ListItem >
                    <img src={require('../../assets/img/list.png')} alt='img' id='side_img'  />
                      <ListItemText ><span className='sspan' style={{fontWeight: '500',fontSize:'18px' }}> التدقيق</span></ListItemText>
                    </ListItem>

                  </List>
                </NavLink>


              
              </div>
            </Drawer>
          </Hidden>

        </nav>

        <main className={classes.content}>

          <div className={classes.toolbar} />
        

          {renderPage(this.props)}
        
        </main>
      </div>

    )
  }

}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};
const renderPage = (props) => {
  if (props.match.path === '/Home') {
    return (<Home />)
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

 

  
  
}
export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);



