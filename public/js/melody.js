
let result;
let noteArr;
let noteAvg=0;
let noteHigh=0;
let noteLow=0;
let highMid=0;
let lowMid=0;
let avgVol=0;
let volLowMid=0;
let notePitchArr=[]
let song;
let bpmArr;
let songPath
let songLink
//getting songPath from the backend first
$(document).ready(function(err){
    $.ajax("/upload", {
        type: "GET",
        }).then(
        function(results){
            console.log(results);
            songPath=results
            var accessId = 'dd91c64b-1d0d-4a90-8e13-f08abfd81510';
            var taskUrl = 'analyze/melody';
            var parameters = { blocking: false, format: 'json', access_id: accessId };

            songLink= 'https://protected-savannah-39174.herokuapp.com/'+songPath;
            //changing the API paramaters and adding in the song (hardcoded for now).
            parameters['detailed_result'] = 'false';
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
                    //doing some math to figure out the range for the game- finding the average note pitch and the highest and lowest pitches, as well as mid points between highest and average and lowest and average. This will result in five numbers-lowest pitch, low midpoint, average, high midpoint, highest pitch, also finding the average volume of notes in the track.
                    result=data
                    noteArr=data.melody_result.notes
                    let volArr=[];
                    console.log('success melody')
                    
                    for (let i = 0; i<noteArr.length;i++){
                        noteAvg+=noteArr[i].midi_pitch;
                        notePitchArr.push(noteArr[i].midi_pitch)
                        avgVol+=noteArr[i].volume;
                        volArr.push(noteArr[i].volume)
                        
                    }
                    noteHigh=Math.max.apply(null, notePitchArr)
                    noteLow=Math.min.apply(null, notePitchArr)
                    volLow=Math.min.apply(null,volArr)
                    avgVol/=noteArr.length;
                    noteAvg/=noteArr.length;
                    volLowMid=(avgVol+volLow)/2
                    highMid=(noteAvg+noteHigh)/2
                    lowMid=(noteAvg+noteLow)/2
                    $("#analyzing").hide();
                    $("#game").append("<button id='gameStart' class='btn grey darken-4 center'> start game</button>")


                }});
            }

            function onTaskFailed(response) {
                var data = $.parseJSON(response.responseText);
                var errorMessages = data.errors.map(function(error) { return error.message; });
            
                $('#result').text('Task failed, reason: ' + errorMessages.join(','));
            }

            // start task when clicking on the "Start task" button
            $(document).ready(function() {
                $(document).on("click","#start", function() {
                    $("#start").hide();
                    $("#game").append("<p id='analyzing'> Analyzing...</p>")
                    console.log(songLink)
                    // execute an HTTP GET using the task's URL, the parameters and callback functions defined above
                    $.ajax({ url: 'https://api.sonicAPI.com/' + taskUrl, data: parameters, 
                            success: onTaskStarted, error: onTaskFailed, crossDomain: true });
                });
            });
    })
                    
                
}); 



