@echo off
title Upload File - Active
:a
cls
color 0a
node --max-old-space-size=128 app.js
title Upload File - Killed
goto a