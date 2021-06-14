public class savecontroller {
private final Account acct;
    public savecontroller(ApexPages.StandardController controller) {
        this.acct = (Account)controller.getRecord();
    }
    public void autosave()
    {
        upsert acct;
    }    
}