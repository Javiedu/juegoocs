contadorTiempoJuego = 0;
contadorTiempoBalas = 0;
contadorPuntos = 0;
contadorBalasGeneradas = 0;
nivelesDificultad = [200, 170, 150, 130, 120, 100, 20]
nivelDificultad = 0;
siguienteDificultad = 1500
parar = false;

var escenaJuego={

preload:function(){
game.load.image('jugador', 'assets/jugador.png')
game.load.image('bala', 'assets/bala.png')
game.load.image('barraVertical', 'assets/barraVertical.png')
},	

create:function(){
//Vorde mapa y fisicas
this.game.physics.startSystem(Phaser.Physics.ARCADE);
this.game.world.setBounds(0, 0, 800, 300)

//Personaje
this.personaje = game.add.sprite(40, 150, 'jugador')
this.personaje.enableBody = true
this.game.physics.arcade.enable(this.personaje)
this.personaje.body.collideWorldBounds = true

//Grupo balas
this.balas = game.add.group()
this.balas.enableBody = true
this.balas.physicsBodyType = Phaser.Physics.ARCADE

//Barra vertical muerte balas
this.barraFondo = game.add.sprite(-30, 0, 'barraVertical')
this.game.physics.arcade.enable(this.barraFondo)
this.barraFondo.enableBody = true
this.barraFondo.setImmovable = true

this.barraContador = game.add.sprite(40, 0, 'barraVertical')
this.game.physics.arcade.enable(this.barraContador)
this.barraContador.enableBody = true
this.barraContador.setImmovable = true
this.barraContador.alpha = 0
},

update:function(){
//Contadores
contadorTiempoJuego += 1

//Cambio dificultad
if(contadorTiempoJuego == siguienteDificultad && nivelDificultad < 6){
    nivelDificultad += 1
    siguienteDificultad = contadorTiempoJuego + 1500
}

//Spawnear balas
if(parar == false && this.time.now > contadorTiempoBalas){
    altura = Math.floor((Math.random() * (290 - 10)) + 10)
    bala = this.balas.create(800, altura, 'bala')
    bala.anchor.setTo(0.5)
    bala.body.velocity.x = -150
    contadorTiempoBalas = this.time.now + nivelesDificultad[nivelDificultad]
}

//Matar balas
this.physics.arcade.overlap(this.barraFondo, this.balas, function(barra, bala){
    bala.kill()
})


//Contar puntos
this.physics.arcade.overlap(this.barraContador, this.balas, function(barraContador, balaColisionando){
    if(parseInt(balaColisionando.body.x) == 40){
        contadorPuntos += 1
    }
})


//Muerte
this.game.physics.arcade.collide(this.personaje, this.balas, function(){
    game.state.start('fin')
})

//Movimiento personaje
if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
    this.personaje.body.velocity.y = -150
} else if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
    this.personaje.body.velocity.y = 150
} else {
    this.personaje.body.velocity.y = 0
}

}	
};

game.state.add('juego', escenaJuego);
