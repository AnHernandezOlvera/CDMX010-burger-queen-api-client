import React from 'react'

const Hour = () => {
    const [time, setTime] = React.useState()
    React.useEffect(() => {
        //console.log('useEffect')
        hourNow()
    },[])

    const hourNow = () => {
        let newDate = new Date();
        let timeHour = newDate.getHours();
        let timeMin = newDate.getMinutes();
        let timeSec = newDate.getSeconds();
        const timeNow = ` ${timeHour}:${timeMin}:${timeSec}`
        setTime(timeNow);
    }
    
    return (
        <span>
            {time}
        </span>
    )
}

export default Hour

