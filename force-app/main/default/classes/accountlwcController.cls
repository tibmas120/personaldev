public with sharing class accountlwcController {
    public accountlwcController() {

    }

    @AuraEnabled(cacheable=true)
    public static list<account> getAccounts(){
        try {

            return [Select id,name,Industry,Rating,Website,AnnualRevenue from account limit 25];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @auraEnabled(cacheable=true)
    public static List<account> fetchaccount(string searchacc){

        String searchKey = string.isblank(searchacc) ? '%%' : searchacc+'%';
        return [Select id,name,Industry,Rating,Website,AnnualRevenue from account where Name like:searchKey];

    }
}