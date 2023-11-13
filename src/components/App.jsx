import React from 'react';
import { Container, Title } from './AppStyles';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  updateFilter,
} from './redux/contactsSlice';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.contacts.filter);

  const addContactHandler = (name, number) => {
    const isNameExists = contacts.some((contact) => contact.name === name);

    if (isNameExists) {
      alert("Це ім'я вже існує в телефонній книзі.");
      return;
    }

    const newContact = {
      id: `id-${Date.now()}`,
      name,
      number,
    };

    dispatch(addContact(newContact));
  };

  const deleteContactHandler = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onAddContact={addContactHandler} />
      <Title>Contacts</Title>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContactHandler}
      />
    </Container>
  );
};

export default App;
