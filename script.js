const area = document.querySelector('.boundary-fill');

for(let x =1;x<=100;x++){
  for(let y =1;y<=100;y++){
    const pix = document.createElement('div');
    pix.setAttribute('class',`pixel ${x} ${y} xy${x}_${y}`);
    area.appendChild(pix);
  }
}
const fill_pixel = (item,color)=>{
  try {
    item.style.backgroundColor = color;
  } catch (error) {
    console.log(error.target);
  }
 
}
const get_color = (item)=>{
  return item.style.backgroundColor;
}
const check = ()=>{
  const selector = document.querySelector('.selector');
  return selector.checked;
}
const mouse_func = (event)=>{
  fill_pixel(event.target,'black'); 
};
window.addEventListener('keydown',(event)=>{
  if(event.code =="Space"){
    document.querySelectorAll('.pixel').forEach((item) =>{
      item.addEventListener('mouseover',mouse_func);
    });
  };
},false);
window.addEventListener('keyup',(event)=>{
  document.querySelectorAll('.pixel').forEach((item)=>{
    item.removeEventListener('mouseover',mouse_func);
  })
},false);

document.querySelectorAll('.pixel').forEach((item) =>{
  item.addEventListener('click',(event)=>{
    boundary_fill(event.target,'red'); 
  })
});

const boundary_elem = (x,y)=>{
  let ans = new Array();
  ans.push(document.querySelector(`.xy${x+1}_${y}`));
  ans.push(document.querySelector(`.xy${x-1}_${y}`));
  ans.push(document.querySelector(`.xy${x+1}_${y+1}`));
  ans.push(document.querySelector(`.xy${x-1}_${y+1}`));
  ans.push(document.querySelector(`.xy${x}_${y+1}`));
  ans.push(document.querySelector(`.xy${x+1}_${y-1}`));
  ans.push(document.querySelector(`.xy${x-1}_${y-1}`));
  ans.push(document.querySelector(`.xy${x}_${y-1}`));
  return ans;
}
const boundary_fill = (item,color)=>{
  const x = parseInt(item.classList[1]);
  const y = isNaN(item.classList[2])?  x:parseInt(item.classList[2]);
  if(get_color(item)!='black' && get_color(item)!='red'){
      fill_pixel(item,`${color}`);
      let boundary = boundary_elem(x,y);
      for(let key of boundary){
        setInterval(boundary_fill,300,key,color);
      }
  }
}
