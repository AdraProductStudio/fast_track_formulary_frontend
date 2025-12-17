import React from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const AsyncTypeHead = ({
  placeholder, change, renderMenuItemChildren,
  options, onSearch, onKeyDown,
  minLength, selected
}) => {
  return (
    <AsyncTypeahead
      id="async-search-with-subtitle"
      labelKey="name"
      minLength={minLength}
      onSearch={onSearch}
      options={options}
      selected={selected}
      placeholder={placeholder}
      renderMenuItemChildren={renderMenuItemChildren}
      onChange={change}
      onKeyDown={onKeyDown}
    />
  );
};

export default AsyncTypeHead;
