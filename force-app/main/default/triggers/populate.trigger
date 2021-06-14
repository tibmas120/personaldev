trigger populate on Contact (before insert,before update) {

for(Contact c:trigger.new)
{
if(c.LeadSource=='Web')
{
//c.Level__c='Secondary';
}

if(c.LeadSource=='Phone Inquiry')
{
//c.Level__c='Primary';
}
}
}