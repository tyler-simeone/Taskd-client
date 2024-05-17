import React, { useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./MoreIcon.css"

export const MoreIcon = ({ options }) => {
    const [isHidden, setIsHidden] = useState(true);

    const showMoreOptions = () => setIsHidden(false);
    const closeMoreOptions = () => setIsHidden(true);

    return (
        <>
            <div className="more-icon--container" onClick={showMoreOptions}>
                <MoreHorizIcon className="more-icon" />
            </div>

            {!isHidden ? (
                <div className="more-options--container" onClick={closeMoreOptions}>
                    <ul>
                        {options !== undefined ? (
                            options.map(option => (
                                <li className="more-options-li" name={option.name} onClick={option.callback}>
                                    {option.value}
                                </li>
                            ))
                        ) : null}
                    </ul>
                </div>
            ) : null}
        </>
    );
}