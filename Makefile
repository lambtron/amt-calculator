
#
# Default.
#

default: server

#
# Tasks.
#

# Install node_modules on your machine.
install: node_modules

# Install node modules with npm.
node_modules: package.json
	@npm install
	@touch node_modules

# Clean.
clean:
	rm -rf node_modules

# Server.
server:
	python -m SimpleHTTPServer \
  `open "http://localhost:8000/docs"`

#
# Phonies.
#

.PHONY: install
.PHONY: clean
.PHONY: server