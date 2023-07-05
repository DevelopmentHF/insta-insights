import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function BackBack() {
    const handleBack = () => {
        document.getElementById('titleAndUploader').classList.remove('hidden');
        document.getElementById('header').classList.add('hidden');
        document.getElementById('topicContainer').classList.add('hidden');
    }    
    return <button className='btn btn-warning absolute left-4 top-4' onClick={handleBack}>HOME</button>;
}

export default BackBack;