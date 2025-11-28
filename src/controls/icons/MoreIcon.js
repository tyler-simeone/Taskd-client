import React, { useEffect, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TogglePopout from "../../components/features/popoutmenu/TogglePopout";
import "./styles/MoreIcon.css"

export const MoreIcon = ({ options, idx }) => {

    const showMoreOptions = (evt) => {
        const modal = document.getElementById(`more-options-modal-${idx}`);

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
        const modal = document.getElementById(`more-options-modal-${idx}`);
        modal.style.display = 'none';
    };

    return (
        <>
            <TogglePopout
                renderButton={({ isOpen }) => (
                    <MoreHorizIcon className="more-icon" />
                )}
                style={{height: 20}}
            >
                {({ position, ref }) => (
                    <div 
                        ref={ref}
                        style={{
                            top: position.top-3,
                            left: position.left-4,
                            position: 'absolute',
                            backgroundColor: "#fff",
                            borderRadius: 5.5,
                            border: "1px solid #e1e1e1",
                            boxShadow: "0px 2px 3px 0px rgb(0 0 0 / 10%)",
                        }}      
                    >
                        <ul style={{padding: "7px 0px", margin: "0 auto"}}>
                            {options && (
                                options.map(option => (
                                    <li className="more-options-li" key={option.name} name={option.name} onClick={option.callback}>
                                        {option.value}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </TogglePopout>
        </>
    );
}