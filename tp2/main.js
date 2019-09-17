"use strict";

document.addEventListener('DOMContentLoaded',pintarCanvas);
document.addEventListener('dblclick',dobleClick);
document.addEventListener('DOMContentLoaded',detectarClick);
// document.addEventListener('keydown', keydown);
// // document.addEventListener('keypress', keyPress);
// document.addEventListener('keyup', keyUp);
document.getElementById('cerrarPoligono').addEventListener('click', cerrarPoligono);
document.getElementById('limpiarCanvas').addEventListener('click', limpiarCanvas);

let contexto = {
canvas : document.getElementById('canvas'),
ctx : canvas.getContext('2d')
};

contexto.canvas.addEventListener('mousedown', mouseDown);
contexto.canvas.addEventListener('mousemove',mouseMove);
contexto.canvas.addEventListener('mousemove',moverPunto);
contexto.canvas.addEventListener('mouseup', mouseUp);

let puntos = [];
let lineas = [];
let poligono = [];
let poligonos = [];
let aux = null;
let puntoAux = null;
let lineasAux = null;

function Linea (iX,iY,fX,fY,c) {

      this.iX = iX;
      this.iY = iY;
      this.fX = fX;
      this.fY = fY;
      this.c  = c;

      Linea.prototype.dibujarLinea = function(){
        let ctx  = contexto.ctx;
        ctx.beginPath();
        ctx.strokeStyle = this.c;
        ctx.moveTo(this.iX,this.iY);
        ctx.lineTo(this.fX,this.fY);
        ctx.stroke();
        ctx.closePath();
      }

}

