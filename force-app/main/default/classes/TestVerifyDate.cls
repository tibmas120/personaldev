@isTest
private class TestVerifyDate {
    @isTest static void testCheckDates() {
        VerifyDate.CheckDates(Date.Today(),Date.Today()+30);
        //System.assertEquals('Normal', pri);
    }
    
    @isTest static void testDateWithin30Days() {
        VerifyDate.CheckDates(Date.Today(),Date.Today()-30);
        //System.assertEquals('High', pri);
    }
    
    @isTest static void testSetEndOfMonthDate() {
        VerifyDate.CheckDates(Date.Today(),Date.Today()+29);
        //System.assertEquals(null, pri);
    }
}