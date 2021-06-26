import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { MessageService } from '../message.service';
import { CustomerService } from '../customer.service';
import { Message } from '../message';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})

export class CustomerListComponent implements OnInit {

  undefinedCustomer = {"id": 0, "firstname": "", "lastname": "", "age": 0, "address": ""};
  customers: Array<Customer> = [];
  showCustomer: Customer = this.undefinedCustomer;
  isSelected: boolean = false;
  deletedCustomer: Customer  = this.undefinedCustomer;
  returnedMessage!: string;
  IsmodelShow: boolean=false;

  element!: HTMLElement;



  constructor(private customerService: CustomerService,
                private messageService: MessageService) { }

  fakeClick(window: string){
    this.element = document.getElementById(window) as HTMLElement;
    this.element.click();
  }

  setNewCustomerDetails(){
    this.showCustomer = this.undefinedCustomer;
  }

  setCustomerDetails(customer: Customer){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      this.showCustomer = customer;
    }
  }

  /**
   * Set deletedCustomer and reset returnedMessage = undefined
   * @param deleteCustomer
   */
  prepareDeleteCustomer(deleteCustomer: Customer){
    //assign delete-Customer
    this.deletedCustomer = deleteCustomer;
    // reset returned-Message
    this.returnedMessage = "";
  }

  /**
   * Update Customer function
   */
  createCustomer() {
    this.customerService.createCustomer(this.showCustomer)
                      .subscribe((message: Message) => {
                        console.log(message);
                        // update customers list
                        this.customers.map(x => {
                          if(x.id == this.showCustomer.id){
                            x = this.showCustomer;
                          }
                        });

                        let msg: string = "Create Successfully! -> New Customer's properties: <br>"
                                          + "<ul>"
                                            + "<li>" + "firstname: " + this.showCustomer.firstname + "</li>"
                                            + "<li>" +  "lastname: " + this.showCustomer.lastname + "</li>"
                                            + "<li>" +  "age: " + this.showCustomer.age + "</li>"
                                            + "<li>" +  "address: " + this.showCustomer.address + "</li>"
                                          + "</ul>";
                        this.messageService.add(msg);

                        // show message
                        alert("Create Successfully!");

                        // update customer list
                        this.retrieveAllCustomers();

                        // close Add window
                        this.fakeClick('closeAdd');

                      }, (error) => {
                        console.log(error);
                        let errMsg = "Create Fail ! Error = " + error;
                        this.messageService.add(errMsg);
                      });
  }

  /**
   * Delete a Customer by ID
   */
  deleteCustomer(){

    console.log("--- Access delelteCustomer() function");

    this.customerService.deleteCustomer(this.deletedCustomer.id)
                      .subscribe((message: Message) => {
                          console.log(message);
                          // remove a deletedCustomer from customers list on view
                          this.customers = this.customers.filter(customer => {
                            return customer.id != this.deletedCustomer.id;
                          })

                          // set a showing message in delete modal
                          this.returnedMessage = message.message;

                          // just reset showCustomer for not showing on view
                          this.showCustomer = this.undefinedCustomer;

                          // add the delete message to message app for showing
                          this.messageService.add(message.message);

                          // show message
                          alert(this.returnedMessage);

                          // close Delete window
                          this.fakeClick('closeDelete');

                        }, (error) => {
                          console.log(error);
                          let errMsg: string = "Error! Details: " + error;
                          this.messageService.add(errMsg);
                        });
  }

  /**
   * Update Customer function
   */
  updateCustomer() {
    this.customerService.updateCustomer(this.showCustomer)
                      .subscribe((message: Message) => {
                        console.log(message);
                        // update customers list
                        this.customers.map(x => {
                          if(x.id == this.showCustomer.id){
                            x = this.showCustomer;
                          }
                        });

                        let msg: string = "Update Successfully! -> New Customer's properties: <br>"
                                          + "<ul>"
                                            + "<li>" + "firstname: " + this.showCustomer.firstname + "</li>"
                                            + "<li>" +  "lastname: " + this.showCustomer.lastname + "</li>"
                                            + "<li>" +  "age: " + this.showCustomer.age + "</li>"
                                            + "<li>" +  "address: " + this.showCustomer.address + "</li>"
                                          + "</ul>";
                        this.messageService.add(msg);

                        // show message
                        alert("Update Successfully!");

                        // update customer list
                        this.retrieveAllCustomers();

                        // close Update window
                        this.fakeClick('closeUpdate');
                        
                      }, (error) => {
                        console.log(error);
                        let errMsg = "Update Fail ! Error = " + error;
                        this.messageService.add(errMsg);
                      });
  }

  /**
   * Retrieve all Customer from Backend
   */
  retrieveAllCustomers() {
    this.customerService.retrieveAllCustomers()
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.customers = message.customers;
                  }
                  , (error) => {
                    console.log(error);
                  });
  }

  close() {
    this.IsmodelShow=true;// set false while you need open your model popup
  }

  ngOnInit(): void {
    this.retrieveAllCustomers();
  }
}

