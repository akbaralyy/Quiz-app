import React from 'react';
import "./Result.css"

const Result = ({ marks }) => {
  return (
    <div>
      <h2>Quiz Completed</h2>
      <p>Marks: {marks}</p>
    </div>
  );
};

export default Result;
