public Class AccountController {
 
private String defaultSortColumn = 'Name'; /** Set the default sort Column. **/
 private String sortDirection = 'ASC';
 public Sorter_UTIL wikiUTIL_Sorter {get; set;} /** Declare Sorter_UTIL class Object. **/
 
 public AccountController() {
 wikiUTIL_Sorter = new Sorter_UTIL(defaultSortColumn, sortDirection); /** Create Sorter_UTIL Object. **/
 }
 
 public List<Account> getAccounts() {
 /** Add the column and sort direction value at the end of query.**/
 String stringQuery = 'select Id,name,Type,Phone,Fax from Account Order By ' + wikiUTIL_Sorter.getColumn() + ' ' + wikiUTIL_Sorter.getSortDirection() +' NULLS LAST';
 return database.query(stringQuery);
 }
 
 public PageReference sort() { /** Define sorting method. **/
 /** Do nothing here. **/
 return null;
 }
 
}