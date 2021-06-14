public with sharing class forgotpassword{
string s;
string emailId;
string secQues;
String secAns;
public String getsecAns() {return secAns;}
public String getemailId() {return emailId;}
public String getsecQues() {return secQues;}
public void setsecQues(String secQues){this.secQues=secQues;}
public void setsecAns(String secAns){this.secAns=secAns;}
public void setemailId(String emailId){this.emailId=emailId;}
public String generator(Integer len){
Blob blobKey = crypto.generateAesKey(128);
String key = EncodingUtil.convertToHex(blobKey);
return key.substring(0,len);
}
public List<SelectOption> getQuestions() {
            List<SelectOption> options = new List<SelectOption>();
            options.add(new SelectOption('Who is your childhood Hero','Who is your childhood Hero'));
            options.add(new SelectOption('What is your childhood name','What is your childhood name'));
            options.add(new SelectOption('who is your first class teacher','who is your first class teacher'));
            return options;
            }
public pagereference verify()
{
list<login__c> l1=[select id,Email_ID__c,Secret_Question__c,Your_Answer__c from login__c where Email_ID__c=: emailId and Secret_Question__c=:secQues and Your_Answer__c=:secAns];
if(l1.size()!=0)
{
system.debug('Just Chill @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
s=generator(8);
l1[0].Password__c=s;
l1[0].Confirm_Password__c=s;
update l1;
Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
String[] toAddresses = new String[] {l1[0].Email_ID__c}; 
mail.setToAddresses(toAddresses);
mail.setSubject('New Password');
mail.setPlainTextBody('Your new password is: ' +s);
Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
PageReference p= new PageReference('https://c.ap1.visual.force.com/apex/success');
p.setredirect(true);
return p;
}
else
{
ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Invalid Email ID or Answer'));
return null;
}
}
}