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
        <div className="flex carousel-item h-full">
             {/* <h2>{props.name}</h2> */}
             <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-4xl">@{props.name}</h2>
                    <p>Isn't following you back ... </p>
                    <div className="card-actions justify-end">
                        <a className="btn btn-primary" href={'https://www.instagram.com/' + props.name} target='_blank'>Give them the boot?</a>
                    </div>
                </div>
            </div>
        </div>  
    , document.getElementById('carousel'));
}

export default Followers;