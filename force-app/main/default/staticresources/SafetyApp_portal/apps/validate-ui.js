$().ready(function () {



    /***********************
     ** Validation method
     ** for Account Number
     ** format.
     ************************/
    $.validator.addMethod(
            "accountNumberRegex",
            function (value, element, regexp) {
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
            function (value, element, regexp) {
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
            function (value, element, regexp) {
                if (regexp.constructor != RegExp)
                    regexp = new RegExp(regexp);
                else if (regexp.global)
                    regexp.lastIndex = 0;
                return this.optional(element) || regexp.test(value);
            },
            "Please check your input."
            );

    $.validator.addMethod(
            "vinLength",
            function (value, element) {
                if (value.length < 17) {
                    return false;
                } else {
                    return true;
                }
            },
            "Please check your input."
            );

    /***********************
     ** Validation method
     ** for Phone No. format.
     ************************/
    $.validator.addMethod(
            "phoneRegex",
            function (value, element, regexp) {
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
        if (element.files.length > 0) {
            var size = element.files[0].size;
            if (size > 26214400)// checks the file more than 25 MB
                return false;
            else
                return true;
        } else
            return true;
    }, "File size error");

    /***********************
     ** Validation method
     ** for All Filesize.
     ************************/
    $.validator.addMethod("allFileSize", function (val, element) {
        if (element.files.length > 0) {
            var size = 0;
            var sizeLimit = 1024 * 25; // 25 MB
            var input1, file1, input2, file2, input3, file3;

            input1 = document.getElementById('addAttachment2');
            input2 = document.getElementById('addAttachment3');
            input3 = document.getElementById('addAttachment4');
            if (input1 && input1.files && input1.files[0]) {
                file1 = input1.files[0];
                size += file1.size / 1024;
            }

            if (input2 && input2.files && input2.files[0]) {
                file2 = input2.files[0];
                size += file2.size / 1024;
            }

            if (input3 && input3.files && input3.files[0]) {
                file3 = input3.files[0];
                size += file3.size / 1024;
            }

            if (size > sizeLimit) {
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
            function (value, element) {
                var fromDate = $('#regStartDates'),
                        toDate = $('#regEndDates');

                var startDate = $('#regStartDates').datepicker('getDate'),
                        endDate = $('#regEndDates').datepicker('getDate'),
                        //rangeDate = $('#regStartDates').datepicker('getDate'),
                        currDate = new Date();

                //If Start Date not selected, then return true
                //if(rangeDate === null){
                //return true;
                //}else{
                //End date shouldn't be more than 366 days from start date.
                //rangeDate.setDate(rangeDate.getDate()+366);
                //Application date shouldn't be outside of the entered dates
                //End date should always be later than start date.
                //return ((startDate <= currDate && endDate >= currDate) && (endDate > startDate) && (rangeDate >= endDate));
                return ((startDate <= currDate && endDate >= currDate) && (endDate > startDate));
                //return ((endDate > startDate) && (rangeDate >= endDate));
                //}
            },
            "Please enter valid registration dates (see help icon)."
            );

    /***********************
     ** Validation method
     ** for Date format.
     ************************/
    $.validator.addMethod(
				"DateFormat",
				function (value, element) {
				    return value.match(/^(0[1-9]|1[012])[- //.](0[1-9]|[12][0-9]|3[01])[- //.](19|20)\d\d$/);
				},
                " Error: The date format is not correct."
            );



    /**************************************************
     **											
     ** All validation rules and messages defined.
     **
     **************************************************/
    $('.application_form').validate({
        errorElement: 'span',
        ignore: [],
        //Rules defined for validations
        rules: {
            pgeAccNo: {
                required: true,
                accountNumberRegex: /^[0-9]{10}-[0-9]{1}$/

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
                vinRegex: /^[A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]*$/,
                vinLength: true

            },
            hiddenVehicleMake: {
                required: function () {
                    if ($(".dropdown1 select").val() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            hiddenVehicleModel: {
                required: function () {
                    if ($(".dropdown2 select").val() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            hiddenVehicleYear: {
                required: function () {
                    if ($(".dropdown3 select").val() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            /*phNo: {
                phoneRegex: /^[1-9]{1}[0-9]{9}$/
            },*/
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
                DateFormat: true
            },
            regEndDates: {
                required: true,
                DateFormat: true,
                dateLimit: true
            },
            otherDescription: {
                required: function () {
                    return $("select#sourceOfInfo option:selected").text() === 'Other';
                }
            },
            vehDocRadios: {
                required: true
            }
        },
        //Error Messages based on the validation error occuring
        messages: {
            pgeAccNo: {
                required: 'Error: This field is required.',
                accountNumberRegex: 'Error: Please enter a valid account number.'
            },
            applicantFName: {
                required: 'Error: This field is required.'
            },
            applicantLName: {
                required: 'Error: This field is required.'
            },
            emailAddress: {
                required: 'Error: This field is required.',
                emailAddrRegex: 'Error: Please enter a valid email address.'
            },
            confirmEmailAddress: {
                required: 'Error: This field is required.',
                emailAddrRegex: 'Error: Please enter a valid email address.',
                equalTo: 'Error: Please enter the same value again.'
            },
            vehicleOwnerFName: {
                required: 'Error: This field is required.'
            },
            vehicleOwnerLName: {
                required: 'Error: This field is required.'
            },
            vin: {
                required: 'Error: This field is required.',
                vinRegex: 'Error: Please enter a valid vehicle identification number.',
                vinLength: 'Error: Please enter a valid vehicle identification number.'
            },
            hiddenVehicleMake: {
                required: "Error: This field is required."
            },
            hiddenVehicleModel: {
                required: "Error: This field is required."
            },
            hiddenVehicleYear: {
                required: "Error: This field is required."
            },
            phNo: {
                //phoneRegex: 'Error: Please enter a valid number.'
                minlength: 'Error: Please enter a valid number.'
            },
            addAttachment1: {
                required: 'Error: This field is required.',
                extension: 'Error: Please upload an attachment in PDF, JPG, or PNG format.',
                filesize: 'Error: Files upto the maximum size of 25MB are allowed.'
            },
            addAttachment2: {
                extension: 'Error: Please upload an attachment in PDF, JPG, or PNG format.',
                filesize: 'Error: Files upto the maximum size of 25MB are allowed.'
            },
            addAttachment3: {
                extension: 'Error: Please upload an attachment in PDF, JPG, or PNG format.',
                filesize: 'Error: Files upto the maximum size of 25MB are allowed.'
            },
            addAttachment4: {
                extension: 'Error: Please upload an attachment in PDF, JPG, or PNG format.',
                filesize: 'Error: Files upto the maximum size of 25MB are allowed.',
                allFileSize: 'Error: Files upto the maximum size of 25MB are allowed.'
            },
            hiddenRecaptcha: {
                required: 'Error: Please choose Captcha correctly.'
            },
            regStartDates: {
                required: 'Error: This field is required.',
                DateFormat: 'Error: The date format is not correct.'
            },
            regEndDates: {
                required: 'Error: This field is required.',
                DateFormat: 'Error: The date format is not correct.',
                dateLimit: 'Error: Please enter valid registration dates (see help icon).'
            },
            otherDescription: {
                required: 'Error: This field is required.'
            },
            vehDocRadios: {
                required: 'Error: This field is required.'
            }
        },
        errorPlacement: function (error, element) {
            error.attr("role", "alert");
            if (element.is(":radio")) {
                error.appendTo(element.parents('.radio-group'));
            } else if (element.is(":checkbox")) {
                error.appendTo(element.parents('.checkbox-group'));
            } else { // This is the default behavior 
                error.insertAfter(element);
            }
        }
    });

    /******************************************
     ** Start and End date validations
     *******************************************/
    $("#regStartDates").datepicker({
        //minDate: 0,
        dateFormat: "mm/dd/yy",
        onClose: function (dateText, inst) {
            $('#regEndDates').datepicker('option', 'dateFormat', 'mm/dd/yy');
        }
    }).on('change', function () {
        $(this).valid();
    });
    $('#regEndDates').datepicker({}).on('change', function () {
        $(this).valid();
    });

    $("#phNo").mask("(000) 000-0000");

    $(document).on('change', ".dropdown1 select", function () {
        $('.application_form').validate().element('#hiddenVehicleMake');
    });
    $(document).on('change', ".dropdown2 select", function () {
        $('.application_form').validate().element('#hiddenVehicleModel');
    });
    $(document).on('change', ".dropdown3 select", function () {
        $('.application_form').validate().element('#hiddenVehicleYear');
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
            sessionStorage.setItem("purchLeaseContractAttach01", 'undefined');
            sessionStorage.setItem("purchLeaseContractAttach02", 'undefined');
            sessionStorage.setItem("purchLeaseContractAttach03", 'undefined');
			top.attachment_val_02 = 'undefined';
			top.attachment_val_03 = 'undefined';
			top.attachment_val_04 = 'undefined';
            $('#vehRegCard').attr('value', 'vehDocRadiosOption1');
            $('#purchaseleaseContract').attr('value', 'vehDocRadiosOption2');

            //aria-check
            $("label#vehRegCardLabel").attr("aria-checked", "true");
            $("label#purchaseleaseContractLabel").attr("aria-checked", "false");
        } else if ($(this).val() == "vehDocRadiosOption2") {
            $("#vehDocRadiosOption1Area").addClass('hide');
            $("#vehDocRadiosOption2Area").removeClass('hide');
            resetDataOnRadioBtnChange('purch_contract_attachment', 'addAttachment02');
            sessionStorage.setItem("vehRegCardAttach", 'undefined');
			top.attachment_val_01 = 'undefined';
            $('#vehRegCard').attr('value', 'vehDocRadiosOption1');
            $('#purchaseleaseContract').attr('value', 'vehDocRadiosOption2');
            //aria-check
            $("label#vehRegCardLabel").attr("aria-checked", "false");
            $("label#purchaseleaseContractLabel").attr("aria-checked", "true");
        }
    });
    $('select#sourceOfInfo').on('change', function (e) {
        var optionSelected = $("select#sourceOfInfo option:selected").text();
        var valueSelected = this.value;
        if (optionSelected === 'Other') {
            $("#otherDescription").removeClass('hide');
        } else {
            $("#otherDescription").addClass('hide');
            $("#otherDescription").val("");
        }
    });




    /****************************************************
     ** Making Radio button selection ADA Compliant
     *****************************************************/
      //Attachment radio button on arrow-keypress
    $('label#purchaseleaseContractLabel').on('keydown', function (e) {
        if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
            if(e.currentTarget.id === 'purchaseleaseContractLabel'){
                $('#vehRegCardLabel').focus();
            }else if(e.currentTarget.id === 'vehRegCardLabel'){
                $('#purchaseleaseContractLabel').focus();
            }
        }

    });
    $('label#vehRegCardLabel').on('keydown', function (e) {
        if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
            if(e.currentTarget.id === 'purchaseleaseContractLabel'){
                $('#vehRegCardLabel').focus();
            }else if(e.currentTarget.id === 'vehRegCardLabel'){
                $('#purchaseleaseContractLabel').focus();
            }
        }

    });

     
    //Attachment 1 - VEHREGCARD
    //On Focus of VehRegCard radio button
    $('label#vehRegCardLabel').on('keypress', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            $("#vehRegCard").click();
            $("label#vehRegCardLabel").attr("aria-checked", "true");
            $("label#purchaseleaseContractLabel").attr("aria-checked", "false");
            return false;
        }
        
    });
    //On Focus of purchaseleaseContract radio button
    $('span#attachment_01_delete').on('keypress', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            $("span#attachment_01_delete").click();
            return false;
        }
    });


    //Attachement button for VehRegCard click
    $('label.addAttachment1_label').on('keypress', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            $(".addAttachment001").click();
            return false;
        }
    });


    //Attachement 2,3,4 - PURCHASELEASECONTRACT
    //On Focus of purchaseleaseContract radio button
    $('label#purchaseleaseContractLabel').on('keypress', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            $("#purchaseleaseContract").click();
            $("label#vehRegCardLabel").attr("aria-checked", "false");
            $("label#purchaseleaseContractLabel").attr("aria-checked", "true");
            return false;
        }
    });
    //Attachement 01 button for purchaseleaseContract click
    $('label.addAttachment2_label').on('keypress', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            $(".addAttachment002").click();
            return false;
        }
    });
    //Attachement 02 button for purchaseleaseContract click
    $('label.addAttachment3_label').on('keypress', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            $(".addAttachment003").click();
            return false;
        }
    });
    //Attachement 03 button for purchaseleaseContract click
    $('label.addAttachment4_label').on('keypress', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            $(".addAttachment004").click();
            return false;
        }
    });


    $('html').mouseover(function () {
        resetDropDown();
    });

    if (sessionStorage.getItem("accountNumber"))
        $('#pgeAccNo').val(sessionStorage.getItem("accountNumber"));
    if (sessionStorage.getItem("applicantFirstName"))
        $('#applicantFName').val(sessionStorage.getItem("applicantFirstName"));
    if (sessionStorage.getItem("applicantLastName"))
        $('#applicantLName').val(sessionStorage.getItem("applicantLastName"));
    if (sessionStorage.getItem("emailAddress"))
        $('#emailAddress').val(sessionStorage.getItem("emailAddress"));
    if (sessionStorage.getItem("confirmEmailAddress"))
        $('#confirmEmailAddress').val(sessionStorage.getItem("confirmEmailAddress"));
    if (sessionStorage.getItem("phoneNumber"))
        $('#phNo').val(sessionStorage.getItem("phoneNumber"));
    if (sessionStorage.getItem("vehOwnerFName"))
        $('#vehicleOwnerFName').val(sessionStorage.getItem("vehOwnerFName"));
    if (sessionStorage.getItem("vehOwnerLName"))
        $('#vehicleOwnerLName').val(sessionStorage.getItem("vehOwnerLName"));
    if (sessionStorage.getItem("vehIdNum"))
        $('#vin').val(sessionStorage.getItem("vehIdNum"));

    if (sessionStorage.getItem("registerStartDate"))
        $('#regStartDates').val(sessionStorage.getItem("registerStartDate"));
    if (sessionStorage.getItem("registerEndDate"))
        $('#regEndDates').val(sessionStorage.getItem("registerEndDate"));


    if (sessionStorage.getItem("vehRegCardAttach") && sessionStorage.getItem("vehRegCardAttach") !== 'undefined') {
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
    if (sessionStorage.getItem("purchLeaseContractAttach01") && sessionStorage.getItem("purchLeaseContractAttach01") !== 'undefined' && sessionStorage.getItem("purchLeaseContractAttach01") !== 'null') {
        var radio = $('#purchaseleaseContract');
        radio[0].checked = true;
        radio.button("refresh");
        $('#vehDocRadiosOption2Area').removeClass('hide');
        $('#attachVehDocImg02').addClass('hide');
        $('.purchaseleaseContractDesc').addClass('hide');

        $('#attachment_02_delete').removeClass('hide');
        $(".addAttachment2_label").addClass('hide');
        $('.attachment_02').removeClass('hide');
        var attachementVal = sessionStorage.getItem("purchLeaseContractAttach01"),
                strToAddBefore = attachementVal.lastIndexOf("."),
                strToAdd = " 1 of 3";
        attachementVal = attachementVal.substring(0, strToAddBefore) + strToAdd + attachementVal.substring(strToAddBefore);
        $('.attachment_02').html(attachementVal);
    }
    if (sessionStorage.getItem("purchLeaseContractAttach02") && sessionStorage.getItem("purchLeaseContractAttach02") !== 'undefined' && sessionStorage.getItem("purchLeaseContractAttach02") !== 'null') {
        var radio = $('#purchaseleaseContract');
        radio[0].checked = true;
        radio.button("refresh");
        $('#vehDocRadiosOption2Area').removeClass('hide');
        $('#attachVehDocImg02').addClass('hide');
        $('.purchaseleaseContractDesc').addClass('hide');

        $('#attachment_03_delete').removeClass('hide');
        $(".addAttachment3_label").addClass('hide');
        $('.attachment_03').removeClass('hide');
        var attachementVal = sessionStorage.getItem("purchLeaseContractAttach02"),
                strToAddBefore = attachementVal.lastIndexOf("."),
                strToAdd = " 2 of 3";
        attachementVal = attachementVal.substring(0, strToAddBefore) + strToAdd + attachementVal.substring(strToAddBefore);
        $('.attachment_03').html(attachementVal);
    }
    if (sessionStorage.getItem("purchLeaseContractAttach03") && sessionStorage.getItem("purchLeaseContractAttach03") !== 'undefined' && sessionStorage.getItem("purchLeaseContractAttach03") !== 'null') {
        var radio = $('#purchaseleaseContract');
        radio[0].checked = true;
        radio.button("refresh");
        $('#vehDocRadiosOption2Area').removeClass('hide');
        $('#attachVehDocImg02').addClass('hide');
        $('.purchaseleaseContractDesc').addClass('hide');

        $('#attachment_04_delete').removeClass('hide');
        $(".addAttachment4_label").addClass('hide');
        $('.attachment_04').removeClass('hide');
        var attachementVal = sessionStorage.getItem("purchLeaseContractAttach03"),
                strToAddBefore = attachementVal.lastIndexOf("."),
                strToAdd = " 3 of 3";
        attachementVal = attachementVal.substring(0, strToAddBefore) + strToAdd + attachementVal.substring(strToAddBefore);
        $('.attachment_04').html(attachementVal);
    }

    //Others
    if (sessionStorage.getItem("sourceOfInfo")) {
        var sourceInfoSelect = sessionStorage.getItem("sourceOfInfo");
        if (sourceInfoSelect === 'Other') {
            $('#otherDescription').removeClass('hide');
            $('#otherDescription').val(sessionStorage.getItem("otherInfo"));
        }
        $('#sourceOfInfo').val(sourceInfoSelect).find("option[value='" + sourceInfoSelect + "']").attr('selected', true);
    }

    /******************************************
     ** Value get/set for file selected from
     ** uploading the file of type
     ** jpg/png/pdf.
     *******************************************/
    $(".addAttachment001").change(function () {
        var f = this.files[0], sizeInMb;
        if(null !== f){
            $('#addAttachment1-error').addClass('hide');
            $('#attachVehDocImg01').addClass('hide');
            $('.vehRegCardDesc').addClass('hide');
            $('#attachment_01_delete').removeClass('hide');
            var attachementVal = $(this).val().replace(/^.*[\\\/]/, '');
            $(".addAttachment1_label").addClass('hide');
            $('.attachment_01').removeClass('hide');
            $('.attachment_01').html(attachementVal);
            
            top.attachment_01_val = f;
            sizeInMb = f.size / 1024;
            top.attachment_val_01 = attachementVal;
            var sizeLimit = 1024 * 25; // 25 MB
            var fileExtension = ['jpeg', 'jpg', 'png', 'pdf'];
            if (($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1)) {
                $(this).valid(false);
                $('#addAttachment1-error').removeClass('hide');
                $("#addAttachment1-error").html("Error: Please upload an attachment in PDF, JPG, or PNG format.");
                $('#addAttachment1-error').removeAttr('style');
            } else if (sizeInMb > sizeLimit) {
                $(this).valid(false);
                $('#addAttachment1-error').removeClass('hide');
                $("#addAttachment1-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                $('#addAttachment1-error').removeAttr('style');
            } else {
                $(this).valid();
            }
        }
    });

    $(".addAttachment002").change(function () {
        var f = this.files[0], sizeInMb;
        if(null !== f){
            $('#addAttachment2-error').addClass('hide');
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
            //var f = this.files[0];
            top.attachment_02_val = f;
            top.attachment_val_02 = $(this).val().replace(/^.*[\\\/]/, '');
            sizeInMb = f.size / 1024;
            var sizeLimit = 1024 * 25; // 25 MB
            var fileExtension = ['jpeg', 'jpg', 'png', 'pdf'];
            if (($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1)) {
                $(this).valid(false);
                $('#addAttachment2-error').removeClass('hide');
                $("#addAttachment2-error").html("Error: Please upload an attachment in PDF, JPG, or PNG format.");
                $('#addAttachment2-error').removeAttr('style');
            } else if (sizeInMb > sizeLimit) {
                $(this).valid(false);
                $('#addAttachment2-error').removeClass('hide');
                $("#addAttachment2-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                $('#addAttachment2-error').removeAttr('style');
            } else {
                var input1, file2, input2, file3;
                input1 = $(".addAttachment003");
                input2 = $(".addAttachment004");
                if (input1 && input1[0] && input1[0].files && input1[0].files[0]) {
                    file2 = input1[0].files[0];
                    sizeInMb += file2.size / 1024;
                }

                if (input2 && input1[0] && input2[0].files && input2[0].files[0]) {
                    file3 = input2[0].files[0];
                    sizeInMb += file3.size / 1024;
                }

                if (sizeInMb > sizeLimit) {
                    $(this).valid(false);
                    $('#addAttachment2-error').removeClass('hide');
                    $("#addAttachment2-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                    $('#addAttachment2-error').removeAttr('style');
                } else {
                    $(this).valid();
                }
            }
        }
    });

    $(".addAttachment003").change(function () {
        var f = this.files[0], sizeInMb;
        if(null !== f){
            $('#addAttachment3-error').addClass('hide');
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
            //var f = this.files[0];
            top.attachment_03_val = f;
            top.attachment_val_03 = $(this).val().replace(/^.*[\\\/]/, '');
            sizeInMb = f.size / 1024;
            var sizeLimit = 1024 * 25; // 25 MB
            var fileExtension = ['jpeg', 'jpg', 'png', 'pdf'];
            if (($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1)) {
                $(this).valid(false);
                $('#addAttachment3-error').removeClass('hide');
                $("#addAttachment3-error").html("Error: Please upload an attachment in PDF, JPG, or PNG format.");
                $('#addAttachment3-error').removeAttr('style');
            } else if (sizeInMb > sizeLimit) {
                $(this).valid(false);
                $('#addAttachment3-error').removeClass('hide');
                $("#addAttachment3-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                $('#addAttachment3-error').removeAttr('style');
            } else {
                var input1, file2, input2, file3;
                input1 = $(".addAttachment002");
                input2 = $(".addAttachment004");
                if (input1 && input1[0] && input1[0].files && input1[0].files[0]) {
                    file2 = input1[0].files[0];
                    sizeInMb += file2.size / 1024;
                }
                if (input2 && input2[0] && input2[0].files && input2[0].files[0]) {
                    file3 = input2[0].files[0];
                    sizeInMb += file3.size / 1024;
                }
                if (sizeInMb > sizeLimit) {
                    $(this).valid(false);
                    $('#addAttachment3-error').removeClass('hide');
                    $("#addAttachment3-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                    $('#addAttachment3-error').removeAttr('style');
                } else {
                    $(this).valid();
                }
            }
        }
    });

    $(".addAttachment004").change(function () {
        var f = this.files[0], sizeInMb;
        if(null !== f){
            $('#addAttachment4-error').addClass('hide');
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
            //var f = this.files[0];
            top.attachment_04_val = f;
            top.attachment_val_04 = $(this).val().replace(/^.*[\\\/]/, '');
            //sizeInMb = f.size / 1024;
            var sizeLimit = 1024 * 25; // 25 MB
            var fileExtension = ['jpeg', 'jpg', 'png', 'pdf'];
            if (($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1)) {
                $(this).valid(false);
                $('#addAttachment4-error').removeClass('hide');
                $("#addAttachment4-error").html("Error: Please upload an attachment in PDF, JPG, or PNG format.");
                $('#addAttachment4-error').removeAttr('style');
            } else if (sizeInMb > sizeLimit) {
                $(this).valid(false);
                $('#addAttachment4-error').removeClass('hide');
                $("#addAttachment4-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                $('#addAttachment4-error').removeAttr('style');
            } else {
                var input1, file2, input2, file3;
                input1 = $(".addAttachment003");
                input2 = $(".addAttachment002");
                if (input1 && input1[0] && input1[0].files && input1[0].files[0]) {
                    file2 = input1[0].files[0];
                    sizeInMb += file2.size / 1024;
                }

                if (input2 && input2[0] && input2[0].files && input2[0].files[0]) {
                    file3 = input2[0].files[0];
                    sizeInMb += file3.size / 1024;
                }

                if (sizeInMb > sizeLimit) {
                    $(this).valid(false);
                    $('#addAttachment4-error').removeClass('hide');
                    $("#addAttachment4-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                    $('#addAttachment4-error').removeAttr('style');
                } else {
                    $(this).valid();
                }
            }
        }
    });

    //Delete button action
    $('#attachment_01_delete').click(function() {
        $('#attachVehDocImg01').removeClass('hide');
        $('.vehRegCardDesc').removeClass('hide');
        $('#attachment_01_delete').addClass('hide');
        $(".addAttachment1_label").removeClass('hide');
        $('.attachment_01').html('');//removing the text inside the attached document section.
        $('.attachment_01').addClass('hide');
        $('#addAttachment1-error').attr('style', 'display:none');
        sessionStorage.removeItem("vehRegCardAttach");
        top.attachment_val_01 = null;
        //$('.addAttachment001').val('');
        var inputType = $("." + 'addAttachment001');
        $('.addAttachment001').replaceWith($('.addAttachment001').val('').clone(true));
    });
    $('#attachment_02_delete').click(function() {
        $(".addAttachment2_label").removeClass('hide');
        $('.attachment_02').addClass('hide');
        $('#attachment_02_delete').addClass('hide');
        if (!$('.addAttachment2_label').hasClass('hide') && !$('.addAttachment3_label').hasClass('hide') && !$('.addAttachment4_label').hasClass('hide')) {
            $('#attachVehDocImg02').removeClass('hide');
            $('.purchaseleaseContractDesc').removeClass('hide');
        }
        sessionStorage.removeItem("purchLeaseContractAttach01");
        top.attachment_val_02 = null;
        var inputType = $("." + 'addAttachment002');
        inputType.replaceWith(inputType.val('').clone(true));
    });
    $('#attachment_03_delete').click(function() {
        $(".addAttachment3_label").removeClass('hide');
        $('#addAttachment2-error').attr('style', 'display:none');
        $('.attachment_03').addClass('hide');
        $('#attachment_03_delete').addClass('hide');
        $('#addAttachment3-error').attr('style', 'display:none');
        if (!$('.addAttachment2_label').hasClass('hide') && !$('.addAttachment3_label').hasClass('hide') && !$('.addAttachment4_label').hasClass('hide')) {
            $('#attachVehDocImg02').removeClass('hide');
            $('.purchaseleaseContractDesc').removeClass('hide');
        }
        sessionStorage.removeItem("purchLeaseContractAttach02");
        top.attachment_val_03 = null;
        var inputType = $("." + 'addAttachment003');
        inputType.replaceWith(inputType.val('').clone(true));
    });
    $('#attachment_04_delete').click(function() {
        $(".addAttachment4_label").removeClass('hide');
        $('.attachment_04').addClass('hide');
        $('#attachment_04_delete').addClass('hide');
        $('#addAttachment4-error').attr('style', 'display:none');
        if (!$('.addAttachment2_label').hasClass('hide') && !$('.addAttachment3_label').hasClass('hide') && !$('.addAttachment4_label').hasClass('hide')) {
            $('#attachVehDocImg02').removeClass('hide');
            $('.purchaseleaseContractDesc').removeClass('hide');
        }
        sessionStorage.removeItem("purchLeaseContractAttach03");
        top.attachment_val_04 = null;
        var inputType = $("." + 'addAttachment004');
        inputType.replaceWith(inputType.val('').clone(true));
    });
});


/***************************************************
 ** @Description: Handles the delete icon
 ** click for uploaded file.
 ** @param1: parentId passed to show/hide data.
 ** @param2: inputTypeId passed to reset the parent 
 ** element.
 *****************************************************/
/*function deleteUploadedFile(parentId, elementId) {
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
 } */

function deleteUploadedFile(parentId, elementId) {
    if (parentId === 'veh_reg_card_attachment') {
        $('#attachVehDocImg01').removeClass('hide');
        $('.vehRegCardDesc').removeClass('hide');
        $('#attachment_01_delete').addClass('hide');
        $(".addAttachment1_label").removeClass('hide');
        $('.attachment_01').addClass('hide');
        $('#addAttachment1-error').attr('style', 'display:none');
        sessionStorage.removeItem("vehRegCardAttach");
        top.attachment_val_01 = null;
    } else if (parentId === 'purch_contract_attachment_01') {
        $(".addAttachment2_label").removeClass('hide');
        $('.attachment_02').addClass('hide');
        $('#attachment_02_delete').addClass('hide');
        if (!$('.addAttachment2_label').hasClass('hide') && !$('.addAttachment3_label').hasClass('hide') && !$('.addAttachment4_label').hasClass('hide')) {
            $('#attachVehDocImg02').removeClass('hide');
            $('.purchaseleaseContractDesc').removeClass('hide');
        }
        sessionStorage.removeItem("purchLeaseContractAttach01");
        top.attachment_val_02 = null;
    } else if (parentId === 'purch_contract_attachment_02') {
        $(".addAttachment3_label").removeClass('hide');
        $('#addAttachment2-error').attr('style', 'display:none');
        $('.attachment_03').addClass('hide');
        $('#attachment_03_delete').addClass('hide');
        $('#addAttachment3-error').attr('style', 'display:none');
        if (!$('.addAttachment2_label').hasClass('hide') && !$('.addAttachment3_label').hasClass('hide') && !$('.addAttachment4_label').hasClass('hide')) {
            $('#attachVehDocImg02').removeClass('hide');
            $('.purchaseleaseContractDesc').removeClass('hide');
        }
        sessionStorage.removeItem("purchLeaseContractAttach02");
        top.attachment_val_03 = null;
    } else if (parentId === 'purch_contract_attachment_03') {
        $(".addAttachment4_label").removeClass('hide');
        $('.attachment_04').addClass('hide');
        $('#attachment_04_delete').addClass('hide');
        $('#addAttachment4-error').attr('style', 'display:none');
        if (!$('.addAttachment2_label').hasClass('hide') && !$('.addAttachment3_label').hasClass('hide') && !$('.addAttachment4_label').hasClass('hide')) {
            $('#attachVehDocImg02').removeClass('hide');
            $('.purchaseleaseContractDesc').removeClass('hide');
        }
        sessionStorage.removeItem("purchLeaseContractAttach03");
        top.attachment_val_04 = null;
    }
    var inputType = $("." + elementId);
    inputType.replaceWith(inputType.val('').clone(true));
}

function resetDataOnRadioBtnChange(parentId, elementClass) {
    if (parentId === 'veh_reg_card_attachment') {
        $('#attachVehDocImg01').removeClass('hide');
        $('.vehRegCardDesc').removeClass('hide');
        $('#attachment_01_delete').addClass('hide');
        $(".addAttachment1_label").removeClass('hide');
        $('.attachment_01').addClass('hide');
        $('#addAttachment1-error').attr('style', 'display:none');
    } else {
        $('#attachVehDocImg02').removeClass('hide');
        $('.purchaseleaseContractDesc').removeClass('hide');
        $('.deleteAttachedFile').addClass('hide');
        $(".purchaseleaseContract_attach_label").removeClass('hide');
        $('.purchaseleaseContract_attachment').addClass('hide');
        $('#addAttachment2-error').attr('style', 'display:none');
        $('#addAttachment3-error').attr('style', 'display:none');
        $('#addAttachment4-error').attr('style', 'display:none');
    }
    var inputType = $("." + elementClass);
    inputType.replaceWith(inputType.val('').clone(true));
}

function setSessionStorage() {
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

    // Before storing, checking whether the form is validated.
    if ($(".application_form").valid()) {
        //Check if the browser supports the sessionStorage
        if (typeof (Storage) !== "undefined") {
            try {
                //Getting the values
                accountNumber = $('#pgeAccNo').val();
                applicantFirstName = $('#applicantFName').val();
                applicantLastName = $('#applicantLName').val();
                emailAddress = $('#emailAddress').val();
                confirmEmailAddress = $('#confirmEmailAddress').val();
                phoneNumber = $('#phNo').val();
                vehOwnerFName = $('#vehicleOwnerFName').val();
                vehOwnerLName = $('#vehicleOwnerLName').val();
                vehIdNum = $('#vin').val();
                //vehMake =   $( "select#vehicleMake option:selected" ).text();
                //vehModel =  $( "select#vehicleModel option:selected" ).text();
                //vehYear =  $( "select#vehicleYear option:selected" ).text();
                registerStartDate = $('#regStartDates').val();
                registerEndDate = $('#regEndDates').val();
                sourceOfInfo = $("select#sourceOfInfo option:selected").text();
                if (sourceOfInfo === 'Other')
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
                //sessionStorage.setItem('vehMake', vehMake);
                //sessionStorage.setItem('vehModel', vehModel);
                //sessionStorage.setItem('vehYear', vehYear);
                sessionStorage.setItem('registerStartDate', registerStartDate);
                sessionStorage.setItem('registerEndDate', registerEndDate);

                sessionStorage.setItem('sourceOfInfo', sourceOfInfo);
                if (sourceOfInfo === 'Other')
                    sessionStorage.setItem('otherInfo', otherInfo);

                if ($('#vehRegCard').is(':checked')) {
                    if (sessionStorage.getItem("vehRegCardAttach") && sessionStorage.getItem("vehRegCardAttach") !== 'undefined') {
                        sessionStorage.setItem('vehRegCardAttach', sessionStorage.getItem("vehRegCardAttach"));
                    } else {
                        sessionStorage.setItem('vehRegCardAttach', top.attachment_val_01);
                        top.attachment_val_01 = null;
                    }
                } else {
                    if (sessionStorage.getItem("purchLeaseContractAttach01") && sessionStorage.getItem("purchLeaseContractAttach01") !== 'undefined' && sessionStorage.getItem("purchLeaseContractAttach01") !== 'null')
                        sessionStorage.setItem('purchLeaseContractAttach01', sessionStorage.getItem("purchLeaseContractAttach01"));
                    else {
                        sessionStorage.setItem('purchLeaseContractAttach01', top.attachment_val_02);
                        top.attachment_val_02 = null;
                    }
                    if (sessionStorage.getItem("purchLeaseContractAttach02") && sessionStorage.getItem("purchLeaseContractAttach02") !== 'undefined' && sessionStorage.getItem("purchLeaseContractAttach02") !== 'null')
                        sessionStorage.setItem('purchLeaseContractAttach02', sessionStorage.getItem("purchLeaseContractAttach02"));
                    else {
                        sessionStorage.setItem('purchLeaseContractAttach02', top.attachment_val_03);
                        top.attachment_val_03 = null;
                    }
                    if (sessionStorage.getItem("purchLeaseContractAttach03") && sessionStorage.getItem("purchLeaseContractAttach03") !== 'undefined' && sessionStorage.getItem("purchLeaseContractAttach03") !== 'null')
                        sessionStorage.setItem('purchLeaseContractAttach03', sessionStorage.getItem("purchLeaseContractAttach03"));
                    else {
                        sessionStorage.setItem('purchLeaseContractAttach03', top.attachment_val_04);
                        top.attachment_val_04 = null;
                    }
                }
                window.location.href = '/review.app.info.html';
                return false;
            } catch (e) {
                console.log("Error: Saving to local storage." + e);
            }
        } else {
            console.log('Sorry! No Web Storage support.');
        }
    } else {
        console.log('Please fill in all the required fields first.');
    }
}

function resetDropDown() {
    $(".dropdown1 select").attr("tabindex", "0");
    $(".dropdown2 select").attr("tabindex", "0");
    $(".dropdown3 select").attr("tabindex", "0");
    $(".dropdown1 select").addClass('btn btn-default dropdown-toggle dropdown1-val');
    $(".dropdown2 select").addClass('btn btn-default dropdown-toggle dropdown2-val');
    $(".dropdown3 select").addClass('btn btn-default dropdown-toggle dropdown3-val');

    $(".dropdown1 select option[value='']").html('Select From List');
    $(".dropdown2 select option[value='']").html('Select From List');
    $(".dropdown3 select option[value='']").html('Select From List');
    $(".dropdown2 select option[value='__']").html('Select From List');
    $(".dropdown3 select option[value='__']").html('Select From List');
}

function checkfileValidation() {
    var input1, file1, input2, file2, input3, file3, input4, file4;
    var sizeLimit = 1024 * 25; // 25 MB
    var fileExtension = ['jpeg', 'jpg', 'png', 'pdf'];
    var sizeInMb = 0;
    input1 = $(".addAttachment001");
    input2 = $(".addAttachment002");
    input3 = $(".addAttachment003");
    input4 = $(".addAttachment004");
    if ($('#vehRegCard').is(':checked')) {
        if (input1 && input1.val() == "" && (sessionStorage.getItem("vehRegCardAttach") == null || sessionStorage.getItem("vehRegCardAttach") == 'undefined' || sessionStorage.getItem("vehRegCardAttach") == 'null')) {
            $('#addAttachment1-error').removeClass('hide');
            $("#addAttachment1-error").html("Error: This field is required.");
            $('#addAttachment1-error').removeAttr('style');
            return false;
        }
    } else if ($('#purchaseleaseContract').is(':checked')) {
        if ((input2 && input2.val() == "" && (sessionStorage.getItem("purchLeaseContractAttach01") == null || sessionStorage.getItem("purchLeaseContractAttach01") == 'undefined' || sessionStorage.getItem("purchLeaseContractAttach01") == 'null')) && (input3 && input3.val() == "" && (sessionStorage.getItem("purchLeaseContractAttach02") == null || sessionStorage.getItem("purchLeaseContractAttach02") == 'undefined' || sessionStorage.getItem("purchLeaseContractAttach02") == 'null')) && (input4 && input4.val() == "" && (sessionStorage.getItem("purchLeaseContractAttach03") == null || sessionStorage.getItem("purchLeaseContractAttach03") == 'undefined' || sessionStorage.getItem("purchLeaseContractAttach03") == 'null'))) {
            $('#addAttachment4-error').removeClass('hide');
            $("#addAttachment4-error").html("Error: This field is required.");
            $('#addAttachment4-error').removeAttr('style');
            return false;
        }
    }

    if (input1 && input1.val() && input1[0]) {
        if (($.inArray(input1.val().split('.').pop().toLowerCase(), fileExtension) == -1)) {
            $('#addAttachment1-error').removeClass('hide');
            $("#addAttachment1-error").html("Error: Please upload an attachment in PDF, JPG, or PNG format.");
            $('#addAttachment1-error').removeAttr('style');
            return false;
        }
        if (input1[0].files && input1[0].files[0]) {
            file1 = input1[0].files[0];
            sizeInMb += file1.size / 1024;
            if (sizeInMb > sizeLimit) {
                $('#addAttachment1-error').removeClass('hide');
                $("#addAttachment1-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                $('#addAttachment1-error').removeAttr('style');
                return false;
            }
        }
    }


    if (input2 && input2.val() && input2[0]) {
        if (($.inArray(input2.val().split('.').pop().toLowerCase(), fileExtension) == -1)) {
            $('#addAttachment2-error').removeClass('hide');
            $("#addAttachment2-error").html("Error: Please upload an attachment in PDF, JPG, or PNG format.");
            $('#addAttachment2-error').removeAttr('style');
            return false;
        }
        if (input2[0].files && input2[0].files[0]) {
            file2 = input2[0].files[0];
            sizeInMb += file2.size / 1024;
            if (sizeInMb > sizeLimit) {
                $('#addAttachment2-error').removeClass('hide');
                $("#addAttachment2-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                $('#addAttachment2-error').removeAttr('style');
                return false;
            }
        }
    }


    if (input3 && input3.val() && input3[0]) {
        if (($.inArray(input3.val().split('.').pop().toLowerCase(), fileExtension) == -1)) {
            $('#addAttachment3-error').removeClass('hide');
            $("#addAttachment3-error").html("Error: Please upload an attachment in PDF, JPG, or PNG format.");
            $('#addAttachment3-error').removeAttr('style');
            return false;
        }
        if (input3[0].files && input3[0].files[0]) {
            file3 = input3[0].files[0];
            sizeInMb += file3.size / 1024;
            if (sizeInMb > sizeLimit) {
                $('#addAttachment3-error').removeClass('hide');
                $("#addAttachment3-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                $('#addAttachment3-error').removeAttr('style');
                return false;
            }
        }
    }


    if (input4 && input4.val() && input4[0]) {
        if (($.inArray(input4.val().split('.').pop().toLowerCase(), fileExtension) == -1)) {
            $('#addAttachment4-error').removeClass('hide');
            $("#addAttachment4-error").html("Error: Please upload an attachment in PDF, JPG, or PNG format.");
            $('#addAttachment4-error').removeAttr('style');
            return false;
        }
        if (input4[0].files && input4[0].files[0]) {
            file4 = input4[0].files[0];
            sizeInMb += file4.size / 1024;
            if (sizeInMb > sizeLimit) {
                $('#addAttachment4-error').removeClass('hide');
                $("#addAttachment4-error").html("Error: Files upto the maximum size of 25MB are allowed.");
                $('#addAttachment4-error').removeAttr('style');
                return false;
            }
        }
    }
    return true;
}

function recaptchaCallback() {
    if (grecaptcha.getResponse() == '') {
        $('#hiddenRecaptcha-error').removeClass('hide');
    } else {
        $('#hiddenRecaptcha-error').addClass('hide');
    }
};

function trim(el) {
    el.value = el.value.
	replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
	replace(/[ ]{2,}/gi, " "). // replaces multiple spaces with one space 
	replace(/\n +/, "\n"); // Removes spaces after newlines
    return;
}

        