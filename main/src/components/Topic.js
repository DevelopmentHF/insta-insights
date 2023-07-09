import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Topic(props) {
    return (
      <div>
        <div className="badge badge-secondary p-3 hover:scale-150">{props.topic}</div>
    </div>
    )
}

export default Topic;