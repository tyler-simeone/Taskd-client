import React, { useEffect, useState } from "react";
import TogglePopout from "../popoutmenu/TogglePopout";
import { Input } from "../../../controls/inputs/Input";
import "./PopoutMenuSearch.css"

export const PopoutMenuSearch = ({ options, idx, value, placeholder, inputDisabled }) => {

    useEffect(() => {
        console.log("options: ", options);
    }, [])

    return (
        <>
            <TogglePopout
                renderButton={({ isOpen }) => (
                    <Input 
                        style={{height: 31, border: "1px solid lightgray", borderRadius: 4}}
                        // style={{height: 31, border: "1px solid lightgray", borderRadius: 4, backgroundColor: "#fff"}}
                        containerStyle={{marginBottom: 0}}
                        value={value}
                        placeholder={placeholder}
                        isDisabled={inputDisabled}
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
                                    <li className="more-options-li" key={option.name} name={option.name} onClick={option.onClick}>
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