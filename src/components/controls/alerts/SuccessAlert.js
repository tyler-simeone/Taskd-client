// import React from "react";
// import { Alert } from "react-bootstrap";
// import { useTranslation } from "react-i18next";


// export const SuccessAlert = (props) => {
//   const { t, i18n } = useTranslation();
  
//   const handleClose = () => {
//     if (props.handleClose !== undefined)
//         props.handleClose();
//     else {
//         props.setShowSuccess(false);
//         props.setSuccessMessage();
//     }
//   }

//   return (
//     <div style={{paddingBottom: 4, display: "flex", justifyContent: "center"}}>
//       <Alert className={`p-2 ld-success`} showSuccess={props.showSuccess} key={1} variant="success" onClose={handleClose} dismissible>
//         {props.isSavedJob ? (
//             <a style={{textDecoration: "underline", color: "inherit"}} href="/jobs/saved">
//                 <Alert.Heading>{props.successMessage}</Alert.Heading>
//             </a>
//         ) : (
//             <Alert.Heading>{props.successMessage}</Alert.Heading>
//         )}
//       </Alert>
//     </div>
//   )

// };