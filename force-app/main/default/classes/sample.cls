public class sample
{
    public List<CountryCodes__c> code {get;set;}
   
    public sample()
    {
        Map<String,CountryCodes__c> allCodes = CountryCodes__c.getAll();
        code = allCodes.values();
    }  
   
}