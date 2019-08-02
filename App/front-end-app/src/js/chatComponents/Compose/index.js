import React, { Component } from 'react';
// import './Compose.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


export default class Compose extends Component {
  render() {
    return (
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">Button</Button>
        </InputGroup.Append>
      </InputGroup>
      // <div className="compose">
      //   <input
      //     type="text"
      //     className="compose-input"
      //     placeholder="Type a message, @name"
      //   />

      //   {
      //     this.props.rightItems
      //   }
      // </div>
    );
  }
}