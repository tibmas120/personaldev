trigger ClosedOpportunityTrigger on opportunity (after insert,after update) {

    list<task> taskInsertlist =new list<task>();
    if ( (trigger.isafter && trigger.isinsert) ||(trigger.isafter && trigger.isinsert)){

        for(opportunity opp:trigger.new){
            if(opp.stagename=='Closed Won'){
                task t = new task(Subject='Follow Up Test Task',WhatId =opp.id,Status = 'Open',Priority = 'Normal');
                taskInsertlist.add(t);
            }
        }

        if(taskInsertlist!=null && taskInsertlist.size()>0){
            database.insert(taskInsertlist,false);
        }

    }
}