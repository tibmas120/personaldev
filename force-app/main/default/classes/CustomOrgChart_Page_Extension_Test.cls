@istest(seeAllData=false)
public with sharing class CustomOrgChart_Page_Extension_Test {
	
	@testSetup
	static void dataSetup(){
		
		Profile p = [SELECT Id FROM Profile WHERE Name='System Administrator']; 
      	User u = new User(Alias = 'standt', Email='standarduser@testorg.com', 
      	EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
      	LocaleSidKey='en_US', ProfileId = p.Id, 
      	TimeZoneSidKey='America/Los_Angeles', UserName='standarduser1@IR.com');
      	insert u;
		account testAcc=TestDataFactory.createAccount('TestAcc1','AIRD Accounts');
		testAcc.ownerid=u.id;
		insert testAcc;
		contact testCon=TestDataFactory.createContact('Test','Test',testAcc.id,'Customer Contact','9029316494');
		testCon.ownerid=u.id;
		insert testCon;		
	}
	
	public static testMethod void CustomOrgChart_Page_Extension_test(){
		
		Test.starttest();
		User u=[Select id from user where Alias = 'standt'];
		System.runAs(u){
			account testAcc=[Select id from account limit 1];
			ApexPages.StandardController controller=new ApexPages.StandardController(testAcc);
			CustomOrgChart_Page_Extension cOrg=new CustomOrgChart_Page_Extension(controller);
			system.assertnotequals(cOrg.ContactData,'');
		}
		Test.StopTest();
	}
    
}