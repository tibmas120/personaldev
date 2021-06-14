trigger address on Account (after insert,after update) {
set<id> acctid=new set<id>();
list<contact> updatedcont=new list<contact>();
for(account a:trigger.new)
acctid.add(a.id);
list<account> accountname=[select id,BillingStreet,BillingCity,BillingState,BillingCountry from account where id=:acctid];
list<contact> listofcontacts=[select id,MailingStreet,MailingCity,MailingState,MailingCountry from contact where accountid=:acctid];
for(account a1:accountname)
{
for(contact c1:listofcontacts)
{
c1.MailingStreet=a1.BillingStreet;
c1.MailingCity=a1.BillingCity;
c1.MailingState=a1.BillingState;
c1.MailingCountry=a1.BillingCountry;
updatedcont.add(c1);
}
}
update updatedcont;
}