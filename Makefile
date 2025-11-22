.PHONY: all setup seed front back build serve

all: setup

setup:
	@cls
	@echo "Setting up the development environment..."
	@uv sync
	@cd app && pnpm install

seed:
	@cls
	@echo "Seeding the database..."
	@uv run ./scripts/seed_db.py

front:
	@cls
	@echo "Running front-end dev server..."
	@cd app && pnpm run dev

back:
	@cls
	@echo "Running back-end dev server..."
	@uv run --env-file .env main.py

build:
	@cls
	@echo "Building front-end..."
	@cd app && pnpm run build

serve:
	@cls
	@echo "Serving..."
	@uv run uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4

docker:
	@cls
	@echo "Building Docker image..."
	@docker build -t firebug .
	@echo "Running Docker container..."
	@docker run -p 8080:80 firebug
