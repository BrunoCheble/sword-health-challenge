#!/bin/sh


set -e

yarn
sleep 10
yarn typeorm migration:run

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ];
  then
    set -- $@
fi

exec $@
