import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Topic(props) {

    const [scaleFactor, setScaleFactor] = useState(150);
    const [possibleColours, setPossibleColours] = useState(["primary", "secondary"])

    const randomIndex = Math.floor(Math.random() * possibleColours.length);

    return (createPortal(
        <div className="carousel-item w-1/4 p-2">
          <div className="badge badge-neutral w-full p-3 h-full">{props.topic}</div>
      </div> 
    , document.getElementById('interestedCarousel'))
    );
}

export default Topic;