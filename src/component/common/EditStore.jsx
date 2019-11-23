 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
 class EditStore extends React.Component{
   render(){
     return(
       <div> 
<Component initialState={{ isShown: false }}    >
  {({ state, setState }) => (
    <Pane >
      <Dialog 
        isShown={state.isShown}
 
        onCloseComplete={() => setState({ isShown: false })}
      hasHeader={false}
        shouldCloseOnOverlayClick={false}
         confirmLabel=" حفظ"
         cancelLabel="الغاء"
      >
          <div >
        <div id='new_itemnav' >  تعديل المخزون </div>
         <div className='mod1'>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%'}} >  رمز المادة  </div> 
        <div style={{width:'80%',textAlign:'center'}} >  
          <select id='field2'  > 
          <option >-</option>
            <option >1</option>
              <option >2</option>
          </select>
          
           </div>
</div>
        

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   المخزن   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
                  <select id='field2'  > 
          <option >-</option>
            <option >1</option>
              <option >2</option>
          </select>
              
              
              </div>             
</div>


             
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   العدد المتوفر   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
                  <select id='field2'  > 
          <option >-</option>
            <option >1</option>
              <option >2</option>
          </select>
              
              
              </div>             
</div>
  

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   قيمة الاشعار   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
                  <input type ='text' id='field2' placeholder='قيمة الاشعار' /> 
          
              
              
              </div>             
</div>
      
        
 </div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })}   >
      
    <i className="fas fa-edit" id='edit' ></i>
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default EditStore;