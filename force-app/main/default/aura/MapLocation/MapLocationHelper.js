({
   initHelper : function(component, event, helper) {
        helper.defineMarkers(component, event, helper);
   },
   defineMarkers : function(component, event, helper) {
	let action = component.get("c.getLocation");
    action.setParams({
            "locId": component.get("v.recordId")
        });
	action.setCallback(this, function(response) {
	   const data = response.getReturnValue();
	   const dataSize = data.length;
	   let markers = [];
        
           //I will only show my single record
	   const lC = data[0]; 
	   markers.push({
                'location': {
                    'Latitude':lC.Location__Latitude__s,
                    'Longitude':lC.Location__Longitude__s
                }
	   });
	   component.set('v.markersTitle', 
                         'GoogleMap');
	   component.set('v.mapMarkers', markers);
	});
	$A.enqueueAction(action);
   }
})