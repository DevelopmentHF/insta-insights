import FileUpload from '../components/FileUpload';
import React, { useState, useEffect } from 'react';
import BackBack from '../components/BackBack';

function Home() {
    const [containers, setContainers] = useState(['followerContainer', 'likesContainer']);
    const [currentContainer, setCurrentContainer] = useState(0);

    useEffect(() => {
        console.log(`The current container is index: ${currentContainer}, name: ${containers[currentContainer]}`);
        // loop thru containers and hide all those except currently selected
        containers.forEach((container) => {
            if (container === containers[currentContainer]) {
                document.getElementById(container).classList.remove('hidden');
            } else {
                document.getElementById(container).classList.add('hidden');
            }
        })
    }, [currentContainer]);

    const handleNext = () => {
        setCurrentContainer(currentContainer+1);
        console.log(`The new container is index: ${currentContainer}, name: ${containers[currentContainer]}`);
    }

    const handlePrev = () => {
        setCurrentContainer(currentContainer-1);
        console.log(`The new container is index: ${currentContainer}, name: ${containers[currentContainer]}`);
    }

    return (<div className='flex-col'>
            <div id='titleAndUploader'>
                <h1 className="m-16 font-bold text-7xl">Insta Insights<span className='text-indigo-500'>.</span></h1>

                <div className="bg-gray-700 rounded-lg drop-shadow-2xl hover:drop-shadow-md transition ease-in-out delay-100">
                    <FileUpload></FileUpload>
                    <div className="tooltip m-4" data-tip="Select JSON and unzip the file">
                        <button
                            className="btn btn-secondary bg-indigo-500 border-0 hover:btn-success"
                            onClick={() => window.open('https://www.instagram.com/download/request', '_blank')}
                            >
                            Get My Data
                        </button>
                    </div>
                
                </div>
            </div>
         
                <button id="next" className="btn btn-primary absolute bottom-0 right-0 m-4 hidden" onClick={handleNext}>Next</button>
                <button id="prev" className="btn btn-primary absolute bottom-0 left-0 m-4 hidden" onClick={handlePrev}>Prev</button>

                 <div id='header' className='hidden'>
                    <BackBack></BackBack>
                 </div>
                 <div id="overview" className='hidden'></div>
                 <div id="topicContainer" className='flex hidden'>

                 </div>

                <div id="followerContainer" className='hidden flex-col justify-center'>
                    <div id="followerStats" className='flex m-4'></div>
                    <div id="carouselWrapper" className='flex justify-center m-4'>
                        <div id="carousel" className="h-60 carousel carousel-vertical rounded-box"></div>
                        {/* <p>The new container is index: {currentContainer}, name: {containers[currentContainer]}</p> */}
                    </div>
                </div>

                <div id="likesContainer" className="hidden">
                    <p>likes container</p>
                </div>

            </div>);
}

export default Home;