// 3. Plantear una clase llamada Alumno y definir como atributos su nombre y su edad. En el
// constructor realizar el ingreso de datos. Definir otros dos métodos para imprimir los datos
// ingresados y un mensaje si es mayor o no de edad (edad &gt;= 18)


// Creamos una clase llamada "Student" que tenga dos atributos: name y age. En el constructor, se ingresan los datos.
class Student {
    constructor( name, age ){
        this.name = name;
        this.age = age;
    }

    // Creamos dos métodos para imprimir los datos de cada alumno y un método para imprimir un mensaje para indicar si es mayor o menor de edad.
    printData(){
        console.log(`Nombre: ${this.name}`);
        console.log(`Edad: ${this.age}`);
    }

    isAdult(){
        if (this.age >= 18){
            console.log(`¡Hola soy ${this.name} y soy mayor de edad!`);
        }else{
            console.log(`¡Hola soy ${this.name} y soy menor de edad!`);
        }
        
    }
}

// Creamos tres objetos de la clase "Student" y los imprimimos utilizando el método "printData" y el método "isAdult".
const student1 = new Student("Juan", 16);
const student2 = new Student("Pablo", 18);
const student3 = new Student("Victor", 29);

student1.printData() & student1.isAdult();
student2.printData() & student2.isAdult();
student3.printData() & student3.isAdult();