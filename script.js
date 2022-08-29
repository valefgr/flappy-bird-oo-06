const juego = {
  timerId: 0,
  // 4. Agrega timerObstaculos

  gravedad: 2,
  skyHeight: 580,


  aleatorio: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  verificaColision: function () {
    if (bird.colision()) {
      juego.terminar();
    }
  },

  loop: function () {
    bird.efectoGravedad();
    // 5. Llama a obstaculos.mover()

    bird.dibujar(); 
    obstaculos.dibujar();
    juego.verificaColision();
  },

  iniciar: function () {
    document.addEventListener("keyup", bird.mover);
    obstaculos.crear();
    // 6. Asigna a juego.timerObstaculos un setInterval() que llame a obstaculos.crear cada 3000 milisegundos

    juego.timerId = setInterval(juego.loop, 20);
    
  },

  terminar: function () {  
    clearInterval(juego.timerId);
    // 7. Limpia el timer guardado dentro de juego.timerObstaculos

    juego.mostrarGameOver();
    juego.pararEfectos();
  },

  mostrarGameOver: function () {
    const mensaje = document.querySelector(".message");
    mensaje.setAttribute("id", "game-over");
  },

  pararEfectos: function () {
    let ground = document.querySelector(".ground");
    ground.removeAttribute("id");

    bird.div.setAttribute("id", "fall");
  },
};




const bird = {
  div: document.querySelector(".bird"),
  bottom: juego.aleatorio(10, 570),
  left: 250,
  width: 60,
  height: 45,

  efectoGravedad: function () {
    bird.bottom -= juego.gravedad;
  },

  dibujar: function () {
    bird.div.style.bottom = bird.bottom + "px";
    bird.div.style.left = bird.left + "px";
  },

  mover: function () {
    bird.bottom += 40;
  },

  colision: function () {
      if (bird.bottom < 0) {
        return true;
      }
    },

 
}


const obstaculos = {
  obstacleContainer: document.querySelector(".obstacles"),
  // 1. Agrega velocidad

  gap: 200,
  maxHeight: 320,
  minHeight: 50,
  width: 52,
  lista: [],

  crear: function () {
    const topObstacle = document.createElement("div");
    const bottomObstacle = document.createElement("div");
    topObstacle.classList.add("topObstacle");
    bottomObstacle.classList.add("bottomObstacle");
    obstaculos.obstacleContainer.appendChild(topObstacle);
    obstaculos.obstacleContainer.appendChild(bottomObstacle);

    topObstacleHeight = Math.max(
      Math.random() * obstaculos.maxHeight,
      obstaculos.minHeight
    );
    bottomObstacleHeight = Math.min(
      juego.skyHeight - topObstacleHeight - obstaculos.gap,
      obstaculos.maxHeight
    );

    const parObstaculos = {
      topObstacle: topObstacle,
      bottomObstacle: bottomObstacle,
      // 2. Modifica left para que tenga valor de window.innerWidth
      left: 500,
      width: obstaculos.width,
      topObstacleHeight: topObstacleHeight,
      bottomObstacleHeight: bottomObstacleHeight,
      topObstacleBottom: juego.skyHeight - topObstacleHeight,
      bottomObstacleBottom: 0,
    };
    obstaculos.lista.push(parObstaculos);
  },

  // 3. Agrega mover()
  mover: function () {
    for (var i = 0; i < obstaculos.lista.length; i++) {
      // agrega código aquí
    }
  },


  dibujar: function () {
    for (var i = 0; i < obstaculos.lista.length; i++) {
      obstaculos.lista[i].topObstacle.style.left =
        obstaculos.lista[i].left + "px";
      obstaculos.lista[i].bottomObstacle.style.left =
        obstaculos.lista[i].left + "px";

      obstaculos.lista[i].topObstacle.style.height =
        obstaculos.lista[i].topObstacleHeight + "px";
      obstaculos.lista[i].bottomObstacle.style.height =
        obstaculos.lista[i].bottomObstacleHeight + "px";
    }
  },
};




juego.iniciar();