/** Apex class to sort data through column header of a table. **/
 
public class Sorter_UTIL {
 private String column;
 public String sortDirection;
 public final static String SORT_ASC = 'ASC';
 public final static String SORT_DESC = 'DESC';
 
 public Sorter_UTIL(String defaultSortColumn, String defaultSortDirection){
 this.column = defaultSortColumn;
 this.sortDirection = defaultSortDirection;
 }
 
 public String getSortDirection() {
 return this.sortDirection;
 }
 
 public String getColumn() {
 return this.column;
 }
 
public void setColumn(String columnName) {
 if (column.equalsIgnoreCase(columnName)) {
 sortDirection = (sortDirection.equals(SORT_ASC)) ? SORT_DESC : SORT_ASC;
 } else {
 this.sortDirection = SORT_ASC;
 this.column = columnName;
 }
 }
}