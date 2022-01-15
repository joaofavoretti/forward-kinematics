// Propriedades do conjunto de segmentos que a tela possui
const n = 10;
const size = 300 / n;

function setup() {
  createCanvas(windowWidth, windowHeight / 2);
  
  // Array de segmentos que será manipulado
  segments = []
  let newSegment = new Segment(size, radians(0));
  segments.push(newSegment);
  for (let i = 1; i < n; i++) {
    newSegment = Segment.fromParent(segments[i - 1], size, radians(0));
    segments.push(newSegment);
  }
}

function draw() {
  background(52);
  
  for (let i = 0; i < n; i++) {
    segments[i].update();
    segments[i].show();
  }
}
