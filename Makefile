
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

# Run production server.
server: 
	@npm start

# Run development server. REQUIRES NODEMON.
dev:
	NODE_ENV='development' nodemon -e '*.js|*.hbs' server/app.js 

#
# Phonies.
#

.PHONY: install
.PHONY: clean
.PHONY: server
.PHONY: dev