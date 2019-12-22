import React from 'react';
import {NavLink} from 'react-router-dom'
import {Row,Col} from 'react-bootstrap';
import Select from 'react-select';
 import { Pane, Dialog} from "evergreen-ui";
 import Component from "@reactions/component";
 import { Redirect } from "react-router-dom";
import Lottie from "lottie-react-web";
import animation from "../../assets/js/animation.json";
import Context from "../../assets/js/context";
import loding from "../../assets/js/loding.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { createMuiTheme } from "@material-ui/core/styles";
const cookies = new Cookies();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? '#ffbf41e0' : 'blue',
   
  }),
  control: () => ({
     
       borderRadius: '4px',
    boxShadow:' 0px 0px 1px 2px #b4b1b1',
    border: 'none',
    height: '33px',
    direction: 'rtl',
    textAlign: 'center',
  display: 'flex',
   
  }),
    singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}
class Prepare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data1: [],
      data2: [],
      kitch: [],
      store: [],
      store1: [],
      type: "",
      sto: "",
      num: "",
      material: "",
      number: 22,
      invent: [],
      invent1: [],
      cats: [],
      cats1: [],
      fdata: [],
      afterfilter: [],
      invents: [],
      type2: "",
      cat_id: "",
      kmo_id: "",
      inventory_id: "",
      count: "",
      trigger: "",
      kittrans: [],
      kmos: [],
      allkoms:[],
      errors:false,
      check:'',
      spin:false,
      spinitem:false,
      spinadd:false,
      spindel:false
    };
  }

  newitem() {
    let formData = new FormData();
    var headers = {
      Accept: "application/json",
      Authorization: cookies.get("token")
    };
    formData.append("kmo_id", this.state.sto);
    formData.append("inventory_id", this.state.material);
    formData.append("count", this.state.num);
    axios({
      url: Host + `kittrans`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
        toast.success("تمت الاضافة بنجاح");
        this.getkitchenById(response.data.kmo_id);
        this.setState({spinadd:false})
      })
 
         .catch(err => {
        
           if (err.response) {
          console.log(err.response.data.error);
this.setState({spinadd:false})
         toast.error("تأكد من ادخال المعلومات");
      }
        console.log("error:", err);

      });
  }

  componentDidMount() {
    axios
      .get(Host + "kmos", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          data1: res.data,
           check: "login"
        });
        console.log("kitchen", this.state.data1);
        let arr = [];
        for (let index = 0; index < this.state.data1.length; index++) {
          let obj = {
            value: this.state.data1[index].id,
            label: this.state.data1[index].kitID
          };
          arr.push(obj);
        }
        this.setState({
          kitch: arr
        });
      })
      .catch(err => {
        console.log("error:", err);
          this.setState({check: "notlogin"});
           if (err.response.status === 403 || err.response.status === 401 ) {
         cookies.remove("token");
                  window.location.href= "/" 
          }
      });

    axios
      .get(Host + "stores", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          store: res.data
        });
        console.log("data1", this.state.data);
        let arr = [];
        for (let index = 0; index < this.state.store.length; index++) {
          let obj = {
            value: this.state.store[index].id,
            label: this.state.store[index].name
          };
          arr.push(obj);
        }
        this.setState({
          store1: arr
        });
      })
      .catch(err => {
        console.log("error:", err);
      });

    axios
      .get(Host + "cats", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          cats: res.data.data
        });
        console.log("cats", this.state.cats);
        let arr = [];
        for (let index = 0; index < this.state.cats.length; index++) {
          let obj = {
            value: this.state.cats[index].id,
            label: this.state.cats[index].name
          };
          arr.push(obj);
        }
        this.setState({
          cats1: arr
        });
      })
      .catch(err => {
        console.log("error:", err);
      });
  }

  getfilter(value) {
    console.log("id", value);
    console.log("ssss", this.state.invent);
    setTimeout(() => {
      const filteredData = this.state.invent.filter(
        i => i.item.cat_id === value
      );
      this.setState({
        afterfilter: filteredData
      });

      console.log("afterfilter", this.state.afterfilter);
    }, 200);
    setTimeout(() => {
      let arr = [];
      for (let index = 0; index < this.state.afterfilter.length; index++) {
        let obj = {
          value: this.state.afterfilter[index].id,
          label: this.state.afterfilter[index].item.code,
          trigger: this.state.afterfilter[index].count
        };
        arr.push(obj);
      }
      this.setState({
        invent1: arr
      });
    }, 200);
  }

 

  getitemById(value) {
    console.log("id", value);
    axios
      .get(Host + `stores/${value}/inventories`, {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({invent: res.data.data});
        this.setState({spinitem:false})
        console.log("item", this.state.invent);
      })
      .catch(err => {
        console.log("error:", err);
        this.setState({spinitem:false})
      });
  }

  getkitchenById(value) {
    axios
      .get(Host + `kmos/${value}`, {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          kmos: res.data.data.details,
          allkoms: res.data.data.kitchen
        });
        this.setState({spin:false})
        console.log("kmos",this.state.kmos);
      })
      .catch(err => {
        this.setState({spin:false})
        console.log("error:", err);
      });
  }




  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiPaper: {
          elevation4: {
            width: "90%"
          }
        }
      }
    });

  delete(id) {
    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      Authorization: cookies.get("token")
    };
    axios({
      url: Host + `kittrans/${id}`,
      method: "DELETE",
      data: formData,
      headers: headers
    })
      .then(response => {
        this.setState({spindel:false});
        if (response.status === 202) {
          toast.warning(" لا يمكنك الحذف  ");
        } else if (response.status === 200) {
          this.getkitchenById(response.data.kmo_id);
          toast.success(" تم الحذف بنجاح ");
        }
      })
      .catch(function(err) {
         this.setState({spindel:false});
        console.log(err.response.data.Error);
      });
  }

 

  render() {
    const { selectedOption } = this.state;
    return (
         <Context.Consumer>
        {ctx => {
          if (this.state.check === "notlogin") {
            return <Redirect to="/"></Redirect>;
          } else if (
                   this.state.check === "login" && cookies.get("role") !== "checker"
                 ) {
                   return (
      <div id="main_sec">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />

        <div id="main_row">
          <div style={{ width: "100%" }}></div>

          <div style={{ width: "100%" }} id="rightdiv">
            <NavLink to="/Prepare" activeClassName="active">
              <div id="sect1">التجهيز</div>
            </NavLink>

            <NavLink to="/Kitchen" activeClassName="active">
              <div id="sect1">المطابخ</div>
            </NavLink>
          </div>
        </div>

        <Row style={{ marginRight: 0, width: "100%" }} id="row_prep">
          <Col xs={12} lg={3}>
                 {this.state.spin ? (
                            <div
                              style={{
                                width: "100%",
                                position: "absolute",
                              }}>
                              <Lottie
                                options={{
                                  animationData: loding
                                }}
                                width={300}
                                height={150}
                                position="absolute"
                              />
                            </div>
                          ) : ( <div>
            {this.state.allkoms.kitID === undefined ? (
              <div></div>
            ) : (
              <div id="info_col1">
                <div id="item_text">
                  <div> : رقم المطبخ </div>
                  <div style={{ paddingRight: 8 }}>
                    {this.state.allkoms.kitID}
                  </div>
                </div>
                {this.state.kmos.length === 0 ? (
                  <div
                    id="item_text"
                    style={{ textAlign: "center", paddingTop: 12 }}
                  >
                    لا يحتوي على بيانات
                  </div>
                ) : (
                  <div id="item_text" style={{ paddingTop: 12 }}>
                    <div> : عدد القطع </div>
                    <div style={{ paddingRight: 8 }}>
                      {this.state.kmos.length}
                    </div>
                  </div>
                )}

                <div id="item_text" style={{ paddingTop: 12 }}>
                  <div> : المستخدم</div>
                  <div style={{ paddingRight: 8 }}>
                    {this.state.allkoms.user.username}
                  </div>
                </div>
                <div id="item_text" style={{ paddingTop: 12 }}>
                  <div> : تاريخ الانشاء</div>
                  <div style={{ paddingRight: 8 }}>
                    {this.state.allkoms.created_at}
                  </div>
                </div>
                <div id="item_text" style={{ paddingTop: 12 }}>
                  <div> : اخر تعديل</div>
                  <div style={{ paddingRight: 8 }}>
                    {this.state.allkoms.updated_at}
                  </div>
                </div>
              </div>
            )}
            </div>)}
          </Col>

          <Col xs={12} lg={5}>
            <div>
                            {this.state.spin ? (
                            <div
                              style={{
                                width: "100%",
                                position: "absolute",
                              }}>
                              <Lottie
                                options={{
                                  animationData: loding
                                }}
                                width={300}
                                height={150}
                                position="absolute"
                              />
                            </div>
                          ) : ( <div>
                               {this.state.spindel ? (
                            <div
                              style={{
                                width: "100%",
                                position: "absolute",
                              }}>
                              <Lottie
                                options={{
                                  animationData: loding
                                }}
                                width={300}
                                height={150}
                                position="absolute"
                              />
                            </div>
                          ) : ( null)}
              {this.state.kmos.map((p,i) => (
                <div id="card_main1" key={i} >
                  <div id="card_titil">
                    <div style={{ fontSize: 15, color: "#256197" }}>

                      <i
                        className="far fa-trash-alt"
                        id="del"
                        onClick={() => {
                          this.delete(p.id);
                           this.setState({spindel:true});
                        }}
                      ></i>{" "}
                    
                    </div>
                    <div style={{ paddingLeft: 10 }}>
                      <Component initialState={{ isShown: false,spin:false,errors:false,count:p.count }}>
                        {({ state, setState }) => (
                          <Pane>
                            <Dialog
                              isShown={state.isShown}
                              onCloseComplete={() =>
                                setState({ isShown: false })
                              }
                              hasHeader={false}
                              shouldCloseOnOverlayClick={false}
                              confirmLabel=" حفظ"
                              cancelLabel="الغاء"
                              onConfirm={() => {
                                 if (state.errors===true) {
                    return( toast.error( ` يجب ان تكون الكمية المدخلة اكبر من الصفر واقل من الموجود بالمخزن` ));   
                  }
              else if (state.errors===false) {
                                setState({ spin: true });
                                // this.edit(p.id);
                                 var headers = {
      Authorization: cookies.get("token")
    };
    axios({
      url: Host + `kittrans/${p.id}`,
      method: "PUT",
      headers: headers,
      data: {
        count:state.count
      }
    })
      .then(response => {
        toast.success("تم تعديل المعلومات بنجاح");
        this.getkitchenById(response.data.kmo_id);
         setState({ isShown: false });
          setState({ spin: false });
      })
      .catch(function(error) {
         setState({ spin: false });
        if (error.response.data.Error) {
          toast.error(' قم بأجراء تغيير على الكمية من اجل تعديلها');
        }
      
      });
                     }}}
                            >
                              <div>
                                <div id="new_itemnav"> تعديل المعلومات </div>
                                <div className="mod1">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-around",
                                      height: "60px",
                                      direction: "rtl",
                                      fontWeight: "600",
                                      fontSize: "18px",
                                      width: "100%"
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        height: "60px",
                                        direction: "rtl",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        width: "100%"
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "35%",
                                          textAlign: "center"
                                        }}
                                      >الكمية
                                      </div>

                                      <div style={{width: "55%", textAlign: "center"}} >
                                        <input
                                          type="text"
                                          id="field2"
                                          placeholder="الكمية"
                                          value={state.count}
                                          onChange={e => {
                                           setState({count: e.target.value});
                                            if (e.target.value < 1 || e.target.value > p.inventory.count){
          
      
                                              setState({errors:true})
                                            }
                                            else{
                                              setState({errors:false})
                                            }
                                          }}
                                        />
                                      </div>
                                    </div>
                                           {state.spin ? (
                            <div
                              style={{
                                width: "100%",
                                position: "absolute",
                              }}>
                              <Lottie
                                options={{
                                  animationData: loding
                                }}
                                width={300}
                                height={150}
                                position="absolute"
                              />
                            </div>
                          ) : null}
                                  </div>
                                </div>
                              </div>
                            </Dialog>

                            <div onClick={() => setState({ isShown: true })}>
                              <i className="fas fa-edit" id="edit"></i>
                            </div>
                          </Pane>
                        )}
                      </Component>
                    </div>
                  </div>

                  <div id="card_info">
                    <div id="item_text">
                      <div> : الصنف </div>
                      <div style={{ paddingRight: 8 }}>{p.inventory.item.cat.name}
                      </div>
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
                      <div style={{ paddingRight: 8 }}> {p.count}</div>{" "}
                    </div>

                    <div id="item_text">
                      {" "}
                      <div> : اسم المستخدم </div>{" "}
                      <div style={{ paddingRight: 8 }}> {p.user.username}</div>{" "}
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
                      <div> : تاريخ التعديل </div>
                      <div style={{ fontSize: 15, color: "#256197" }}>
                        {p.updated_at}
                      </div>
                    </div>
                  </div>
                </div>
              ))} 
              </div>
              )}
            </div>
          </Col>

          <Col xs={12} lg={4} id="col_first">
            <div id="div_kitch">
              <div id="kitch_sid"> رقم المطبخ </div>
              <Select
                id="kitchen_field"
                placeholder="اختر رقم المطبخ"
                onChange={e => {
                  this.setState({ sto: e.value });
                   this.setState({ spin:true });
                  setTimeout(() => {
                    this.getkitchenById(e.value);
                  }, 200);
                }}
                value={selectedOption}
                styles={customStyles}
                options={this.state.kitch}
              />
            </div>

            <p style={{ fontSize: "20px", fontWeight: "600", color: "gray" }}>
              {" "}
              الاضافات{" "}
            </p>

            <div id="div_kitch">
              <div id="kitch_sid"> المخازن </div>

              <Select
                id="kitchen_field"
                placeholder="اختر المخزن"
                onChange={e => {
                  this.setState({ type: e.value });
                  setTimeout(() => {
                    this.getitemById(e.value);
                    this.setState({spinitem:true})
                  }, 200);
                }}
                value={selectedOption}
                styles={customStyles}
                options={this.state.store1}
              />
            </div>
                {this.state.spinitem ? (
                            <div
                              style={{
                                width: "100%",
                                position: "absolute",
                              }}>
                              <Lottie
                                options={{
                                  animationData: loding
                                }}
                                width={300}
                                height={150}
                                position="absolute"
                              />
                            </div>
                          ) : ( null)}
            <div id="div_kitch">
              <div id="kitch_sid"> الاصناف </div>

              <Select
                id="kitchen_field"
                placeholder="اختر الصنف"
                onChange={e => {
                  this.setState({ type2: e.value });
                  this.getfilter(e.value);
                }}
                value={selectedOption}
                styles={customStyles}
                options={this.state.cats1}
              />
            </div>

            <div id="div_kitch">
              <div id="kitch_sid"> المواد </div>

              <Select
                id="kitchen_field"
                placeholder="اختر المواد"
                onChange={e => {
                  this.setState({ material: e.value, trigger: e.trigger });
                  console.log(e.trigger);
                }}
                value={selectedOption}
                styles={customStyles}
                options={this.state.invent1}
              />
            </div>

            <div id="div_kitch">
              <div id="kitch_sid"> الكمية </div>
              <input
                type="text"
                id="kitchen_field"
                placeholder=" الكمية "
                value={this.state.num}
                onChange={e => {
                  this.setState({ num: e.target.value });
                  if (e.target.value > this.state.trigger && this.state.trigger!== 0) {
                    this.setState({ errors: true });
                    toast.error(`يجب ان تكون الكمية المطلوبة اقل من${this.state.trigger}`);
                  } 
                  else if (this.state.trigger ===0 ) {
                     toast.error(`لايوجد مواد في المخزن`);
                     this.setState({ errors: true });
                  }
                  
                  else {
                    this.setState({ errors: false });
                  }
                }}
              />
            </div>

            <div id="kitchen_botn">
              <div
                id="add"
                onClick={() => {
                  if (this.state.errors === true) {
                    return toast.error(
                      `خطأ في الكمية المدخلة`
                    );
                  } else if (this.state.errors === false) {
                    this.setState({spinadd:true})
                    this.newitem();
                  }
                }}
              >
                اضافة
              </div>
           
                   {this.state.spinadd ? (
                            <div
                              style={{
                                width: "100%",
                                position: "absolute",
                              }}>
                              <Lottie
                                options={{
                                  animationData: loding
                                }}
                                width={300}
                                height={150}
                                position="absolute"
                              />
                            </div>
                          ) : ( null)}
            </div>
          </Col>
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

export default Prepare;