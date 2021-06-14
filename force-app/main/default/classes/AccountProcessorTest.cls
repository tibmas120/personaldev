@istest(seeAllData=false)
public with sharing class AccountProcessorTest{
    @testSetup
    static void dataSetup(){
        Id AccRecordTypeIdProd = Schema.SObjectType.Account.getRecordTypeInfosByName().get('check').getRecordTypeId();
        Id ConRecordTypeIdProd = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Associate').getRecordTypeId();
        
        Account acc=new Account (Name='TestSambit',recordtypeid=AccRecordTypeIdProd,SLAExpirationDate__c=Date.Today());
        Insert acc;
        Contact con= new Contact (LastName='TestSambit',recordtypeid=ConRecordTypeIdProd,Date_Of_Joining__c=Date.Today(),WON_SWON__c=12345);
        Insert con;
    }
    
    public static testMethod void AccountProcessorTest_Test1(){
    
        Test.starttest();
        account acc=[Select id from account limit 1];
        AccountProcessor.countContacts(new list<id>{acc.id});
        Test.Stoptest();
    }

}