import React, { forwardRef } from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const AsyncTypeHead = forwardRef(({
  placeholder = "", change = () => { }, renderMenuItemChildren,
  options = [], onSearch = () => { }, minLength = 1, selected = [],
  inputValue = "as", onInputChange = () => { }, id, disabled = false
}, ref) => {

  return (
    <AsyncTypeahead
      id={id}
      ref={ref}
      minLength={minLength}
      onSearch={onSearch}
      options={options}
      selected={selected}
      placeholder={placeholder}
      renderMenuItemChildren={renderMenuItemChildren}
      onChange={change}
      inputValue={inputValue}
      onInputChange={onInputChange}
      disabled={disabled}
    />
  );
});

export default AsyncTypeHead;
