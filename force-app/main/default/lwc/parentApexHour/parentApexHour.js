import { LightningElement } from 'lwc';

export default class ParentApexHour extends LightningElement {
    message="I am from parent component";

    handleclick(){
        //this.message="U clicked the button";
        this.template.querySelector('c-child-apex-hour').changemessage("U clicked the button and called child component method");
    }

    handleevent(event){

        let key=event.detail.key;
        let value= event.detail.value;
        this.message= key+' '+value;
        console.log(this.message);
    }
}