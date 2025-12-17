"use client";

import Icons from "~/public/icons";
import { useCallback, useState } from "react";
import AsyncTypeHead from "~/components/Inputs/Asynctypeahead";

export function AsyncSearchComponent({
  className = "", placeholder = "", value = "",
  setState = () => { }, onClick = () => { }, clear_search = () => { }
}) {
  const [options, setOptions] = useState([
    { id: 1, name: "Apple", category: "Fruit", season: "Winter" },
    { id: 2, name: "Apricot", category: "Fruit", season: "Summer" },
    { id: 3, name: "bannana", category: "Nut", season: "All year" },
  ]);

  const searchFun = useCallback(() => {
    if (typeof onClick === "function") onClick(value[0]?.name);
  }, [value]);

  const handleSearchEnter = (event) => {
    if (event.code === "Enter") searchFun();
  };

  const handleSearch = async (query) => {
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();

    setOptions(data);
  };

  return (
    <div className="position-relative w-100">
      <AsyncTypeHead
        id="async-search-with-subtitle"
        labelKey="name"
        minLength={1}
        selected={value}
        onSearch={handleSearch}
        options={options}
        onKeyDown={handleSearchEnter}
        placeholder={placeholder}
        renderMenuItemChildren={(option) => (
          <div>
            <div className="fw-semibold">{option.name}</div>
            <small className="text-muted">
              {option.category} • {option.season}
            </small>
          </div>
        )}
        change={(selected) => setState("search_text", selected)}
      />

      {value?.length > 0 ?
        <span
          className={`${true ? "cursor-pointer" : "pe-none"} search_end_icon`}
          onClick={clear_search}
        >
          {Icons.search_cancel_icon}
        </span>
        :
        <span className="search_end_icon" onClick={searchFun}>
          {Icons.search_icon}
        </span>
      }
    </div>
  );
}
