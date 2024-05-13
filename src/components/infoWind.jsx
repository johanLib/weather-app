import React from "react";

export default function InfoWind(props) {
    return (
        <div className={`info-wind ${props.visibility ? 'visible' : ''}`}>
            <span>{props.speed}Km/h</span>
        </div>
        );
}