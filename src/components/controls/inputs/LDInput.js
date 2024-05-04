// import React from "react";
// import { Field } from 'formik';
// import TextField from '@material-ui/core/TextField';
// import "./LDInput.css"
// import { Input } from "./Input";

// export const LDInput = ({
//     label,
//     name,
//     type,
//     value,
//     onChange,
//     onBlur,
//     touched,
//     errors,
//     disabled,
//     helperText,
//     style
// }) => {

//     // console.log("errors: ", errors);

//     return (
//         <div className="ld-input-container">
//             <label className={`ld-input-label ${disabled ? 'disabled' : ''}`}>
//                 {label}
//             </label>
//             <Field
//                 as={Input}
//                 variant="outlined"
//                 className={`ld-input`}
//                 name={name}
//                 label={label}
//                 type={type}
//                 value={value}
//                 onChange={onChange}
//                 error={touched !== undefined && errors !== undefined ? touched[name] && errors[name] : null}
//                 touched={touched !== undefined ? touched[name] : null}
//                 onBlur={onBlur}
//                 disabled={disabled}
//                 style={style}
//             />
        
//             {/* Validation help text */}
//             {helperText !== undefined && helperText !== null && helperText !== "" ? (
//                 <p className={errors[name] !== undefined && touched[name] !== undefined ? 'ld-input-errortext' : 'ld-input-helptext'}>
//                     {helperText}
//                 </p> 
//             ) : errors !== undefined && touched !== undefined && errors[name] && touched[name] ? 
//                 <p className="ld-input-errortext">
//                     {label !== undefined && label !== null 
//                     && value !== undefined && value !== null && value !== ""
//                         ? `Invalid ${label.includes('*Enter your') 
//                             ? label.slice(11)
//                             : label.includes('*') 
//                             ? label.slice(1) 
//                             : label}` 
//                         : `${label.includes('*Enter your') 
//                             ? label.slice(11)
//                             : label.includes('*') 
//                             ? label.slice(1) 
//                             : label} Required`}
//                 </p> 
//             : null}  
//         </div>
//     );
// }