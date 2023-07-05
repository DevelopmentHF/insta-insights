import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

function Overview(props) {

    const [isContainerReady, setIsContainerReady] = useState(false);

    useEffect(() => {
        const targetContainer = document.getElementById('overview');
        if (targetContainer) {
        setIsContainerReady(true);
        }
    }, []);

    if (!isContainerReady) {
        return null; // Render nothing if the container is not ready
    }
    return createPortal(
        <div className="">
             <h1>You've been on instagram since ... insert here</h1>
        </div>  
    , document.getElementById('overview'));
}

export default Overview;