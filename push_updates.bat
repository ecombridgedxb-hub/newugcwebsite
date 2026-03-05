@echo off
echo =========================================
echo       Pushing Updates to GitHub
echo =========================================

:: Ensure Git is in PATH
set PATH=%PATH%;C:\Users\Operations\AppData\Local\Programs\Git\cmd;C:\Program Files\Git\cmd

:: Check git status
git status --short

echo.
:: Ask for a commit message
set /p commitMsg="Enter your commit message (or press Enter to use 'Update files'): "
if "%commitMsg%"=="" set commitMsg=Update files

:: Stage, commit, and push
git add .
git commit -m "%commitMsg%"
git push origin main

echo.
echo =========================================
echo       Push Complete
echo =========================================
pause
