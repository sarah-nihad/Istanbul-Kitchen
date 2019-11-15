/* eslint-disable react/prop-types */
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

// const useStyles = makeStyles(theme => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width:'100%'
//   },

//       fad: {

//         width: '30%',
//         // opacity: 0.9,
//         // overflow:'scroll'
     

//     },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     // border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     width:'100%',
//          height: 300,
      
//     // padding: theme.spacing(2, 4, 3),
//   },
// }));

// const Fade = React.forwardRef(function Fade(props, ref) {
//   const { in: open, children, onEnter, onExited, ...other } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: open ? 1 : 0 },
//     onStart: () => {
//       if (open && onEnter) {
//         onEnter();
//       }
//     },
//     onRest: () => {
//       if (!open && onExited) {
//         onExited();
//       }
//     },
//   });

//   return (
//     <animated.div ref={ref} style={style} {...other}>
//       {children}
//     </animated.div>
//   );
// });

// export default function SpringModal() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <div  onClick={handleOpen} id='new' >
//        جديد 
//       </div>
//       <Modal 
//         aria-labelledby="spring-modal-title"
//         aria-describedby="spring-modal-description"
//         className={classes.modal}
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open} className={classes.fad} >
//           <div className={classes.paper}>
//         <div id='new_itemnav' > انشاء قسم جديد </div>

//         <div className='mod1'>
//              <input type='text'id='field1' placeholder='اسم القسم' />  

//               <input type='text'id='field1' placeholder='(وصف (اختياري' /> 

//               <div id='mod_btn' >  حفظ </div> 
// </div>
//           </div>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }

 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
 class Mod1 extends React.Component{
   render(){
     return(
       <div> 
<Component initialState={{ isShown: false }}    >
  {({ state, setState }) => (
    <Pane >
      <Dialog 
        isShown={state.isShown}
        title="انشاء قسم جديد "
        onCloseComplete={() => setState({ isShown: false })}
      hasHeader={false}
        shouldCloseOnOverlayClick={false}
         confirmLabel=" حفظ"
         cancelLabel="الغاء"
      >
          <div >
        <div id='new_itemnav' >   انشاء قسم جديد </div>
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
              <input type='text'id='field2' placeholder= 'وصف (اختياري) ' /> </div> 
</div>
        
 </div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })} id='new'  >
      
      جديد 
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default Mod1;