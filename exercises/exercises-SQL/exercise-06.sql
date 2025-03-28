-- 6. Visualizar los departamentos con más de 5 empleados.

SELECT D.DENOMINACION, COUNT(E.ID) AS NUM_EMPLEADOS
FROM EMPLEADOS E
JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
GROUP BY D.DENOMINACION
HAVING COUNT(E.ID) > 5;