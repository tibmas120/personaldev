public class AccountHierarchyChartController{

// Variable to create a string and pass it to google charts.
public String ContactData{get;set;}
    
    public AccountHierarchyChartController(ApexPages.StandardController controller){
        ContactData = '';
        for(Contact con :[Select Name,Title,ReportsTo.Name from Contact where AccountId =: controller.getId()]){
            ContactData = ContactData + '[{v:\'';
            ContactData += con.Name;
            ContactData += '\',';
            ContactData += ' f:\''+  con.Name +'<div style="color:green; font-style:italic">'+ con.Title +'</div>\'}';
            ContactData += ',\'';
            ContactData += con.ReportsTo.Name != null ? con.ReportsTo.Name : '';       
            ContactData += '\',\'' + con.Title + '\'],';
        }
    }
    
    public pagereference generatePDF(){
    	
    	return(new pagereference('/apex/pdfpage'));
    }
}