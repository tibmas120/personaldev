public with sharing class lwc2Controller {
    public lwc2Controller() {

    }

    @AuraEnabled(cacheable=true)
    public static list<contact> getcontactlist(){

        return [select id,name,email from contact limit 20];
    }

    @AuraEnabled(cacheable=true)
    public static list<account> getaccountlist(){

        return [select id,name from account limit 20];
    }
}