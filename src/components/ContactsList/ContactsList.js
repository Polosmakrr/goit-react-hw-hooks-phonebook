import react from 'react';
import ContactItem from '../ContactItem/ContactItem';

const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} onRemoveContact={onRemoveContact} />
      ))}
    </ul>
  );
};
export default ContactList;
