import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/FetchContact.getContactList';

export default class WireExample extends LightningElement {
    @wire(getContactList) contacts;
}