import React, { useState } from "react";
import getSearch from "../app/services";
import { isFieldEmpty } from "../app/searchSlice";

import { useDispatch } from "react-redux";

//redux

function Search() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const handleKey = (e) => {
    const value = username;
    e.code === "Enter" && dispatch(getSearch({ value }));
  };
  const handleField = (e) => {
    const value = e.target.value.toString();
    if (value.length === 0 || value.trim() === "") {
      dispatch(isFieldEmpty({value:true}));
    } else {
      setUsername(value);
    }
  };
  return (
    <>
      <div className="searchFullPage">
        <div className="search">
          <div className="searchForm">
            <input
              onChange={handleField}
              onKeyDown={handleKey}
              placeholder="Search"
              type="text"
              name=""
              id=""
            />
            <svg viewBox="0 0 1000 1000" title="Search">
              <path
                fill="currentColor"
                d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
