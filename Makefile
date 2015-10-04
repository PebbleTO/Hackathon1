PEBBLE_BIN = /usr/local/bin/pebble

all: clean build emulate

clean:
	${PEBBLE_BIN} clean

build:
	${PEBBLE_BIN} build

emulate:
	${PEBBLE_BIN} install --emulator basalt
