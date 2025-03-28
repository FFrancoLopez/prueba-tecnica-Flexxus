// 2. Realizar un programa que ingrese los sueldos de 5 operarios en un vector. Realizar la creación
// y carga del vector en el constructor. Crear un método para imprimir el vector.


// Crear una clase llamada "OperatingSalaries" que tenga un vector de sueldos y un método para imprimir el vector.
class OperatingSalaries {
    constructor() {
      this.salaries = [50000, 60000, 55000, 70000, 65000]; 
    }
  
    // Creamos un método para imprimir el vector de sueldos, utilizando un forEach para iterar sobre el vector y imprimir cada elemento.
    printSalaries() {
      console.log("Sueldos de los operarios:");
      this.salaries.forEach((salary, index) => {
        console.log(`Operario ${index + 1}: $${salary}`);
      });
    }
  }
  
  // Creamos una instancia de la clase y mostramos los sueldos de los operarios ejecutando el método "printSalaries".
  const company = new OperatingSalaries();
  company.printSalaries();
  
