$().ready(function() {
    
        var maxStringSize = 6000000; //Maximum String size is 6,000,000 characters
        var maxFileSize = 40000000; //After Base64 Encoding, this is the max file size
        var chunkSize = 950000; //Maximum Javascript Remoting message size is 1,000,000 characters
        var attachment;
        var attachmentName;
        var fileSize;
        var positionIndex;
        var doneUploading;
        var recordId;
        var flag;
        
    function isUserAcctValid() {
       alert("HI");
        var userAcctNo = document.getElementById('pgeAccNo').value;
        alert("userAcctNo:"+userAcctNo);
        
                      
                      LCFSControllerExtensionRemote.createRecord(
                        userAcctNo, document.getElementById('applicantFName').value, 
                        function(result, event){
                            alert(result);
                            if (event.status) {
                                // Get DOM IDs for HTML and Visualforce elements like this
                                   console.log("**********Result IS: " + result);
                                  recordId = result;
                                  if(recordId != null){
                                     alert ("Inside recordId "+recordId );
                                     uploadFile(recordId);
                                  }
                                  
                            } else if (event.type === 'exception') {
                                document.getElementById("responseErrors").innerHTML = 
                                    event.message + "<br/>\n<pre>" + event.where + "</pre>";
                            } else {
                                document.getElementById("responseErrors").innerHTML = event.message;
                            }
                             alert(result);
                             alert("recordId:"+recordId);
                        }, 
                        {escape: true}
                        
                    );
                    
        
        
   return flag;     
   }     
        







//Method to prepare a file to be attached to the Account bound to the page by the standardController
function uploadFile(recordId) {
alert ("In uploadFile!!" + recordId);
        var file = document.getElementById('addAttachment1').files[0];
        alert ("File Name" + file.name);
        console.log(file);
        if (file != undefined) {
if (file.size <= maxFileSize) {
attachmentName = file.name;
        var fileReader = new FileReader();
        fileReader.onloadend = function(e) {
        attachment = window.btoa(this.result); //Base 64 encode the file before sending it
                positionIndex = 0;
                fileSize = attachment.length;
                console.log("Total Attachment Length: " + fileSize);
                doneUploading = false;
                if (fileSize < maxStringSize) {
        uploadAttachment(null);
        } else {
        alert("Base 64 Encoded file is too large.  Maximum size is " + maxStringSize + " your file is " + fileSize + ".");
        }

        }
fileReader.onerror = function(e) {
alert("There was an error reading the file.  Please try again.");
}
fileReader.onabort = function(e) {
alert("There was an error reading the file.  Please try again.");
}

fileReader.readAsBinaryString(file); //Read the body of the file

} else {
alert("File must be under 4.3 MB in size.  Your file is too large.  Please try again.");
}
} else {
alert("You must choose a file before trying to upload it");
}
}

//Method to send a file to be attached to the Account bound to the page by the standardController
//Sends parameters: Account Id, Attachment (body), Attachment Name, and the Id of the Attachment if it exists to the controller   
function uploadAttachment(fileId) {
alert ("**In uploadAttachment****..FileId" + fileId);
        var attachmentBody = "";
        if (fileSize <= positionIndex + chunkSize) {
attachmentBody = attachment.substring(positionIndex);
        doneUploading = true;
} else {
attachmentBody = attachment.substring(positionIndex, positionIndex + chunkSize);
}
console.log("Uploading " + attachmentBody.length + " chars of " + fileSize);
        LCFSControllerExtensionRemote.doUploadAttachment(
                recordId, attachmentBody, attachmentName, fileId,
                function(result, event) {
                console.log(result);
                        if (event.type === 'exception') {
                console.log("exception");
                        console.log(event);
                } else if (event.status) {
                if (result.substring(0, 3) == '00P') {
                if (doneUploading == true) {
                window.open("/recordId", "_blank");
                        window.location.reload();
                } else {
                positionIndex += chunkSize;
                        uploadAttachment(result);
                }
                }
                } else {
                console.log(event.message);
                }
                },
        {buffer: true, escape: true, timeout: 120000}
        );
}
});






        