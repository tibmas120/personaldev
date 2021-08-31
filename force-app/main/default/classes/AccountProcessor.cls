global with sharing class AccountProcessor{
  //@future
  public static void countContacts(List<Id> recordIds) {
    List<Account> accounts = [Select Id, Name,(Select id from contacts) from Account Where Id IN :recordIds];
    // process account records to do awesome stuff
    for(Account acc:accounts){
        acc.Number_of_Contacts__c=acc.contacts.size();
    }
    update accounts ;
  }
}