// Business Logic for AddressBook---
function AddressBook() {
    this.contacts = {};
    this.currentId = 0;
}
AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
};
AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
};
AddressBook.prototype.findContact = function(id) {
    if (this.contacts[id] !== undefined) {
        return this.contacts[id];
    }
    return false;
};

AddressBook.prototype.deleteContact = function(id) {
    if (this.contacts[id] === undefined) {
        return false;
    }
    delete this.contacts[id];
    return true;
}

// Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber, emailAddress, streetAddress, city, state, zipCode) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.emailAddress = emailAddress;
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
}
Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
};

// User Interface Logic 
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
    let contactsDiv = document.querySelector("div#contacts");
    contactsDiv.innerText = null;
    const ul = document.createElement("ul");
    Object.keys(addressBookToDisplay.contacts).forEach(function(key){
        const contact = addressBookToDisplay.findContact(key);
        const li = document.createElement("li");
        li.append(contact.fullName());
        li.setAttribute("id", contact.id);
        ul.append(li);
    });
    contactsDiv.append(ul);
}

function handleFormSubmission(event) {
    event.preventDefault();
    const inputtedFirstName = document.querySelector("input#new-first-name").value;
    const inputtedLastName = document.querySelector("input#new-last-name").value;
    const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
    const inputtedEmailAddress = document.querySelector("input#new-email-address").value;
    const inputtedStreetAddress = document.querySelector("input#new-street-address").value;
    const inputtedCity = document.querySelector("input#new-city").value;
    const inputtedState = document.querySelector("input#new-state").value;
    const inputtedZipCode = document.querySelector("input#new-zip").value;
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedStreetAddress, inputtedCity, inputtedState, inputtedZipCode);
    addressBook.addContact(newContact);
    console.log(addressBook.contacts);
    listContacts(addressBook);
}

window.addEventListener("load", function () {
    document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
});

