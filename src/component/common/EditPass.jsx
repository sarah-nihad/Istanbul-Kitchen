 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
 class EditPass extends React.Component{
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
        <div id='new_itemnav' >   تعديل  كلمة المرور </div>
         <div className='mod1'>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%'}} >  كلمة المرور  </div> 
        <div style={{width:'80%',textAlign:'center'}} >    <input type='text'id='field2' placeholder=' ****** ' />  </div>
</div>
        

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   تأكيد كلمة المرور   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' ****** ' /> </div>             
</div>


</div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })}  >
      
  <i class="fas fa-cog"></i>
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default EditPass;