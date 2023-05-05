#!/bin/bash

# Parse options
options=$(getopt -o e:f: --long env:,env-file: -- "$@")
eval set -- $options

# Loop over options
while true; do
  case "$1" in
    -e|--env)
      export ENV="$2"
      shift 2
      ;;
    -f|--env-file)
      export ENV_FILE="$2"
      shift 2
      ;;
    --)
      shift
      break
      ;;
    *)
      echo "Invalid option: $1"
      exit 1
      ;;
  esac
done
echo $ENV
echo $ENV_FILE
DOCKER_BUILD_KIT=1 docker build -t vove_managed_fe_$ENV .
docker-compose up -d