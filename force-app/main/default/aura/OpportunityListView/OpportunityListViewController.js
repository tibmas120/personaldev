({
    doinit : function(component, event, helper) {

        helper.fetchopptyhelper(null,component);

    },

    searchoppty : function(component, event, helper) {

        var searchvalue = component.find("searchField").get("v.value");
        helper.fetchopptyhelper(searchvalue,component);

    } 
})