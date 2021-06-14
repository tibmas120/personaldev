$(document).ready(function () {
    //Datepicker
    if ($(".datepick").length > 0) {
	
        $('.input-group.datepick').datepicker({
            calendarWeeks: false,
            todayHighlight: true,
            autoclose: true	
			
        });
		$(".datepick input").on("touchstart keypress",function(e){				
            e.preventDefault();
        }); 
			
    }
	
	//Close Datepicker
    if ($(".close-datepick").length > 0) {
        $('.input-group.close-datepick').datepicker({
            calendarWeeks: false,
            todayHighlight: true,
            autoclose: true,
			startDate: '+d'	
			
        });
		$(".close-datepick input").on("touchstart keypress",function(e){		
		e.preventDefault();
		//scrollTo(0,500);            
        }); 	
			
    }

    //Datetimepicker
    if ($(".datetimepick").length > 0) {
        $('.input-group.datetimepick').datetimepicker({
            //language:  'fr',
            weekStart: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: true,
            showMeridian: 1
			
			
        });
		$(".datetimepick input").on("touchstart keypress",function(e){
            e.preventDefault();
        }); 		
    }

    //Textarea resizeable
    if ($("textarea").length > 0) {
        $("textarea").resizable();
    }

    //Add a new row to the table
    /*$(document).on("click", ".add-row", function () {
        var table_name = $(this).parents(".table-section").find(".table").attr("id");
        var table_len = $("#" + table_name + " tbody tr").length;
        if (table_len == 1) {
            $("#" + table_name + " .delete-row").removeClass("disabled");
        }
        if ($("table textarea").length > 0) {
            $("table textarea").resizable("destroy");
        }

        var table_row = $("#" + table_name + " tbody tr:first").clone().find('.form-control').val('').end().find('select.form-control').val(1).end().find('textarea').val('').end();

        $("#" + table_name).append(table_row);

        if ($("table textarea").length > 0) {
            $("table textarea").resizable();
        }
        if ($("table .datepick").length > 0) {
            $('table .input-group.datepick').datepicker({
                calendarWeeks: true,
                todayHighlight: true,
                autoclose: true
            });
        }
        //$("textarea").resizable();


    });*/
	/*$(document).on("click", ".add-row", function () {
		alert("add");
		
        if ($("table textarea").length > 0) {
			alert("text");
			$("table textarea").resizable();
        }
        if ($("table .datepick").length > 0) {
			alert("date");
            $('table .input-group.datepick').datepicker({
                calendarWeeks: true,
                todayHighlight: true,
                autoclose: true
            });
        }
    });*/

    //Delete row to the table
    /*$(document).on("click", ".delete-row", function (e) {
		debugger;
        var table_name = $(this).parents(".table").attr("id");
        if ($(this).hasClass("disabled")) {
            e.preventDefault();
        } else {
            var table_len = $("#" + table_name + " tbody tr").length;

            var table_row = $(this).parents("tr.tab-row");

            //remove rows
            if (table_len > 1) {
               $(table_row).remove();			   
            }

            //if there is only one row add class
            if (table_len === 2) {
                $("#" + table_name + " .delete-row").addClass("disabled");
            }
        }
    });*/



    //Add the row from the modal
    //    $(document).on("click", ".add-btn", function () {
    //        var parent_div = $(this).parents(".modal").attr("id");
    //
    //        //create a clone of the row
    //        var form_html = $("#" + parent_div + " .form-content").clone();
    //
    //        var field_len = form_html.find(".form-group"),
    //            captureVal = null;
    //
    //        $.each(field_len, function (index, el) {
    //
    //            //capture values from original element and not the cloned part
    //            captureVal = $("#" + parent_div + " .form-content").find('.form-control')[index].value;
    //
    //            $(el).find('.form-control').remove(); //remove form-control
    //
    //            $(el).append($('<div class="full-left cap-val">' + captureVal + '</div>')); //put updated val in div
    //
    //            //console.log($(el));
    //        })
    //
    //        var action_btns = "<div class='ed-delete-btns'><a href='#' class='text-none blue-link' data-toggle='modal' data-target='#" + parent_div + "'>Edit</a><a href='#' class='text-none blue-link delete-btn'>Delete</a></div>";
    //
    //
    //        //add class
    //        form_html.addClass(parent_div + "-row  col-xs-12 columns").prepend(action_btns);
    //
    //        //append the whole html
    //        $("." + parent_div + "-details").append(form_html);
    //        $(".content-details").addClass("tabular-content");
    //
    //
    //        //hide the modal
    //        $('#' + parent_div).modal('hide');
    //
    //        //clear form
    //        $('#' + parent_div).find('.form-control').val('')
    //    });
    //
    //
    //    //Delete the row
    //    $(document).on("click", ".delete-btn", function () {
    //        $(this).parents(".form-content").remove();
    //    });
    //
    //    $('#politics-content').on('shown.bs.modal', function (e) {
    //
    //        //check if edit is clicked
    //        if ($(e.relatedTarget).text() === 'Edit') {
    //
    //            var plainData = $(e.relatedTarget).parents('.form-content').find('.form-group'),
    //                modalData = $(e.target).find('.form-content').find('.form-group'),
    //                capVal = null;
    //
    //            $.each(plainData, function (i, el) {
    //                //capture the value
    //                capVal = $(plainData[i]).find('.cap-val').html();
    //
    //                //put the value inside the modal
    //                $(modalData[i]).find('.form-control').val(capVal).change();
    //
    //            })
    //
    //
    //        } else {
    //            //if add is clicked.. so clear the form
    //            $(e.target).find('.form-content .form-control').val('');
    //        }
    //    })

	
	
});


$(document).scroll(function(){

        var scroll_pos = $(window).scrollTop()
    if(scroll_pos > 10){

$(".next-btn").on("click", function() {
    $("body").scrollTop(0);
});
    }
    });
