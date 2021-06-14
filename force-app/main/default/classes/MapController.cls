public with sharing class MapController {
    
    @AuraEnabled
   public static List<Map__c> getLocation(id locId)
   {
      List<Map__c> lct = [Select Id,
                                   Name, 
                                   Location__Latitude__s,
                                   Location__Longitude__s
                                 FROM Map__c where id=:locId];
      return lct;
   }

}