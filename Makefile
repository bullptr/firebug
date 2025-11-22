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
	@echo "Starting front-end development server..."
	@cd app && pnpm run dev

back:
	@cls
	@echo "Starting back-end development server..."
	@uv run --env-file .env main.py

build:
	@cls
	@echo "Building front-end..."
	@cd app && pnpm run build

serve:
	@cls
	@echo "Serving..."
	@uv run uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
