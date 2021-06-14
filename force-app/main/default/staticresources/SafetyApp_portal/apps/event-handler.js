$().ready(function() {

	//Navigate back to homepage on Back button click
	$(".backBtn").click(function(){
		var url = jQuery(location).attr('href');
		var strToAdd = url.lastIndexOf('/');
		url = url.substring(0, strToAdd) + '/clean.fuel.rebate.app.html';
	    window.location.href = url;
	});

	//Navigate to status on NEXT button click
	$("#submitBtn").click(function(){
            alert('ssdfdsaf');
		if ($('input#tAndC').prop('checked')) {
			sessionStorage.clear();
			var url = jQuery(location).attr('href');
			var strToAdd = url.lastIndexOf('/');
			url = url.substring(0, strToAdd) + '/app.status.html';
		    window.location.href = url;
		}else{
			console.log('Please accept the terms and conditions.');
		}
	});

});