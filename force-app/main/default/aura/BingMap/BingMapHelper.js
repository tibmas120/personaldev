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
	   const lC = data[0]; 
        
       var map = new Microsoft.Maps.Map(document.getElementById("#mapDiv"),{credentials:"AslhgiiyIM-0vSCrTMx1Bk7foi7mWsZ1pWNf19f-HoLB3P_l4-eCFArTV8nd1MuW"});
       var loc = new Microsoft.Maps.Location(
                lC.Location__Latitude__s,
                lC.Location__Longitude__s);


       var pin = new Microsoft.Maps.Pushpin(loc);
       map.entities.push(pin);
       map.setView({ center: loc, zoom: 15 });
	});
	$A.enqueueAction(action);
   }
})