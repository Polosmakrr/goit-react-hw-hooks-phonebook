import React, { useState, useEffect } from 'react';
import FormInput from './components/FormInput/FormInput';
import { nanoid } from 'nanoid';
import ContactsList from './components/ContactsList/ContactsList';
import Filter from './components/Filter/Filter';
import './App.css';

const useLocalStorage = (key, defaultValue)=>{
  const [state, setState] = useState(() => {
    return (JSON.parse(window.localStorage.getItem(key)))
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts','');
  const [filter, setFilter] = useState('');
  
  const formSubmitHandler = data => {
    const contact = {
      id: nanoid(),
      ...data,
    };
  
    setContacts(contacts => {
      return [contact, ...contacts]
    });
  }

  const removeContact = id => {
    setContacts(contact => contact.filter(cont=>cont.id !== id)
  );
  };

    const changeFilter = filterValue => {
      setFilter(filterValue);

    };
  
     const getFilteredContacts = () =>{

    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

   return (
      <>
        <h1>Phone Book</h1>
        <FormInput onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        {contacts.length >= 1 && <Filter value={filter} onChangeFilter={changeFilter} />}
        <ContactsList onRemoveContact={removeContact} contacts={getFilteredContacts()} />
      </>
    );
}
