public with sharing class login{

String username;
String password;

public String getusername() {return username;}
public void setusername(String un){this.username=un;}
public String getpassword() {return password;}
public void setpassword(String pw){this.password=pw;}



public PageReference Login12()
{
    List<login__c> a = [select id from login__c where   Employee_ID__c =:username and Password__c=:password];
    system.debug('user::::::::::::::::::::::::::::::::::::::::::::::::'+a);
    if(a.size()==0)
    {
    ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Invalid UserName or Password'));
    return null;
    }
    else
    {
        system.debug('username:::::::::::::::::::::::::::::::::::::::::::::::::::::::::'+username);
        PageReference p= new PageReference('https://ap1.salesforce.com/setup/ui/recordtypeselect.jsp?ent=Contact&retURL=%2F003%2Fo&save_new_url=%2F003%2Fe%3FretURL%3D%252F003%252Fo');
        system.debug('password::::::::::::::::::::::::::::::::::::::::::::::::'+password);
        p.setRedirect(true);
       return p;
    }

}

}