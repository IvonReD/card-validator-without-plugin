/* +++++++++++++++++ Funcion donde se valida Num de Tarjeta (algoritmo de Luhn) +++++++++++++++++++*/

const functionNumCard = element => {
  let valueCard = element.value;                                        // valor del input Num de tarjeta
  if (isNaN(valueCard) || valueCard == null || valueCard.length <= 0) { //verifica que sean numeros, que no este vacio el campo
    element.className = "error";
    console.log("Dato Incorrecto");
  } else if (!isNaN(valueCard)) {                                       //Verifica que solo sean números.
    valueCard = valueCard + "";                                        //Agrega un (no)espacio.
    valueCard = valueCard.split("").reverse().join("");                //Corta el (no)espacio, invierte el orden, une sin espacios.
    let sum = 0;                                                       //Dónde se guardará la suma para la comprobación del algoritmo.
    const digits = valueCard.length;                                   //La cantidad de digitos a comprobar.
    const parity = digits % 2;                                         //Verifica que los digitos sean par.

    for (var i = 0; i < digits; i++) {                                   //Evalua cada digito.
      let digit = parseInt(valueCard.charAt(i));                        //Pasa de string a number cada digito ubicado en i.
      if (i % 2 == parity) {                                            //Si la posición del dígito es par, lo duplica.
        digit *= 2;
      }
      if (digit > 9) {                                                  //Si el digito es menor a 9 el dígito permanece igual.
        digit -= 9;                                                    // Si es mayor a 9 se resta 9 al digito
      }
      sum += digit;                                                    //Suma los digitos.
    }

    if (sum % 10 == 0) {                                               //Si el módulo 10 de la suma es igual a cero, tarjeta valida
      console.log('La tarjeta es valida');
      element.className = "success";
      console.log("Dato Correcto");
      return true;
    }
    if (sum % 10 !== 0) {                                               //Si el módulo 10 de la suma es no igual a cero tarjeta invalida
      console.log('La tarjeta no es valida');
      element.className = "error";
      console.log("Dato Incorrecto");
      return false;
    }
  }
}


/* +++++++++++++++++ Funcion donde se valida Fecha de vencimiento +++++++++++++++++++*/

/* --- Funcion que valida Mes ---*/
const functionMonth = element => {
  let valueMonth = element.value; // valor del input mes
  // if (isNaN(valueMonth) || valueMonth == null || valueMonth.length <=0 || !/^[1-12]\d$/.test(valueMonth)==false ||/^\s*$/.test(valueMonth)|| /^[1-12]\d$/.test(valueMonth)==false|| valueMonth.replace(/\D|\-/,'') valueMonth > 12 === true ){

  if (isNaN(valueMonth) || valueMonth == null || valueMonth.length <= 0 || //isNaN hace referencia si no es numero
    valueMonth < 01 || valueMonth > 12) { //Esta Linea especifica que no puede ingresar numero negativo ni caracteres especiales
    element.className = "error";
    console.log("Dato Incorrecto");
    return false;
  } else {
    element.className = "success";
    console.log("Dato Correcto");
    return true;
  }
}


/* --- Funcion que valida Año ---*/
const functionYear = element => {
  let valueYear = element.value; // valor del input año
  if (isNaN(valueYear) || valueYear == null || valueYear.length <= 0 ||
    valueYear < 17 || valueYear > 30) {
    element.className = "error";
    console.log("Dato Incorrecto");
    return false;
  } else {
    element.className = "success";
    console.log("Dato Correcto");
    return true;
  }
}


/* +++++++++++++++++ Funcion donde se valida CVV  +++++++++++++++++++*/
const functionCvv = element => {
  let valueCvv = element.value; // valor del input CVV
  if (valueCvv > 000) { // condicion donde solo se ingresa 3 digitos inluyendo 0 al inicio
    element.className = "success";
    console.log("Dato Correcto");
    return true;
  } else {
    element.className = "error";
    console.log("Dato Incorrecto");
    return false;
  }
}


/* +++++++++++++++++ Funcion donde se valida Nombre Completo  +++++++++++++++++++*/

const functionNameUser = element => {
  const patron = /^[A-Za-z\s]*$/; // En caso de querer validar cadenas con espacios y sin numeros usar: /^[a-zA-Z\s]*$/
  let userName = element.value.toUpperCase();
  if (userName == "" || userName.search(patron) || userName < 30 === true) {
    element.className = "error";
    console.log("Dato Incorrecto");
    return false;
  } else {
    element.className = "success";
    console.log("Dato Correcto");
    return true;
  }
}

/* +++++++++++++++++ Funcion para corroborar todos los inputs +++++++++++++++++++*/
const validateCardDetails = element => { //element sera el form completo
  const formArray = Array.from(form); // Devuelve una matriz de un objeto iterable o similar a una matriz.
  console.log(formArray);
  let cardNumber = formArray[0];
  let expirationMonth = formArray[1];
  let expirationYear = formArray[2];
  let cvv = formArray[3];
  let userName = formArray[4];

  /* Bloque donde se llaman las funciones de validacion de datos */
  functionNumCard(cardNumber);
  functionMonth(expirationMonth);
  functionYear(expirationYear);
  functionCvv(cvv);
  functionNameUser(userName);

 /* Bloque donde valida todos los Inputs del formulario */
  if (functionNumCard(cardNumber) == true && functionMonth(expirationMonth) == true &&
  functionYear(expirationYear) == true && functionCvv(cvv) == true && functionNameUser(userName) ==true) {
    return true;
  }else{
    return false;
  }
}




/* +++++++++++++++++ Se denota el evento  +++++++++++++++++++*/
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  if (validateCardDetails(form)) {
    console.log("datos válido... enviar...");
  } else {
    console.log("datos inválidos");
  }
});
