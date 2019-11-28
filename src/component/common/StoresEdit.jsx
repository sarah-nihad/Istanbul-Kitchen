

 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
 class StoresEdit extends React.Component{
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
        <div id='new_itemnav' >    تعديل  معلومات المخزن  </div>
         <div className='mod1'>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%'}} > اسم المخزن  </div> 
        <div style={{width:'80%',textAlign:'center'}} >    <input type='text'id='field2' placeholder=' اسم المخزن' />  </div>
</div>
        

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >  العنوان   </div>
            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' العنوان' /> </div> 
</div>
        
 </div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })}  >
      
     <i className="fas fa-edit" id='edit' ></i>
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default StoresEdit;