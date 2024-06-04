import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./Select.css"

export const Select = ({
    label,
    index, 
    options,
    handleSelectChange,
    value,
    disabled
}) => {
    const handleSelect = () => {      
        var selectMenu = document.getElementById(`pb-select-${index}`);
        var selectedValue = selectMenu.options[selectMenu.selectedIndex].value;  
        handleSelectChange(selectedValue);
    }

    return (
        <div className="pb-select--container">
            <label 
                htmlFor={`pb-select-${index}`} 
                className={`pb-select-label ${disabled ? 'disabled' : ''}`}
            >
                {label}
            </label>

            <div style={{display: "flex"}}>
                <select 
                    id={`pb-select-${index}`} 
                    onChange={(evt) => handleSelect()}
                    className={`pb-select ${disabled ? 'disabled' : ''}`}
                    disabled={disabled}
                >
                    {/* <option value="" disabled selected hidden></option> */}

                    {options && options.map(option => {
                        return (
                            <option key={option.id} selected={option.value === value} className="option" value={option.value}>
                                {option.label}
                            </option>
                        )
                    })}
                </select>
                {/* <div className="pb-select-icon">
                    <KeyboardArrowDownIcon />
                </div> */}
            </div>
        </div>
    );
}