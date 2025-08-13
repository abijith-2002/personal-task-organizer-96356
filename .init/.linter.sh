#!/bin/bash
cd /home/kavia/workspace/code-generation/personal-task-organizer-96356/todo_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

