import React, { Component } from "react";
import Joi from "joi-browser";

import Select from "./select";
import Input from "./input";

class Form extends Component {
  state = {
    date: {},
    errors: {},
  };

  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    // error.details.map((item) => {

    // });
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const schema = {
      [name]: this.schema[name],
    };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    this.doSubmit();
  };

  renderButton = (label) => {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    console.log(label);
    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
