import { fabric } from 'fabric';
export const borderthickness = 18;
export const barsubthickness = 3;
export const firstDim = 80;
export const lastDim = 56;

export const borderImages = {
      main : '/static/images/windowSource.png',
      left: '/static/border/left.png',
      right: '/static/border/right.png',
      top: '/static/border/top.png',
      bottom: '/static/border/bottom.png',
      vertical : "/static/border/verticalbar.png",
      horizontal : "/static/border/horizontalbar.png"
};

export const getObjectById = (canvas, id) => {
    const objects = canvas.getObjects();
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].id === id) {
        return objects[i];
      }
    }
    return null; 
  }

export const getObjectsArrayById = async(canvas, id) => {
    const objects =await canvas.getObjects();
    var newArray = [];
    for (let i = 0; i < objects.length; i++) {
      if ((objects[i].id).includes(id)) {
        newArray.push(objects[i]);
      }
    }
    return newArray; 
  }

 export const LoadImg  = (url) => {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(url, (img) => {
        resolve(img);
      }, null, { crossOrigin: 'Anonymous' });
    });
  };


  export function mousePositionFlag(canvas) {
    const canvasElement = canvas.getElement();
    const canvasRect = canvasElement.getBoundingClientRect();
    var mouseX=0, mouseY=0;

    document.body.addEventListener('mousemove', (event) => {
       mouseX = event.clientX;
       mouseY = event.clientY;
    })
  if(mouseX < canvasRect.left || mouseX > canvasRect.left + canvasRect.width ||mouseY < canvasRect.top || mouseX > canvasRect.top + canvasRect.height)
    return false;
  else return true;
  }