import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import Lottie from "lottie-react-web";
import animation from "../../assets/js/animation.json";
import Context from "../../assets/js/context";
import { Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
const cookies = new Cookies();
class Detiels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [],
      details:[],
      data:[],
      user:'',
      name:'',
      check:''
    };
  }

 componentDidMount() {

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    axios
      .get(Host + `kmos/${myParam}`, {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          data1: res.data.data.kitchen,
          data: res.data.data.kitchen.user,
          details: res.data.data.details,
          check: "login"
        });
        // console.log(this.state.data);
        // console.log(this.state.details);
        
      })
           .catch(err => {
        console.log("error:", err);
        this.setState({
          check: "notlogin"
        });
      });

 }


  render() {
    return (
       <Context.Consumer>
        {ctx => {
          if (this.state.check === "notlogin") {
            return <Redirect to="/"></Redirect>;
          } else if (
                   this.state.check === "login" && cookies.get("role") !== "checker"
                 ) {
                   return (
      <div>
        <div id="kithead">
          <div id="row_kit">
            <div id="kitmain">
              <div> رقم المطبخ : </div>
              <div style={{ paddingRight: 10 }}> {this.state.data1.kitID} </div>
            </div>

            <div id="kitmain">
              <div> اسم المستخدم : </div>
              <div style={{ paddingRight: 10 }}>{this.state.data.username}</div>
            </div>

            <div id="kitmain">
              <div> الاسم : </div>
              <div style={{ paddingRight: 10 }}> {this.state.data.name} </div>
            </div>
          </div>

          <div id="row_kit">
            <div id="kitmain">
              <div> تاريخ الانشاء : </div>
              <div style={{ paddingRight: 10 }}>
              
                {this.state.data1.created_at}
              </div>
            </div>

            <div id="kitmain">
              <div> اخر تعديل : </div>
              <div style={{ paddingRight: 10 }}>
                {this.state.data1.updated_at}{" "}
              </div>
            </div>
          </div>
        </div>

        <Row style={{ marginRight: 0 ,marginTop:25}}>
          {this.state.details.map((p,i) => (
            <Col xs={12} md={6} lg={4} key={i} >
              <div id="card_main1">
                <div id="card_info">
                  <div id="item_text">
                    <div> : الصنف </div>
                    <div style={{ paddingRight: 8 }}> {p.inventory.item.cat.name} </div>
                  </div>
                  <div id="item_textm1"></div>

                  <div id="item_text">
                    <div> : رمز المادة </div>
                    <div style={{ paddingRight: 8 }}>
                      {p.inventory.item.code}
                    </div>
                  </div>

                  <div id="item_text">
                    <div> : عدد القطع </div>
                    <div style={{ paddingRight: 8 }}> {p.count}</div>
                  </div>

                  <div id="item_text">
                    <div> : اسم المستخدم </div>
                    <div style={{ paddingRight: 8 }}> {p.user.username}</div>
                  </div>

                  <div
                    id="item_text"
                    style={{
                      width: "92%",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <div> : تاريخ الاضافة </div>
                    <div style={{ fontSize: 15, color: "#256197" }}>
                      {p.created_at}
                    </div>
                  </div>

                  <div
                    id="item_text"
                    style={{
                      width: "92%",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <div> : اخر التعديل </div>
                    <div style={{ fontSize: 15, color: "#256197" }}>
                      {p.updated_at}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
         );
                 } else if (this.state.check === "") {
                   return (
                     <div
                       style={{
                         display: "flex",
                         flexDirection: "column",
                         alignItems: "center",
                         justifyContent: "center"
                       }}
                     >
                       <Lottie
                         options={{
                           animationData: animation
                         }}
                         width={300}
                         height={300}
                       />
                     </div>
                   );
                 }
        }}
      </Context.Consumer>
    );
  }
}

export default Detiels;
