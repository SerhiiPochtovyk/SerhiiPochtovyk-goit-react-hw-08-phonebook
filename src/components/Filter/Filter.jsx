import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './FilterStyles';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../redux/contactsSlice';

const Filter = () => {
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  const onFilterChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <Input
      type="text"
      name="filter"
      value={filter}
      placeholder="Search contacts"
      onChange={onFilterChange}
    />
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default Filter;
