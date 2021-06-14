trigger AccountaddressCopy on Contact (before insert,before update) {

Map<id,contact> ContactMap=new Map<id,contact>();

for(contact c:trigger.new){
    ContactMap.put(c.accountid,c);
}

list<account> accountList=new list<account>([Select id,BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry from account where id IN:ContactMap.keyset()]);

for(account aid:accountList){
    if(ContactMap.containskey(aid.id)){
        ContactMap.get(aid.id).MailingStreet=aid.BillingStreet;
        ContactMap.get(aid.id).MailingCity=aid.BillingCity;
        ContactMap.get(aid.id).MailingState=aid.BillingState;
        ContactMap.get(aid.id).MailingPostalCode=aid.BillingPostalCode;
        ContactMap.get(aid.id).MailingCountry=aid.BillingCountry;
    }
}

}