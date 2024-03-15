import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input className='input-field'
      type="text"
      placeholder="Search products"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
