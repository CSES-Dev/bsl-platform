// Example

"use client";

import React from "react";

type SimpleButtonProps = {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
};

const SimpleButton: React.FC<SimpleButtonProps> = ({ onClick, className, children }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            alert("Button clicked!");
        }
    };

    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    );
};

export default SimpleButton;
