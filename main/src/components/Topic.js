import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Topic(props) {
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
      <div>
        <div className="badge badge-primary p-3 hover:scale-150">you're interested in {props.topic}</div>
  </div>, document.getElementById("interestedContainer"));
}

export default Topic;