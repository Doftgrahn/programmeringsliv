import React, {useState} from 'react';

const Answer = ({ answer }) => {
  const [timestamp] = useState(answer.timestamp);
    let time = timestamp.toDate().toLocaleTimeString();
    let date = timestamp.toDate().toLocaleDateString();

 return (
  <div className="postDiv"> Answer: 
    <div className="answer"> {answer.answer} </div>
    <div className="postMetadata">
      <span className="date">{date} {time}</span>
      <span className="votes">{0} votes</span>
    </div>
  </div>
);
}

export default Answer;