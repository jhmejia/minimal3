let rows, cols, grid;

function setup() {
  // const canvas = createCanvas(300, 300);
  const canvas = createCanvas(0.8* 640, 0.8 * 640);
  canvas.parent('sketch');
  rows = 15;
  cols = 15;
  grid = new Grid(rows, cols);
}

function draw() {
  background(255);
  grid.showDots();
  grid.showGraph();
}

function mousePressed() {
  for(let x = 0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      grid.grid[x][y].pressed();
    }
  }
}

function mouseReleased() {
  for(let x = 0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      grid.grid[x][y].released();
    }
  }
}

function windowResized() {
  resizeCanvas(0.8 * windowWidth, 0.8 * windowWidth);
  grid = new Grid(rows, cols);
}

////////////////
// GRID CLASS //
////////////////
class Grid{
    constructor(rows, cols){
      this.rows = rows;
      this.cols = cols;
      this.xstep = width/cols;
      this.ystep = height/rows;
      this.grid = []
      
      //Populate grid with coordinates
      for(let x = 0; x < this.cols; x++){
        let col = [];
        for(let y = 0; y < this.rows; y++){       
          col[y] = new draggableDot(this.xstep/2 + x * this.xstep, 
                                    this.ystep/2 + y * this.ystep);
        }
        this.grid[x] = col;
      }
    }
    
    showDots(){
      stroke(0);
      strokeWeight(10);
      
      //Draw a dot at each vertex
      for(let x = 0; x < this.cols; x++){
        for(let y = 0; y < this.rows; y++){
          // point(this.grid[x][y].x, this.grid[x][y].y); 
          this.grid[x][y].update();
          this.grid[x][y].show();
        }
      }
    }
      
    showGraph(){
      stroke(0);
      strokeWeight(1);
      
      //Draw vertical lines between each two consecutive vertices
      for(let x = 0; x < this.cols; x++){
        for(let y = 0; y < this.rows - 1; y++){
          line(this.grid[x][y].x,
               this.grid[x][y].y,
               this.grid[x][y + 1].x,
               this.grid[x][y + 1].y);
        }
      }
      
      //Draw horizontal lines between each two consecutive vertices
      for(let y = 0; y < this.rows; y++){
        for(let x = 0; x < this.cols - 1; x++){       
          line(this.grid[x][y].x,
               this.grid[x][y].y,
               this.grid[x + 1][y].x,
               this.grid[x + 1][y].y);
        }
      }
    }
  }

////////////////////////////
// DRAGGABLE POINTS CLASS //
////////////////////////////
class draggableDot{
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.dragging = false;
      
      this.offsetX = 0;
      this.offsetY = 0;
    }
    
    show(){
      stroke(0)
      strokeWeight(7);
      point(this.x, this.y);
    }
  
    update() {
      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
    }
  
    pressed() {
      // Did I click on the rectangle?
      if (abs(this.x - mouseX) <= 5 && abs(this.y - mouseY) < 5) {
        this.dragging = true;
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
      }
    }
  
    released() {
      this.dragging = false;
    }  
  }