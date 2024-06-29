import React, { useEffect, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./MoreIcon.css"

export const MoreIcon = ({ options }) => {

    const showMoreOptions = (evt) => {
        const modal = document.getElementById('more-options--modal');

        const isModalOpen = modal.style.display === 'block';

        // console.log("isModalOpen: ", isModalOpen);

        // close modal if mouse click is not in modal
        // if (isModalOpen && !modal.contains(evt.target)) {
        //     modal.style.display = 'none';
        //     return;
        // }
        
        modal.style.left = `${evt.pageX}px`;
        modal.style.top = `${evt.pageY}px`;
        modal.style.display = 'block';
    };
    const closeMoreOptions = () => {
        const modal = document.getElementById('more-options--modal');
        modal.style.display = 'none';
    };

    return (
        <>
            <div className="more-icon--container" onClick={evt => showMoreOptions(evt)}>
                <MoreHorizIcon className="more-icon" />
            </div>

            <div id="more-options--modal" className="more-options--container" onClick={evt => closeMoreOptions(evt)}>
                <ul>
                    {options !== undefined ? (
                        options.map(option => (
                            <li className="more-options-li" key={option.name} name={option.name} onClick={option.callback}>
                                {option.value}
                            </li>
                        ))
                    ) : null}
                </ul>
            </div>
        </>
    );
}