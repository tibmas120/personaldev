trigger EventCheck on Contact (after update) {

    /*for(contact c:trigger.new)
    {
        if(c.LeadSource=='Other')
            c.LeadSource='Web';
    }
    */
    
    list<contact> contactlist=new list<contact>();
    for(contact c:trigger.new)
    {
        if(c.LeadSource=='Other')
            contactlist.add(new contact(id=c.id,LeadSource='Web'));
   
    }
    update contactlist;
}