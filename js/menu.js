contadorParpadeo = 0;
visible = false;
console.log('OCS Invader')
console.log('Version 0.1')
console.log('En desarrollo')


var escenaMenu={
preload:function(){
},	

create:function(){
//Crear titulo y texto pulsar espacio
this.nombre = game.add.text(400, 75, 'OCS Invader', { fill: '#ffffff', font: '40px arial'});
this.empezar = game.add.text(400, 200, 'Pulsa ESPACIO para empezar a jugar', { fill: '#ffffff', font: '15px arial'});

this.nombre.anchor.setTo(0.5)
this.empezar.anchor.setTo(0.5)
},

update:function(){
//Contadores
contadorParpadeo += 1

//Efecto parpadear
if(contadorParpadeo == 30 && visible == true){
    visible = false
} else if (contadorParpadeo == 60 && visible == false) {
    visible = true
}

if(visible == true){this.empezar.alpha = 1}
if(visible == false){this.empezar.alpha = 0}

if(contadorParpadeo == 60){contadorParpadeo = 0}

//Funcionamiento boton empezar
if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){this.state.start('juego')}
}	
};

var game=new Phaser.Game(800,300,Phaser.AUTO,'gameDIV');
game.state.add('menu', escenaMenu);
game.state.start('menu');
