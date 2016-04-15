/*
This script can be used as a node.js plugin for Homebridge (https://github.com/nfarina/homebridge).
While homebridge is running, a user can easily execute predefined shell commands (single or multiline) via Siri or any installed homekit app.
*/

var Service;
var Characteristic;

var	util = require('util'),
    exec = require('child_process').exec,
    child;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory('homebridge-bash', 'Bash', bashAccessory);
}


function bashAccessory(log, config) {
	this.log = log;
	this.service = 'Switch';
	this.name = config['name'];

	//retrieve fields from the config.json file
	this.onCommand = config['on'];
	this.offCommand = config['off'];
}

bashAccessory.prototype.setState = function(powerOn, callback) {
	var accessory = this;
	var state = powerOn ? 'on' : 'off';
	var prop = state + 'Command';
	var command = accessory[prop].replace(/''/g, '"');			//globally replace all occurrences of two seperate quotation marks with a double quotation mark

	child = exec(command, 						// execute 'on' or 'off' field in the config.json
  		function (error, stdout, stderr) {      // capture data and/or errors
    		console.log('stdout: ' + stdout);
    		console.log('stderr: ' + stderr);
    		if (error !== null) {
      			console.log('exec error: ' + error);
    		} else {
    			accessory.log('Set ' + accessory.name + ' to ' + state);
    		}
	});

}

bashAccessory.prototype.getServices = function() {					//.prototype allows to add new methods to the already existing prototype of the object
	var informationService = new Service.AccessoryInformation();
	var switchService = new Service.Switch(this.name);
	//var doorService;

	informationService
		.setCharacteristic(Characteristic.Manufacturer, 'Tim Nederveen')
		.setCharacteristic(Characteristic.Model, 'Bash execution for Homekit')
		.setCharacteristic(Characteristic.SerialNumber, '137');

	switchService
		.getCharacteristic(Characteristic.On)
		.on('set', this.setState.bind(this));

	return [switchService];
}