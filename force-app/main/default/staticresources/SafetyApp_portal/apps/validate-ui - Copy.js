$().ready(function() {

	/***********************
	 ** Validation method
	 ** for Account Number
	 ** valid in CC&B.
	 ************************/
//	$.validator.addMethod(
//		"accountNumberValid",
//		function(value, element)
//		{
//			//var userAcctNo = document.getElementById('pgeAccNo').value;
//			var userAcctNo = value;
//			var flag = true;
//
//			/*Visualforce.remoting.Manager.invokeAction(
//			 '{!$RemoteAction.LCFSControllerExtension.validateInputs}',
//			 userAcctNo ,
//			 function(result, event){
//			 if (event.status) {
//			 // Get DOM IDs for HTML and Visualforce elements like this
//
//			 flag = result.acctNoValid ;
//			 } else if (event.type === 'exception') {
//			 document.getElementById("responseErrors").innerHTML =
//			 event.message + "<br/>\n<pre>" + event.where + "</pre>";
//			 } else {
//			 document.getElementById("responseErrors").innerHTML = event.message;
//			 }
//			 },
//			 {escape: true}
//			 );*/
//			return flag;
//		},
//		"The PG&E account number you have entered does not match an existing active account. Please check your PG&E account number and try again."
//	);

	/***********************
	** Validation method
	** for Account Number
	** format.
	************************/
	$.validator.addMethod(
		"accountNumberRegex",
		function(value, element, regexp) 
		{
			if (regexp.constructor != RegExp)
				regexp = new RegExp(regexp);
			else if (regexp.global)
				regexp.lastIndex = 0;
			return this.optional(element) || regexp.test(value);
		},
		"Please check your input."
    );

    /***********************
	** Validation method
	** for Email Address
	** format.
	************************/
	$.validator.addMethod(
		"emailAddrRegex",
		function(value, element, regexp) 
		{
			if (regexp.constructor != RegExp)
				regexp = new RegExp(regexp);
			else if (regexp.global)
				regexp.lastIndex = 0;
			return this.optional(element) || regexp.test(value);
		},
		"Please check your input."
    );

	/***********************
	** Validation method
	** for VIN format.
	************************/
    $.validator.addMethod(
    	"vinRegex",
    	function(value, element, regexp) 
    	{
    		if (regexp.constructor != RegExp)
    			regexp = new RegExp(regexp);
    		else if (regexp.global)
    			regexp.lastIndex = 0;
    		return this.optional(element) || regexp.test(value);
    	},
    	"Please check your input."
    );

    /***********************
	** Validation method
	** for Phone No. format.
	************************/
    $.validator.addMethod(
    	"phoneRegex",
    	function(value, element, regexp) 
    	{
    		if (regexp.constructor != RegExp)
    			regexp = new RegExp(regexp);
    		else if (regexp.global)
    			regexp.lastIndex = 0;
    		return this.optional(element) || regexp.test(value);
    	},
    	"Please check your input."
    );

    /***********************
	** Validation method
	** for Filesize.
	************************/
 	$.validator.addMethod("filesize", function (val, element) {
 		if(element.files.length > 0){
		 	var size = element.files[0].size;
		    if (size > 26214400)// checks the file more than 25 MB
		        return false;
		    else
		        return true;
		}else
			return true;
	}, "File size error");

	/***********************
	 ** Validation method
	 ** for All Filesize.
	 ************************/
	$.validator.addMethod("allFileSize", function (val, element) {
		if(element.files.length > 0){
			var size = 0;
			var sizeLimit= 1024*25; // 25 MB
			var input1, file1, input2, file2, input3, file3;

			input1 = document.getElementById('addAttachment2');
			input2 = document.getElementById('addAttachment3');
			input3 = document.getElementById('addAttachment4');
			if (input1 && input1.files && input1.files[0]) {
				file1 = input1.files[0];
				size += file1.size/1024;
			}

			if (input2 && input2.files && input2.files[0]) {
				file2 = input2.files[0];
				size += file2.size/1024;
			}

			if (input3 && input3.files && input3.files[0]) {
				file3 = input3.files[0];
				size += file3.size/1024;
			}

			if(size > sizeLimit) {
				return false;
			} else {
				return true;
			}
		} else
			return true;
	}, "File size error");

	/***********************
	 ** Validation method
	 ** for valid registration dates.
	 ************************/
	$.validator.addMethod(
		"dateLimit",
		function(value, element)
		{
			var fromDate = $('#regStartDates'),
				toDate = $('#regEndDates');

			var startDate = $('#regStartDates').datepicker('getDate'),
				endDate = $('#regEndDates').datepicker('getDate'),
				rangeDate = $('#regStartDates').datepicker('getDate'),
				currDate = new Date();

			//If Start Date not selected, then return true
			if(rangeDate === null){
				return true;
			}else{
				//End date shouldn't be more than 366 days from start date.
				rangeDate.setDate(rangeDate.getDate()+366);
				//Application date shouldn't be outside of the entered dates
				//End date should always be later than start date.
				return ((startDate <= currDate && endDate >= currDate) && (endDate > startDate) && (rangeDate >= endDate));
				//return ((endDate > startDate) && (rangeDate >= endDate));
			}
		},
		"Please enter valid registration dates (see help icon)."
	);


    /**************************************************
    **											
	** All validation rules and messages defined.
	**
	**************************************************/
	$('#applicationForm').validate({
		ignore: [],
		//Rules defined for validations
		rules: {
			pgeAccNo: {
				required: true,
				accountNumberRegex: /^[0-9]{10}-[0-9]{1}$/
				//accountNumberValid: true
			},
			applicantFName: {
				required: true
			},
			applicantLName: {
				required: true
			},
			emailAddress: {
				required: true,
				emailAddrRegex: /^([a-zA-Z0-9\.\_]+)+\@(([a-zA-Z0-9])+\.)+([a-zA-Z]){2,4}$/
			},
			confirmEmailAddress: {
				required: true,
				equalTo: "#emailAddress"
			},
			vehicleOwnerFName: {
				required: true
			},
			vehicleOwnerLName: {
				required: true
			},
			vin: {
				required: true,
				vinRegex: /^[A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]*$/
			},
			// vehicleMake: {
			// 	required: true
			// },
			// vehicleModel: {
			// 	required: true
			// },
			// vehicleYear: {
			// 	required: true
			// },
			hiddenVehicleMake: {
				required: function () {
					if ($("#vehicleMake").val() == '') {
						return true;
					} else {
						return false;
					}
				}
			},
			hiddenVehicleModel: {
				required: function () {
					if ($("#vehicleModel").val() == '') {
						return true;
					} else {
						return false;
					}
				}
			},
			hiddenVehicleYear: {
				required: function () {
					if ($("#vehicleYear").val() == '') {
						return true;
					} else {
						return false;
					}
				}
			},
			phNo: {
				phoneRegex: /^[1-9]{1}[0-9]{9}$/
			},
			addAttachment1: {
				required: '#vehRegCard:checked',
				extension: 'jpg,png,jpeg,pdf', 
				filesize: true
			},
			addAttachment2: {
				extension: 'jpg,png,jpeg,pdf',
				filesize: true
			},
			addAttachment3: {
				extension: 'jpg,png,jpeg,pdf',
				filesize: true
			},
			addAttachment4: {
				extension: 'jpg,png,jpeg,pdf',
				filesize: true,
				allFileSize: true
			},
            hiddenRecaptcha: {
                required: function () {
                    if (grecaptcha.getResponse() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
			regStartDates: {
		      required: true,
		      date: true
		    },
			regEndDates: {
				required: true,
				date: true,
				dateLimit : true
			},
			otherDescription: {
				required: function () {
                    return $( "select#sourceOfInfo option:selected" ).text() === 'Other';
                }
            },
            vehDocRadios: {
            	required: true
            }
		},
		//Error Messages based on the validation error occuring
		messages: {
			pgeAccNo: {
				required: 'This field is required.',
				accountNumberRegex: 'Please enter a valid account number.'
			},
			applicantFName: {
				required: 'This field is required.'
			},
			applicantLName: {
				required: 'This field is required.'
			},
			emailAddress: {
				required: 'This field is required.',
				emailAddrRegex: 'Please enter a valid email address.'
			},
			confirmEmailAddress: {
				required: 'This field is required.',
				emailAddrRegex: 'Please enter a valid email address.',
				equalTo: 'Please enter the same value again.'
			},
			vehicleOwnerFName: {
				required: 'This field is required.'
			},
			vehicleOwnerLName: {
				required: 'This field is required.'
			},
			vin: {
				required: 'This field is required.',
				vinRegex: 'Please enter a valid vehicle identification number.'
			},
			vehicleMake: {
				required: "This field is required." 
			},
			vehicleModel: {
				required: "This field is required." 	
			},
			vehicleYear: {
				required: "This field is required." 
			},
			phNo: {
				phoneRegex: 'Please enter a valid number.'
			},
			addAttachment1: {
				required: 'This field is required.',
				extension: 'Please upload an attachment in PDF, JPG, or PDF format.',
				filesize: 'Files upto the maximum size of 25MB are allowed.'
			},
			addAttachment2: {
				extension: 'Please upload an attachment in PDF, JPG, or PDF format.',
				filesize: 'Files upto the maximum size of 25MB are allowed.'
			},
			addAttachment3: {
				extension: 'Please upload an attachment in PDF, JPG, or PDF format.',
				filesize: 'Files upto the maximum size of 25MB are allowed.'
			},
			addAttachment4: {
				extension: 'Please upload an attachment in PDF, JPG, or PDF format.',
				filesize: 'Files upto the maximum size of 25MB are allowed.',
				allFileSize: 'Files upto the maximum size of 25MB are allowed.'
			},
			hiddenRecaptcha: {
				required: 'Please choose Captcha correctly.'
			},
			regStartDates: {
		      required: 'This field is required.',
		      date: 'The date format is not correct.'
		    },
		    regEndDates: {
				required: 'This field is required.',
				date: 'The date format is not correct.',
				dateLimit : 'Please enter valid registration dates (see help icon).'
			},
			otherDescription: {
				required: 'This field is required.'
			},
            vehDocRadios: {
            	required: 'This field is required.'
            }
		},
        errorPlacement: function(error, element){
            if ( element.is(":radio") ) 
            {
                error.appendTo( element.parents('.radio-group') );
            }
            else 
            { // This is the default behavior 
                error.insertAfter( element );
            }
        }
	});

	/******************************************
	** Start and End date validations
	*******************************************/
	$( "#regStartDates" ).datepicker({
      	minDate: 0,
      	dateFormat: "mm/dd/yy",
      	onClose: function(dateText, inst) {
            $('#regEndDates').datepicker('option', 'dateFormat', 'mm/dd/yy');                
        }
	  	}).on('change', function() {
	        $(this).valid();  
	    });
    $('#regEndDates').datepicker({}).on('change', function() {    	
        $(this).valid();  
    });


    /******************************************
	** Hide show available attachments based 
	** on radio button selection.
	*******************************************/
	$("input[type='radio']").change(function () {
		if ($(this).val() == "vehDocRadiosOption1") {
			$("#vehDocRadiosOption1Area").removeClass('hide');
			$("#vehDocRadiosOption2Area").addClass('hide');
			resetDataOnRadioBtnChange('veh_reg_card_attachment', 'addAttachment01');
			localStorage.setItem("purchLeaseContractAttach01", 'undefined');
			localStorage.setItem("purchLeaseContractAttach02", 'undefined');
			localStorage.setItem("purchLeaseContractAttach03", 'undefined');
			$('#vehRegCard').attr('value', 'vehDocRadiosOption2');
		} else if($(this).val() == "vehDocRadiosOption2") {
			$("#vehDocRadiosOption1Area").addClass('hide');
			$("#vehDocRadiosOption2Area").removeClass('hide');
			resetDataOnRadioBtnChange('purch_contract_attachment', 'addAttachment02');
			localStorage.setItem("vehRegCardAttach", 'undefined');
			$('#vehRegCard').attr('value', 'vehDocRadiosOption1');
		}
	});
	$('select#sourceOfInfo').on('change', function (e) {
	    var optionSelected = $( "select#sourceOfInfo option:selected" ).text();
	    var valueSelected = this.value;
	    if(optionSelected === 'Other'){
	    	$("#otherDescription").removeClass('hide');
	    }
	    else{
	    	$("#otherDescription").addClass('hide');
	    	$("#otherDescription").val("");
	    }
	});


	/******************************************
	** Value get/set for file selected from
	** uploading the file of type
	** jpg/png/pdf.
	*******************************************/
	$("#addAttachment1").change(function (){
		$('#attachVehDocImg01').addClass('hide');
		$('.vehRegCardDesc').addClass('hide');
		$('#attachment_01_delete').removeClass('hide');
		var attachementVal = $(this).val().replace(/^.*[\\\/]/, '');
		$(".addAttachment1_label").addClass('hide');
		$('.attachment_01').removeClass('hide');
		$('.attachment_01').html(attachementVal);
		var f=this.files[0];
		top.attachment_01_val = f;
		top.attachment_val_01 = attachementVal;
		var sizeInMb = f.size/1024;
		var sizeLimit= 1024*25; // 25 MB
		var fileExtension = ['jpeg', 'jpg', 'png', 'pdf'];
		if (($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) || sizeInMb > sizeLimit) {
			$(this).valid(false);
			$('#addAttachment1-error').removeAttr('style');
		} else {
			$(this).valid();
		}
	});
	$("#addAttachment2").change(function (){
		$('#attachVehDocImg02').addClass('hide');
		$('.purchaseleaseContractDesc').addClass('hide');
		$('#attachment_02_delete').removeClass('hide');
		var attachementVal = $(this).val().replace(/^.*[\\\/]/, ''),
			strToAddBefore = attachementVal.lastIndexOf("."),
			strToAdd = " 1 of 3";
		attachementVal = attachementVal.substring(0, strToAddBefore) + strToAdd + attachementVal.substring(strToAddBefore);
		$(".addAttachment2_label").addClass('hide');
		$('.attachment_02').removeClass('hide');
		$('.attachment_02').html(attachementVal);
		var f=this.files[0];
		top.attachment_02_val = f;
		top.attachment_val_02 = $(this).val().replace(/^.*[\\\/]/, '');
		var sizeInMb = f.size/1024;
		var sizeLimit= 1024*25; // 25 MB
		var fileExtension = ['jpeg', 'jpg', 'png', 'pdf'];
		if (($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) || sizeInMb > sizeLimit) {
			$(this).valid(false);
			$('#addAttachment2-error').removeAttr('hide');
		} else {
			var input1, file2, input2, file3;

			input1 = document.getElementById('addAttachment3');
			input2 = document.getElementById('addAttachment4');
			if (input1 && input1.files && input1.files[0]) {
				file2 = input1.files[0];
				sizeInMb += file2.size/1024;
			}

			if (input2 && input2.files && input2.files[0]) {
				file3 = input2.files[0];
				sizeInMb += file3.size/1024;
			}

			if(sizeInMb > sizeLimit) {
				$("#addAttachment4").valid(false);
				$('#addAttachment4-error').removeAttr('hide');
			} else {
				$("#addAttachment4").valid();
				$(this).valid();
			}
		}
	});
	$("#addAttachment3").change(function (){
		$('#attachVehDocImg02').addClass('hide');
		$('.purchaseleaseContractDesc').addClass('hide');
		$('#attachment_03_delete').removeClass('hide');
		var attachementVal = $(this).val().replace(/^.*[\\\/]/, ''),
			strToAddBefore = attachementVal.lastIndexOf("."),
			strToAdd = " 2 of 3";
		attachementVal = attachementVal.substring(0, strToAddBefore) + strToAdd + attachementVal.substring(strToAddBefore);
		$(".addAttachment3_label").addClass('hide');
		$('.attachment_03').removeClass('hide');
		$('.attachment_03').html(attachementVal);
		var f=this.files[0];
		top.attachment_03_val = f;
		top.attachment_val_03 = $(this).val().replace(/^.*[\\\/]/, '');
		var sizeInMb = f.size/1024;
		var sizeLimit= 1024*25; // 25 MB
		var fileExtension = ['jpeg', 'jpg', 'png', 'pdf'];
		if (($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) || sizeInMb > sizeLimit) {
			$(this).valid(false);
			$('#addAttachment3-error').removeAttr('hide');
		} else {
			var input1, file2, input2, file3;

			input1 = document.getElementById('addAttachment2');
			input2 = document.getElementById('addAttachment4');
			if (input1 && input1.files && input1.files[0]) {
				file2 = input1.files[0];
				sizeInMb += file2.size/1024;
			}

			if (input2 && input2.files && input2.files[0]) {
				file3 = input2.files[0];
				sizeInMb += file3.size/1024;
			}

			if(sizeInMb > sizeLimit) {
				$("#addAttachment4").valid(false);
				$('#addAttachment4-error').removeAttr('hide');
			} else {
				$("#addAttachment4").valid();
				$(this).valid();
			}
		}
	});
	$("#addAttachment4").change(function (){
		$('#attachVehDocImg02').addClass('hide');
		$('.purchaseleaseContractDesc').addClass('hide');
		$('#attachment_04_delete').removeClass('hide');
		var attachementVal = $(this).val().replace(/^.*[\\\/]/, ''),
			strToAddBefore = attachementVal.lastIndexOf("."),
			strToAdd = " 3 of 3";
		attachementVal = attachementVal.substring(0, strToAddBefore) + strToAdd + attachementVal.substring(strToAddBefore);
		$(".addAttachment4_label").addClass('hide');
		$('.attachment_04').removeClass('hide');
		$('.attachment_04').html(attachementVal);
		var f=this.files[0];
		top.attachment_04_val = f;
		top.attachment_val_04 = $(this).val().replace(/^.*[\\\/]/, '');
		var sizeInMb = f.size/1024;
		var sizeLimit= 1024*25; // 25 MB
		var fileExtension = ['jpeg', 'jpg', 'png', 'pdf'];
		if (($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) || sizeInMb > sizeLimit) {
			$("#addAttachment4").valid(false);
			$('#addAttachment4-error').removeAttr('hide');
		} else {
			var input1, file2, input2, file3;

			input1 = document.getElementById('addAttachment3');
			input2 = document.getElementById('addAttachment2');
			if (input1 && input1.files && input1.files[0]) {
				file2 = input1.files[0];
				sizeInMb += file2.size/1024;
			}

			if (input2 && input2.files && input2.files[0]) {
				file3 = input2.files[0];
				sizeInMb += file3.size/1024;
			}

			if(sizeInMb > sizeLimit) {
				$(this).valid(false);
				$('#addAttachment4-error').removeAttr('hide');
			} else {
				$("#addAttachment4").valid();
				$(this).valid();
			}
		}
	});

});


/***************************************************
** @Description: Handles the delete icon
** click for uploaded file.
** @param1: parentId passed to show/hide data.
** @param2: inputTypeId passed to reset the parent 
** element.
*****************************************************/
function deleteUploadedFile(parentId, elementId) {
	if(parentId === 'veh_reg_card_attachment'){
		$('#attachVehDocImg01').removeClass('hide');
		$('.vehRegCardDesc').removeClass('hide');
		$('#attachment_01_delete').addClass('hide');
		$(".addAttachment1_label").removeClass('hide');
		$('.attachment_01').addClass('hide');
		$('#addAttachment1-error').attr('style', 'display:none');
	}else if(parentId === 'purch_contract_attachment_01'){ 
		$(".addAttachment2_label").removeClass('hide');
		$('.attachment_02').addClass('hide');
		$('#attachment_02_delete').addClass('hide');
		$('#addAttachment2-error').attr('style', 'display:none');
		if(!$('.addAttachment2_label').hasClass('hide') && !$('.addAttachment3_label').hasClass('hide') && !$('.addAttachment4_label').hasClass('hide')){
			$('#attachVehDocImg02').removeClass('hide');
			$('.purchaseleaseContractDesc').removeClass('hide');
		}
	}else if(parentId === 'purch_contract_attachment_02'){ 
		$(".addAttachment3_label").removeClass('hide');
		$('.attachment_03').addClass('hide');
		$('#attachment_03_delete').addClass('hide');
		$('#addAttachment3-error').attr('style', 'display:none');
		if(!$('.addAttachment2_label').hasClass('hide') && !$('.addAttachment3_label').hasClass('hide') && !$('.addAttachment4_label').hasClass('hide')){
			$('#attachVehDocImg02').removeClass('hide');
			$('.purchaseleaseContractDesc').removeClass('hide');
		}
	}else if(parentId === 'purch_contract_attachment_03'){ 
		$(".addAttachment4_label").removeClass('hide');
		$('.attachment_04').addClass('hide');
		$('#attachment_04_delete').addClass('hide');
		$('#addAttachment4-error').attr('style', 'display:none');
		if(!$('.addAttachment2_label').hasClass('hide') && !$('.addAttachment3_label').hasClass('hide') && !$('.addAttachment4_label').hasClass('hide')){
			$('#attachVehDocImg02').removeClass('hide');
			$('.purchaseleaseContractDesc').removeClass('hide');
		}
	}
	var inputType = $("#"+ elementId);
	inputType.replaceWith(inputType.val('').clone(true));
}

function resetDataOnRadioBtnChange(parentId, elementClass){
	if(parentId === 'veh_reg_card_attachment'){
		$('#attachVehDocImg01').removeClass('hide');
		$('.vehRegCardDesc').removeClass('hide');
		$('#attachment_01_delete').addClass('hide');
		$(".addAttachment1_label").removeClass('hide');
		$('.attachment_01').addClass('hide');
		$('#addAttachment1-error').attr('style', 'display:none');
	}else{
		$('#attachVehDocImg02').removeClass('hide');
		$('.purchaseleaseContractDesc').removeClass('hide');
		$('.deleteAttachedFile').addClass('hide');
		$(".purchaseleaseContract_attach_label").removeClass('hide');
		$('.purchaseleaseContract_attachment').addClass('hide');
		$('#addAttachment2-error').attr('style', 'display:none');
		$('#addAttachment3-error').attr('style', 'display:none');
		$('#addAttachment4-error').attr('style', 'display:none');
	}
	var inputType = $("."+ elementClass);
	inputType.replaceWith(inputType.val('').clone(true));
}







