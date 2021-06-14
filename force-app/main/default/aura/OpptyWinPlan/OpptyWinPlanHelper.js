({
	// Fetch the accounts from the Apex controller
      getOpptyWinList: function(component) {
        var recordId = component.get('v.recordId');
        var action = component.get('c.getOpptyWin'); 
        action.setParams({ "OppId" : recordId });
        // Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
         component.set('v.OpptyWin', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
      },
})