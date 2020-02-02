// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, address, email) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.address = [],
  this.email = email
}

Contact.prototype.addAddress = function(address) {
  this.address.push(address);
}
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
Contact.prototype.dipslayAddress = function() {

  var fullAddress = "";

  for(var i = 0; i < this.address.length; i++){
    if(this.address[i])
      fullAddress += "/" + this.address[i].address + " : " + this.address[i].type + "/";
    else
      fullAddress += "/ empty slot /";
  };

  return fullAddress;

}

// Business Logic for Address ---------
function Address(address, type) {
  this.address = address,
  this.type = type;
}

Address.prototype.fullAddress = function() {
  return this.address + "(" + this.type +")";
}

// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBook) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBook.contacts.forEach(function(contact) {
    console.log(htmlForContactInfo);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  console.log(htmlForContactInfo);
  contactsList.html(htmlForContactInfo);
};

function createAddress() {
  var inputtedAddress = $("input#add-address").val();
  var inputtedAddressType = $("select#addressType").val();
  $("input#add-address").val("");
  return new Address(inputtedAddress, inputtedAddressType);
}




function showContact(contactId) {

  var contact = addressBook.findContact(contactId);

  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);

  var addressList = $("ul#possibleAddress");
  $("li.addressFields").remove();

  contact.address.forEach(function(saved) {
    addressList.append("<li class=" + 'addressFields' + ">" + saved.address + " " + saved.type + "</li>")
  });

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton mr-2' id=" + contact.id + ">Delete</button>");
  buttons.append("<button class='addAddress' id=" + contact.id + ">Add Address</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });

  $("#buttons").on("click", ".addAddress", function() {
    var address = createAddress();
    var id = $("button.addAddress").attr("id")
    var contact = addressBook.findContact(id);
    contact.addAddress(address);
    showContact(id);
  });
};

$(document).ready(function() {

  attachContactListeners();

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddress = $("input#new-address").val();
    var inputtedEmail = $("input#new-email").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-address").val("");
    $("input#new-email").val("");
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddress, inputtedEmail);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });

});
