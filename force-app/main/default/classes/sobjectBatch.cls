Global class sobjectBatch implements Database.Batchable <Sobject>{

    global final string query;
    global final string sobj;    
    global final string field;
    global final string value;
    
    global  sobjectBatch(string q,string s,string f,string v){
        query=q;
        sobj=s;
        field=f;
        value=v;
    }    
     
    global Database.querylocator start(Database.Batchablecontext Bc)
    {
         return(Database.getquerylocator(query));
    }  
    
    global void execute(Database.Batchablecontext Bc,list<sobject> Scope)   
    {
        for(sobject so:Scope){
            so.put(field,value);
        }
        update scope;    
    }
    global void finish(Database.Batchablecontext Bc)     
    {
    
    }
}