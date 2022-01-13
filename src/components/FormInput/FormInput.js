import React, { Component } from 'react';

class FormInput extends Component {
  state = {
    name: '',
    phone: '',
  };

  hendleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  hendleSave = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      phone: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.hendleSave}>
        <lebel>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.hendleInputChange}
          />
        </lebel>
        <br />
        <lebel>
          Phone
          <input
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.phone}
            onChange={this.hendleInputChange}
          />
        </lebel>
        <br />
        <button type="submit">Save</button>
      </form>
    );
  }
}

export default FormInput;
