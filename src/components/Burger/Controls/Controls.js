import React from 'react'
import classes from "./Controls.module.css"
import Control from '../Control/Control'


const Controls = props => {
    const controls = [
        { label: 'Salad', type: "salad" },
        { label: 'Bacon', type: "bacon" },
        { label: 'Cheese', type: "cheese" },
        { label: 'Meat', type: "meat" }
    ]

    return (
        <div className={classes.Controls}>
            <p><strong> Current Price: {props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <Control
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingAdded(ctrl.type)}
                    removed={() => props.ingRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >ORDER NOW</button>
        </div>
    )
}

export default Controls
