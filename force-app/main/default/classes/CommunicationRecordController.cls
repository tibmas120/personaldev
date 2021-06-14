public without sharing class CommunicationRecordController {
    
    /*public String selectedOrganization{get;set;}
    public String selectedOrganizationName{get;set;}
    public String selectedCase{get;set;}
    public String selectedCaseNumber{get;set;}
    public String selectedClient{get;set;}
    public String selectedClientName{get;set;}
    public String selectedOrg{get;set;}
    public boolean displayPopup {get; set;}
    public list<contact> allClients{get;set;}
    public list<account> allOrg{get;set;}
    public list<case> filteredCase{get;set;}
    public string searchString{get;set;}
    public id selectedContactId{get;set;}
    public id selectedCaseId{get;set;}
    public id selectedAccountId{get;set;}
    public case insertedCase{get;set;}
    public boolean clientRecordType{get;set;}
    public boolean orgRecordType{get;set;}
    public boolean nPRecordType{get;set;}
    public boolean newCase{get;set;}
    public boolean dntShow{get;set;}
    public boolean showPagination{get;set;}
    public string selectedOrgCnt{get;set;}
    public string objName{get;set;}
    public string recordType{get;set;}
    public Communication_Record__c comm{get;set;}
    public boolean neworEditPage{get;set;}
    public string checkButton{get;set;} 
    public boolean accountLookup{get;set;}   
    public boolean contactLookup{get;set;}
    public boolean caseLookup{get;set;}
    public integer totalRecs = 0;     
    public integer index = 0;
    public integer blockSize = 10; 
    public list<contact> filteredClientschk;
    public string oldSelectedOrg;
    public string oldSelectedClient;
    public string oldSelectedCase;   
    public String soql,soqlWhere; 
    public static final string oasysApp=VariableUtility.OASYSAPP;
    public static final String COMMUNICATIONCONTROLLER='CommunicationController';
    public static final String GETRECORDTYPE='getRecordType';
    public static final String ORGCONTACTFINAL='orgContact';
    public static final String CLOSEPOPUP='closePopup';
    public static final String SHOWPOPUP='showPopup';
    public static final String SEARCHRECORD='searchRecord';
    public static final String GETID='getId';
    public static final String SAVETASK='saveTask';
    public static final String GETNEWCASEFIELDS='getNewCaseFields';
    public static final String GETNEWCASEADDITIONALFIELDS='getNewCaseAdditionalFields';
    public static final String NEWCASECLICKED='newCaseClicked';
    public static final String SAVECASE='saveCase';
    public static final String BEGINNING='beginning';
    public static final String PREVIOUS='previous';
    public static final String NEXT='next';
    public static final String ENDFINAL='end';
    public static final String GETPREV='getPrev';
    public static final String GETNXT='getNxt';
    public static final String ACCOUNTSEARCH='accountSearch';
    public static final String CONTACTSEARCH='contactSearch';
    public static final String CASESEARCH='caseSearch';
    

    public String selectorigin {get;set;}
    public static final String DEFAULTCASEORIGIN='OMERS Admin';
    
    public String selectstatus {get;set;}
    public static final String DEFAULTCASESTATUS='Available';    

    

    public CommunicationRecordController(Apexpages.standardcontroller std){
        try{
            clientRecordType=false;
            orgRecordType=false;
            nPRecordType=false;
            displayPopup=false;
            newCase=false;
            dntShow=true;
            accountLookup=false;
            contactLookup=false;
            caseLookup=false;
            showPagination=false;
            allOrg=new list<account>();
            allClients=new list<contact>();
            filteredCase=new list<case>();
            
            filteredClientschk=new list<contact>(); 
            if(!test.isRunningTest())
                std.addFields(new List<String> {'id','Organization_Name__c','Organization_Name__r.name','Client_Name__c','Client_Name__r.name','recordtypeid','recordtype.name','Case__c','Case__r.CaseNumber','Organization_Contact__c','Topic__c','Source__c','Sub_Topic__c','Comments__c','Complaint__c','Name__c','Email__c','Phone_Number__c','Type__c'});
            comm = (Communication_Record__c)std.getRecord();
            
            if(comm.id!=null){
                recordType=comm.recordtype.name;
                neworEditPage=true;
                if(comm.recordtypeid==Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Organization).getRecordTypeId()){
                    orgRecordType=true; 
                }
                else if(comm.recordtypeid==Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Client).getRecordTypeId()){
                    clientRecordType=true;  
                }
                else{
                    nPRecordType=true;  
                }
                if(comm.Organization_Name__c!=null){
                    selectedOrganization=comm.Organization_Name__r.name;
                    selectedAccountId=comm.Organization_Name__c;
                    oldSelectedOrg=selectedOrganization;
                }
                if(comm.Client_Name__c!=null){
                    selectedClient=comm.Client_Name__r.name;
                    selectedContactId=comm.Client_Name__c;
                    oldSelectedClient=selectedClient;
                }
                if(comm.Case__c!=null){
                    selectedCase=comm.Case__r.CaseNumber;
                    selectedCaseId=comm.Case__c;
                    oldSelectedCase=selectedCase;
                }
                if(!string.isblank(comm.Organization_Contact__c)){
                    selectedOrgCnt=comm.Organization_Contact__c;
                }
            }

            else{
                neworEditPage=false;
                
                

                if ((comm.recordtypeid!=null && Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Organization).getRecordTypeId()!=null) && (comm.recordtypeid==Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Organization).getRecordTypeId())){
                    orgRecordType=true;
                    recordType=label.Organization;
                }
                else if ((comm.recordtypeid!=null && Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Client).getRecordTypeId()!=null) && (comm.recordtypeid==Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Client).getRecordTypeId())){
                    clientRecordType=true;
                    recordType=label.Client;
                }
                else if ((comm.recordtypeid!=null && 
                        Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Non_Participant).getRecordTypeId()!=null) && 
                        (comm.recordtypeid==Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Non_Participant).getRecordTypeId())){
                    nPRecordType=true;
                    recordType=label.Non_Participant;
                }
                else if(comm.Organization_Name__c!=null){
                    comm.recordtypeid=Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Organization).getRecordTypeId();
                    orgRecordType=true;
                    selectedOrganization=[Select id,name from account where id=:comm.Organization_Name__c limit 1].name;
                    selectedAccountId=comm.Organization_Name__c;
                    oldSelectedOrg=selectedOrganization;
                    recordType=label.Organization;
                }
                else if(comm.Client_Name__c !=null){
                    comm.recordtypeid=Schema.SObjectType.Communication_Record__c.getRecordTypeInfosByName().get(label.Client).getRecordTypeId();
                    clientRecordType=true;
                    selectedClient=[Select id,name from contact where id=:comm.Client_Name__c limit 1].name;
                    selectedContactId=comm.Client_Name__c;
                    oldSelectedClient=selectedClient;
                    recordType=label.Client;
                }
                else {
                    nPRecordType=true;
                    recordType=label.Non_Participant;
                }
            }
        }
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
            }
        
    }

    public pagereference getRecordType() {
        try{
            map<string,string> stringUrl=ApexPages.currentPage().getParameters();

            if(comm.Organization_Name__c==null && comm.Client_Name__c==null && comm.id==null){

                Schema.DescribeSObjectResult r = Communication_Record__c.sObjectType.getDescribe();
                String keyPrefix = r.getKeyPrefix();
                
                if(!(string.valueof(stringUrl.keyset()).contains(label.RecordType))){
                  String redirectURL = label.CR_Record_Type_Selection +Communication_Object__c.getInstance('Communication Record Object Id').Id__c +label.CR_Record_Type_Selection_2+
                         keyPrefix+label.CR_Record_Type_Selection_3+keyPrefix+label.CR_Record_Type_Selection_4+keyPrefix+label.CR_Record_Type_Selection_5;
                    return new PageReference(redirectURL);   
                }
                else{
                        return null;
                    }
                }
            else{
                    return null;
                }
            }
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,GETRECORDTYPE,null,LoggingLevel.ERROR);
                return null;
            }
        }
        
     public List<SelectOption> orgContact
     {
        get
        {
            if(orgRecordType){
                list<Contact> orgTemp = [Select id,Name from contact where accountid=:comm.Organization_Name__c and recordtypeid=:Schema.SObjectType.contact.getRecordTypeInfosByName().get(label.Organization_Contact).getRecordTypeId() and Status__c=: label.Active limit 50000];
                orgContact = new List<SelectOption>();
                orgContact.add(new SelectOption(VariableUtility.BLANK_TEXT,VariableUtility.NONE));
                SelectOption selectopt=null;
                for(Contact cnt : orgTemp)
                {
                   selectopt=new SelectOption(cnt.Name, cnt.Name);
                    orgContact.add(selectopt);
                }
            return orgContact;
        }
            else{
                    return null;
            }
        }
        set;
    }
    
    

     public List<SelectOption> CaseOrgn 
      {
          get
          {
      List<SelectOption> options = new List<SelectOption>();
          Schema.DescribeFieldResult fieldResult = Case.Origin.getDescribe();
          List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
      SelectOption selectopt1=null;
          for( Schema.PicklistEntry f : ple){
            selectopt1=new SelectOption(f.getLabel(), f.getValue());
              options.add(selectopt1);
          }
          return options;
       
          }
          set;
      }
    
    
       public List<SelectOption> CaseStatus 
        {
            get
            {
        List<SelectOption> options = new List<SelectOption>();
            Schema.DescribeFieldResult fieldResult = Case.Case_Status__c.getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        SelectOption selectopt2=null;
            for( Schema.PicklistEntry f : ple){
              selectopt2=new SelectOption(f.getLabel(), f.getValue());
                options.add(selectopt2);
            }
            return options;
         
            }
            set;
      }

    
    

    public pagereference closePopup() {     
        try{   
                displayPopup = false;   
                totalRecs = 0;     
                index = 0;
                blockSize = 10;
                showPagination=false;
                newCase=false;
                dntShow=true;
                return null; 
            }
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,CLOSEPOPUP,null,LoggingLevel.ERROR);
                return null;
            }
    }     

    public pagereference showPopup() {
        try{
                if(objName==label.Account){
                    accountLookup=true;
                    searchString=selectedOrganization;
                }
                else if(objName==label.Contact){
                    contactLookup=true;
                    if((orgRecordType && string.isBlank(selectedOrganization))){
                        displayPopup = false; 
                        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,Label.Client_Lookup_Error_1));
                        return null;
                    }  
                    else{
                        searchString=selectedClient;
                    }
                }
                else if(objName==label.Case){
                    caseLookup=true;
                    if((orgRecordType && string.isBlank(selectedClient)) && string.isBlank(selectedOrganization)){
                    displayPopup = false;   
                    ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,Label.Case_Lookup_Error_1));
                    return null;
                    }  
                    else if((clientRecordType && string.isBlank(selectedClient))){
                    displayPopup = false; 
                    ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,Label.Case_Lookup_Error_2));
                    return null;
                    }
                    else if((orgRecordType && string.isBlank(selectedOrganization))){
                    displayPopup = false; 
                    ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,Label.Case_Lookup_Error_3));
                    return null;
                    }  
                    else{
                        searchString=selectedCase;
                    }
                }
                    displayPopup = true;    
                    searchRecord();
                    return null;
        }
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,SHOWPOPUP,null,LoggingLevel.ERROR);
                return null;
        }
    }

    public pagereference searchRecord() {
        try{
                newCase=false;
                dntShow=true;
                soql=soqlWhere=VariableUtility.BLANK_TEXT;
                if(objName==label.Account){
                    accountSearch();
                }
                else if(objName==label.Contact){
                    contactSearch();
                } 
                else if(objName==label.Case){   
                    caseSearch();
                }
                soql=soqlWhere=VariableUtility.BLANK_TEXT;
                return null;
            }
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,SEARCHRECORD,null,LoggingLevel.ERROR);
                return null;
        }
    }

    public pagereference accountSearch(){
        String queryName=VariableUtility.BLANK_TEXT;
        try{    
                soql='Select ';
                for(Schema.FieldSetMember f : SObjectType.Account.FieldSets.AccountFieldToDisplayFS.getFields()) {
                    soql += f.getFieldPath() + ',';
                }
                soql=soql.removeEnd(',');
                soql += ' FROM Account';
                soqlWhere=soql+' Where ';
                if(string.isblank(searchString)){
                    soql+=' ORDER BY LastModifiedDate DESC LIMIT 10';
                    allOrg=database.query(soql); 
                }
                else{
                    if(searchString.contains(VariableUtility.ASTERIK_MARK)){
                        searchString=searchString.removeEnd(VariableUtility.ASTERIK_MARK);
                }
                allOrg.clear();
                showPagination=true;
                queryName = '%' + searchString + '%';
                for(Schema.FieldSetMember f : SObjectType.Account.FieldSets.AccountFS.getFields()) {
                    soqlWhere += f.getFieldPath() + ' LIKE :queryName OR ';
                }        
                soqlWhere=soqlWhere.removeEnd('OR ');
                allOrg=database.query(soqlWhere);
                totalRecs=allOrg.size();
                soqlWhere+=' LIMIT :blockSize OFFSET :index';
                allorg.clear();
                allorg=database.query(soqlWhere);
                if(allorg==null || allorg.size()==0 ){
                    ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,label.No_records_found));
                    return null;
                }
                else{
                }
                }
                return null;
        }
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,ACCOUNTSEARCH,null,LoggingLevel.ERROR);
                return null;
        }
    }

    public pagereference contactSearch(){
        filteredClientschk.clear();
        allClients.clear();
        String queryName=VariableUtility.BLANK_TEXT;
        try{    
                if(orgRecordType){
                        soql='Select ';
                        for(Schema.FieldSetMember f : SObjectType.Contact.FieldSets.ContactFS.getFields()) {
                            soql += f.getFieldPath() + ',';
                        }
                        soql=soql.removeEnd(',');
                        soql += ' FROM Contact';
                        soqlWhere=soql+' Where ';
                        for(Membership__c mb:[Select id,Client_Name__c,Client_Name__r.id,Client_Name__r.name,Client_Name__r.recordtypeid from Membership__c where Organization_Name__r.name=:selectedOrganization and Client_Name__r.recordtypeid!=:Schema.SObjectType.contact.getRecordTypeInfosByName().get(label.Organization_Contact).getRecordTypeId() ORDER BY LastModifiedDate DESC limit 50000]){
                            allClients.add(mb.Client_Name__r);
                        }
                        filteredClientschk.addall(allClients);
                        if(string.isblank(searchString)){
                            soql+=' where id IN : allClients ORDER BY LastModifiedDate DESC LIMIT 10';
                        allClients=database.query(soql);
                        }
                        else{
                            if(searchString.contains(VariableUtility.ASTERIK_MARK)){
                                searchString=searchString.removeEnd(VariableUtility.ASTERIK_MARK);
                            }
                            showPagination=true;
                            queryName = '%' + searchString + '%';
                            soqlWhere+='(';
                            for(Schema.FieldSetMember f : SObjectType.Contact.FieldSets.ContactFSWhere.getFields()) {
                                soqlWhere +=f.getFieldPath()+' LIKE :queryName OR ';
                            }
                            soqlWhere=soqlWhere.removeEnd('OR ');
                            soqlWhere+=')';
                            soqlWhere+=' and (id IN: filteredClientschk) ORDER BY FirstName';
                            allClients=database.query(soqlWhere);

                            totalRecs=allClients.size();
                            allClients.clear();
                            soqlWhere+=' LIMIT :blockSize OFFSET :index';

                            allClients=database.query(soqlWhere); 

                            if(allClients==null || allClients.size()==0 ){
                                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,label.No_records_found));
                                return null;
                            }
                            else{
                            }
                        }
                }
                else if(clientRecordType || nPRecordType){
                    soql='Select ';
                    for(Schema.FieldSetMember f : SObjectType.Contact.FieldSets.ContactFS.getFields()) {
                    soql += f.getFieldPath() + ',';
                    }
                    soql=soql.removeEnd(',');
                    soql += ' FROM Contact';
                    soqlWhere=soql+' Where ';
                    soql+=' ORDER BY LastModifiedDate DESC';
                    allClients=database.query(soql);
                    filteredClientschk.addall(allClients);
                    allClients.clear();
                    if(string.isblank(searchString)){
                        soql+=' Limit 10';
                        allClients=database.query(soql); 
                    }
                    else{
                        if(searchString.contains(VariableUtility.ASTERIK_MARK)){
                            searchString=searchString.removeEnd(VariableUtility.ASTERIK_MARK);
                        }
                        allClients.clear();
                        showPagination=true;
                        queryName = '%' + searchString + '%';
                        for(Schema.FieldSetMember f : SObjectType.Contact.FieldSets.ContactFSWhere.getFields()) {
                            soqlWhere +=f.getFieldPath()+' LIKE :queryName OR ';
                        }
                        soqlWhere=soqlWhere.removeEnd('OR ');
                        allClients=database.query(soqlWhere);
                        totalRecs=allClients.size();
                        soqlWhere+=' LIMIT :blockSize OFFSET :index';
                        allClients=database.query(soqlWhere);
                        if(allClients==null || allClients.size()==0 ){
                            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,label.No_records_found));
                            return null;
                        }
                        else{
                        }
                        }
                }
            return null;
        }
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,CONTACTSEARCH,null,LoggingLevel.ERROR);
                return null;
        }
    }

    public pagereference caseSearch(){
        FilteredCase.clear();
        String queryName=VariableUtility.BLANK_TEXT;
        try{    

                soql='Select ';
                for(Schema.FieldSetMember f : SObjectType.Case.FieldSets.CaseFieldsToDisplayFS.getFields()) {
                    soql += f.getFieldPath() + ',';
                }
                soql=soql.removeEnd(',');
                soql+=' from Case ';
                soqlWhere=soql+' Where ';
                if(string.isblank(searchString)){
                    if((!string.isblank(selectedOrganization)) && (string.isblank(selectedClient))){
                        soql=soql+'where Organization_Name__c=:selectedAccountId ORDER BY LastModifiedDate DESC limit 10';
                    }
                    else if((!string.isblank(selectedOrganization)) && (!string.isblank(selectedClient))){
                        soql=soql+'where Organization_Name__c=:selectedAccountId and client_Name__c=:selectedContactId ORDER BY LastModifiedDate DESC limit 10';
                    }
                    else if((string.isblank(selectedOrganization)) && (!string.isblank(selectedClient))){
                        soql=soql+'where client_Name__c=:selectedContactId ORDER BY LastModifiedDate DESC limit 10';
                    }
                    else{
                        soql=soql+'where Organization_Name__c=:selectedAccountId and client_Name__c=:selectedContactId ORDER BY LastModifiedDate DESC limit 10';
                        }
                     FilteredCase=database.query(soql);
                }
                else{
                    if(searchString.contains(VariableUtility.ASTERIK_MARK)){
                        searchString=searchString.removeEnd(VariableUtility.ASTERIK_MARK);
                    }
                    showPagination=true;
                    soqlWhere+='(';
                    queryName = '%' + searchString + '%';
                    for(Schema.FieldSetMember f : SObjectType.Case.FieldSets.CaseFS.getFields()) {
                        soqlWhere += f.getFieldPath() + ' LIKE :queryName OR ';  
                    }        
                    soqlWhere=soqlWhere.removeEnd('OR ');
                    soqlWhere+=')';
                    if((!string.isblank(selectedOrganization)) && (string.isblank(selectedClient))){
                        soqlWhere +=' and (Organization_Name__c=:selectedAccountId)';    
                    }
                    else if((!string.isblank(selectedOrganization)) && (!string.isblank(selectedClient))){
                        soqlWhere +=' and (Organization_Name__c=:selectedAccountId and client_Name__c=:selectedContactId)';
                    }
                    else if((string.isblank(selectedOrganization)) && (!string.isblank(selectedClient))){
                        soqlWhere +=' and (client_Name__c=:selectedContactId)';
                    }
                    else{
                        soql=soql+'where Organization_Name__c=:selectedAccountId and client_Name__c=:selectedContactId ORDER BY LastModifiedDate DESC';
                    }
                    filteredCase=database.query(soqlWhere);
                    totalRecs=filteredCase.size();
                    filteredCase.clear();
                    soqlWhere+=' LIMIT :blockSize OFFSET :index';
                    filteredCase=database.query(soqlWhere);
                    if(filteredCase==null || filteredCase.size()==0 ){
                        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,label.No_records_found));
                        return null;
                    }
                    else{
                    }
                }
            return null;
        }   
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,CASESEARCH,null,LoggingLevel.ERROR);
                return null;
            }
    }

    public PageReference getId()
    {
    try{    
            if(objName==label.Account){
                selectedOrganization=selectedOrganizationName;
                comm.Organization_Name__c=selectedAccountId;
                oldSelectedOrg=selectedOrganizationName;
            }
            else if(objName==label.Contact){
                selectedClient=selectedClientName;
                comm.Client_Name__c=selectedContactId;
                oldSelectedClient=selectedClientName;
            }
            else if(objName==label.Case){
                selectedCase=selectedCaseNumber;
                comm.Case__c=selectedCaseId;
                oldSelectedCase=selectedCaseNumber;
            }
            else{

            }
            closePopup();
            return null;
        }
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,GETID,null,LoggingLevel.ERROR);
                return null;
        }
    } 

    public pagereference saveCommunicationRecord(){
        string check;
        try{
                if(comm.Organization_Name__c!=null){
                    comm.Organization_Contact__c=selectedOrgCnt;
                }

                if(orgRecordType && orgContact.size()>1 && string.isblank(selectedOrgCnt)){
                  
                  ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,label.Organization_Contact_Error));
                    return null;  
                }

                if(!string.isblank(selectedOrganization) && (oldSelectedOrg!=selectedOrganization)){
                    check= '%' + selectedOrganization + '%';
                    list<account> chkAccount=new list<account>([Select id from account where name like :check limit 50000]);
                    if(chkAccount.isempty()){
                        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,label.Lookup_Error_Organization));
                        return null;
                    }
                    else if(chkAccount.size()>1){
                        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,label.CommunicationController_Multiple_Organization));
                        return null;
                    }
                    else{
                        comm.Organization_Name__c=chkAccount[0].id;
                    }
                }
                else if(string.isblank(selectedOrganization)){
                    comm.Organization_Name__c=null;
                }
                if(!string.isblank(selectedClient) && (oldSelectedClient!=selectedClient)){
                    check= '%' + selectedClient+ '%';
                    list<contact> chkContact=new list<contact>([Select id from contact where name like :check and id IN:filteredClientschk limit 50000]);
                    if(chkContact.isempty()){
                        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,label.Lookup_Error_Client));
                        return null;
                    }
                    else if(chkContact.size()>1){
                        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,label.CommunicationController_Multiple_Clients));
                        return null;
                    }
                    else{
                        comm.Client_Name__c=chkContact[0].id;
                    }
                }
                else if(string.isblank(selectedClient)){
                    comm.Client_Name__c=null;    
                }
                if(!string.isblank(selectedCase) && (oldSelectedCase!=selectedCase)){
                    check= '%' + selectedCase+ '%';
                    list<case> chkCase=new list<case>([Select id,CaseNumber from case where CaseNumber like :check limit 50000]);
                    if(chkCase.isempty()){
                        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,label.Lookup_Error_Case));
                        return null;
                    }
                    else if(chkCase.size()>1){
                        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,label.CommunicationController_Multiple_Case));
                        return null;
                    }
                    else{
                        comm.Case__c=chkCase[0].id;
                    }
                }
                else if(string.isblank(selectedCase)){
                    comm.Case__c=null;
                }

                if(string.isblank(selectedOrganization) && string.isblank(selectedClient) && string.isblank(selectedCase) && nPRecordType){
                    Account acc=[Select id,name from account where name=: label.Anonymous_Organization_Record Limit 1];
                    comm.Organization_Name__c=acc.id;
                    selectedOrganization=acc.name;
                }
                else{

                }
                upsert comm;
                return(new pagereference('/'+comm.id));
            }
        catch(DMLException ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getdmlmessage(0)));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,SAVETASK,null,LoggingLevel.ERROR);
                return null;
        }
        catch(Exception ex){
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                return null;
        }
    }
    

    public List<Schema.FieldSetMember> getNewCaseFields() {
        try{
                return SObjectType.Case.FieldSets.New_Case.getFields();
        }
        catch(Exception ex) {
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,GETNEWCASEFIELDS,null,LoggingLevel.ERROR);
                return null;
        }
    }
    

    public List<Schema.FieldSetMember> getNewCaseAdditionalFields() {
        try{
                return SObjectType.Case.FieldSets.NewCaseAddtionalInfo.getFields();
        }
        catch(Exception ex) {
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,GETNEWCASEADDITIONALFIELDS,null,LoggingLevel.ERROR);
                return null;
        }
    }

   public pagereference buttonClicked(){
        try{
                if(checkButton==VariableUtility.NEW_CASE){
           
                  insertedCase=new case();
                  
                  if(!(string.isBlank(selectedClient))){
                      insertedCase.Client_Name__c=selectedContactId;
                  }
                  if(!(string.isBlank(selectedOrganization))){
                      insertedCase.Organization_Name__c=selectedAccountId;
                  }
                  
                    insertedCase.ownerid=UserInfo.getUserId(); 
                    
                  selectorigin= DEFAULTCASEORIGIN;
                  selectstatus = DEFAULTCASESTATUS;
                  
                    newCase=true;
                    dntShow=false;
                }
                else if(checkButton==VariableUtility.CANCEL_CASE){
                 
                  insertedCase = null;
                  
                    newCase=false;
                    dntShow=true;
                }
                return null;
        }
        catch(Exception ex) {
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,NEWCASECLICKED,null,LoggingLevel.ERROR);
                return null;
        }
    }

    public PageReference saveCase() {
        try{    
                    
            insertedCase.origin=selectorigin;
            insertedCase.Case_Status__c =selectstatus;
            
            
                insert insertedCase;
                case cse=[select id,caseNumber from case where id=:insertedCase.id limit 1];
                comm.Case__c=cse.id;
                selectedCase=cse.CaseNumber;
                closePopup();
                return null;
            }
        catch(DMLException ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getdmlmessage(0)));
                return null;
        }
        catch(Exception ex) {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,ex.getmessage()));
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,SAVECASE,null,LoggingLevel.ERROR);
                return null;
        }
        
    }

  public void beginning()
    {
        try{
                index = 0;
                searchRecord();
        }
        catch(Exception ex) {
                UTIL_LoggingService.logHandledException(ex,UserInfo.getOrganizationId(),oasysApp,COMMUNICATIONCONTROLLER,BEGINNING,null,LoggingLevel.ERROR);
        }
    }

  public void previous()
    {
        try{
                index = index - blockSize;
                searchRecord();
        }
	}*/
	
}