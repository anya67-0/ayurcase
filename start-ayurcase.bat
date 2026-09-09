@echo off
title AyurCase - Digital Ayurvedic Patient Case Management System
echo ====================================================================
echo   AyurCase (SIH 2026 - Problem Statement SIH26047)
echo   Ministry of Ayush / All India Institute of Ayurveda (AIIA)
echo ====================================================================
echo.
set PATH=C:\Program Files\nodejs;%PATH%
echo Launching AyurCase Web Application at http://localhost:5173/ ...
echo.
start http://localhost:5173/
npx vite preview --port 5173 --host
pause
