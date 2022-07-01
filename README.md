# bold-modular-smartphone-scenario
Files to run the Modular Smartphone Scenario on the Bold Simulation Server

## Dependencies
The [Bold Server with LDP support](https://github.com/wintechis/bold-server-ldp).

## Running the scenario
Run `bold-server modularSmartphone` to start the server and `./run.sh` to start the simulation.

## Running the agents
Run `npm install` and then `node agent{1,2,3}.js`.

## Serve the dump files for the GUI
The dump files of the Bold Server are needed by the [GUI](https://github.com/wintechis/bold-mss-gui). When running the scenario they are automatically created inside the `dump` folder and they can be served by running `./dumpServer.py`.

## Acknowledgments

This work was partially funded by the German Federal Ministry of Education and Research through the MOSAIK project (grant no. 01IS18070A).
