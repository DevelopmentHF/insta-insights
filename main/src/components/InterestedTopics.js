import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function InterestedTopics(props) {
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

    console.log("TOPCIS::::");
    console.log(props.data);

    return createPortal(
      <div>
        
  </div>, document.getElementById("interestedContainer"));
}

export default InterestedTopics;