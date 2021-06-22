import { LightningElement,api } from 'lwc';

export default class LdsDemo extends LightningElement {

    @api recordId;
    @api objectApiName;

    handleerror(){

        alert('error occured');
    }

    handlesuccess(){

        alert('success');
    }

    handlesubmit(){

        alert('submitted'); 
        console.log(this.recordId);
    }
}