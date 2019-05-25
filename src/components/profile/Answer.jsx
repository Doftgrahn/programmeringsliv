import React from 'react';

const Answer = ({ answer }) => (
  <div className="postDiv"> Answer: 
    <div className="answer">
      {answer.question}
    </div>
    <div className="postMetadata">
      <span className="date">19/05/26 10:17AM</span>
      <span className="votes">{0} votes</span>
    </div>
  </div>
);

export default Answer;