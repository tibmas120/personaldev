@RestResource(urlMapping='/Opportunities/*')
Global with sharing class OpportunityManager {

    @HttpGet //Get the record through query
    global static Opportunity getOpportunibById() {
        RestRequest request = RestContext.request;
        // grab the oppld from the end of the URL
        String oppld = request.requestURI.substring(request.requestURI.lastIndexOf('/')+1);
        Opportunity result =[SELECT Name, StageName, LeadSource, Closedate, Probability FROM Opportunity WHERE id = :oppld];
        return result;

    }

    @HttpPost //Insert the record
    global static ID createOpportunity(String name, String stage,String closedate, String source) {
        Opportunity newOpportunity = new Opportunity(
        name=name,
        stageName=stage ,
        leadSource=source,
        closedate=Date.valueOf(closedate)) ; 
        insert newOpportunity;
        return newopportunity .id;
    }

    @HttpPut //Upsert the record
    global static ID upsertOpportunity(String name, String stage, String closedate, String source,String id){
        Opportunity thisOpportunity = new Opportunity(Id=id,name=name ,stageName=stage ,leadsource=source,closedate=Date.valueOf(closedate));
        // Match Opportunity by Id, if present.
        // Otherwise, create new Opportunity.
        upsert thisopportunity;
        // Return the Opportunity ID.
        return thisOpportunity.Id; 
    }

    @HttpPatch //Update the record
    global static ID updateOpportunityFields() {
        RestRequest request=RestContext.request;
        String Opportunityld = request.requestURI.substring(request.requestURI.lastIndexOf('/')+1);
        Opportunity thisopportunity =[SELECT id FROM opportunity WHERE id = :opportunityld];
        // Deserialize the JSON string into name-value pairs
        Map<String,Object> params =  (Map<String,Object>) JSON.DeserializeUntyped(request.requestbody.tostring());
        // Iterate through each parameter field and value
        for(String fieldName : params.keySet()) {
        // Set the field and value on the Opportunity sobject
        thisOpportunity.put(fieldName,params.get(fieldName));
        update thisopportunity;
        
        }
        return thisOpportunity.Id;
    }
        

}
