-- 9. ¿Cuál es el máximo sueldo de los empleados del departamento 10?

SELECT MAX(SUELDO) AS SUELDO_MAXIMO 
FROM EMPLEADOS 
WHERE DEPARTAMENTO_ID = 10;