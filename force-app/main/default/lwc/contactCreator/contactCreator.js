import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_NAME from '@salesforce/schema/Contact.Name';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';

export default class ContactCreator extends LightningElement {

    objectApiName=CONTACT_OBJECT;
    fields=[CONTACT_NAME,EMAIL];

    handleSuccess(event){

        const evt= new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,
            variant: "success"         
            }
        );
        this.dispatchEvent(evt);

    }
}