import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './FilterStyles'; 

const Filter = ({ filter, onFilterChange }) => (
  <Input
    type="text"
    name="filter"
    value={filter}
    placeholder="Search contacts"
    onChange={onFilterChange}
  />
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
