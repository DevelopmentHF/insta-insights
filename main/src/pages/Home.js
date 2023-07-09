import FileUpload from '../components/FileUpload';
import React, { useState, useEffect } from 'react';
import BackBack from '../components/BackBack';
import Topic from '../components/Topic';

function Home() {
    const [containers, setContainers] = useState(['followerContainer', 'likesContainer', 'interestedContainer', 'dmContainer']);
    const [currentContainer, setCurrentContainer] = useState(-1);

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

        if (currentContainer < 1) {
            document.getElementById('prev').classList.add('hidden');
        } else {
            document.getElementById('prev').classList.remove('hidden');
        }

    }, [currentContainer]);

    const incrementCount = () => {
        setCurrentContainer(currentContainer + 1);
      };

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
                <h1 className="m-16 font-bold text-7xl">Insta Insights<span className='text-primary'>.</span></h1>

                <div className="bg-gray-700 rounded-lg drop-shadow-2xl hover:drop-shadow-md transition ease-in-out delay-100">
                    <FileUpload incrCount={incrementCount}></FileUpload>
                    {/* <div className="tooltip m-4" data-tip="Select JSON and unzip the file">
                        <button
                            className="btn btn-secondary bg-indigo-500 border-0 hover:btn-success"
                            onClick={() => window.open('https://www.instagram.com/download/request', '_blank')}
                            >
                            Get My Data
                        </button>
                    </div> */}
                    <button className="btn btn-secondary bg-primary border-0 hover:btn-success m-4" onClick={()=>window.my_modal_1.showModal()}>instructions</button>
                    <dialog id="my_modal_1" className="modal">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">Instructions</h3>
                        <p className="py-4">1. Download your data, select <span className='italic'>all time</span> and <span className='italic'>JSON</span></p>
                        <a className='py-4 btn' target='_blank' href="https://www.instagram.com/download/request">DOWNLOAD</a>
                        <p className="py-4">2. Unzip the downloaded file by double clicking on it</p>
                        <p className="py-4">3. Upload that unzipped file and click go to analyse your data</p>
                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </div>
                    </form>
                    </dialog>
                
                </div>
            </div>
         
                <button id="next" className="btn btn-primary absolute bottom-16 right-16 m-4 hidden" onClick={handleNext}>Next</button>
                <button id="prev" className="btn btn-primary absolute bottom-16 left-16 m-4 hidden" onClick={handlePrev}>Prev</button>

                 <div id='header' className='hidden'>
                    {/* <BackBack></BackBack> */}
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
                    
                </div>

                <div id="interestedContainer" className='hidden'>
                    <Topic topic={"thing"}></Topic>
                    <Topic topic={"another thing"}></Topic>
                </div>

                <div id="dmContainer" className='hidden'>
                    <p>DM stats</p>
                </div>
            </div>);
}

export default Home;