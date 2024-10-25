
let canvasXMax = 800
let canvasYMax = 800

let segments = 15;
let lines = 100;
let innerRadius;
let outerRadius;

function setup() {
  createCanvas(canvasXMax, canvasYMax);
  //da cosa è definito arc
  // width --> del canvas
  //0.20 e 0.45 li ho scelti io empiricamente
  innerRadius = width * 0.20;
  outerRadius = width * 0.45;
  noLoop();
}

function draw() {
  background(224);
  //traslo punto di origine al centro del canvas
  translate(width / 2, height / 2);
  
  //cerchio esterno --> lo compongo attraverso archi (archi diventano "spicchi")
  for (let i = 0; i < segments; i++) {
    //angolo iniziale e finale del singolo spicchio
    //si crea superficie colorata che ha come inizio angolo inizale dell'arco e come fine angolo finale dell'arco
    //map è funzione che serve a "tradurre" numero del segmento (0-15) nel suo rispettivo angolo (0-TWO_PI)
    //map(valore da tradurre, inizio 1 intervallo, fine 1 intervallo, inizio 2 intervallo, fine 2 intervallo)
    let startAngle = map(i, 0, segments, 0, TWO_PI);
    let endAngle = map(i + 1, 0, segments, 0, TWO_PI);
    
    //devo dare effetto sfumatura --> blend da colore 1 a colore 2
    let c1 = color(random(255), random(255), random(255));
    let c2 = color(random(255), random(255), random(255));
    
    //funzione che scrivo io, non esiste già in p5
    drawSegment(startAngle, endAngle, c1, c2, innerRadius, outerRadius);
  }

  for (let i = 0; i < segments; i++) {
    let startAngle = map(i, 0, segments, 0, TWO_PI);
    let endAngle = map(i + 1, 0, segments, 0, TWO_PI);
    
    let c1 = color(random(255), random(255), random(255));
    let c2 = color(random(255), random(255), random(255));
    
    //uguale a ciclo for di prima ma riferito a "circonferenza piccola"
    drawSegment(startAngle, endAngle, c1, c2, 0, innerRadius);
  }
  
  for (let i = 0; i < lines; i++) {
    let c = color(random(255), random(255), random(255));
    let weight = random(0.1, 0.5);
    let angle = TWO_PI / random(1, 10);
    let lenght = random((outerRadius-10), outerRadius);
    
    stroke(c);
    strokeWeight(weight);
    rotate(angle);

    line(0, 0, lenght, 0);
  }
  
  noFill();
  stroke(255);
  strokeWeight(5);
  circle(0, 0, outerRadius * 2);
}

function drawSegment(startAngle, endAngle, c1, c2, innerRadius, outerRadius) {
  for (let k = innerRadius; k <= outerRadius; k++) {
    let inter = map(k, innerRadius, outerRadius, 0, 1);
    //lerpColor crea tante piccole sezioni di colore che poi danno come risultato sfumatura
    let c = lerpColor(c1, c2, inter);
    //do colore alla stroke perché archetto non ha fill
    //metto noFill perché altrimenti fill coprirebbe colore (c)
    //colore stroke diventa risultato di lerpColor
    stroke(c);
    strokeWeight(2);
    noFill();
    //se avessi fill tutti i riempimenti degli archetti insieme darebbero superficie di un colore unico
    arc(0, 0, k * 2, k * 2, startAngle, endAngle);
  }
}
