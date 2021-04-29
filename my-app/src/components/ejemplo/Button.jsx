import React from 'react';
import './button.css';

const STYLES = [
    'bgYellow white',
    'bgGreen',
];
const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSixe
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

     return (
        <button className={`btn ${checkButtonStyle}`} onClick={onClick} type={type} >
            {children}
        </button> 
    )
}

export default Button
