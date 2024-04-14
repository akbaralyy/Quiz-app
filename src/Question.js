import React from 'react';
import './Question.css';


const Question = ({ question, options, onSelect, selectedOption }) => {
  return (
    <div>
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                onChange={() => onSelect(option)}
                checked={selectedOption === option}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
