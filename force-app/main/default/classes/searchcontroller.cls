public with sharing class searchcontroller
{
    public contact con{get;set;}
    public list<Contact> conList{get;set;}
    public string searchstring {get;set;}  
    public Boolean Check {get;set;}
public searchcontroller(ApexPages.StandardController controller)
{
  this.con=(contact)controller.getrecord();
  Check=false;
  conList=new list<Contact>();
}


public void Search(){  
     Check=true;
     
     conList=[select id,name from Contact where Date_Of_Joining__c=:con.Date_Of_Joining__c];  
     
     if(conList.size()==0)
     {
         Check=false;
         ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.ERROR,'No Result Found');      
         ApexPages.addMessage(myMsg); 
     }   
    }  

}