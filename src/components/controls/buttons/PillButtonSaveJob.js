// import "./styles/pillButton.css"
// import SaveAltIcon from '@mui/icons-material/SaveAlt';
// import { useTranslation } from "react-i18next";
// import { useState } from "react";

// export const PillButtonSaveJob = ({ idx, handleSaveJob, isDisabled }) => {
//     const { t, i18n } = useTranslation();
//     const [isSaveJobRequestLoading, setIsSaveJobRequestLoading] = useState(false);

//     return (
//         <div 
//             className={`pillButtonSaveJob ${isDisabled ? `disabled` : isSaveJobRequestLoading ? 'saving' : null}`} 
//             onClick={() => {
//                 if (!isDisabled) {
//                     setIsSaveJobRequestLoading(true);
//                     handleSaveJob(idx);
//                 }
//             }}
//         >
//             {!isDisabled && !isSaveJobRequestLoading ? 
//             (
//                 <>
//                     <span>{t("PillButton.Save","Save Job")}</span>
//                     <SaveAltIcon style={{ marginLeft: '10px', marginBottom: '2px', fontSize: '18.5px' }} />  
//                 </>
//             ) : 
//             isSaveJobRequestLoading ? 
//             (
//                 <span>{t("PillButton.Saving","Saving...")}</span>
//             ) :
//             isDisabled && !isSaveJobRequestLoading ?
//             (
//                 <span>{t("PillButton.SavedJob","Saved")}</span>
//             ) : null}
//         </div>
//     )
// }