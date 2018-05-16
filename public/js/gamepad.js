var listener = new GamepadListener({
    analog: false,
    deadZone: 0.3
});

function init() {
    var listener = new GamepadListener({}, false);
    listener.on('gamepad:connected', function (e) {
        console.log('connected', e);
        var index = e.detail.gamepad.index,
            id = e.detail.gamepad.id;
       
    });
    listener.on('gamepad:disconnected', function (e) {
        var index = e.detail.index;
        outputLog(index, "Disconnected: " + names[index].innerHTML, e.detail);
        console.log("gamepad disconnected")
    });
    

    listener.on('gamepad:button', function (e) {
        var index = e.detail.gamepad.index,
            button = e.detail.index,
            pressed = e.detail.pressed ? 'pressed' : 'released',
            value = e.detail.value;
            if(button==0){
                jQuery.event.trigger({ type: 'keydown', which: 40 });
            }
            else if(button==1){
                jQuery.event.trigger({ type: 'keydown', which: 39 });

            }
            else if(button==2){
                jQuery.event.trigger({ type: 'keydown', which: 37 });

            }
            else if(button==3){
                jQuery.event.trigger({ type: 'keydown', which: 38 });

            }
    });
    listener.start();
}

window.addEventListener('load', init);