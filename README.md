#Bash plugin for Homebridge server

By installing this plugin as a node module for your Homebridge server (https://github.com/nfarina/homebridge), you can command the execution any bash script or separate sequence of bash commands by a simple siri command.
<br>
####Installation
After installing homebridge, create a node_modules directory somewhere in the path in between the root and where your homebridge directory is. This is due to nodejs recursively searching the file tree starting from the running directory down to root for a directory containing a node_module directory to use as dependencies. If you place the bash plugin within this folder, upon starting homebridge the plugin should be recognized as a new device
<br>
####Configuration
Use the config file to place the path (relative or absolute) to the bash script you want to execute, or specify a value in the "command" field to directly execute that sequence of commands. Since the json parser uses the " " quotation marks to determine the end of the string,
