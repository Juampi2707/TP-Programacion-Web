const preguntas = [
  {
    pregunta: "¿En que planeta suceden los hechos de Nacidos de la bruma?",
    respuestas: [
      {text: "Sel", correcto: false},
      {text: "Roshar", correcto: false},
      {text: "Nalthis", correcto: false},
      {text: "Scadrial", correcto: true}
    ]
  },
  {
    pregunta: "¿En cuantos Shards/Fragmentos/Esquirlas se dividió Adonalsium?",
    respuestas: [
      {text: "13", correcto: false},
      {text: "10", correcto: false},
      {text: "16", correcto: true},
      {text: "20", correcto: false}
    ]
  },
  {
    pregunta: "Hablando de shards: ¿Cuál de estos NO lo es?",
    respuestas: [
      {text: "Fortuna", correcto: true},
      {text: "Ruina", correcto: false},
      {text: "Autonomia", correcto: false},
      {text: "Honor", correcto: false}
    ]
  },
  {
    pregunta: "¿Cuántos reinos o realidades hay según la realmática?",
    respuestas: [
      {text: "1", correcto: false},
      {text: "2", correcto: false},
      {text: "3", correcto: true},
      {text: "4", correcto: false}
    ]
  }
];

const preguntaElemento = document.getElementById("pregunta")
const botonRespuesta = document.getElementById("botones-respuesta")
const botonSiguiente = document.getElementById("boton-siguiente")

let preguntaActualIndex = 0
let puntaje = 0

function empezarQuiz(){
  preguntaActualIndex = 0
  puntaje = 0
  botonSiguiente.innerHTML = "Siguiente" //Este botón va a decir distintas cosas dependiendo de donde estoy en el quiz
  mostrarPregunta()
}

function mostrarPregunta(){
  resetState()

  let preguntaActual = preguntas[preguntaActualIndex]
  let numeroPregunta = preguntaActualIndex +1
  preguntaElemento.innerHTML = numeroPregunta + ". " + preguntaActual.pregunta

  //Cambio el contenido del boton de cada respuesta por pregunta
  preguntaActual.respuestas.forEach(respuesta => {
    const boton = document.createElement("button")
    boton.innerHTML = respuesta.text
    boton.classList.add("boton")
    botonRespuesta.appendChild(boton)
    if(respuesta.correcto){
      boton.dataset.correcto = respuesta.correcto
    }
    boton.addEventListener("click", seleccionarRespuesta)
  })
}

function resetState(){
  botonSiguiente.style.display = "none"
  //Elimino todas las respuestas anteriores
  while(botonRespuesta.firstChild){
    botonRespuesta.removeChild(botonRespuesta.firstChild)
  }

}

function mostrarPuntaje(){
  resetState();
  preguntaElemento.innerHTML = `Tu puntaje fue ${puntaje} de ${preguntas.length}!`
  botonSiguiente.innerHTML = "Volver a intentar"
  botonSiguiente.style.display = "block"
}

function seleccionarRespuesta(e){
  const botonSeleccionado = e.target
  const esCorrecto = botonSeleccionado.dataset.correcto === "true" //Me fijo si es correcto o no y le asigno el valor a la variable esCorrecto
  if(esCorrecto){
    botonSeleccionado.classList.add("correcto")
    puntaje++
  }else{
    botonSeleccionado.classList.add("incorrecto")
  }
  Array.from(botonRespuesta.children).forEach(boton => {
    if(boton.dataset.correcto === "true"){
      boton.classList.add("correcto")
    }
    boton.disabled = true
  })
  botonSiguiente.style.display = "block"
}

function handleNextButton(){
  preguntaActualIndex++
  if(preguntaActualIndex < preguntas.length){
    mostrarPregunta()
  }else{
    mostrarPuntaje()
  }
}

botonSiguiente.addEventListener("click", ()=>{
  if(preguntaActualIndex < preguntas.length){
    handleNextButton()
  }else{
    empezarQuiz()
  }
})

empezarQuiz();