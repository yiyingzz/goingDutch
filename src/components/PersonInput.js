import React from "react";

const PersonInput = props => {
  const { i, handlePersonChange, personName, removePersonInput } = props;

  return (
    <div>
      <label htmlFor={`person${i}`} className="visuallyHidden">
        Name
      </label>
      <div className="person-component">
        <input
          type="text"
          className="name-input person-component-input"
          id={`person${i}`}
          data-index={i}
          placeholder="Name"
          value={personName}
          onChange={handlePersonChange}
        ></input>
        {2 <= i ? (
          <button
            className="input-button input-button__remove"
            onClick={e => removePersonInput(e, i)}
          >
            Remove
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PersonInput;
