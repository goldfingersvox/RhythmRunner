var config = {
    apiKey: "AIzaSyDSRp9WUh4ZJ6vjPdAjgjmrCCpcMj7KQRc",
    authDomain: "rythemrunnr.firebaseapp.com",
    databaseURL: "https://rythemrunnr.firebaseio.com",
    projectId: "rythemrunnr",
    storageBucket: "rythemrunnr.appspot.com",
    messagingSenderId: "575687161188"
  };
  firebase.initializeApp(config);
//get melody starts here
let storage = firebase.app().storage
let storageRef = firebase.storage().ref();
let result;
let noteArr;
let noteAvg=0;
let noteHigh=0;
let noteLow=0;
let highMid=0;
let lowMid=0;
let notePitchArr=[]
let song;
let bpmArr;
window.onload = function() {
//uploading the user's song to firebase
    let fileButton =$("#song")
    $(fileButton).on("change", function(e){
        let file= e.target.files[0]

        let storageRef=firebase.storage().ref("songs/"+file.name);

        storageRef.put(file).then(function(snapshot){
            console.log('Uploaded a blob or file!');
            console.log(snapshot)
            //then fetching the url to the song

            storageRef.getDownloadURL().then(function(url){
                song=url

            })

        })


    })





var accessId = 'ca88977b-8027-4906-b6c6-8c2a10948caf';
var taskUrl = 'analyze/melody';
var parameters = { blocking: false, format: 'json', access_id: accessId };


//changing the API paramaters and adding in the song (hardcoded for now).
parameters['detailed_result'] = 'false';
parameters['input_file'] = "https://s1.vocaroo.com/media/download_temp/Vocaroo_s1Zf5DxjkHnz.mp3";

    
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
        //doing some math to figure out the range for the game- finding the average note pitch and the highest and lowest pitches, as well as mid points between highest and average and lowest and average. This will result in five numbers-lowest pitch, low midpoint, average, high midpoint, highest pitch
          result=data
          noteArr=data.melody_result.notes
          console.log('success')
          
          for (let i = 0; i<noteArr.length;i++){
            noteAvg+=noteArr[i].midi_pitch;
            notePitchArr.push(noteArr[i].midi_pitch)
            
          }
          noteHigh=Math.max.apply(null, notePitchArr)
          noteLow=Math.min.apply(null, notePitchArr)
          noteAvg/=noteArr.length;
          highMid=(noteAvg+noteHigh)/2
          lowMid=(noteAvg+noteLow)/2
          /*console.log(noteArr)
          console.log(noteAvg)
          console.log(noteHigh)
          console.log(noteLow)
          console.log(highMid)
          console.log(lowMid)*/

          $("body").append("<button id='gameStart'>start game</button>")

    }});
}

function onTaskFailed(response) {
    var data = $.parseJSON(response.responseText);
    var errorMessages = data.errors.map(function(error) { return error.message; });
 
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
 
  };

var accessId2 = 'ca88977b-8027-4906-b6c6-8c2a10948caf';
var taskUrl2 = 'analyze/tempo';
var parameters2 = { blocking: false, format: 'json', access_id: accessId2 };

// the values for these parameters were taken from the corresponding controls in the demo form
parameters2['input_file'] = 'https://s1.vocaroo.com/media/download_temp/Vocaroo_s1Zf5DxjkHnz.mp3';
    
function onTaskStarted(data) {
    var fileId2 = data.file.file_id;
    
    // request task progress every 500ms
    var polling2 = setInterval(pollTaskProgress, 500);
   
    function pollTaskProgress() {
        $.ajax({ url: 'https://api.sonicAPI.com/file/status?file_id=' + fileId2 + '&access_id=' + accessId2 + '&format=json', 
                 crossDomain: true, success: function(data) {
            if (data.file.status == 'ready') {
                onTaskSucceeded(fileId2);
                clearInterval(polling2);
            } else if (data.file.status == 'working') {
                $('#result').text(data.file.progress + '% done');
            }
        }});
    }
}

function onTaskSucceeded(fileId2) {
    var downloadUrl2 = 'https://api.sonicAPI.com/file/download?file_id=' + fileId2 + '&access_id=' + accessId2 + '&format=json';
    
    $.ajax({ url: downloadUrl2, crossDomain: true, success: function(data) {
        console.log(data.auftakt_result.click_marks);
        bpmArr=data.auftakt_result.click_marks
    }});
}

function onTaskFailed(response) {
    var data = $.parseJSON(response.responseText);
    var errorMessages = data.errors.map(function(error) { return error.message; });
 
    $('#result').text('Task failed, reason: ' + errorMessages.join(','));
}

// start task when clicking on the "Start task" button
$(document).ready(function() {
    $('#start').click(function() {
    	// execute an HTTP GET using the task's URL, the parameters and callback functions defined above
        $.ajax({ url: 'https://api.sonicAPI.com/' + taskUrl2, data: parameters2, 
                 success: onTaskStarted, error: onTaskFailed, crossDomain: true });
    });
});