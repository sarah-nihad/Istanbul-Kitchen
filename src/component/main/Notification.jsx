import React ,{Component}from 'react';
import { Link ,NavLink} from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'
import CloseIcon from '@material-ui/icons/Close';
class Notification extends Component{
    render(){
        return(
           <div id='main_sec'  >

              <div id='main_row' >

                     <div style={{width:'100%'}}>
                 </div>

                <div style={{width:'100%'}} id='rightdiv' > 
                

                    <NavLink  to='/Notification'   activeClassName='active'>  
                      <div id='sect1'>
                        التنبيهات
                    </div>    
                       </NavLink>
                       </div>
                </div>

<div id='noti_main'>
<Row  style={{marginRight:0,width:'90%',marginTop:'5%',marginBottom:'5%',display:'flex',flexDirection:'row-reverse'}} >
<Col xs={12} md={6} style={{marginBottom:20}}  >
<div id='noti_first'>
<div id='noti_titil' >
<div id='not_text' > تحذير : نفاذ الكمية </div>
{/* <div style={{padding:10,fontSize:15,color:'#256197'}} > 2018-7-7 10:05  </div> */}
</div>
<div className='noti_body'>
<div id='noti_body'>
اقتربت المادة للنفاذ من المخزن
العدد المتبقي هو 0
</div>
</div>



</div>

</Col>      


<Col xs={12} md={6} style={{marginBottom:20}}  >
<div id='noti_first'>
<div id='noti_titil' >
<div id='not_text' > تحذير : نفاذ الكمية </div>
{/* <div style={{padding:10,fontSize:15,color:'#256197'}} > 2018-7-7 10:05  </div> */}
</div>
<div className='noti_body'>
<div id='noti_body'>
اقتربت المادة للنفاذ من المخزن
العدد المتبقي هو 0
</div>
</div>



</div>

</Col>      

<Col xs={12} md={6} style={{marginBottom:20}}  >
<div id='noti_first'>
<div id='noti_titil' >
<div id='not_text' > تحذير : نفاذ الكمية </div>
{/* <div style={{padding:10,fontSize:15,color:'#256197'}} > 2018-7-7 10:05  </div> */}
</div>
<div className='noti_body'>
<div id='noti_body'>
اقتربت المادة للنفاذ من المخزن
العدد المتبقي هو 0
</div>
</div>



</div>

</Col>      



</Row>

</div>







            </div>
        );
    }
}

export default Notification;