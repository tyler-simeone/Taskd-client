import React, { useEffect, useState } from "react";
import TogglePopout from "../popoutmenu/TogglePopout";
import { Input } from "../../../controls/inputs/Input";
import { Checkbox } from "../../../controls/inputs/Checkbox";
import "./PopoutMenuSearch.css"

export const PopoutMenuSearch = ({ 
    options,
    idx,
    value,
    label,
    placeholder,
    inputDisabled,
    selectedIds,
    showXIcon,
    handleClearFilters,
    onInputChange
}) => {

    useEffect(() => {
        // console.log("selectedIds: ", selectedIds);
    }, [])

    return (    
        <>
            <TogglePopout
                renderButton={({ isOpen }) => (
                    <Input 
                        label={label}
                        style={{height: 31, border: "1px solid lightgray", borderRadius: 2.5}}
                        containerStyle={{marginBottom: 0}}
                        value={value}
                        placeholder={options && options.length > 0 ? placeholder : "No Tags Found"}
                        isDisabled={inputDisabled}
                        showXIcon={showXIcon}
                        xIconOnClick={handleClearFilters}
                        handleChange={onInputChange}
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
                            borderRadius: 5,
                            borderRadius: "4px 4px 5.5px 5.5px",
                            border: "1px solid #e1e1e1",
                            boxShadow: "0px 2px 3px 1px rgb(0 0 0 / 10%)",
                            height: 200,
                            overflow: "scroll"
                        }}      
                    >
                        <ul style={{padding: "16px 0px", margin: "0 auto", width: 188}}>
                            {options && options.length > 0 ? (
                                options.map(option => (
                                    <li 
                                        className={`more-options-li ${selectedIds && selectedIds.includes(option.id) ? 'selected' : ''}`} 
                                        key={option.id} 
                                        name={option.name} 
                                        onClick={option.onClick}
                                    >
                                        <div style={{display: "flex"}}>
                                            <Checkbox 
                                                checked={selectedIds && selectedIds.includes(option.id)}
                                                style={{marginRight: 8, marginTop: 5}}
                                            /> 
                                            <p>{option.value}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="more-options-li not-found" key={-1}>
                                    No Tags Found
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </TogglePopout>
        </>
    );
}