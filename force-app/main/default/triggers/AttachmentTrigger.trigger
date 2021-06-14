trigger AttachmentTrigger on Attachment (before insert,before update) {
    
    set<id> caseID=new set<id>();
    List<Case> updateCase= new List<Case>();
    for (Attachment att : Trigger.new) {
        if (att.ParentId.getSObjectType() == Case.SObjectType) {
           caseID.add(att.ParentId);
        }
    }
    for(case c:[Select id,Last_Activity_Date__c from case where id IN:caseID]){
        c.Last_Activity_Date__c =date.today();
        updateCase.add(c);
    }
    update updateCase;

}