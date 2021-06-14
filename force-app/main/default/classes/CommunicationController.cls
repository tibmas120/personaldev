public class CommunicationController {

    public boolean displayPopup {get; set;}
    public String selectedCase{get;set;}
    public String selectedClient{get;set;}
    public CommunicationController(Apexpages.standardcontroller std){
        
            displayPopup=false;
            system.debug('displayPopup ########## '+displayPopup);
    
    }
    
    
    public pagereference closePopup() {        
        displayPopup = false;   
        return null; 
    }     
    public pagereference showPopup() {        
        displayPopup = true;    
        system.debug('displayPopup ########## '+displayPopup);
        return null;
    }
        
}