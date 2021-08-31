@isTest
public with sharing class TestRestrictContactByName {

    @isTest static void testCheckDates() {
            contact con= new contact(LastName='INVALIDNAME');
            try{
            insert con;
        }
        catch(Exception Ex){
            
        }
            //System.assertEquals('Normal', pri);
        }
}