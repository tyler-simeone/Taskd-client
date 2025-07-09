import React, { useEffect, useState } from "react";
import TogglePopout from "../popoutmenu/TogglePopout";
import { Input } from "../../../controls/inputs/Input";
import "./PopoutMenuSearch.css"

export const PopoutMenuSearch = ({ options, idx }) => {

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
                    <Input 
                        style={{height: 31, border: "1px solid lightgray", borderRadius: 4, backgroundColor: "#fff"}}
                        containerStyle={{marginBottom: 0}}
                    />
                )}
            >
                {({ position, ref }) => (
                    <div 
                        ref={ref}
                        style={{
                            top: position.top-1,
                            left: position.left,
                            position: 'absolute',
                            backgroundColor: "#fff",
                            borderRadius: 5.5,
                            borderRadius: "4px 4px 5.5px 5.5px",
                            border: "1px solid lightgrey",
                            boxShadow: "0px 2px 3px 1px rgb(0 0 0 / 20%)",
                            height: 200,
                            overflow: "scroll"
                        }}      
                    >
                        <ul style={{padding: "16px 0px", margin: "0 auto", width: 188}}>
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