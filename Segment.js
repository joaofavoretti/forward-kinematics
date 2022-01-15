/**
  * This is average code
  */
class Segment {
  constructor(len, angle) {
    this.parent = null;
    this.child = null;
    this.len = len;
    this.angle = angle;
    this.dangle = 0.02;
  }
  
  static fromParent(parent, len, parentRelativeAngle) {
    const seg = new Segment(len, parentRelativeAngle);
    parent.child = seg;
    seg.parent = parent;
    return seg;
  }

  rotate(dangle) {
    this.angle += dangle;
    this.angle %= 2 * PI;
  }

  update() {
    this.dangle += map(sin(this.angle), -1, 1, +0.0005, -0.0005);
    this.rotate(this.dangle);
  }
  
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
  
  get aparentAngle() {
    if (this.parent) {
      return this.parent.aparentAngle + this.angle;
    }
    return this.angle;
  }
  
  get initCoord() {
    if (this.parent) {
      return this.parent.endCoord;
    }
    
    // Preciso pensar em um jeito melhor de
    // resolver o problema do primeiro segmento
    return createVector(200, 300);
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
