({
	doInit : function(component, event, helper) {
        var recordId = component.get('v.recordId'); 
    }, 
            
	savenExit : function(component, event, helper) {
		
        component.find('edithomeform').submit();	
   
	},    
    
    handleClose : function(component, event, helper) {
        //Closing the Modal Window
        var refreshGAList = $A.get("e.c:ESA_RefreshOWP");
        refreshGAList.fire();
        component.find("overlayLib").notifyClose();
    },
    
    performPostCreationTasks:function(cmp, event, helper){
               
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({"title": "Success!",
                              "message": "New Gas Appliances is successfully added.",
                              "type": "success"
                             });
        toastEvent.fire();
        
       var refreshGAList = $A.get("e.c:ESA_RefreshOWP");
       refreshGAList.fire();
       cmp.find("overlayLib").notifyClose();        
    },
    
    
            
})