import React ,{Component}from 'react';
import { Link ,NavLink} from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'
import CloseIcon from '@material-ui/icons/Close';
import { Redirect} from 'react-router-dom';
import Lottie from 'lottie-react-web';
import animation from '../../assets/js/animation.json';
import Context from '../../assets/js/context';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
const cookies = new Cookies();
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ms: [],
      data1: []
    };
  }


  render() {
    return (


  <Context.Consumer>{ctx => {


        if (ctx.value.check==="notlogin") {
          return(
        <Redirect to="/"></Redirect>
          )
        }else if (ctx.value.check==="login") {
          return (
     <div id="main_sec">
        <div id="main_row">
          <div style={{ width: "100%" }}></div>

          <div style={{ width: "100%" }} id="rightdiv">
            <NavLink to="/Notification" activeClassName="active">
              <div id="sect1">التنبيهات</div>
            </NavLink>
          </div>
        </div>

        <div id="noti_main">
          <Row
            style={{
              marginRight: 0,
              width: "90%",
              marginTop: "5%",
              marginBottom: "5%",
              display: "flex",
              flexDirection: "row-reverse"
            }}
          >
            {ctx.value.data.map((ite, i) => (
              <Col xs={12} md={6} style={{ marginBottom: 20 }} key={i}>
                <div id="noti_first">
                  <div id="noti_titil">
                    <div id="not_text">{ctx.value.ms} </div>
                    {/* <div style={{padding:10,fontSize:15,color:'#256197'}} > 2018-7-7 10:05  </div> */}
                  </div>
                  <div className="noti_body">
                    <div id="noti_body">
                 <span>     اقتربت المادة</span>
                    <span>  {ite.item.code}</span>
                <span>       للنفاذ من المخزن </span>
                    <span>   {ite.store.name}</span>
                 <span>     العدد المتبقي هو </span>
                   <span>  {ite.trigger_value} </span> 
                    </div>
                  </div>
                </div>
              </Col>
            ))}
           
          </Row>
        </div>
      </div>
        
          )
        } else if (ctx.value.check==="") {
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

export default Notification;