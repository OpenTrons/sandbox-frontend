/*
'socketHandler.js' handles messages coming from the driver. It consists of
a single variable that is an object whose methods are programmatically added
to for each "configuration tab". The methods here are the "core" methods.
*/

var socketHandler = {
	'handshake' : (function(){
		return function(data) {
			console.log('socketHandler.handshake...')
			console.log(data);
			if (data.data.message.hasOwnProperty('result')) {
				if (data.data.message.result == 'success') {
					if (session_id == "") {
						session_id = data.sessionID;
						setCookie('session_id',session_id,21);
					}
					name = data.data.name;
					if (name == 'driver') {
						driver_id = data.from;
						setCookie('driver_id',driver_id,21);
					}
					if (name == 'labware') {
						labware_id = data.from;
						setCookie('labware_id',labware_id,21);
					}
					if (name == 'bootstrapper') {
						bootstrapper_id = data.from;
						setCookie('bootstrapper_id',bootstrapper_id,21);
					}

					id_url_topic = 'com.opentrons.'+session_id;
					console.log('Setting up subscribe for NEW url topic ',id_url_topic);
					globalConnection1.session.subscribe(id_url_topic, function(str) {
						try{
							console.log('message on '+id_url_topic+': '+str);
							var msg = JSON.parse(str);
							// TODO: add socketHandler here
							/* add socketHandler here */

							var msg = JSON.parse(str);
			        		//if(msg.type && socketHandler[msg.type]) socketHandler[msg.type](msg.data);
			        		//
			        		// socketHandler format is no longer {'type': ... , 'data': ... }
			        		// now it's {'name' , '' } ... TODO: run a test to confirm format and then finish this

							if (msg.type) {
								console.log('socketHandler will be called here');
								if (socketHandler[msg.type]) socketHandler[msg.type](msg);
							} else {
								console.log('error, msg missing type');
							}
						} catch(e) {
							console.log('error handling message');
							console.log(e.message);
						}
					});
					if (name == 'driver') {
						sendMessage('com.opentrons.bootstrapper_handshake',driver_id,session_id,'handshake','driver','shake','');
						if (handshake_flow.labware == false) sendMessage('com.opentrons.labware_handshake',labware_id,session_id,'handshake','labware','extend','');
						if (handshake_flow.driver == false) sendMessage('com.opentrons.driver_',labware_id,session_id,'handshake','bootstrapper','extend','');
					}
					if (name == 'labware') {
						sendMessage('com.opentrons.labware_handshake',labware_id,session_id,'handshake','labware','shake','');
					}
					if (name == 'bootstrapper') {
						sendMessage('com.opentrons.bootstrapper_handshake',bootstrapper_id,session_id,'handshake','bootstrapper','shake','');
					}
					
				}
				if (data.data.message.result == 'already_connected') {
					if (name == 'driver') {
						driver_id = data.from;
						setCookie('driver_id',driver_id,21);
					}
					if (name == 'labware') {
						labware_id = data.from;
						setCookie('labware_id',labware_id,21);
					}
					if (name == 'bootstrapper') {
						bootstrapper_id = data.from;
						setCookie('bootstrapper_id',bootstrapper_id,21);
					}
				}
			}
		}
	})(),
	'test' : (function(){
		return function(data) {
			console.log(data);
		}
	})()
};