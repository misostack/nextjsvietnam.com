ROOT_DIR := $(shell pwd)
start: ## Start the development server
	@echo "Starting the development server..."
	@cd "${ROOT_DIR}" && hugo serve
setup: ## Setup
	@echo "Setting up the environment..."
	@cd "${ROOT_DIR}" && cd ./assets/themes/2022 && npm install && npm run build:dev