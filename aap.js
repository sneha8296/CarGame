const score= document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea= document.querySelector(".gameArea");
let player={speed:5, score:0};

console.log(gameArea);

// Animation of poppupBox using requestAnimationFram()

startScreen.addEventListener("click", start);

function moveLines(){

  let  lines =document . querySelectorAll(".lines");
   
  lines.forEach(item => {

    if (item.y > 700) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}


// function endGame(){
//     player.start = false;
// }

//  enimy car movings

function moveAnimy(car) {
  let animy = document.querySelectorAll(".animy");

  animy.forEach(function(item) {
     
    if(isCollide(car, item)){
      //  endGame();
      console.log("hit");
     } 
    
    
    if (item.y > 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";

    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function isCollide(a,b){

  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return  !(aRect.bottom <  bRect.top) ||
     (aRect.top > bRect.bottom) ||
    (aRect.right < bRect.left)||(aRect.left > bRect.right);
  
}




function gameplay() {
  // console.log("i am clickked");

//   geting position of car
  let car=document.querySelector(".car");
  let road=gameArea.getBoundingClientRect();
  console.log(road);

  if (player.start) {

    moveLines();
    moveAnimy(car);

        if(keys.ArrowUp && player.y>(road.top+70)){
              player.y -=player.speed;
        }
        if (keys.ArrowDown && player.y< (road.bottom-70)) {
          player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x>0) {
          player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x<(road.width-50)) {
          player.x += player.speed;
        }

        car.style.top=player.y + "px";
        car.style.left = player.x + "px";

    window.requestAnimationFrame(gameplay);
    // console.log(player.score++);
    player.score++;
    score.innerHTML="your score" + player.score;
    
  }

}



function start(){

      gameArea.classList.remove('hide');
      startScreen.classList.add("hide");

      player.start=true;
      player.score=0;
      window.requestAnimationFrame(gameplay);


      for( x=0;x<5;x++){
        // line abject created
        let roadline = document.createElement("div");
        roadline.setAttribute("class", "lines");
        roadline.y = (x*150);
        roadline.style.top=(x*150)+ "px";
        gameArea.appendChild(roadline);
      }
      

      //  car object created
      let car =document.createElement("div");
      car.setAttribute("class","car");
      // car.innerText="hello everyone";
      gameArea.appendChild(car);

      // moving position of car
      player.y = car.offsetTop;
      player.x = car.offsetLeft;
      

      for (x = 0; x < 3; x++) {
        // line abject created
        let animyCar = document.createElement("div");
        animyCar.setAttribute("class", "animy");
        animyCar.y = ((x+1)*350 * -1);
        animyCar.style.top = x * 150 + "px";
        animyCar.style.background = "black";
        animyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(animyCar);
      }

      
    
}





// Arrow kay moving up -down-right-left

let keys = {ArrowUp: false, ArrowLeft: false, ArrowRigh:false, ArrowDown:false};

document.addEventListener("keydown",e=>{
      e.preventDefault();
      keys[e.key]=true;    
      console.log(keys);     
});

document.addEventListener("keyup", (e) => {
      e.preventDefault();
     keys[e.key]=false;
     console.log(keys);     

});


