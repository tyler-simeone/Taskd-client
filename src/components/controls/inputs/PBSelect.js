import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./PBSelect.css"

export const PBSelect = ({
    label,
    index, 
    options,
    handleSelectChange,
    value,
    disabled
}) => {

    const [selectedValue, setSelectedValue] = useState();

    const handleSelect = () => {      
        var selectMenu = document.getElementById(`pb-select-${index}`);
        var selectedValue = selectMenu.options[selectMenu.selectedIndex].value;  
        handleSelectChange(selectedValue);
        setSelectedValue(selectedValue);
    }

    const applySelectedValue = () => {
        var selectMenu = document.getElementById(`pb-select-${index}`);
        
        if (value !== undefined) 
            selectMenu.value = value;

        if (selectMenu.value !== selectedValue)
            setSelectedValue(selectMenu.value);
    }

    useEffect(() => {
        applySelectedValue();
    }, [selectedValue, value, disabled])

    return (
        <div className="pb-select--container">
            <label 
                for={`pb-select-${index}`} 
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

                    {options.map(option => {
                        return (
                            <option className="option" value={option.value}>
                                <p className="li-txt">{option.label}</p>
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