public with sharing class ContollerClass {
  public String selectdUser { get; set; }

  public List<USer> getUsers() {

  return [Select id, name from User];       
  }
  
  public string result{get;set;}
  String s = 'blue';
 
    public String getString() {
        return s;
    }
            
    public void setString(String s) {
        this.s = s;
    }
    
    public List<SelectOption> getRoles()
        {
          List<SelectOption> options = new List<SelectOption>();
          options.add(new SelectOption('', '--None--'));
           Schema.DescribeFieldResult fieldResult =
            account.Account_Type__c.getDescribe();
           List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();

           for( Schema.PicklistEntry f : ple)
           {
              options.add(new SelectOption(f.getLabel(), f.getValue()));
           }
           return options;
        }
}