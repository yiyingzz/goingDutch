import React from "react";

const PeopleInput = props => {
  const { i, handlePersonChange, personName } = props;
  return (
    <div>
      <label htmlFor={`person${i}`} className="visuallyHidden">
        Name
      </label>
      <input
        type="text"
        className="name-input"
        id={`person${i}`}
        data-index={i}
        placeholder="Name"
        value={personName}
        onChange={handlePersonChange}
      ></input>
      <button>Remove [x]</button>
    </div>
  );
};

export default PeopleInput;
