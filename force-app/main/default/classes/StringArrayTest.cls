public class StringArrayTest{

    public static list<string> generateStringArray(integer n){
        list<string> arrayList=new list<string>();
        for(integer i=0;i<n;i++){
            arrayList.add('Test '+i);
        }
        return arrayList;
    }
}