-- 7. Nombre de los empleados que trabajan en Córdoba y cuyo puesto sea ‘Analista’ o ‘Programador’.

SELECT E.NOMBRES 
FROM EMPLEADOS E
JOIN PUESTOS P ON E.PUESTO_ID = P.ID
JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
WHERE L.LOCALIDAD = 'Córdoba' AND (P.PUESTO = 'Analista' OR P.PUESTO = 'Programador');