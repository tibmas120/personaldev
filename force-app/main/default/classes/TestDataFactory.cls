@isTest
public with sharing class TestDataFactory {
	
	public static account createAccount(string accname,string recType){
		return (new account(name=accname));
	}	
	public static contact createContact(string confName,string conlName,id accid,string recType,string phoneNo){
		return(new contact(firstname=confName,lastname=conlName,accountid=accid,phone=phoneNo));
	}
}