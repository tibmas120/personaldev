trigger trigger02 on Lead (before update,before insert) {
for(lead l:trigger.new)
{
if(l.title=='a')
l.mobilephone='9029316494';
}
}