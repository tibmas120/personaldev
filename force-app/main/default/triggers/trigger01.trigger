trigger trigger01 on Account (before update,before insert) {
for(account a:trigger.new)
{
if(a.annualrevenue>1000)
a.website='www.google.com';
else
a.website='www.bing.com';
}
}