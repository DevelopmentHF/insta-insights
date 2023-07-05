import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

function Followers(props) {

    const [isContainerReady, setIsContainerReady] = useState(false);

    useEffect(() => {
        const targetContainer = document.getElementById('carousel');
        if (targetContainer) {
        setIsContainerReady(true);
        }
    }, []);

    if (!isContainerReady) {
        return null; // Render nothing if the container is not ready
    }
    return createPortal(
        <div className="carousel-item h-full">
                <h2>{props.name}</h2>
        </div> 
    , document.getElementById('carousel'));
}

export default Followers;