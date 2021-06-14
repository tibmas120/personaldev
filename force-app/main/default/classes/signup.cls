public with sharing class signup{
String username;
String password;
String confirmpassword;
string secQues;
String secAns;
String emailId;
public String getusername() {return username;}
public void setusername(String un){this.username=un;}
public String getpassword() {return password;}
public void setpassword(String pw){this.password=pw;}
public String getconfirmpassword() {return confirmpassword;}
public void setconfirmpassword(String pw){this.confirmpassword=pw;}
public String getsecQues() {return secQues;}
public void setsecQues(String secQues){this.secQues=secQues;}
public String getsecAns() {return secAns;}   
public void setsecAns(String secAns){this.secAns=secAns;}
public String getemailId() {return emailId;}
public void setemailId(String emailId){this.emailId=emailId;}

public List<SelectOption> getQuestions() {
            List<SelectOption> options = new List<SelectOption>();
            options.add(new SelectOption('Who is your childhood Hero','Who is your childhood Hero'));
            options.add(new SelectOption('What is your childhood name','What is your childhood name'));
            options.add(new SelectOption('who is your first class teacher','who is your first class teacher'));
            options.add(new SelectOption('what is your mothers maiden name','what is your mothers maiden name'));

            return options;
        }

public integer check()
{
for(login__c c:[select Employee_ID__c,Email_ID__c from login__c])
{
if(username==c.Employee_ID__c || emailid==c.Email_ID__c)
return 0;
}
return 1;
}
public pagereference createAccount(){
login__c newacc=new login__c();
newacc.Employee_ID__c=username;
newacc.Password__c=password;
newacc.Confirm_Password__c=confirmpassword;
newacc.Secret_Question__c=secQues;
newacc.Your_Answer__c=secAns;
newacc.Email_ID__c=emailid;
if(username.length()==0)
{
ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Invalid username'));
return null;
}
if(emailid.length()==0)
{
ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Email ID field can not remail blank'));
return null;
}
if(password.length()<8)
{
ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Password should be atleast 8 charcter long'));
return null;
}
if(!(password.equals(confirmpassword)))
{
ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Password and Confirm password mismatch'));
return null;
}
if(secAns.length()==0)
{
ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Answer field can not remail blank'));
return null;
}

insert newacc;
PageReference p= new PageReference('https://c.ap1.visual.force.com/apex/successlogin');
p.setredirect(true);
return p;
}
}