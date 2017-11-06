import $ from 'jquery';

class FormHandler {

  constructor(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  };

  addSubmitHandler(callback) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event) {
      event.preventDefault();

      let data = {};
      $(this).serializeArray().forEach(item => {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      callback(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  addInputHandler(callback) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      let emailAddress = event.target.value;
      let message = '';
      if (callback(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });
  }
}

export default FormHandler;
