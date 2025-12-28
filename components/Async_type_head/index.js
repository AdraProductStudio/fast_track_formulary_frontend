"use client";

import React from "react";
import SpinnerComponent from "../Spinner/Spinner";
import Icons from "~/public/icons";
import { handle_Search_autocomplete_func } from "~/services/endpoint/durgs";
import AsyncTypeHead from "../Inputs/Asynctypeahead";
import { auth_json } from "~/json/json_data/auth";

export function AsyncSearchComponent({ state = {}, ref, setState = () => { } }) {
  const { med_search_dynamic_placeholder_sending_data } = auth_json;

  const selectedKeys = Object.keys(state?.selected_search_text || {});
  let dynamicConfig = med_search_dynamic_placeholder_sending_data.default;

  if (selectedKeys.length === 1) {
    const key = selectedKeys[0];
    dynamicConfig = med_search_dynamic_placeholder_sending_data[key] || med_search_dynamic_placeholder_sending_data.default;
  }

  const dynamic_placeholder = dynamicConfig.title;
  const searching_for = dynamicConfig.searching_for;

  const searchFun = (selected) => {
    const selected_search_text = selected?.[0] || {};

    setState(prev => ({
      ...prev, selected_search_text: {
        ...(prev?.selected_search_text || {}),
        [selected_search_text?.type || ""]: selected_search_text
      }
    }));
  };

  const handleSearch = (query) => {
    handle_Search_autocomplete_func({ params: { search_text: query, searching_for }, setState });
  };

  return (
    <div className="position-relative w-100" id="med_search_async_typehead_heading">
      <AsyncTypeHead
        id="med_search_async_typehead"
        minLength={1}
        options={state?.search_text_options || []}
        onSearch={handleSearch}
        placeholder={dynamic_placeholder}
        change={searchFun}
        ref={ref}
        renderMenuItemChildren={(option) => (
          <div className="pb-2 border-bottom row">
            <div className="col-9">
              <p className="word_break_all mb-1">{option.label}</p>
            </div>
            <div className="col text-end">
              <div className={`${option.type}_search_tag`}>
                {option.type}
              </div>
            </div>
          </div>
        )}
        disabled={Object.keys(state?.selected_search_text || {})?.length === 2}
      />
      <span className="search_end_icon">
        {state?.spinner ? <SpinnerComponent className="text-primary me-2 mt-1" /> : Icons.search_icon}
      </span>
    </div>
  );
}
