public class FetchOpptyWin {
    
    @AuraEnabled
      public static List <Opportunity_Win_Plan_templates__c> getOpptyWin(id OppId) {
        return [SELECT Id,Customer_Reason_for_Taking_Action__c,Date_1__c,Evidence_1__c,Overview_of_the_Opportunity__c FROM Opportunity_Win_Plan_templates__c where Opportunity__c=:OppId];
      }

}