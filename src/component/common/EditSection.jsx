
 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
 class EditSection extends React.Component{
   render(){
     return(
       <div> 
<Component initialState={{ isShown: false }}    >
  {({ state, setState }) => (
    <Pane >
      <Dialog 
        isShown={state.isShown}
        title="   "
        onCloseComplete={() => setState({ isShown: false })}
      hasHeader={false}
        shouldCloseOnOverlayClick={false}
         confirmLabel=" حفظ"
         cancelLabel="الغاء"
      >
          <div >
        <div id='new_itemnav' >  تعديل القسم </div>
         <div className='mod1'>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%'}} > اسم القسم  </div> 
        <div style={{width:'80%',textAlign:'center'}} >    <input type='text'id='field2' placeholder=' اسم القسم' />  </div>
</div>
        

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >  وصف   </div>
            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' وصف' /> </div> 
</div>
        
 </div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })}  >
      
       <i class="fas fa-edit" id='edit' ></i>
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default EditSection;