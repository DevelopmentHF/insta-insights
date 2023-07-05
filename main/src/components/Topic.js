import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function Topic(props) {
    return createPortal(<div className="stats shadow m-8">
  
    <div className="stat">
      <div className="stat-title">Topic</div>
      <div className="stat-value">{props.value}</div>
      <div className="stat-desc">description</div>
    </div>
    
  </div>, document.getElementById("topicContainer"));
}

export default Topic;