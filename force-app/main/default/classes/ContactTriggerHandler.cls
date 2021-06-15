public with sharing class ContactTriggerHandler {

    public static void afterinserttriggerhandler(Map<id,account> newMap){

        map<string,list<contact>> accConMap= new map<string,list<contact>>();
        list<id> todeleteset = new list<id>();
        list<contact> contInsert = new list<contact>();

        for(account acc:newMap.values()){

            if(!accConMap.containskey(acc.name)){

                accConMap.put(acc.name,new list<contact>{new contact(accountid=acc.id,lastname=acc.name+'1')});

            }
            else{
                todeleteset.add(acc.id);
                accConMap.get(acc.name).add(new contact(accountid=accConMap.get(acc.name)[0].accountid,lastname=acc.name+string.valueof(accConMap.get(acc.name).size()+1)));
            }

        }

        system.debug('accConMap is '+accConMap);
        for(string accname:accConMap.keyset()){
            //contInsert.addall(accConMap.get(accname));
            if(accConMap.containskey(accname)){
                for(contact c:accConMap.get(accname)){
                    system.debug('contact instance '+c);
                    contInsert.add(c);
                }
            }
        }

        system.System.debug('contInsert is '+contInsert);

        if(contInsert!=null && contInsert.size()>0)
            insert contInsert;
        if(todeleteset!=null && todeleteset.size()>0)
            delete [select id from account where id IN:todeleteset];

    }
}
