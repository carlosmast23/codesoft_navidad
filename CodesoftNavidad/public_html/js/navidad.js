
function Posicion(x,y)
{
    this.x=x;
    this.y=y;
}

function CopoNieve(posicion,paisaje)
{
    //-- ATRIBUTOS --//
    this.posicion=posicion;
    this.paisaje=paisaje;
    this.resbalar=false;
    this.direccionResbalarX=0; //Variable para saber a donde se tiene que resbalar la nieve
    //-- METODOS -- //
    this.dibujar=dibujar;
    this.mover=mover;
    
    function dibujar(contexto)
    {
        
        //////////Fondo del dibujo////////////////
        contexto.fillStyle = "white";
        contexto.fillRect(this.posicion.x,this.posicion.y,1,1);
    }
    
    function mover(ancho,alto)
    {
        random=Math.floor((Math.random() * 5) + 1);
        switch (random)
        {
            case 1: if(this.posicion.x+1<ancho-2)
                        this.posicion.x++;
                    break;
            case 2: if(this.posicion.x-1>0)
                        this.posicion.x--;
                    break;
            case 3: if(this.posicion.x+2<ancho-4)
                        this.posicion.x+=2;
                    break;
            case 4: if(this.posicion.x-2>0)
                        this.posicion.x-=2;
                    break;
            case 5: this.posicion.y++;
                    break;

        }
        
    }
}


function Paisaje(ancho,alto)
{
    //-- ATRIBUTOS --//
    this.alto=alto;
    this.ancho=ancho;
    this.copoNieveList = new Array();
    this.nievePiso=new Array();
    //-- METODOS --//
    this.dibujar=dibujar;
    this.init=init;
    this.run=run;
    this.comprobarNievePiso=comprobarNievePiso;
    
    //-- MAIN --///    
    this.init();
    
    function dibujar(contexto)
    {
        //////////Fondo del dibujo////////////////
        //contexto.fillStyle = "#ccff99";
        contexto.fillStyle = "black";
        contexto.fillRect(0, 0, 800, 600);
        
        //--- DIBUJAR LOS COPOS DE NIEVE --//
        for (i=0;i<this.copoNieveList.length;i++)
        {
            this.copoNieveList[i].dibujar(contexto);
            //this.copoNieveList[i].mover();
        }
        
        //-- DIBUJAR EL PISO ------//
        for (var i = 0; i < this.ancho; i++) 
        {
            for (var j=0;j<this.alto;j++)
            {
                if(this.nievePiso[i][j])
                {
                    contexto.fillStyle = "white";
                    contexto.fillRect(i,j,2,2);
                }
            }
        }
    }
    
    /**
     * Verifica si el copo de Nieve topo el piso
     */
    function comprobarNievePiso(copoNieve,indice)
    {
        x=copoNieve.posicion.x;
        y=copoNieve.posicion.y;
        
        //console.log("x="+x+"y="+y);
        //console.log("valor="+this.nievePiso[x][y]);
        
        //Verifica que el copo de nieve no haya tocado el piso
        if(y>this.alto-3)
        {
            //console.log("llego al piso ...");
            this.nievePiso[x][y]=true;            
            this.copoNieveList.splice(indice,1);
        }
        else
        {   
            //Verificar que la nieve puede resbalar
            if(copoNieve.resbalar)
            {
                    //Verifica si el copo de nieve esta dentro de la altura
                    if(copoNieve.posicion.y+1<this.alto)
                    {
                        //Verifica que la posicion de abajo este libre para caer
                        if (!this.nievePiso[copoNieve.posicion.x][y + 1])
                        {
                            copoNieve.posicion.y++;

                        } else
                        {
                            //Verifica que pueda avanzar a alguno de los dos lados
                            if (copoNieve.posicion.x + this.direccionResbalarX > 0 && copoNieve.posicion.x + this.direccionResbalarX < this.ancho)
                            {
                                copoNieve.posicion.x += this.direccionResbalarX;
                                
                                //Tiene un 50% de seguir avanzando en X en la supeficie plana
                                if (Math.floor((Math.random() * 10) + 1) >3)
                                {
                                    //Si la direccion ya tiene nieve elimina el copo de nieve
                                    //caso contrario que con la misma direccion para la siguiente vuelte
                                    if (this.nievePiso[x + this.direccionResbalarX][y])
                                    {
                                        this.nievePiso[copoNieve.posicion.x][copoNieve.posicion.y] = true;
                                        this.copoNieveList.splice(indice, 1);
                                    }
                                } else
                                {//Si no coincide en la probabilidad elimina el copo de nieve
                                    console.log("copo nieve acoplado ..");
                                    this.nievePiso[copoNieve.posicion.x][copoNieve.posicion.y] = true;
                                    this.copoNieveList.splice(indice, 1);
                                }
                            } else
                            {//Si el copo de nieve no puede avanzar es eliminado en el eje X
                                this.nievePiso[copoNieve.posicion.x][copoNieve.posicion.y] = true;
                                this.copoNieveList.splice(indice, 1);
                            }
                        }
                    }
                    else
                    {
                        //Si el copo de nieve esta fuera de rango de la altura es eliminado
                        this.copoNieveList.splice(indice, 1);
                    }
                
            }//Si el copo de nieve esta cayendo sigue haciendo validacion hasta tocar piso
            else
            {
                try {
                    this.nievePiso[x][y+1];
                } catch (err) {
                    console.log(x+","+(y+1));
                }
                //console.log(x+","+(y+1));
                if(this.nievePiso[x][y+1])
                {
                   //console.log("nieve sobre otra ...");
                   //Busca randomicamente la direccion a donde resbalar el copo de nieve 
                   direccionRandom=Math.floor((Math.random() * 2) + 1);
                   if(direccionRandom==1)
                       this.direccionResbalarX=1;
                   else
                       this.direccionResbalarX=-1;
                  
                   unaDireccion=false;
                   //Valida que la direccion este dentro del rango del ancho
                   if(!(x+this.direccionResbalarX>0 && x+this.direccionResbalarX<this.ancho))
                   {
                       this.direccionResbalarX=this.direccionResbalarX*-1;
                       unaDireccion=true;
                   }

                    //Si la direccion ya tiene nieve busca la otra direccion o si no se puede mover termina el cliclo
                    if (this.nievePiso[x + this.direccionResbalarX][y])
                    {
                        //Validar que tien la opcion de resbalar al otro lado
                        if(!unaDireccion)
                        {
                            this.direccionResbalarX = this.direccionResbalarX * -1;

                            if (this.nievePiso[x + this.direccionResbalarX][y])
                            {
                                //Si la nieve no tiene a donde resbalar se queda en esa posicion
                                this.copoNieveList.splice(indice, 1);
                                this.nievePiso[x][y] = true;
                            }
                            else
                            {
                                copoNieve.resbalar = true;
                            }
                        }
                        
                    } else
                    {
                        copoNieve.resbalar = true;
                    }
                    
                   
                   
                }
            }
        }
    }
    
    function run()
    {
        this.copoNieveList.push(new CopoNieve(new Posicion(Math.floor((Math.random() * (this.ancho-2)) + 1),Math.floor((Math.random() * 10) + 1))));
        //this.copoNieveList.push(new CopoNieve(new Posicion(Math.floor((Math.random() * this.ancho) + 1),Math.floor((Math.random() * 10) + 1))));
        
        for (i=0;i<this.copoNieveList.length;i++)
        {
            this.copoNieveList[i].mover(this.ancho,this.alto);
            this.comprobarNievePiso(this.copoNieveList[i],i);
        }
    }
    
    function init()
    {
        //-- INICIAR EL ARRAY DEL PISO --//
        for (var i = 0; i < this.ancho; i++) {
            this.nievePiso[i]=new Array();            
            for (var j=0;j<this.alto;j++)
            {
                this.nievePiso[i][j]=false;
            }
            //this.nievePiso[i]=new Array();
            
          }
          
          //console.log(this.nievePiso[319][10]);
          //for (var i = 0; i < this.alto; i++) {
            
          //  for (var j=0;j<this.ancho;j++)
          //  {
          //      console.log(i+","+j+"->"+this.nievePiso[i][j]);
          //  }
            //this.nievePiso[i]=new Array();
            
          //}
        
    }
    
}

