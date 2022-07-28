var A = [],
    EVS, V = [],
    U = [], N = 100,
    step = 10;

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent('sketch');
  // define linear transformation (matrix A)
  A.push([0, -2]);
  A.push([1, -3]);
  
  // create matrix buttons
  button = createButton('Symmetric')
  button.position(width/2 - 35, height - 25)
  button.mousePressed(symmetric)
  buttonCSS(button);
  
  button2 = createButton('Asymmetric')
  button2.position(width/2 - 120, height - 25)
  button2.mousePressed(asymmetric)
  buttonCSS(button2);
  
  button3 = createButton('Rotation')
  button3.position(width/2 + 45, height - 25)
  button3.mousePressed(imaginery)
  buttonCSS(button3);
  
  // create base vectors & transformed vectors
  for(let i = -N; i <= N; i += step){
    
    let ithRowV = [];
    let ithRowU = [];
    
    for(let j = -N; j <= N; j += step){
      let v = createVector(i, j);
      ithRowV[j] = v
      ithRowU[j] = matmul(A, v);
    }
    
    V[i] = ithRowV;
    U[i] = ithRowU;
  }
}

function draw() {
  background(255);
  translate(width/2, height/2);
  axes();
  
  for(let i = -N; i <= N; i += step){
    for(let j = -N; j <= N; j += step){
      
      let vx = V[i][j].x;
      let vy = V[i][j].y;
      let ux = U[i][j].x;
      let uy = U[i][j].y;
      
      let x = map(mouseX, 0, width, vx, ux);
      let y = map(mouseX, 0, width, vy, uy);

      if(mouseX >= width){
        x = ux;
        y = uy;
      }
      
      if(mouseX <= 0){
        x = vx;
        y = vy;
      }

      fill(0);
      if(isScalMul([vx, vy], [ux, uy])){
        stroke('red')
        line(0, 0, vx * 100, vy * 100);
        fill('red')
      }
      
      noStroke();
      circle(x, y, 5);     
    }
  }
  circle(0, 0, 5);
  // fill(0);
  // text(A[0], -150, -150);
  // text(A[1], -155, -135);
}

// performs matrix multiplication of vector 'v' by matrix 'A'
function matmul(A, v) {
  let ux, uy, u;
  ux = A[0][0] * v.x + A[0][1] * v.y;
  uy = A[1][0] * v.x + A[1][1] * v.y;
  u = createVector(ux, uy);
  return u
}

// checks whether 2 vectors are scalar multiples of each other
function isScalMul(u, v){
  let uu, uv, test;
  uu = math.multiply(u,u);
  uv = math.multiply(u,v);
  test = math.equal(math.multiply(uu, v), math.multiply(uv, u))
  return test[0] && test[1]
}

// draws x- and y-axes
function axes(){
  strokeWeight(1);
  stroke(100);
  
  drawingContext.setLineDash([5, 10]);
  line(0, -height, 0, height);
  line(-width, 0, width, 0);
  drawingContext.setLineDash([0, 0]);
}

function symmetric(){
  A[0] = [0, -1];
  A[1] = [-1, 0];
  V = [];
  U = [];

  for(let i = -N; i <= N; i += step){
    
    let ithRowV = [];
    let ithRowU = [];
    
    for(let j = -N; j <= N; j += step){
      let v = createVector(i, j);
      ithRowV[j] = v
      ithRowU[j] = matmul(A, v);
    }
    
    V[i] = ithRowV;
    U[i] = ithRowU;
  }
}

function asymmetric(){
  A[0] = [0, -2];
  A[1] = [1, -3];
  V = [];
  U = [];

  for(let i = -N; i <= N; i += step){
    
    let ithRowV = [];
    let ithRowU = [];
    
    for(let j = -N; j <= N; j += step){
      let v = createVector(i, j);
      ithRowV[j] = v
      ithRowU[j] = matmul(A, v);
    }
    
    V[i] = ithRowV;
    U[i] = ithRowU;
  }
}

function imaginery(){
  A[0] = [-1, -2];
  A[1] = [2, -1];
  V = [];
  U = [];

  for(let i = -N; i <= N; i += step){
    
    let ithRowV = [];
    let ithRowU = [];
    
    for(let j = -N; j <= N; j += step){
      let v = createVector(i, j);
      ithRowV[j] = v
      ithRowU[j] = matmul(A, v);
    }
    
    V[i] = ithRowV;
    U[i] = ithRowU;
  }
}

function buttonCSS(button){
  button.style('background-color', 'white')
  button.style('color', '#000000')
  button.style('border', 'none')
  button.style('cursor', 'pointer')
  button.parent('sketch')
}