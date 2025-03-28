// 4. JavaScript ES6: Dados los siguientes array, imprimir por consola los elementos del array “y”
// que no se encuentran en el array “x” utilizando para tal fin una única línea de código. 

const x =  ["n", "bro", "c", "|"]; 
const y = ["d", "n", "l", "bro", "g"]; 

// En una sola linea de codigo, utlizamos el metodo filter para filtrar e imprimir los elementos del array "y" que no esten en el array "x".
console.log(y.filter(e => !x.includes(e)));