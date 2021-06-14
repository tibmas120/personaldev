public with sharing class Searc_sosl2 {
	
	List<List<sObject>> searchList = [FIND 'Wingo OR SFDC' IN ALL FIELDS 
                   RETURNING Account(Name),Contact(FirstName,LastName,Department)];
	Account[] searchAccounts = (Account[])searchList[0];
	Contact[] searchContacts = (Contact[])searchList[1];
}