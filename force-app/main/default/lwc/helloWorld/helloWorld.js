import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'World';
  ready=false;
  connectedCallback(){

    setTimeout(() =>{
        this.ready=true;
    },3000);
  }
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}