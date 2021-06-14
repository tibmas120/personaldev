$().ready(function() {

	var accountNumber,
		applicantFirstName,
		applicantLastName,
		emailAddress,
		confirmEmailAddress,
		phoneNumber,
		vehOwnerFName,
		vehOwnerLName,
		vehIdNum,
		vehMake,
		vehModel,
		vehYear,
		registerStartDate,
		registerEndDate,
		vehRegCardAttach,
		purchLeaseContractAttach01,
		purchLeaseContractAttach02,
		purchLeaseContractAttach03,
		sourceOfInfo,
		otherInfo;

	/**************************
	** Storing the form-data
	** on Browser sessionStorage.
	***************************/
	$( "#submitBtn" ).click(function() {
		// Before storing, checking whether the form is validated.
		if($("#applicationForm").valid()){
			//Check if the browser supports the sessionStorage
			if(typeof(Storage) !== "undefined") {

				try {
			        //Getting the values
					accountNumber = $('#pgeAccNo').val();
					applicantFirstName =  $('#applicantFName').val();
					applicantLastName =  $('#applicantLName').val();
					emailAddress =  $('#emailAddress').val();
					confirmEmailAddress =  $('#confirmEmailAddress').val();
					phoneNumber =  $('#phNo').val();
					vehOwnerFName =  $('#vehicleOwnerFName').val();
					vehOwnerLName =  $('#vehicleOwnerLName').val();
					vehIdNum =  $('#vin').val();
					vehMake =   $( "select#vehicleMake option:selected" ).text();
					vehModel =  $( "select#vehicleModel option:selected" ).text();
					vehYear =  $( "select#vehicleYear option:selected" ).text();
					registerStartDate =  $('#regStartDates').val();
					registerEndDate =  $('#regEndDates').val();
					sourceOfInfo =  $( "select#sourceOfInfo option:selected" ).text();
					if(sourceOfInfo === 'Other')
						otherInfo = $('#otherDescription').val();
					
					//Setting the values in sessionStorage
					sessionStorage.setItem('accountNumber', accountNumber);
					sessionStorage.setItem('applicantFirstName', applicantFirstName);
					sessionStorage.setItem('applicantLastName', applicantLastName);
					sessionStorage.setItem('emailAddress', emailAddress);
					sessionStorage.setItem('confirmEmailAddress', confirmEmailAddress);
					sessionStorage.setItem('phoneNumber', phoneNumber);
					sessionStorage.setItem('vehOwnerFName', vehOwnerFName);
					sessionStorage.setItem('vehOwnerLName', vehOwnerLName);
					sessionStorage.setItem('vehIdNum', vehIdNum);
					sessionStorage.setItem('vehMake', vehMake);
					sessionStorage.setItem('vehModel', vehModel);
					sessionStorage.setItem('vehYear', vehYear);
					sessionStorage.setItem('registerStartDate', registerStartDate);
					sessionStorage.setItem('registerEndDate', registerEndDate);
					
					sessionStorage.setItem('sourceOfInfo', sourceOfInfo);
					if(sourceOfInfo === 'Other')
						sessionStorage.setItem('otherInfo', otherInfo);

					if ($('#vehRegCard').is(':checked')) {
						sessionStorage.setItem('vehRegCardAttach', top.attachment_val_01);
					}else{
						if(sessionStorage.getItem("purchLeaseContractAttach01") && sessionStorage.getItem("purchLeaseContractAttach01") !== 'undefined')
							sessionStorage.setItem('purchLeaseContractAttach01', sessionStorage.getItem("purchLeaseContractAttach01"));
						else
							sessionStorage.setItem('purchLeaseContractAttach01', top.attachment_val_02);

						if(sessionStorage.getItem("purchLeaseContractAttach02") && sessionStorage.getItem("purchLeaseContractAttach02") !== 'undefined')
							sessionStorage.setItem('purchLeaseContractAttach02', sessionStorage.getItem("purchLeaseContractAttach02"));
						else
							sessionStorage.setItem('purchLeaseContractAttach02', top.attachment_val_03);

						if(sessionStorage.getItem("purchLeaseContractAttach03") && sessionStorage.getItem("purchLeaseContractAttach03") !== 'undefined')
							sessionStorage.setItem('purchLeaseContractAttach03', sessionStorage.getItem("purchLeaseContractAttach03"));
						else
							sessionStorage.setItem('purchLeaseContractAttach03', top.attachment_val_04);
					}


					windows.location.href = '/review.app.info.html';
	   				return false;
			    } 
			    catch (e) {
			        if (e == QUOTA_EXCEEDED_ERR) {
			            console.log("Error: Local Storage limit exceeds.");
			        }
			        else {
			            console.log("Error: Saving to local storage.");
			        }
			    } 
			}else{
				console.log('Sorry! No Web Storage support.');
			}
		}else{
			console.log('Please fill in all the required fields first.');
		}
	});

	/*****************************************
	** Check and populate the locally stored
	**  data in the form.
	******************************************/
	if(sessionStorage.getItem("accountNumber"))	
		$('#pgeAccNo').val(sessionStorage.getItem("accountNumber"));
	if(sessionStorage.getItem("applicantFirstName"))
		$('#applicantFName').val(sessionStorage.getItem("applicantFirstName"));
	if(sessionStorage.getItem("applicantLastName"))
		$('#applicantLName').val(sessionStorage.getItem("applicantLastName"));
	if(sessionStorage.getItem("emailAddress"))	
		$('#emailAddress').val(sessionStorage.getItem("emailAddress"));
	if(sessionStorage.getItem("confirmEmailAddress"))
		$('#confirmEmailAddress').val(sessionStorage.getItem("confirmEmailAddress"));
	if(sessionStorage.getItem("phoneNumber"))
		$('#phNo').val(sessionStorage.getItem("phoneNumber"));
	if(sessionStorage.getItem("vehOwnerFName"))
		$('#vehicleOwnerFName').val(sessionStorage.getItem("vehOwnerFName"));
	if(sessionStorage.getItem("vehOwnerLName"))
		$('#vehicleOwnerLName').val(sessionStorage.getItem("vehOwnerLName"));
	if(sessionStorage.getItem("vehIdNum"))
		$('#vin').val(sessionStorage.getItem("vehIdNum"));

	if(sessionStorage.getItem("vehMake")){
		var vehMakeOption = sessionStorage.getItem("vehMake");
		$('#vehicleMake').val(vehMakeOption).find("option[value=" + vehMakeOption +"]").attr('selected', true);
	}
	if(sessionStorage.getItem("vehModel")){
		var vehModelOption = sessionStorage.getItem("vehModel");
		$('#vehicleModel').val(vehModelOption).find("option[value=" + vehModelOption +"]").attr('selected', true);
	}
	if(sessionStorage.getItem("vehYear")){
		var vehYearOption = sessionStorage.getItem("vehYear");
		$('#vehicleYear').val(vehYearOption).find("option[value=" + vehYearOption +"]").attr('selected', true);
	}

	if(sessionStorage.getItem("registerStartDate"))
		$('#regStartDates').val(sessionStorage.getItem("registerStartDate"));
	if(sessionStorage.getItem("registerEndDate"))
		$('#regEndDates').val(sessionStorage.getItem("registerEndDate"));

	if(sessionStorage.getItem("vehRegCardAttach") && sessionStorage.getItem("vehRegCardAttach") !== 'undefined') {
		var radio = $('#vehRegCard');
		radio[0].checked = true;
		radio.button("refresh");
		$('#vehDocRadiosOption1Area').removeClass('hide');
		$('#attachVehDocImg01').addClass('hide');
		$('.vehRegCardDesc').addClass('hide');
		$('#attachment_01_delete').removeClass('hide');
		$(".addAttachment1_label").addClass('hide');
		$('.attachment_01').removeClass('hide');
		$('.attachment_01').html(sessionStorage.getItem("vehRegCardAttach"));
		//$('#attachment_01_delete').removeClass('hide');
		//$('.attachment_01').removeClass('hide');
	}
	if(sessionStorage.getItem("purchLeaseContractAttach01") && sessionStorage.getItem("purchLeaseContractAttach01") !== 'undefined'){
		var radio = $('#purchaseleaseContract');
		radio[0].checked = true;
		radio.button("refresh");
		$('#vehDocRadiosOption2Area').removeClass('hide');
		$('#attachVehDocImg02').addClass('hide');
		$('.purchaseleaseContractDesc').addClass('hide');

		$('#attachment_02_delete').removeClass('hide');
		$(".addAttachment2_label").addClass('hide');
		$('.attachment_02').removeClass('hide');
		$('.attachment_02').html(sessionStorage.getItem("purchLeaseContractAttach01"));
	}
	if(sessionStorage.getItem("purchLeaseContractAttach02") && sessionStorage.getItem("purchLeaseContractAttach02") !== 'undefined'){
		var radio = $('#purchaseleaseContract');
		radio[0].checked = true;
		radio.button("refresh");
		$('#vehDocRadiosOption2Area').removeClass('hide');
		$('#attachVehDocImg02').addClass('hide');
		$('.purchaseleaseContractDesc').addClass('hide');

		$('#attachment_03_delete').removeClass('hide');
		$(".addAttachment3_label").addClass('hide');
		$('.attachment_03').removeClass('hide');
		$('.attachment_03').html(sessionStorage.getItem("purchLeaseContractAttach02"));
	}
	if(sessionStorage.getItem("purchLeaseContractAttach03") && sessionStorage.getItem("purchLeaseContractAttach03") !== 'undefined') {
		var radio = $('#purchaseleaseContract');
		radio[0].checked = true;
		radio.button("refresh");
		$('#vehDocRadiosOption2Area').removeClass('hide');
		$('#attachVehDocImg02').addClass('hide');
		$('.purchaseleaseContractDesc').addClass('hide');

		$('#attachment_04_delete').removeClass('hide');
		$(".addAttachment4_label").addClass('hide');
		$('.attachment_04').removeClass('hide');
		$('.attachment_04').html(sessionStorage.getItem("purchLeaseContractAttach03"));
	}

	//Others
	if(sessionStorage.getItem("sourceOfInfo")){
		var sourceInfoSelect = sessionStorage.getItem("sourceOfInfo");
		if(sourceInfoSelect === 'Other'){
			$('#otherDescription').removeClass('hide');
			$('#otherDescription').val(sessionStorage.getItem("otherInfo"));
		}
		$('#sourceOfInfo').val(sourceInfoSelect).find("option[value==" + sourceInfoSelect +"]").attr('selected', true);
	}
});