import React, { forwardRef } from "react";
import { X } from "lucide-react";
import "./styles/Input.css"

export const Input = forwardRef(({ 
    id,
    label,
    name,
    type,
    value,
    handleChange,
    isDisabled,
    fromModal,
    className,
    style,
    containerStyle,
    placeholder,
    showXIcon,
    xIconOnClick
}, ref) => {

    return (
        <div className="pb-input--container" style={containerStyle}>
            {showXIcon && xIconOnClick ?
            (
                <>
                    {label && <label className="pb-input-lbl" htmlFor={id}>{label}:</label>}
                    <div style={{margin: 0, display: "flex"}}>
                        <input 
                            id={id} 
                            name={name}
                            className={`pb-input ${className ?? ''} ${fromModal && 'modal-input'}`} 
                            type={!type ? "text" : type}
                            onChange={handleChange}
                            value={value}
                            disabled={isDisabled}
                            style={style}
                            placeholder={placeholder}
                            ref={ref}
                        />
                            <button
                                className="pb-input-clr--btn"
                                onClick={xIconOnClick}
                            >
                                <X style={{width: 22, height: 22}} />
                            </button>
                    </div>
                </>
            ) : 
            (
                <>
                    {label && <label className="pb-input-lbl" htmlFor={id}>{label}:</label>}
                    <input 
                        id={id} 
                        name={name}
                        className={`pb-input ${className ?? ''} ${fromModal && 'modal-input'}`} 
                        type={!type ? "text" : type}
                        onChange={handleChange}
                        value={value}
                        disabled={isDisabled}
                        style={style}
                        placeholder={placeholder}
                        ref={ref}
                    />
                </>
            )}
        </div>
    );
});