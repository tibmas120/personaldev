public class ContactSearch{

    public static List<contact> searchForContacts(String LastName,String mailingPostalCode){
    
        System.debug('Hi from VS');
         List<Contact> con = [Select id,Lastname,mailingPostalCode from Contact where LastName=:LastName and mailingPostalCode=:mailingPostalCode];
         
         return con;   
          
    }
}