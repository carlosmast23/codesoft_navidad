/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Clase que representa un circulo 
 * @author CARLOS SANCHEZ
 * @type type
 */
class Circulo
{
    constructor(alto, ancho) 
    {
    this.alto = alto;
    this.ancho = ancho;
    }
}

/**
 * Metodo principal que ejecuta la aplicacion
 * @returns {undefined}
 */
function main()
{
    //lert('menu');
    //--------Obtiene el tipo de contexto para graficar en 2d ---//
    var canvas=document.getElementById("myCanvas");
    var contexto=canvas.getContext("2d");
    var circuloVar=new Circulo(10,10);
    //----------Crea un lazo repetitico-------------//
    var loop=window.setInterval(repaint,30);  
    
}

/**
 * Funcion que se encarga de redibujar los objetos en pantalla
 * @returns {undefined}
 */
function repaint()
{
    Console.log("ejemplo");
    ////////dibuja el fondo del juego /////////////
    contexto.fillStyle = "white";
    contexto.fillRect(0, 0, 800, 600);
    
    contexto.arc(360,70,50,0,(Math.PI/180)*360,true);    
}

//----------- Lanza el metodo main cuando se cargo todo el contenido de la pagina ----// 
window.addEventListener('DOMContentLoaded',main,false);




