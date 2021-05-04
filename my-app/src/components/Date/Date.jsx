import React from 'react'

const DateOrder = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();
    return (
        <span> {date}/{month}/{year}
        </span>
    )
}

export default DateOrder

