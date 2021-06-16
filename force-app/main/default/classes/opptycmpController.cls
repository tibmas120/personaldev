
public with sharing class opptycmpController {
    @auraEnabled
    public static List<opportunity> fetchoppty(string searchoppty){

        String searchKey = string.isblank(searchoppty) ? '%%' : searchoppty+'%';
        return [Select Name,Account.name,closedate,Amount from opportunity where Name like:searchKey];

    }
}
