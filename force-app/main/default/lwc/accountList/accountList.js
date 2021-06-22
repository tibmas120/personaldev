import { LightningElement,api } from 'lwc';
import getAccounts from "@salesforce/apex/accountlwcController.getAccounts";
import fetchaccount from "@salesforce/apex/accountlwcController.fetchaccount";

export default class AccountList extends LightningElement {

    accountList;
    inputText;
    @api horizontalAlign = 'space';

    buttonclick(){

        getAccounts()
          .then(result => {
            this.accountList=result;
            console.log('Result', result);
          })
          .catch(error => {
            console.error('Error:', error);
        });

    }

    clearAccount(){
        this.accountList='';
        this.inputText='';
    }

    searchAccount(){

        this.inputText=this.template.querySelector('lightning-input').value;

        fetchaccount({ searchacc: this.inputText })
          .then(result => {
            this.accountList=result;
            console.log('Result', result);
          })
          .catch(error => {
            console.error('Error:', error);
        });
    }
}