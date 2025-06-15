const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const unit = 10;
let rows = Math.floor(window.innerHeight/unit);
let columns = Math.floor(window.innerWidth/unit);

let grid = new Array(rows).fill(0).map((row)=>new Array(columns).fill(0).map(()=>Math.random()>0.4? 1 : 0));

const drawGrid = () => {
  for(let y = 0;y < rows; y++){
    for(let x = 0;x < columns; x++){
      if(grid[y][x]){ctx.fillStyle="#004466";ctx.fillRect(x*unit,y*unit,unit,unit);}
      else{ctx.fillStyle="#f4f1de";ctx.fillRect(x*unit,y*unit,unit,unit);}
    }
  }
}

const aliveNeighbours = (x,y) => {
  const topLeft = grid[y-1]?.[x-1] || 0;
  const top = grid[y-1]?.[x] || 0;
  const topRight = grid[y-1]?.[x+1] || 0;

  const left = grid[y]?.[x-1] || 0;
  const right = grid[y]?.[x+1] || 0;

  const bottomLeft = grid[y+1]?.[x-1] || 0;
  const bottom = grid[y+1]?.[x] || 0;
  const bottomRight = grid[y+1]?.[x+1] || 0;

  const neighbours = [topLeft,top,topRight,left,right,bottomLeft,bottom,bottomRight];
  const aliveNeighbours = neighbours.filter((e)=>e==1).length;
  return aliveNeighbours;
}

const updateGrid = () => {
  const newGrid = grid.map(row => [...row]);
   for(let y = 0;y < rows; y++){
    for(let x = 0;x < columns; x++){
      const point = newGrid[y][x];
      const neighbours = aliveNeighbours(x,y);
      if(point){
        if(neighbours<2){newGrid[y][x]=0}
        else if(neighbours == 2 || neighbours == 3){grid[y][x]=1}
        else if(neighbours > 3){newGrid[y][x]=0}
      }else{
        if(neighbours===3){newGrid[y][x]=1}
      }
    }
  }
  grid = newGrid;
}

const setup = () => {
  canvas.width = Math.floor(window.innerWidth);
  canvas.height = Math.floor(window.innerHeight);
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  rows = Math.floor(window.innerHeight/unit);
  columns = Math.floor(window.innerWidth/unit);

  grid = new Array(rows).fill(0).map((row)=>new Array(columns).fill(0).map(()=>Math.random()>0.4? 1 : 0));
};setup();

setInterval(() => {
  drawGrid();
  updateGrid();
}, 20);

window.addEventListener("resize",setup);