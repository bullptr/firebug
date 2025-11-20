.PHONY: all front back build serve

all: front back

seed_db:
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
	@pnpm run build
	@echo "Building back-end..."
	@uv build

serve:
	@cls
	@echo "Serving..."
	@uv run uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
