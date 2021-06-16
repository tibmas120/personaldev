({
    
    fetchopptyhelper : function(searchvalue,component) {
        
        component.set('v.columnsToDisply',[
            {label: 'Opportunity Name',fieldName: 'Name',type: 'text'},
            {label:'Account Name',fieldName:'Account.name',type:'text'},
            {label:'Close Date',fieldName:'closedate',type:'date'},
            {label:'Amount',fieldName:'Amount',type:'currency'}
        ]);
        
        var action = component.get("c.fetchoppty");
        action.setParams({
            "searchoppty" : searchvalue
        });

        action.setCallback(this, function(response){
            var state= response.getState();
            if(state="SUCCESS"){
                component.set("v.lstopportunity",response.getReturnValue());
            }
            else{
                alert("error occured");
            }
        });

        $A.enqueueAction(action);

    }
})
