import { borderthickness } from "../initialSettings/InitValues";

export const objectsRePositioning = async(canvas, mainImg, distance, direction) => {

    const objects =await canvas.getObjects();

    for(const obj of objects)
    { if(obj.id && (obj.id.includes("verticalOneBar") || obj.id.includes("horizontalBar") || obj.id.includes("realCoverWindow")))
      if(obj.left >= mainImg.left - borderthickness && obj.width + obj.left <= mainImg.left + mainImg.width+borderthickness && obj.top >= mainImg.top-borderthickness && obj.top + obj.height <= mainImg.top + mainImg.height+borderthickness)
      if(direction === "T")
      {
       await obj.set({top:obj.top + distance});
      }
      else if(direction === "L")
      {
        await obj.set({left:obj.left + distance});
      }
    } 
}