/**
 * Clase que representa un circulo 
 * @author CARLOS SANCHEZ
 * @type type
 */
function imprimir()
{
    console.log(this.alto);
    console.log(this.ancho);
}

function Circulo(alto,ancho)
{
    this.alto = alto;
    this.ancho = ancho;
    this.imprimir=imprimir;
   
}


/**
 * Funcion que se encarga de redibujar los objetos en pantalla
 * @returns {undefined}
 */

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
    var alto=canvas.height;
    var ancho=canvas.width;
    
    //console.log(ancho+"-"+alto);
    var paisaje=new Paisaje(ancho,alto);

    //var circuloVar=new Circulo(10,10);
    
    //----------Crea un lazo repetitico-------------//
    drawLoop=window.setInterval(repaint,2);  
    //gameLoop=window.setInterval(repaint,10);  
    
    var incrementalRun=0;
    
    function repaint()
    {
        //alert('dibujando');
        //Console.log("ejemplo");
        ////////dibuja el fondo del juego /////////////
        paisaje.dibujar(contexto);
        run();
    }
    
    function run()
    {
        if(incrementalRun==100)
            incrementalRun=0
        
        if(incrementalRun%4==0)
        {
            //console.log("metodo run ...");
            paisaje.run();
        }
        //console.log(incrementalRun);
        incrementalRun++;
    }
}


gameLoop=null;
//circulo.imprimir();
//----------- Lanza el metodo main cuando se cargo todo el contenido de la pagina ----// 
window.addEventListener('DOMContentLoaded',main,false);



