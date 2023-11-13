import React from 'react';
import PropTypes from 'prop-types';
import { List, Item, DeleteButton } from './ContactListStyles'; 

const ContactList = ({ contacts, onDeleteContact }) => (
  <List>
    {contacts.map((contact) => (
      <Item key={contact.id}>
        {contact.name}: {contact.number}
        <DeleteButton onClick={() => onDeleteContact(contact.id)}>Delete</DeleteButton>
      </Item>
    ))}
  </List>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
