//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//velocidadebolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

let dOponenteBolinha = 0;

//sons jogo
let raquetada;
let ponto;

//chance De Errar
let chanceDeErrar = 0;


let colidiu = false

function setup() {
  createCanvas(600, 400);
  
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponenteNpc();
//movimentaRaqueteOponenteP2();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  pontuaçao();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
      xBolinha - raio< 0){
     velocidadeXBolinha *= -1;
}
  if (yBolinha + raio> height ||
      yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
    rect(x, y, raqueteComprimento, raqueteAltura);
}


function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}


function verificaColisaoRaquete(x, y){
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
      raquetada.play();
    }
}

  
function movimentaRaqueteOponenteNpc(){
    velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - dOponenteBolinha;
  yRaqueteOponente += velocidadeYOponente
  
  if(pontosOponente > meusPontos)
  {
    dOponenteBolinha = 100;
  }
  if(pontosOponente < meusPontos && dOponenteBolinha > 50)
  {
    dOponenteBolinha -= 3;
  }
  }

function movimentaRaqueteOponenteP2(){
  if (keyIsDown(87)) {
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)) {
        yRaqueteOponente += 10;
    }
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0))
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}


function pontuaçao(){
  if (xBolinha > 590){
    meusPontos+=1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente+=1;
    ponto.play();
  }
}

function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}