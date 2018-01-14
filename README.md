# Bash plugin for Homebridge server

By installing this node module as a plugin for your Homebridge server (https://github.com/nfarina/homebridge), you can command the execution of any shell command or multiline shell script from your phone, using either Siri voice commands or any Homekit app.
The script was tested using Bash shell on both OS X and Debian Linux.

### Installation
1. Install homebridge using: `npm install -g homebridge`
2. Create a node_modules directory somewhere in the path in between the root and your newly installed homebridge directory. This is due to Node recursively searching the file tree starting from the running directory down to root for a directory containing a node_module directory to use as dependencies. If you place the bash plugin within this folder, upon starting homebridge the plugin should be recognized as a new device
3. Update your configuration file as described in the homebridge repository. Check the repo's `config-sample.json` for an example configuration. To configure your Bash plugin, you'll need to update the accessories field as described below.

### Configuration
Using the 'on' and 'off' field of your accessory in the config.json file, you can predefine a maximum of two shell commands or scripts (both options are shown in the example below) per accessory. Note that you will need to use two successive single-quotes (`''`) to have these automatically converted to double-quotes in the final shell command, since the json parser can't handle nested double quotation marks. A sample configuration is as follows:

```
"accessories": [
	{
		"accessory": "Bash",
		"name": "Cinema",
		"on": "./telnetExample.sh",
		"off": "sudo shutdown -r +60"
	}
]
```
By telling Siri to turn the Cinema on, it runs the included example script, which automatically starts a full length movie loaded over telnet. By telling it to turn the Cinema off, it sets a timer to shutdown in an hour. 
