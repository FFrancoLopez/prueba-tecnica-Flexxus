-- 10. Calcula el sueldo mínimo de los empleados del departamento ‘Soporte’.

SELECT MIN(E.SUELDO) AS SUELDO_MINIMO 
FROM EMPLEADOS E
JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
WHERE D.DENOMINACION = 'Soporte';