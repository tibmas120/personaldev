public with sharing class CustomPickListDemo {
Public String SelectedState{get;set;}
Public String SelectedCity{get;set;}
    public CustomPickListDemo(ApexPages.StandardController controller) {

    }

    
    public List<SelectOption> getCity() {
        List<SelectOption> CityOptions = new List<SelectOption>();
        CityOptions.add(new SelectOption('Panaji','PanajiLabel'));
        CityOptions.add(new SelectOption('Kolkata','Kolkata'));
        CityOptions.add(new SelectOption('Pune','Pune'));
        CityOptions.add(new SelectOption('Mumbai','Mumbai'));
        CityOptions.add(new SelectOption('Margao','Margao'));

        return CityOptions ;
    }
}