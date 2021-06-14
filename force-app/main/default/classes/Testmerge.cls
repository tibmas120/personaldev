public class Testmerge{
    public static void MergeTest(){
        account a1=[select id from account where name='T1'];
        account a2=[select id from account where name='T2'];
        database.merge(a1,a2);
        //account thisAcc = [SELECT Id FROM Account WHERE masterRecordId != null] ;
        //system.debug('Master Record id found '+thisAcc.masterRecordId);
    }
    
}