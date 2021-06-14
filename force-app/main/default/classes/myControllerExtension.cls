public class myControllerExtension {

    private final Account acct;
    static integer count=0;
    // The extension constructor initializes the private member
    // variable acct by using the getRecord method from the standard
    // controller.
    public myControllerExtension(ApexPages.StandardController stdController) {
        this.acct = (Account)stdController.getRecord();
    }

    public pagereference getRecordType() {
        count++;

        if(count==1)
            return new PageReference('/setup/ui/recordtypeselect.jsp?ent=Account&retURL=%2F001%2Fo&save_new_url=%2F001%2Fe%3FretURL%3D%252F001%252Fo');   
        else
            return null;
    }
}