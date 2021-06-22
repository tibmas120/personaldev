import { LightningElement,api,wire } from 'lwc';
import getcontactlist from "@salesforce/apex/lwc2Controller.getcontactlist";
import getaccountlist from "@salesforce/apex/lwc2Controller.getaccountlist";

export default class My2ndLWC extends LightningElement {

    birthdate ="Happy Bday";
    inputText="";
    @api message="This is a simple message"; 
    result;
    error;

    @wire(getcontactlist)
    wiredData({ error, data }) {
      if (data) {
          this.result=data;
        console.log('Data', data);
      } else if (error) {
          this.error=error;
        console.error('Error:', error);
      }
    }

    handleclick(event){
        //this.inputText= event.target.value;
        this.inputText=this.template.querySelector('lightning-input').value;
        //console.log(event.target);
        //const inputBox = this.template.querySelector("lightning-input").value;
        console.log(this.inputText);
        //console.log(inputBox);
    }

    buttonclick(){

        alert('button is clicked');
        getaccountlist()
          .then(result => {
            this.result=result;
            console.log('Result', result);
          })
          .catch(error => {
            console.error('Error:', error);
        });
    }
}