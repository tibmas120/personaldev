Public class myQueueable implements queueable{
    public void execute(QueueableContext Qc){
        A__c a=new A__c(Name='Created by Queueable Apex');
        insert a;
    }
}