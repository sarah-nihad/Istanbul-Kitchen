import React ,{Component}from 'react';
import {Row,Col,ProgressBar} from 'react-bootstrap';
import { Link ,NavLink} from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/Category';
import LocalGroceryStoreSharpIcon from '@material-ui/icons/LocalGroceryStoreSharp';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import ChangeHistoryOutlinedIcon from '@material-ui/icons/ChangeHistoryOutlined';
import { Redirect} from 'react-router-dom';
import Lottie from 'lottie-react-web';
import animation from '../../assets/js/animation.json';
import Context from '../../assets/js/context';
import Cookies from "universal-cookie";
const cookies = new Cookies();
class Dashboard extends Component{

    render(){
        return(

  <Context.Consumer>{ctx => {


        if (ctx.value.che==="notlogin") {
          return(
        <Redirect to="/"></Redirect>
          )
        }else
         if (ctx.value.che==="login") {
          return (
          <div id='cuthome' >
           
              <Row style={{marginRight:0,width:'100%',display:'flex',justifyContent:'center'}} >
                    
                    {(cookies.get("role"))==="Storekeeper" ?(null):( 
                    <div id='col_dash'  >
                    <div className='card'>
                     <div className='round'>
                                      <GroupIcon />
                                    </div>
                                  <div className='card-body'>
                              <div className='numcard' > {ctx.value.Dash.users} </div>
                        <div className='m-l-10 '>
                                        <p className='mb-0'>المستخدمين</p>  
                                    </div>
                             </div></div>
                 </div>
                    )}

   {(cookies.get("role"))==="Storekeeper" ?(null):( 
                    <div   id='col_dash' >
                 
                    <div className='card'>
                     <div className='round'>
                                        <i className='fas fa-user-plus'></i>
                                    </div>
                        <div className='card-body'>
                       <div className='numcard' > {ctx.value.Dash.departments} </div>
    
                                    <div className='m-l-10 '>
                                   
                                        <p className='mb-0'> الاقسام</p>
                                    </div>
                                    </div>
                                    </div>
                                       </div>
   )}

                   
                    <div  id='col_dash'  >
               <div className='card'>
                      <div className='round'>
                                        <CategoryIcon />
                                    </div>
                        <div className='card-body'>
                        <div className='numcard' > {ctx.value.Dash.categories} </div>
    
                                    <div className='m-l-10 '>
                                
                                        <p className='mb-0'>الاصناف </p>
                                    </div>
                           
                   
                      
                        </div>

                    </div>
                  
                    
                    </div>


                      <div   id='col_dash' >
       
                    <div className='card'>
                         <div className='round'>
                                        <ChangeHistoryOutlinedIcon />
                                    </div>
                        <div className='card-body'>
                          <div className='numcard' > {ctx.value.Dash.items} </div>
        
                                    <div className='m-l-10 '>
                               
                                        <p className='mb-0'>المواد</p>
                                    </div>
                        
                        </div>

                    </div>
          
                    
                    </div>
        <div   id='col_dash' >
            
                    <div className='card'>
                         <div className='round'>
                                        <LocalGroceryStoreSharpIcon />
                                    </div>
                        <div className='card-body'>
                  
                            <div className='numcard' > {ctx.value.Dash.stores} </div>
                                
                                    <div className='m-l-10 '>
                                  
                                        <p className='mb-0'>المخازن</p>
                                    </div>
                             
                       
                        </div>

                    </div>
            
                    
                    </div>

                      <div  id='col_dash'  >
               
                    <div className='card'>
                         <div className='round'>
                                        <StorefrontOutlinedIcon />
                                    </div>
                        <div className='card-body'>
                            <div className='numcard' > {ctx.value.Dash.kitchens} </div>
                         
                                    <div className='m-l-10 '>
                                  
                                        <p className='mb-0'>المطابخ </p>
                                    </div>
                             
                        
                        </div>

                    </div>
              
                    
                    </div>
                </Row>

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
}

export default Dashboard;