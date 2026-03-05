@echo off
echo =========================================
echo       Pulling Updates from GitHub
echo =========================================

:: Ensure Git is in PATH
set PATH=%PATH%;C:\Users\Operations\AppData\Local\Programs\Git\cmd;C:\Program Files\Git\cmd

:: Run git pull to get latest changes
git pull origin main

echo.
echo =========================================
echo       Pull Complete
echo =========================================
pause