function Circulo( x , y , r , c, pos){

      this.x = x;
      this.y = y;
      this.r = r;
      this.c = c;
      this.pos = pos;

    Circulo.prototype.borrar = function (){
      puntos.splice(this.pos , 1);
      // let ctx = contexto.ctx;
      // ctx.beginPath();
      // ctx.clearRect(this.x - this.r -1 , this.y - this.r - 1, this.r *2 +2 , this.r*2 + 2);
      // ctx.fillStyle = 'grey';
      // ctx.fillRect(this.x - this.r -1 , this.y - this.r - 1, this.r *2 +2 , this.r*2 + 2);
      // ctx.closePath();
    }

    Circulo.prototype.dibujarCirculo = function(){
      let ctx = contexto.ctx;
      ctx.beginPath();
      ctx.fillStyle = this.c;
      ctx.strokeStyle = this.c;
      ctx.arc( this.x , this.y , this.r , 0 , 2*Math.PI , false );
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
}

function Poligono(puntos , lineas , centro, pos){
   this.puntos = puntos;
   this.lineas = lineas;
   this.centro = centro;
   this.pos = pos;
   let distRelativas = [];

   Poligono.prototype.getDistR = function (){
     return distRelativas;
   }

   Poligono.prototype.borrarPunto = function (i){
     this.puntos.splice(i,1);
   }

   Poligono.prototype.distRelativa = function(){
     for(let i = 0 ; i < this.puntos.length ; i++){
       let dist = {
         x : 0,
         y : 0
       };
       dist.x = this.puntos[i].x - this.centro.x;
       dist.y = this.puntos[i].y - this.centro.y;
       // console.log(dist);
       distRelativas[i]=dist;
     };
   }
   this.distRelativa();
}
// function cambiarColor(){
// let cont = 0;
// if(event.deltaY == 3){
//   cont ++;
// }else if(event.deltaX == -3){
//   cont--;
// }
//  console.log(cont);
// }
// function keydown(){
//   if(event.key == "c"){
//     document.addEventListener("wheel",cambiarColor);
//   }
// }
//
// function keyUp(){
// document.removeEventListener("wheel",cambiarColor);
// }

function detectarClick(){
if(aux === null){
  contexto.canvas.onclick = function(e){
    console.log("x: "+event.x +" y: "+event.y);
    let x = e.offsetX;
    let y = e.offsetY;
    let punto = new Circulo(x,y,5,"red",puntos.length);
    puntos.push(punto);
    punto.dibujarCirculo();
    trazarLinea();
  }
  }
}

function dobleClick(e){
let h = 0 ;
let px,py,pr,cx,cy,cr;

    if(puntos.length > 0){
        while(h<puntos.length){
            px = puntos[h].x;
            py = puntos[h].y;
            pr = puntos[h].r;
            if((e.offsetX<(px+pr))&&(e.offsetX>(px-pr))&&(e.offsetY<(py+pr)&&(e.offsetX>(py-pr)))){
              puntos[h].borrar();
              actualizar();
            }
            h++;
          }
        }

    for(let i = 0 ; i < poligonos.length ; i++){
     for(let j = 0; j<poligonos[i].puntos.length ; j++){
       px = poligonos[i].puntos[j].x;
       py = poligonos[i].puntos[j].y;
       pr = poligonos[i].puntos[j].r;
         if((e.offsetX<(px+pr))&&(e.offsetX>(px-pr))&&(e.offsetY<(py+pr)&&(e.offsetX>(py-pr)))){
           poligonos[i].puntos[j].borrar();
           poligonos[i].borrarPunto( j );
           actualizar();
            }
          }
      cx = poligonos[i].centro.x;
      cy = poligonos[i].centro.y;
      cr = poligonos[i].centro.r;
        if((e.offsetX<(cx+cr))&&(e.offsetX>(cx-cr))&&(e.offsetY<(cy+cr)&&(e.offsetX>(cy-cr)))) {
          poligonos[i].centro.borrar();
          actualizar();
          }
    }
}

function detectarClickCentro(e){
  for(let i = 0 ; i < poligonos.length ; i++){
    let x = poligonos[i].centro.x;
    let y = poligonos[i].centro.y;
    let r = poligonos[i].centro.r;
      if((e.offsetX<(x+r))&&(e.offsetX>(x-r))&&(e.offsetY<(y+r)&&(e.offsetX>(y-r)))){
        aux = poligonos[i].pos; //posicion del poligono en el arreglo de poligonos
        break;
      }
    }
}

function detectarClickPuntoRojo(e){
  for(let i = 0 ; i < poligonos.length ; i++){
     for(let j = 0; j<poligonos[i].puntos.length ; j++){
       let px = poligonos[i].puntos[j].x;
       let py = poligonos[i].puntos[j].y;
       let pr = poligonos[i].puntos[j].r;
         if((e.offsetX<(px+pr))&&(e.offsetX>(px-pr))&&(e.offsetY<(py+pr)&&(e.offsetX>(py-pr)))){
           puntoAux = poligonos[i].puntos[j];
           lineasAux = poligonos[i].lineas;
           break;
          }
        }
      }
}
function mouseDown(e){
  detectarClickCentro(e);
  detectarClickPuntoRojo(e)
}

function moverPunto(){
  if ((puntoAux != null)&&(lineasAux!=null)){
    puntoAux.x = event.offsetX;
    puntoAux.y = event.offsetY;
    if(puntoAux.pos > 0){
    lineasAux[puntoAux.pos -1].fX = event.offsetX;
    lineasAux[puntoAux.pos -1].fY = event.offsetY;
    lineasAux[puntoAux.pos].iX = event.offsetX;
    lineasAux[puntoAux.pos].iY = event.offsetY;
  }else{
    lineasAux[lineasAux.length-1].fX = event.offsetX;
    lineasAux[lineasAux.length-1].fY = event.offsetY;
    lineasAux[puntoAux.pos].iX = event.offsetX;
    lineasAux[puntoAux.pos].iY = event.offsetY;
  }
    actualizar();
  }
}


function mouseMove(){

  if(aux!=null){

  let j;
  let distR = poligonos[aux].getDistR();
  let li = poligonos[aux].lineas;
  let pu = poligonos[aux].puntos;
  let ce = poligonos[aux].centro;

  ce.x = event.offsetX;
  ce.y = event.offsetY;

    for (let i = 0 ; i < pu.length ; i++){
      j = i+1;

      pu[i].x = event.offsetX + distR[i].x;
      pu[i].y = event.offsetY + distR[i].y;
        if(j<pu.length){
            li[i].iX = pu[i].x;
            li[i].iY = pu[i].y;
            li[i].fX = pu[j].x;
            li[i].fY = pu[j].y;
      }
    }
      let h = li.length-1;
      li[h].iX = pu[h].x
      li[h].iY = pu[h].y;
      li[h].fX = pu[0].x;
      li[h].fY = pu[0].y;

    let nuevoPoligono = new Poligono (pu , li , ce , aux);
    poligonos.splice(aux,1,nuevoPoligono);
    actualizar();
  }
}

function actualizar(){
  let ctx = contexto.ctx;
  ctx.beginPath();
  ctx.clearRect(0,0,contexto.canvas.width,contexto.canvas.height);
  ctx.closePath();
  pintarCanvas();

  for(let i = 0 ; i < poligonos.length ; i++){
    // console.log(poligonos[i]);
    for(let j = 0 ; j < poligonos[i].puntos.length ; j++){

      poligonos[i].puntos[j].dibujarCirculo();
      poligonos[i].lineas[j].dibujarLinea();
    }
    poligonos[i].centro.dibujarCirculo();
  }

  for(let j = 0 ; j < puntos.length ; j++){
    puntos[j].dibujarCirculo();
  }
  for(let j = 0 ; j < lineas.length ; j++){
    lineas[j].dibujarLinea();
  }

}


function mouseUp() {
  if(aux!=null){
    aux = null;
  }else if(puntoAux!=null){
    puntoAux = null;
  }

}

function trazarLinea() {
  let j = puntos.length - 1;
  if(j > 0){
    let  c = "yellow";
    let ix = puntos[ j - 1].x;
    let iy = puntos[ j - 1].y;
    let fx = puntos[ j ].x;
    let fy = puntos[ j ].y;
    let linea = new Linea(ix,iy,fx,fy,c)
    linea.dibujarLinea();
    lineas.push(linea);
  }
}

function cerrarPoligono(){

  let  c = "yellow";
  let j = puntos.length - 1;
  let ix = puntos[ 0 ].x;
  let iy = puntos[ 0 ].y;
  let fx = puntos[ j ].x;
  let fy = puntos[ j ].y;
  let linea = new Linea(ix,iy,fx,fy,c)
  linea.dibujarLinea();
  lineas.push(linea);
  calcularCentro(puntos , lineas);
}

function calcularCentro(p , l){

  let i = 0;
  let sumaX = 0;
  let sumaY = 0;
  let promX;
  let promY;

    while(i < p.length){
      sumaX += p[i].x;
      sumaY += p[i].y
      i++;
    }
  promX = sumaX/p.length;
  promY = sumaY/p.length;

  let centro = new Circulo(promX,promY,3,"green");
  let poligono = new Poligono(p , l , centro, poligonos.length);
  poligonos.push(poligono);
  centro.dibujarCirculo();
  puntos = [];
  lineas = [];
}

function pintarCanvas() {
  let ctx = contexto.ctx;
  ctx.beginPath();
  ctx.fillStyle = 'grey';
  ctx.fillRect(0,0,contexto.canvas.width,contexto.canvas.height);
  ctx.closePath();
}

function limpiarCanvas() {
  let ctx = contexto.ctx;
  ctx.beginPath();
  ctx.clearRect(0,0,contexto.canvas.width,contexto.canvas.height);
  ctx.closePath();
  puntos=[];
  lineas=[];
  poligonos=[];
  pintarCanvas();
}
