import React from 'react';
import PropTypes from 'prop-types';
import { List, Item, DeleteButton } from './ContactListStyles';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactsSlice';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const onDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <List>
      {contacts.map((contact) => (
        <Item key={contact.id}>
          {contact.name}: {contact.number}
          <DeleteButton onClick={() => onDeleteContact(contact.id)}>Delete</DeleteButton>
        </Item>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default ContactList;
