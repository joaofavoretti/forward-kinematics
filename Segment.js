// Classe the segmentos criado para manter a propriedade
// de forward kinematics. As coordenadas são calculadas
// com base no segmento anterior, não é utilizado nenhuma
// formula.
class Segment {
  // Construtor do elemento raiz 
  constructor(len, angle) {
    this.parent = null;
    this.len = len;
    this.dangle = 0.02;     // delta angle: velocidade de rotacao do segmento
    this.angle = angle;     // angulo relativo do segmento
                            // se não possuir parent, o angulo é relativo
                            // ao sistema de coordenadas padrão
                            // (que parece inverso do convencional)
  }
  
  // Construtor com base em um elemento pai
  static fromParent(parent, len, parentRelativeAngle) {
    const seg = new Segment(len, parentRelativeAngle);
    seg.parent = parent;
    return seg;
  }

  // Movimento de rotacao do segmento
  // dangle: delta angle
  rotate(dangle) {
    this.angle += dangle;
    this.angle %= 2 * PI;
  }

  // Funcao para alterar alguma propriedade do segmentos
  // O unico movimento implementado é o de rotação
  update() {
    //
    // do angulo atual do segmento
    this.dangle += map(sin(this.angle), -1, 1, +0.0005, -0.0005);
    this.rotate(this.dangle);
  }
  
  // Exibe o segmento na tela
  show() {
    stroke(255);
    strokeWeight(4);
    line(
      this.initCoord.x,
      this.initCoord.y, 
      this.endCoord.x,
      this.endCoord.y 
    );
  }
  
  // Angulo aparente do segmentos
  // ja que this.angle é o angulo relativo 
  // ao segmento anterior.
  get aparentAngle() {
    if (this.parent) {
      return this.parent.aparentAngle + this.angle;
    }
    return this.angle;
  }
  
  // Coordenadas iniciais de um respectivo segmento
  get initCoord() {
    if (this.parent) {
      return this.parent.endCoord;
    }
    
    // Isso aqui esta muito ruim. Mas não consegui pensar em
    // um modo melhor para definir o ponto inicial caso o 
    // segmento seja o segmento raiz
    return createVector(windowWidth / 2, windowHeight / 4);
  }
  
  get endCoord() {
    const dx = this.len * cos(this.aparentAngle);
    const dy = this.len * sin(this.aparentAngle);
    return createVector(
      this.initCoord.x + dx, 
      this.initCoord.y + dy
    );
  }
}
