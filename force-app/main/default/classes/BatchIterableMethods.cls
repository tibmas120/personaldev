global class BatchIterableMethods implements Database.Batchable<Account>, Iterable<Account>, Iterator<Account> {
  public integer i;
  List<Account> acc;
  public BatchIterableMethods() {
    acc = [select Id from Account];
    i = 0;
  }
  public Iterator<Account> iterator() {
    return this;
  }
  public boolean hasNext() {
    if(acc.size() <= i) 
      return false;
    else
      return true;
  }
  public Account next() {
    i++;
    return acc[i-1];
  }
  global Iterable<Account> start(Database.BatchableContext bc) {
    return new BatchIterableMethods();
  } 
  global void execute(Database.BatchableContext bc, List<Account> scope) {
    for(Account a : scope) {
      a.AccountSource = 'Other';
    }
    update scope;
  }
  global void finish(Database.BatchableContext bc) {}
}