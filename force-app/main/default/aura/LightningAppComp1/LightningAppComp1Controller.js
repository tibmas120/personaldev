({
    handleApplicationEvent : function(component, event, helper) {

        var id= component.get("v.id");
        alert("App Event in source comp "+id);

    },

    fireApplicationEvent : function(component, event, helper) {

        var appEvent = $A.get("e.c:LightningApplicationEvent");
        appEvent.setParams({
            message : "Hello"
        });
        appEvent.fire();
    }
})