
import { insertDimentions } from '../functions/InsertDimensions';
import { getObjectsArrayById } from '../initialSettings/InitValues';
import { coverWindowTest } from '../functions/InsertCoverWindowResize';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config/index.js';
import { fabric } from 'fabric';

 const beforeSaveTest = async (canvas) => {

  var mainImgs = await getObjectsArrayById(canvas, "mainImg");
  if(mainImgs.length !== 1)
    return false;

  var horizontalBars = await getObjectsArrayById(canvas, "horizontalBar");
  var verticalBars = await getObjectsArrayById(canvas, "verticalOneBar");
  var realCoverWindows = await getObjectsArrayById(canvas, "realCoverWindow");

  if (horizontalBars.length + verticalBars.length + 1 === realCoverWindows.length)
    return true;
  else return false;
};

export const saveTemplete = async (canvas, scale, createria, width, height, selectedType) => {
  var beforeSaveFlag = await beforeSaveTest(canvas);


  if(!beforeSaveFlag)
    window.alert("This state can't save as templete.\n All windows must have a corresponding name.");
 else{
 
   const currentTemplete = await canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);

   try {
     const response = await axios.post(API_BASE_URL + '/templete/save', {
      canvas: currentTemplete,
      scale: scale,
      createria,
      width, height,
      selectedType
      });
      if(response.data.success)
         window.alert("Successfully saved!");
      else
        window.alert("Something went wrong during this templete save!");
      } catch (error) {
        console.error('Error sending this templete');
      }
 }

};

export const loadAllTemplets = async (setTempletes, setTempleteIndex, setSelectedTypesForModal) => {

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  setTempletes([]);
  setTempleteIndex([]);
  
  await axios
    .get(API_BASE_URL + '/templete/getAll')
    .then(async (response) => {
        var cashTempleteArray=[];
        var cashTempletes = response.data.canvas;
        var cashTempleteIndex = response.data.ids;

        const offCanvas = new fabric.Canvas();
        for (const cashTemplete of cashTempletes) {
          offCanvas.clear();
           offCanvas.loadFromJSON(cashTemplete, async () => {
            const dataURL = offCanvas.toDataURL({
              format: 'jpg',
              quality: 1
            });
            cashTempleteArray.push(dataURL);
          });
          await delay(100);
        }

         setTempletes(cashTempleteArray);
         setTempleteIndex(cashTempleteIndex);
         setSelectedTypesForModal(response.data.selectedType);

    });

};
