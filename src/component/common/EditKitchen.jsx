 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
 class EditKitchen extends React.Component{
   render(){
     return(
       <div> 
<Component initialState={{ isShown: false }}    >
  {({ state, setState }) => (
    <Pane >
      <Dialog 
        isShown={state.isShown}
        title="انشاء مستحدم جديد "
        onCloseComplete={() => setState({ isShown: false })}
      hasHeader={false}
        shouldCloseOnOverlayClick={false}
         confirmLabel=" حفظ"
         cancelLabel="الغاء"
      >
          <div >
        <div id='new_itemnav' >    تعديل المطبخ  </div>
         <div className='mod1'>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%'}} >  رقم المطبخ  </div> 
        <div style={{width:'80%',textAlign:'center'}} >    <input type='text'id='field2' placeholder='  رقم المطبخ' />  </div>
</div>
        

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   المستخدم   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' المستخدم ' /> </div>             
</div>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >    عدد الاصناف   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' عدد الاصناف ' /> </div>             
</div>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   عدد القطع الكلية   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' عدد القطع الكلية ' /> </div>             
</div>

            
        
 </div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })}   >
      
        <i class="fas fa-edit" id='edit' ></i>
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default EditKitchen;