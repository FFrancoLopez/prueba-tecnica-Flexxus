-- 4. Seleccionar el nombre, el puesto y sueldo de los empleados que trabajan en la localidad Carlos Paz.

SELECT E.NOMBRES, P.PUESTO, E.SUELDO 
FROM EMPLEADOS E
JOIN PUESTOS P ON E.PUESTO_ID = P.ID
JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
WHERE L.LOCALIDAD = 'Carlos Paz';