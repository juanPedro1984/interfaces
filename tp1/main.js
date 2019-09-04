"use strict";

document.getElementById('pintarC').addEventListener('click',pintarContext);
document.getElementById('pintarI').addEventListener('click',pintarImagen);
document.getElementById('limpiar').addEventListener('click',limpiarCanvas);
document.getElementById('imgGrad').addEventListener('click',imagenGradiente);
document.getElementById('cargarImg').addEventListener('click',cargarImagen);
document.getElementById('filtro').addEventListener('click',filtro);
document.getElementById('imgGradColor').addEventListener('click',imagenGradienteColor);
document.addEventListener('DOMContentLoaded',cargarMatriz);

const FILAS = 10
const COL = 10;
const RANDOM = 100;

let contexto = {
  canvas : document.getElementById('canvas'),
  ctx : canvas.getContext("2d")
};

function pintarContext(){
  let ctx = contexto.ctx;
  limpiarCanvas();
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(0,0,contexto.canvas.width ,contexto.canvas.height);
}

function pintarImagen() {
  limpiarCanvas();
  let ctx = contexto.ctx;
  let r = 0;
  let g = 255;
  let b = 255;
  let a = 255;
  let imageData =  ctx.createImageData(contexto.canvas.width ,contexto.canvas.height);
    for ( let x = 0 ; x < contexto.canvas.width ; x ++){
      for ( let y = 0 ; y < contexto.canvas.height ; y ++ ){
        setPixel(imageData,x,y,r,g,b,a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x , y, r, g, b, a){
  let index = (x + y * imageData.width)*4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function limpiarCanvas() {
  let ctx = contexto.ctx;
  ctx.clearRect(0,0,contexto.canvas.width,contexto.canvas.height);
}

function imagenGradiente() {
  limpiarCanvas();
  let ctx = contexto.ctx;
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 255;
  let imageData =  ctx.createImageData(contexto.canvas.width,contexto.canvas.height);
    for ( let x = 0 ; x < contexto.canvas.width ; x ++){
      for ( let y = 0 ; y < contexto.canvas.height ; y ++ ){
        r = (y/contexto.canvas.height)*255;
        g = (y/contexto.canvas.height)*255;
        b = (y/contexto.canvas.height)*255;
        setPixel(imageData,x,y,r,g,b,a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
}
// Pintar un rectángulo en pantalla, utilizando un gradiente que vaya de negro a amarillo en la primera
// mitad del ancho del rectángulo, y de amarillo a rojo, en la segunda mitad. Por otro lado, en Y el
// degrade se mantiene constante.

function imagenGradienteColor() {
  limpiarCanvas();
  let ctx = contexto.ctx;
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 255;
  let aux = 0
  let imageData =  ctx.createImageData(contexto.canvas.width,contexto.canvas.height);
    for ( let x = 0 ; x < contexto.canvas.width; x ++){
      if(x < (contexto.canvas.width/2)){
      aux ++;
      g = (x/(contexto.canvas.width/2))*255;
      r = (x/(contexto.canvas.width/2))*255;
    }else{
      aux --;
      g = (aux/(contexto.canvas.width/2))*255;
    }
      for ( let y = 0 ; y < contexto.canvas.height ; y ++ ){
        setPixel(imageData,x,y,r,g,b,a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
}

function cargarImagen() {
  let image = new Image();
  image.src = document.getElementById('inputImg').value;
  image.crossOrigin = "anonymous";
  image.onload = function () {
    myDrawImageMethod(this);
  }
  return image;
}

function myDrawImageMethod(image) {
  let ctx = contexto.ctx;
  let w;
  let h;
  let sx;
  let sy;
  if(image.width >= image.height){
    h = image.height * (contexto.canvas.width/image.width);
    w = contexto.canvas.width;
    sx = 0;
    sy = (contexto.canvas.height - h)/2;
  }else if (image.width < image.height){
    w = image.width * ( contexto.canvas.height/image.height);
    h = contexto.canvas.height;
    sy = 0;
    sx = (contexto.canvas.width - w)/2;
  }

  ctx.drawImage(image,sx,sy,w,h);
}

function filtro() {
  let ctx = contexto.ctx;
  // let image = cargarImagen();
  let image = new Image();
  image.src = document.getElementById('inputImg').value;
  image.crossOrigin = "anonymous";
  image.onload = function () {
  myDrawImageMethod(image);
  // ctx.drawImage(image,0,0,contexto.canvas.width,contexto.canvas.height);
  let imageData = ctx.getImageData(0, 0, contexto.canvas.width, contexto.canvas.height);

    for ( let x = 0 ; x < imageData.width ; x ++){
      for ( let y = 0 ; y < imageData.height ; y ++ ){
        let i = (x + y * imageData.width)*4;

        let r = getColor(imageData, i);
        let g = getColor(imageData, i + 1);
        let b = getColor(imageData, i + 2);

        imageData.data[i] = (r+g+b)/3;
        imageData.data[i+1] = (r+g+b)/3;
        imageData.data[i+2] = (r+g+b)/3;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }
}

function getColor(imageData, index){
  return imageData.data[index];
}

function cargarMatriz(){
  let matriz = new Array (FILAS);
  let i;
  let j;

      for(i = 0; i < FILAS; i++){
        matriz [i] = new Array (COL);
        for (j = 0; j < COL ; j ++ ){
          matriz[i][j] = Math.floor(Math.random()*RANDOM);
        }
      }

console.table(matriz);
buscarMaximo(matriz);
buscarMaxMin(matriz);
calcularPromedio(matriz);
}

function buscarMaximo(matriz){
let i;
let j;
let valorMax = 0;

  for(i = 0 ; i < FILAS ; i ++ ){
    for (j = 0 ; j < COL ; j ++){
      if(matriz [i][j] > valorMax){
      valorMax = matriz [i][j];
      }
    }
  }
  console.log("valor maximo "+valorMax);
return valorMax;
}


function buscarMaxMin(matriz){
let i;
let j;
let valorMax = 0;
let valorMin = RANDOM;

  for(i = 0 ; i < FILAS ; i ++ ){
    for (j = 0 ; j < COL ; j ++){
      if((matriz [i][j] > valorMax)&&(i % 2 == 0)){
          valorMax = matriz [i][j];
        }else if ((matriz [i][j] < valorMin)&&( i % 2 != 0)){
          valorMin = matriz[i][j];
        }
    }
  }
  console.log("valor maximo "+valorMax);
  console.log("valor minimo "+valorMin);
return valorMax;
}

function calcularPromedio(matriz) {
  let i, j;
  let prom = 0
  let suma = 0;
  let arrProm = new Array (COL);

  for(i = 0 ; i < FILAS ; i ++ ){
    for (j = 0 ; j < COL ; j ++){
      suma += matriz [i][j];
    }
    prom = suma / COL;
    arrProm[i]=prom;
    console.log("suma fila : " + i + " / " + suma );
    console.log("fila : "+ i + " Promedio : " + arrProm [i] );
    suma = 0;
    }
  }
