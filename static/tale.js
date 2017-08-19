var content = "Norma: Cuenta la leyenda que Verónica era una chava que le encantaba el espiritismo, pero una vez estuvo burlandose toda la noche de un espíritu. De repente, ese espíritu cobró vida y la golpeó tanto hasta matarla. Como murió violentamente su espíritu no descansa en paz, esta condenado a vagar buscando venganza entre aquellos que se meten con los muertos.\nAna: Ay no manches Norma, esa ni tu te la creiste, son puros cuentos para niños.\nNorma y Ana eran dos jóvenes que hacían hechizos de magia blanca para encontrar el verdadero amor o pasar una materia.\nAna: Yo no creo en los espantos, creo en la influencia de los astros, en la energía, pero en fantasmas y esas cosas, para nada. Y para que veas que yo no me asusto tan fácilmente, ¡Ven! ¡Ven, vamos! Vamos al baño, te voy a demostrar ante el espejo que nada va a pasar si decimos el nombre de Verónica nueve veces.\nNorma: Ana, ¿Tu estas loca? Debemos respetar lo que no conocemos, no te metas.\nAna: ¡Vamos! ¡Ay, ven!\nAna convenció a norma de participar en el juego, llegaron al baño de la escuela y se pararon frente a un espejo.\nAna: Mira ven, ven, ven. ¡Vamos!\nNorma: No en serio que no. ¡No!\nAna: Y va la primera, y con ustedes ¡Verónica!\nNorma: Ay, como eres, ah. Uno.\nAna: Verónica.\nNorma: Dos.\nAna: Verónica\nNorma: Ya van tres, ya, ya.\nAna: Ay, camate. Verónica.\nNorma: Cuatro.\nAna: Verónica.\nNorma: Cinco.\nAna: Verónica.\nNorma: Seis.\nAna: Verooo... nica.\nNorma: Ya vamonos ya son siete.\nAna: Verónica.\nNorma: Ocho.\nAna: Y Verónica.\nNorma: Nueve.\nAna: Ves no paso nada.\nNorma: Ja ja ja, tienes razón. ¡Vamonos!\nConvencidas de que no paso nada, Norma y Ana deciden irse, pero, al abrir la puerta...\nVoz extraña: Ana. Norma. No se vayan. Sigamos jugando.\n(Gritos y gritos y sonidos extraños)\nAhora dime... ¿Te atreves tú, a parate ante un espejo y decir el nombre de VERÓNICA NUEVE VECES?"

var displayed_content = "";

var actual = 0;

var MAX_SPEED = 5;
var MIN_SPEED = 0.0;
var DEFAULT_SPEED = 1;

var COMMA_DELAY = 250;
var DOT_DELAY = 425;
var CHAR_DELAY = 65;

var speed = 1.0;

var paused = false;

var current_timeout = null;



function showComments(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}



function playImageSound(){
    document.getElementById("taleimagesound").play();
}

function updateSpeed(val){
    speed = val;
}

function addChar(){
    if(!paused && actual < content.length)
    {
        if(speed <= 0.01)
        {
            setTimeout(addChar, 200);
            return;
        }

        var nchar = content[actual];
        var addstr = nchar;
        var safespeed = speed;
        

        displayed_content += addstr;

        document.getElementById("talecontent").innerText = displayed_content //content[actual]; //content.slice(0, actual);


        //if (safespeed < MIN_SPEED)
            //safespeed = MIN_SPEED;

        //if(speed <= 0.01)
            //speed = 0.00001;

        if(nchar==".")
            current_timeout = setTimeout(addChar, DOT_DELAY / speed);
        else if (nchar ==",")
            current_timeout = setTimeout(addChar, COMMA_DELAY / speed);
        else
            current_timeout = setTimeout(addChar, CHAR_DELAY / speed);

        actual += 1
    }
}


function callAddChar(time)
{
    //clearTimeout(current_timeout);
    //current_timeout = setTimeout(addChar, time);
}

function pauseTale(){
    document.getElementById("talesound").pause();

    paused = true;

    if(current_timeout)
        clearTimeout(current_timeout);
}

function startTale(){
    paused = false;
    current_timeout = setTimeout(addChar, 200);

    document.getElementById("talesound").play();
}



//setInterval(agregar, 100);