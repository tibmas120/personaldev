public with sharing class PDFController
{
 public case[] oList {get; set;}

    public PDFController() {
        String[] ids= ApexPages.currentPage().getParameters().get('id').split(',');
        List<case> li = new List<sObject>();
        for( String camp : ids){   
            case s = [select id,CaseNumber,Type,Reason,status,Priority,Subject,Description,origin,CreatedDate,ClosedDate,Owner.name,Contact.name,Account.name from case where id=:camp];   
            li.add(s);
            oList = li;
        }
    }
}