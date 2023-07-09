import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Topic from './Topic';

function InterestedTopics(props) {
    const [isContainerReady, setIsContainerReady] = useState(false);
    const [topicsStateArray, setTopicsStateArray] = useState([])

    useEffect(() => {
        const targetContainer = document.getElementById('topicWrapper');
        if (targetContainer) {
        setIsContainerReady(true);
        }
    }, []);

    useEffect(() => {
        setTopicsStateArray(props.data);
    }, [props.data]);
    

    if (!isContainerReady) {
        return null; // Render nothing if the container is not ready
    }

    console.log("TOPCIS::::");
    console.log(topicsStateArray);

    return createPortal(
      <div className='grid grid-cols-5 bg-customColour shadow rounded-xl p-4'>
        {topicsStateArray.map((topic) => (
            <Topic topic={topic} />
        ))}
  </div>, document.getElementById("topicWrapper"));
}

export default InterestedTopics;