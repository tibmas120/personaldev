public class CustomOrgChart_Page_Extension{

// Variable to create a string and pass it to google charts.
public String ContactData{get;set;}
public string accountid;    
    public CustomOrgChart_Page_Extension(ApexPages.StandardController controller){
        accountid=controller.getId();
        ContactData = '';
        for(Contact con :[Select Name,Title,ReportsTo.Name,Role__c,Relationship_Strength__c from Contact where AccountId =: controller.getId() order by name]){
            if(con.Title==null){
                con.Title='';
            }
            if(con.Role__c==null){
                con.Role__c='';
            }
            if(con.Relationship_Strength__c==null){
                con.Relationship_Strength__c='';
            }
            ContactData = ContactData + '[{v:\'';
            ContactData += con.Name;
            ContactData += '\',';
            ContactData += ' f:\'<div class="panel-head">'+ con.Name +'</div><div class="p-title"><b>Title</b> '+ con.Title +'</div><div class="p-role"><b>Role</b> '+con.Role__c+'</div><div class="p-strength"><b>Relationship Strength</b> '+con.Relationship_Strength__c+'</div>\'}'; 
            ContactData += ',\'';
            ContactData += con.ReportsTo.Name != null ? con.ReportsTo.Name : '';       
            ContactData += '\',\'' + con.Title + '\'],';
        }
    }
    
    public pagereference BackAccount() {
        
        return(new pagereference('/'+accountid));
     }
    
}