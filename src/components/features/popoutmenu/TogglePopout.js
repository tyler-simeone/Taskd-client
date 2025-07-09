import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function TogglePopout({ children, renderButton, style }) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const popoutRef = useRef(null);

    const toggleOpen = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);

    // Set popout position relative to button
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (buttonRef.current && !buttonRef.current.contains(event.target)
                && popoutRef.current && !popoutRef.current.contains(event.target)) 
            {
                close();
            }
        }

        if (isOpen)
            document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div style={style}>
            {/* Toggle Button */}
            <div ref={buttonRef} onClick={toggleOpen}>
                {renderButton({ isOpen })}
            </div>

            {/* Only render children when open */}
            {isOpen &&
                createPortal(
                children({
                    close,
                    position,
                    ref: popoutRef
                }),
                document.body
            )}
        </div>
    );
}