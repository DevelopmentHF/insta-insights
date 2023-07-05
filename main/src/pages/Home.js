import FileUpload from '../components/FileUpload';
import React, { useState } from 'react';
import BackBack from '../components/BackBack';

function Home() {
    return (<div className='flex-col'>
            <div id='titleAndUploader'>
                <h1 className="m-16 font-bold text-7xl">Insta Insights<span className='text-indigo-500'>.</span></h1>

                <div className="bg-gray-700 rounded-lg drop-shadow-2xl hover:drop-shadow-md transition ease-in-out delay-100">
                <FileUpload></FileUpload>
                </div>
            </div>
                 <div id='header' className='hidden'>
                    <BackBack></BackBack>
                 </div>
                 <div id="topicContainer" className='flex hidden'>

                 </div>
                <div id="followerContainer" className='hidden'></div>
            </div>);
}

export default Home;