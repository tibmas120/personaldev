public with sharing class AccountControllerRefresh {
    public AccountControllerRefresh() {

    }

    @AuraEnabled(cacheable=true)
    public static List<account>  getAccountList(){
        return [SELECT Id, Name,Phone,Industry FROM Account order by createddate desc LIMIT 5];
    }
}