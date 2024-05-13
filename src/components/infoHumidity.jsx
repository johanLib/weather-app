import React from "react";

export default function InfoHumidity(props) {
    return (
        <div className={`info-humidity ${props.visibility ? 'visible' : ''}`}>
            <span>{props.humidity}%</span>
        </div>
    );
}
