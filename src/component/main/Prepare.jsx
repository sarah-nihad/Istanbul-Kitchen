import React from 'react';
import { Link ,NavLink} from 'react-router-dom'
import Mod2 from '../common/Mod2';
import Table2 from '../Table/Table2';
import {Row,Col} from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Select from 'react-select';
import EditCard from '../common/EditCard';
import { Redirect } from "react-router-dom";
import Lottie from "lottie-react-web";
import animation from "../../assets/js/animation.json";
import Context from "../../assets/js/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
const cookies = new Cookies();
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'يدات', label: 'يدات' },
  { value: 'vanilla', label: 'Vanilla' },
];
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
      num: "",
      material: "",
      number: 22
    };


  }

add(){

   this.state.data.push( 
{
  'type':this.state.type,
  'num':this.state.num,
  'material':this.state.material,
},
       
   )

  console.log(this.state.data);
  // this.componentDidMount()
}



  componentDidMount() {
this.setState({
  data2:this.state.data
})
 console.log(this.state.data2);


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
       });
       console.log("kitchen", this.state.data1);
       let arr = [];
       for (let index = 0; index < this.state.data1.length; index++) {
         let obj = {
           value: this.state.data1[index].kitID,
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
     });



  axios
    .get(Host + "inventories", {
      headers: {
        Authorization: cookies.get("token"),
        Accept: "application/json"
      }
    })
    .then(res => {
      this.setState({
        store: res.data
      });
      // console.log("data1", this.state.data);
      let arr = [];
      for (let index = 0; index < this.state.store.length; index++) {
        let obj = {
        
          value: this.state.store[index].item.code,
          label: this.state.store[index].item.code
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







  }







del(index){
   this.state.data2.splice(index,1);
  this.setState({
    data:this.state.data2
  })
  //  this.componentDidMount()
}

   getMuiTheme = () => createMuiTheme({
    overrides: {
     MuiPaper: {
        elevation4: {
          width: "90%",
         
        }
      }
    },

  })

    render() {
      const { selectedOption } = this.state;
        return (
            <div id='main_sec'  >
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar
newestOnTop
closeOnClick
rtl
pauseOnVisibilityChange
draggable
pauseOnHover
/>
                <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
               
                  
                 </div>



                <div style={{width:'100%'}} id='rightdiv' > 
                

                    <NavLink  to='/Prepare'   activeClassName='active'> 
                     <div id='sect1'>
                        التجهيز
                    </div>
                    </NavLink>

                    <NavLink  to='/Kitchen'  activeClassName='active'>  
                      <div id='sect1'>
                        المطابخ
                    </div>    
                       </NavLink>
                       </div>
                </div>

                <Row style={{marginRight:0,width:'90%'}}  id='row_prep' >
                <Col xs={12} lg={3}  >
       
                </Col>

                  <Col xs={12} lg={5}  >
                           <div>
                     
</div>


    
<div>

{this.state.data2.map(p => (

<div id='card_main1'  >
<div id='card_titil'>

<div style={{fontSize:15,color:'#256197'}} ><i className="far fa-trash-alt" id='del' ></i> </div>
<div style={{paddingLeft:10}} > <EditCard /></div>

</div>

<div id='card_info'>
<div id='item_text' >  <div> : الصنف </div> <div style={{paddingRight:8}} > {p.type}</div> </div>
{/* <div id='item_textm1'  > المواد <div id='line' /> </div> */}

<div id='item_text' >  <div> : رمز المادة </div> <div style={{paddingRight:8}} > {p.material}</div> </div>
<div id='item_text' >  <div> :  عدد القطع </div> <div style={{paddingRight:8}} > {p.num}</div> </div>

<div id='item_text' >  <div> :   اسم المستخدم </div> <div style={{paddingRight:8}} > {p.num}</div> </div>
 <div id='item_text'style={{width:'92%',display:'flex',justifyContent:'space-between'}}  >  <div> :    تاريخ الاضافة </div>  <div style={{fontSize:15,color:'#256197'}} > 2018-7-7 10:05  </div> </div>
</div>



</div>

  ))}

</div>



 
   
 
                </Col>

                  <Col xs={12} lg={4}  id='col_first'  >

                 <div id='div_kitch' > 
                 
                 <div id='kitch_sid' >  رقم المطبخ   </div>
                  <Select id='kitchen_field' placeholder='اختر رقم المطبخ'
                                  onChange={(e) => {                               
                                      this.setState({ type: e.value })
                                  }}
                                 value={selectedOption}
                                  styles={customStyles}
                                  options={this.state.kitch}
                                />
              
              </div>
          
               
               <p style={{fontSize:'20px',fontWeight:'600',color:'gray'}} > الاضافات </p>

      <div id='div_kitch' > 
          <div id='kitch_sid' >  المخازن      </div>
         
                 <Select id='kitchen_field' placeholder='اختر المخزن'
                                  onChange={(e) => {                               
                                      this.setState({ type: e.value })
                                  }}
                                 value={selectedOption}
                                  styles={customStyles}
                                  options={this.state.store1}
                                />
              
               </div>
        <div id='div_kitch' > 
          <div id='kitch_sid' >  الاصناف      </div>
         
                 <Select id='kitchen_field' placeholder='اختر الصنف'
                                  onChange={(e) => {                               
                                      this.setState({ type: e.value })
                                  }}
                                 value={selectedOption}
                                  styles={customStyles}
                                  options={options}
                                />
              
               </div>
               
                <div id='div_kitch' > 
                  <div id='kitch_sid' >  المواد     </div>
          
              <Select id='kitchen_field' placeholder='اختر المواد'
                                  onChange={(e) => {                               
                                      this.setState({ material: e.value })
                                  }}
                                 value={selectedOption}
                                  styles={customStyles}
                                  options={options}
                                />
               </div>


                 <div id='div_kitch' > 
                   <div id='kitch_sid' >   الكمية  </div>
                    <input type='text' id='kitchen_field' placeholder=' الكمية '
                     value={this.state.num} onChange={(e) => {
                                      this.setState({ num: e.target.value })
                                           if (e.target.value > this.state.number) {
                                                
                                                         toast.error('sss')
                                                    }
                                    }} />  </div>
               
               <div id='kitchen_botn'  >

              
              
                <div   id='add'  onClick={()=> {this.add()}}  >  اضافة </div>
               </div>

               
                </Col>

                </Row>






            </div>
        );
    }
}

export default Prepare;