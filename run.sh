#!/bin/bash

echo "Starting backend and frontend..."

# Start backend
cd backend || exit 1
go mod tidy && go run . &     # or: go run main.go
BACKEND_PID=$!

# Start frontend
cd ../frontend || exit 1
if command -v yarn &> /dev/null; then
  yarn && yarn dev &
else
  npm install && npm run dev &
fi
FRONTEND_PID=$!

# Stop both on Ctrl+C
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

wait