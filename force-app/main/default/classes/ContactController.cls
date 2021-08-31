public with sharing class ContactController {
    public ContactController() {

    }

    @AuraEnabled(cacheable=true)
    public static list<contact> getContacts(){
        /*try {
            
            return [Select id,firstname,lastname,email from contact order by firstname];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }*/
        throw new AuraHandledException('Forced error');
    }
}