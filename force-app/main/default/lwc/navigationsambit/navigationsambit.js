import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Navigationsambit extends NavigationMixin(LightningElement) {

    @api recordId;

    navigatetoobjectpage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                actionName: "home",
                objectApiName: "Account"
            }
        });

    }

    createNewRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                actionName: "new",
                objectApiName: "Account"
            }
        });

    }

    navigatetorecordpage(){

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: "view",
                recordId: this.recordId,
                objectApiName: "Account"
            }
        });
    }
}