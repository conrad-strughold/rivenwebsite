@echo off
setlocal

echo ======================================
echo Building Riven website for deployment...
echo ======================================
call npm run build

echo Copying index.html -> 404.html
copy /Y "docs\index.html" "docs\404.html" >nul

echo Adding and committing changes...
git add -A
git commit -m "quick deploy" >nul 2>&1

echo Pushing to GitHub...
git push

echo.
echo ✅ Deployment complete!
echo Live at: https://conrad-strughold.github.io/rivenwebsite/
echo.

endlocal
pause
