let result2;
let beatArr;

$(document).ready(function(err){
    $.ajax("/upload", {
        type: "GET",
        }).then(
        function(results){
            console.log(results);
            let songPath2=results

                var accessId = 'dd91c64b-1d0d-4a90-8e13-f08abfd81510';
                var taskUrl = 'analyze/tempo';
                var parameters = { blocking: false, format: 'json', access_id: accessId };


                let songLink2='https://protected-savannah-39174.herokuapp.com/'+songPath2;
                // the values for these parameters were taken from the corresponding controls in the demo form
                parameters['input_file'] = songLink;
                    
                function onTaskStarted(data) {
                    var fileId = data.file.file_id;
                    
                    // request task progress every 500ms
                    var polling = setInterval(pollTaskProgress, 500);
                
                    function pollTaskProgress() {
                        $.ajax({ url: 'https://api.sonicAPI.com/file/status?file_id=' + fileId + '&access_id=' + accessId + '&format=json', 
                                crossDomain: true, success: function(data) {
                            if (data.file.status == 'ready') {
                                onTaskSucceeded(fileId);
                                clearInterval(polling);
                            } else if (data.file.status == 'working') {
                                $('#result').text(data.file.progress + '% done');
                            }
                        }});
                    }
                }

                function onTaskSucceeded(fileId) {
                    var downloadUrl = 'https://api.sonicAPI.com/file/download?file_id=' + fileId + '&access_id=' + accessId + '&format=json';
                    
                    $.ajax({ url: downloadUrl, crossDomain: true, success: function(data) {
                        console.log(data)
                        result2=data
                        beatArr=data.auftakt_result.click_marks;
                        console.log(beatArr)

                    }});
                }

                function onTaskFailed(response) {
                    var data = $.parseJSON(response.responseText);
                    var errorMessages = data.errors.map(function(error) { return error.message; });

                    console.log(errorMessages.join(','))
                
                    $('#result').text('Task failed, reason: ' + errorMessages.join(','));
                }

                // start task when clicking on the "Start task" button
                $(document).ready(function() {
                    $('#start').click(function() {
                        // execute an HTTP GET using the task's URL, the parameters and callback functions defined above
                        $.ajax({ url: 'https://api.sonicAPI.com/' + taskUrl, data: parameters, 
                                success: onTaskStarted, error: onTaskFailed, crossDomain: true });
                    });
                });
});
})