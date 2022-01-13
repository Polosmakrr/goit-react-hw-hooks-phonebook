import React, { Component } from 'react';
import FormInput from './components/FormInput/FormInput';
import { nanoid } from 'nanoid';
import ContactsList from './components/ContactsList/ContactsList';
import Filter from './components/Filter/Filter';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const contact = {
      id: nanoid(),
      ...data,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  componentDidMount() {
    // console.log('component Mount');

    const contacts = localStorage.getItem('Contacts');
    const parsContacts = JSON.parse(contacts);
    // console.log(contacts);
    // console.log(parsContacts);
    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('component update');

    // console.log('prevState:', prevState);
    // console.log('this.state:', this.state);

    if (this.state.contacts != prevState.contacts) {
      // console.log('refresh stste');
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <h1>Phone Book</h1>
        <FormInput onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        {contacts.length > 1 && <Filter value={filter} onChangeFilter={this.changeFilter} />}
        <ContactsList onRemoveContact={this.removeContact} contacts={this.getFilteredContacts()} />
      </>
    );
  }
}

export default App;
