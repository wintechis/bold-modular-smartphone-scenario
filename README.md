# bold-modular-smartphone-scenario
Files to run the Modular Smartphone Scenario on the Bold Simulation Server

## Running the scenario
Run `bold-server modularSmartphone` to start the server and `./run.sh` to start the simulation and some agents.

## Serve the dump files for the GUI
The dump files of the Bold Server are needed by the [GUI](https://github.com/wintechis/bold-mss-gui). When running the scenario they are automatically created inside the `dump` folder and they can be served by running `./dumpServer.py`.