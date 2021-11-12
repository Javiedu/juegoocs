contadorParpadeo = 0;
contadorPantallaFin = 0;
visible = true;

var escenaFin={

preload:function(){
},	

create:function(){
this.frase = 'Has llegado al nivel ' + nivelDificultad + ' y has conseguido ' + contadorPuntos + ' puntos'

//Generar texto
this.gameover = game.add.text(400, 100, 'GAME OVER', { fill: '#ffffff', font: '40px arial'});
this.gameover.anchor.setTo(0.5)

this.datos = game.add.text(400, 200, this.frase, { fill: '#ffffff', font: '20px arial'});
this.datos.anchor.setTo(0.5)
},

update:function(){
//Contadores
contadorParpadeo += 1
contadorPantallaFin += 1

//Efecto parpadear
if(contadorParpadeo == 30 && visible == true){
    visible = false
} else if (contadorParpadeo == 60 && visible == false) {
    visible = true
}

if(contadorParpadeo >= 60){contadorParpadeo = 0}

if(visible == true){this.gameover.alpha = 1}
if(visible == false){this.gameover.alpha = 0}

if(contadorParpadeo == 60){contadorParpadeo = 0}

//Carga pantalla inicio
if(contadorPantallaFin == 600){
    location.href = 'index.html'
}
}	
};

game.state.add('fin', escenaFin);

