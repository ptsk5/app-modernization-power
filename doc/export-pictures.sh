#!/bin/bash

DRAWIO_FILE=architecture.drawio
DRAWIO_UTIL=/Applications/draw.io.app/Contents/MacOS/draw.io

$DRAWIO_UTIL -x -f png --page-index 0 -b 5 --scale 2.5 -o ./pics/01_apps_components.png $DRAWIO_FILE
$DRAWIO_UTIL -x -f png --page-index 1 -b 5 --scale 2.5 -o ./pics/03_deployment_locally.png $DRAWIO_FILE
$DRAWIO_UTIL -x -f png --page-index 2 -b 5 --scale 2.5 -o ./pics/04_deployment_podman.png $DRAWIO_FILE
$DRAWIO_UTIL -x -f png --page-index 3 -b 5 --scale 2.5 -o ./pics/05_deployment_podman_compose_v1.png $DRAWIO_FILE
$DRAWIO_UTIL -x -f png --page-index 4 -b 5 --scale 2.5 -o ./pics/06_deployment_podman_compose_v2.png $DRAWIO_FILE
$DRAWIO_UTIL -x -f png --page-index 5 -b 5 --scale 2.5 -o ./pics/07_deployment_ocp.png $DRAWIO_FILE
