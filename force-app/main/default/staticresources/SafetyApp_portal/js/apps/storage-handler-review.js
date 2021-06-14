$().ready(function() {

	
	/*****************************************
	** Check and populate the locally stored
	**  data in the form.
	******************************************/
   $('.review_form').validate({
                errorElement: 'span',
                ignore: [],
                //Rules defined for validations
                rules: {
                    tAndc: {
                        required: true
                    }
                },
                //Error Messages based on the validation error occuring
                messages: {
                    tAndc: {
                        required: 'Error: Agreeing to the terms & conditions is required.'
                    }
                },
                errorPlacement: function(error, element){
					error.attr("role","alert");
					error.attr("aria-live","assertive");
                    error.insertAfter('.tAndcerror');
                }
            });

	
    if (sessionStorage.getItem("accountNumber"))
        $('#pgeAccNo').text(sessionStorage.getItem("accountNumber"));
    if (sessionStorage.getItem("applicantFirstName"))
        $('#applicantFirstName').text(sessionStorage.getItem("applicantFirstName"));
    if (sessionStorage.getItem("applicantLastName"))
        $('#applicantLName').text(sessionStorage.getItem("applicantLastName"));
    if (sessionStorage.getItem("emailAddress"))
        $('#emailAddress').text(sessionStorage.getItem("emailAddress"));

    if (sessionStorage.getItem("confirmEmailAddress"))
        $('#confirmEmailAddress').text(sessionStorage.getItem("confirmEmailAddress"));
    if (sessionStorage.getItem("phoneNumber"))
        $('#phNo').text(sessionStorage.getItem("phoneNumber"));
    if (sessionStorage.getItem("vehOwnerFName"))
        $('#vehicleOwnerFName').text(sessionStorage.getItem("vehOwnerFName"));
    if (sessionStorage.getItem("vehOwnerLName"))
        $('#vehicleOwnerLName').text(sessionStorage.getItem("vehOwnerLName"));
    if (sessionStorage.getItem("vehIdNum"))
        $('#vin').text(sessionStorage.getItem("vehIdNum"));

    if (sessionStorage.getItem("vehMake")) {
        var vehMakeOption = sessionStorage.getItem("vehMake");
        $('#vehicleMake').text(vehMakeOption);//.find("option[value=" + vehMakeOption +"]").attr('selected', true);
    }
    if (sessionStorage.getItem("vehModel")) {
        var vehModelOption = sessionStorage.getItem("vehModel");
        $('#vehicleModel').text(vehModelOption);//.find("option[value=" + vehModelOption +"]").attr('selected', true);
    }
    if (sessionStorage.getItem("vehYear")) {
        var vehYearOption = sessionStorage.getItem("vehYear");
        $('#vehicleYear').text(vehYearOption);//.find("option[value=" + vehYearOption +"]").attr('selected', true);
    }

    if (sessionStorage.getItem("registerStartDate"))
        $('#regStartDate1').text(sessionStorage.getItem("registerStartDate"));
    if (sessionStorage.getItem("registerEndDate"))
        $('#regEndDate1').text(sessionStorage.getItem("registerEndDate"));


    //if(sessionStorage.getItem("vehDocRadiosOption1")){
      if(sessionStorage.getItem("vehRegCardAttach") && sessionStorage.getItem("vehRegCardAttach") !== 'undefined'){
	$('#vehDocumentation1').text(sessionStorage.getItem("vehRegCardAttach"));
        }
       // }
  //  else{
      if(sessionStorage.getItem("purchLeaseContractAttach01") && sessionStorage.getItem("purchLeaseContractAttach01") !== 'null' && sessionStorage.getItem("purchLeaseContractAttach01") !== 'undefined')
        $('#vehDocumentation1').text(sessionStorage.getItem("purchLeaseContractAttach01"));
      if(sessionStorage.getItem("purchLeaseContractAttach02") && sessionStorage.getItem("purchLeaseContractAttach02") !== 'null' && sessionStorage.getItem("purchLeaseContractAttach02") !== 'undefined')
        $('#vehDocumentation2').text(sessionStorage.getItem("purchLeaseContractAttach02"));
      if(sessionStorage.getItem("purchLeaseContractAttach03") && sessionStorage.getItem("purchLeaseContractAttach03") !== 'null' && sessionStorage.getItem("purchLeaseContractAttach03") !== 'undefined')
        $('#vehDocumentation3').text(sessionStorage.getItem("purchLeaseContractAttach03"));
    // }
     
      /*  $('label#optInLabel').on('keypress', function(e){
          
  		if (e.keyCode == 13 || e.keyCode == 32) {
  			$("#optIn").click();
        	return false;
  		}
	});
        
         $('label#tAndcLabel').on('keypress', function(e){
            
  		if (e.keyCode == 13 || e.keyCode == 32) {
  			$("#tAndc").click();
        	return false;
  		}
	});
        
        $('label#purchaseleaseContractLabel').on('keypress', function(e){
  		if (e.keyCode == 13 || e.keyCode == 32) {
  			$("#purchaseleaseContract").click();
        	return false;
  		}
	});*/

	//Others
	/*if(sessionStorage.getItem("sourceOfInfo")){
		var sourceInfoSelect = sessionStorage.getItem("sourceOfInfo");
		$('#sourceOfInfo').val(sourceInfoSelect).find("option[value=" + sourceInfoSelect +"]").attr('selected', true);
		if(sourceInfoSelect === 'Other')
			$('#otherDescription').removeClass('hide');
	}
	if(sessionStorage.getItem("otherInfo"))
		$('#otherDescription').val(sessionStorage.getItem("otherInfo")); */



});