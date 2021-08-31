({
    handleApplicationEvent : function(component, event, helper) {
        var id= component.get("v.id");
        alert("Application Event in Container component "+id);
        component.set("v.message",event.getParam("message"));
        //alert("Application Event in Container component "+id);
    }
})