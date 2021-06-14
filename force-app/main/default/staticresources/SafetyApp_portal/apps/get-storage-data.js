$().ready(function() {

	if(sessionStorage.getItem("accountNumber"))	
		$('#pgeAccNoValue').text(sessionStorage.getItem("accountNumber"));
	if(sessionStorage.getItem("applicantFirstName"))
		$('#applicantFName').text(sessionStorage.getItem("applicantFirstName"));
	if(sessionStorage.getItem("applicantLastName"))
		$('#applicantLName').text(sessionStorage.getItem("applicantLastName"));
	if(sessionStorage.getItem("emailAddress"))	
		$('#emailAddress').text(sessionStorage.getItem("emailAddress"));
	if(sessionStorage.getItem("confirmEmailAddress"))
		$('#confirmEmailAddress').text(sessionStorage.getItem("confirmEmailAddress"));
	if(sessionStorage.getItem("phoneNumber"))
		$('#phNo').text(sessionStorage.getItem("phoneNumber"));
	if(sessionStorage.getItem("vehOwnerFName"))
		$('#vehicleOwnerFName').text(sessionStorage.getItem("vehOwnerFName"));
	if(sessionStorage.getItem("vehOwnerLName"))
		$('#vehicleOwnerLName').text(sessionStorage.getItem("vehOwnerLName"));
	if(sessionStorage.getItem("vehIdNum"))
		$('#vin').text(sessionStorage.getItem("vehIdNum"));
	if(sessionStorage.getItem("vehMake"))
		$('#vehicleMake').text(sessionStorage.getItem("vehMake"));
	if(sessionStorage.getItem("vehModel"))
		$('#vehicleModel').text(sessionStorage.getItem("vehModel"));
	if(sessionStorage.getItem("vehYear"))
		$('#vehicleYear').text(sessionStorage.getItem("vehYear"));
	if(sessionStorage.getItem("registerStartDate"))
		$('#regStartDate').text(sessionStorage.getItem("registerStartDate"));
	if(sessionStorage.getItem("registerEndDate"))
		$('#regEndDate').text(sessionStorage.getItem("registerEndDate"));

	if (sessionStorage.getItem("vehDocRadiosOption1")) {
		$('#vehAttachedDocument').text(sessionStorage.getItem('vehDocRadiosOption1'));
	}

});