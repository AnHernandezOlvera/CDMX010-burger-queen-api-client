import React, {useState} from 'react'

const GetOrder = (props) => {
    
    const [myOrder, setmyOrder] = useState('Hola')

    return (
        <div>
            <p>{props.name}</p>
        </div>
    )
}

export default GetOrder
