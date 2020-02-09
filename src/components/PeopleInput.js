import React from "react";

const PeopleInput = props => {
  const { i, handlePersonChange, personName, removePersonInput } = props;

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
      {2 <= i ? (
        <button onClick={e => removePersonInput(e, i)}>Remove [x]</button>
      ) : null}
    </div>
  );
};

export default PeopleInput;
