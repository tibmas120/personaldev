({
	doInit : function(component, event, helper) {
        var recordId = component.get('v.recordId'); 
        helper.getOpptyWinList(component);
    },
    
    ShowNew : function(component, event, helper) {
        var modalBody;
        $A.createComponent("c:ESA_CreateOWP",
                           {recordId: component.get('v.recordId')},
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   component.find('overlayLib').showCustomModal({
                                       header: "",
                                       body: modalBody,
                                       showCloseButton: true,
                                       cssClass:"slds-modal_large",
                                       closeCallback: function() {
                                       console.log('You closed the alert!');
                                       }
                                   })
                               }
                           }); 
            
            
    },
    
    Refresh : function(component, event, helper) {
        var recordId = component.get('v.recordId');
        helper.getOpptyWinList(component);        
    }
})