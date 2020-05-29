function pesosADivisas(valNum, accion){
  console.log(accion + " hola" + accion.getUltimo);
  document.getElementById("inputDivisas").value= valNum * accion.getInverso();
}
function divisasAPesos(valNum, accion){
  console.log(accion + " hola" + accion.getUltimo);
  document.getElementById("inputPesos").value=valNum* accion.getUltimo();
}