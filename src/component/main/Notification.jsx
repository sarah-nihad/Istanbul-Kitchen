import React ,{Component}from 'react';
import { Link ,NavLink} from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  componentDidMount() {
    axios
      .get(Host + "notifications", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          data: res.data.data.notifications,
          ms:res.data.data.msg,
        });
        console.log("notifi", this.state.ms);
      })
      .catch(err => {
        console.log("error:", err);
      });
  }
  render() {
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
            {this.state.data.map((ite, i) => (
              <Col xs={12} md={6} style={{ marginBottom: 20 }} key={i}>
                <div id="noti_first">
                  <div id="noti_titil">
                    <div id="not_text">{this.state.ms} </div>
                    {/* <div style={{padding:10,fontSize:15,color:'#256197'}} > 2018-7-7 10:05  </div> */}
                  </div>
                  <div className="noti_body">
                    <div id="noti_body">
                      اقتربت المادة
                      {ite.item.code}
                      للنفاذ من المخزن
                      {ite.store.name}
                      العدد المتبقي هو
                      {ite.trigger_value}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
           
          </Row>
        </div>
      </div>
    );
  }
}

export default Notification;