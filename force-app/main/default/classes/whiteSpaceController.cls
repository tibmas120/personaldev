// Jonathan Hersh - jhersh@salesforce.com - 8/24/2009

public with sharing class whiteSpaceController {
        public Account parentAcct                               { get; set; }
        public Product_Filter_List__c[] pfls    { get; set; }
        public tableRow[] trs                                   { get; set; }
        
        public string error                                             { get; set; }
        public integer inputValue1{get;set;}
        public integer inputValue2{get;set;}
        public integer Total{get;set;}
        
        public whiteSpaceController() {
                string acctID = ApexPages.currentpage().getparameters().get('id');
                
                if( acctID == null || acctID == '' )
                        acctID = [select id from Account limit 1].id;
                
                parentAcct = [select id, name, parentid
                        from Account
                        where id = :acctID];
                        
                if( parentAcct.parentid != null )
                        parentAcct = [select id, name, parentid
                                from Account
                                where id = :parentAcct.parentid];
                        
                // All products to filter
                pfls = [select id, product__c, product__r.name
                        from Product_Filter_List__c
                        order by product__r.name];
                        
                if( pfls.size() == 0 ) {
                        error = 'No data in the Product Filter List object. Please add some products first.';
                        return;
                }
                        
                ID[] prodIDs = new ID[] {};
                
                for( Product_Filter_List__c pfl : pfls )
                        prodIDs.add( pfl.product__c );
                        
                // All accounts in this family
                Account[] accts = [select id, name 
                        from Account
                        where parentid = :parentAcct.id or
                        id = :parentAcct.id];
                        
                ID[] acctIDs = new ID[] {};
                
                for( Account a : accts )
                        acctIDs.add( a.id );
                        
                // All assets on those accounts for the products we're interested in
                Asset[] assets = [select id, accountid, product2id
                        from Asset
                        where accountid IN :acctIDs
                        and product2id IN :prodIDs
                        order by account.name];
                        
                // Build the table data
                Map<ID, Set<ID>> tData = new Map<ID, Set<ID>> (); 
                Boolean[] rowData;
                trs = new tableRow[] {};
                
                for( Account a : accts ) {
                        tData.put( a.id, new Set<ID> {} );
                        rowData = new Boolean[] {};
                        
                        for( Asset aa : assets )
                                if( aa.accountid == a.id ) {
                                        Set<ID> tmp = tData.get( a.id );
                                        
                                        if( !tmp.contains( aa.product2id ) )
                                                tmp.add( aa.product2id );
                                        
                                        tData.put( a.id, tmp );
                                }
                                
                        for( Product_Filter_List__c pfl : pfls )
                                rowData.add( tData.get( a.id ).contains( pfl.product__c ) );
                                
                        trs.add( new tableRow( a, rowData ) );
                }
        }
        
        public class tableRow {
                public Account a                { get; set; }
                public Boolean[] prods  { get; set; }
                
                public tableRow( Account tmp, Boolean[] tmp2 ) {
                        a = tmp;
                        prods = tmp2;
                }
        }
        
        public static testmethod void runTest() {
                WhiteSpaceController wsc = new WhiteSpaceController();
        }
        
        Public Pagereference Sumtotal(){
            Total=0;
            Total+=inputValue1;
            return null;
        
        }
}