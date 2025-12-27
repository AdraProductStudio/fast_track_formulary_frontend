"use client";

import React from "react";
import SpinnerComponent from "../Spinner/Spinner";
import Icons from "~/public/icons";
import { handle_Search_autocomplete_func } from "~/services/endpoint/durgs";
import AsyncTypeHead from "../Inputs/Asynctypeahead";

export function AsyncSearchComponent({
  placeholder = "", state = {}, ref,
  setState = () => { }, onClick = () => { },
}) {

  const searchFun = (selected) => {
    onClick(selected?.[0] || {});
    setState(prev => ({ ...prev, selected_search_text: selected }));
  };

  const handleSearch = (query) => {
    handle_Search_autocomplete_func({ value: query, setState });
  };

  return (
    <div className="position-relative w-100" id="med_search_async_typehead_heading">
      <AsyncTypeHead
        id="med_search_async_typehead"
        minLength={1}
        selected={state?.selected_search_text ?? []}
        options={state?.search_text_options ?? []}
        onSearch={handleSearch}
        placeholder={placeholder}
        change={searchFun}
        ref={ref}
        renderMenuItemChildren={(option) => (
          <div className="pb-2 border-bottom">
            <h6 className="word_break_all mb-1">{option.label}</h6>
            <small className="text-muted word_break">{option.formularyName}</small>
          </div>
        )}
      />
      <span className="search_end_icon">
        {state?.spinner ? <SpinnerComponent className="text-primary me-2 mt-1" /> : Icons.search_icon}
      </span>
    </div>
  );
}
