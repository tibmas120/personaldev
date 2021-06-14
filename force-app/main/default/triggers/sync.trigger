trigger sync on Account(before insert,before update) 
{
list<id> listofaccid=new list<id>();
for(account acc:trigger.new)
listofaccid.add(acc.id);
list<opportunity>opplist=[select color__c,domain__c,Development_stage__c,Occupation__c from opportunity where id in:listofaccid];
for(opportunity opty:opplist)
{
string contv=opty.account.Reported_to_country__c;
if(contv=='india')
{
opty.domain__c='Asia';
opty.color__c='Blue';
opty.Development_stage__c='developing';
opty.Occupation__c='cultivation';
}
else if(contv=='japan')
{
opty.domain__c='Asia';
opty.color__c='Blue';
opty.Development_stage__c='developing';
opty.Occupation__c='Manufacturing';
}
else if(contv=='US')
{
opty.domain__c='Europe';
opty.color__c='Brown';
opty.Development_stage__c='developed';
opty.Occupation__c='Business';
}
update opplist;
}
}