import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Topic(props) {

    const [scaleFactor, setScaleFactor] = useState(150);
    const [possibleColours, setPossibleColours] = useState(["primary", "secondary", "accent"])

    const randomIndex = Math.floor(Math.random() * possibleColours.length);

    return (
      <div>
        <div className={`badge badge-${possibleColours[randomIndex]} p-3 hover:scale-110`}>{props.topic}</div>
    </div>
    )
}

export default Topic;