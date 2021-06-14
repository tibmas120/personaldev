public with sharing class OptyWinExtension {
  
  public List<Opportunity_Win_Plan_templates__c> oppWin {get;set;}
  public Opportunity oppty{get;set;}
  public string customer {get;set;}
  public string opptyPOC {get;set;}
  public List<Opportunity_Qualification_Ques__c> Ques {get;set;}
  public List<Opportunity_Qualification__c> oQObj {get;set;} 
  public List<questionWrapper> questionList {get; set;}
  public id opptyId;
  
  public class questionWrapper{
  	public string question {get;set;}
  	public date dates {get;set;}
  	public string evidence {get;set;}
  	public string questionId;
  	/*public questionWrapper(string q,Date d,string e){
  		question=q;
  		dates=d;
  		evidence=e;
  	}*/
  }
  
  public OptyWinExtension(ApexPages.StandardController stdCtrl)
   {
    //stdCtrl.addFields(new List<String>{'Account.name,owner.name'});
    //oppty=(Opportunity) stdCtrl.getRecord();
    opptyId=ApexPages.currentPage().getParameters().get('id');
    oppty=[Select id,owner.name,Account.name,Overview_of_the_Opportunity__c,Customer_Reason_for_Taking_Action__c 
    																							from Opportunity 
    																							where id=:opptyId];
    customer=oppty.Account.name;
    opptyPOC=oppty.owner.name;
    /*oppWin=new List<Opportunity_Win_Plan_templates__c>([Select id,Opportunity_Qualification__r.Question__c,Date_1__c,Evidence_1__c
    											from Opportunity_Win_Plan_templates__c
    											Where Opportunity__c=:opptyId order By Opportunity_Qualification__r.Question__c ASC]);*/
    /*Map<String,Opportunity_Qualification_Ques__c> allQues = Opportunity_Qualification_Ques__c.getAll();
    Ques = allQues.values();
    Ques.sort();
    for(Opportunity_Qualification_Ques__c q :Ques){
    	system.debug('#####Questions '+q.Question__c);
    	tr = new questionWrapper();
        tr.question = q.Question__c;
        RowList.add(tr);
        RowList.add(new questionWrapper('sambit'));
        }*/
    questionList= new List<questionWrapper>();
    questionWrapper qW;    
    for(Opportunity_Qualification__c oQ:[Select id,Question__c from Opportunity_Qualification__c order by Name]){
    	qW=new questionWrapper();
    	qW.question=oQ.Question__c;
    	//qW.dates='';
    	qW.evidence='';
    	qW.questionId=oQ.id;
    	questionList.add(qW);
    }
   }
   
  public pagereference SaveOptyWin(){
  	 		
   	List<Opportunity_Win_Plan_templates__c> toUpsertList=new List<Opportunity_Win_Plan_templates__c>();
   	
   	for(questionWrapper oW:questionList){
   		toUpsertList.add(new Opportunity_Win_Plan_templates__c(Opportunity__c=opptyId,Opportunity_Qualification__c=oW.questionId,Date_1__c=oW.dates,Evidence_1__c=oW.evidence));
   	}
   	
   	upsert toUpsertList;  
   	return (new pagereference('/'+opptyId));		
   	
   }
   

}