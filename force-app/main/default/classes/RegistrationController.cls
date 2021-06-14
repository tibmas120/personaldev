public with sharing class RegistrationController
{
    public Account acc{get;set;}
     
      public RegistrationController(ApexPages.StandardController stdController){
      //acc=new Account();
      this.acc = (Account)stdController.getRecord();
      system.debug('constructor called'); 
     }
     
  

public pagereference submit(){ 
    
      system.debug('aaaaaaaaaaaaaaaaa'+acc.phone);
      if(acc.phone == '' || acc.phone == null)  
      {
          system.debug('Entering if');
          ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.ERROR,'Enter Phone Number');
          ApexPages.addMessage(myMsg); 
          return null;
      }
      insert acc;
      pagereference pg=new pagereference('/'+acc.id);
      return pg ;
      
      }
}