public with sharing class Search_sosl {
	
	public string keyword{get;set;}
	public list<Account> searchResult{get;set;}
	
	public pagereference displayResults(){
		
		searchResult=new list<Account>();
		searchResult=[FIND :keyword IN All fields returning Account(Name,Description)][0];
		return null;
	}
    
}