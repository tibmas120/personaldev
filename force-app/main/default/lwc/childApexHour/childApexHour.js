import { LightningElement,api } from 'lwc';

export default class ChildApexHour extends LightningElement {

    @api message;

    @api changemessage(name){
        this.message=name;
    }

    handleclick(){

        const event = new CustomEvent('btnclick',{
            detail:{
                key:'001hjtfvhh',
                value: 'ApexHours'
            },
            bubbles :true,
            composed :true
        });
        this.dispatchEvent(event);
    }
}