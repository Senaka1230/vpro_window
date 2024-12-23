import { fabric } from 'fabric';
import { insertDimentions } from '../functions/InsertDimensions.js';
import {LoadImg, borderthickness } from '../initialSettings/InitValues.js';
import { handleCreateFrame } from '../functions/CreateFrame.js';
import { mouseMoving } from '../functions/mouseMoving.js';
import {borderImages} from '../initialSettings/InitValues.js';

export const handleCreate = async (canvas, setScale, setCreateria, setCanvasState, setRestoreNum, setDeleteFlag, width, height, order, zoomSetting, setWidthList, setHeightList) => {

  canvas.clear();
  canvas.off();

  var scaleAlt = 1;

  var mainImg = await LoadImg(borderImages.main);

  // if (width >= height && width < 50) {
  //   scaleAlt = (50 / width).toFixed(2);
  // }
  // else if (width < height && height < 50)
  // scaleAlt = (50 / height).toFixed(2);

  scaleAlt = (400 / height).toFixed(2);

  const mainWidth = width * scaleAlt; // Set the desired width
  const mainHeight = height * scaleAlt; // Set the desired height

  mainImg.set({
    id: "mainImg0",
    width: mainWidth,
    height: mainHeight,
    left: (canvas.width - mainWidth) / 2,
    top: (canvas.height - mainHeight) / 2,
    stroke: 'black',
    strokeWidth: 1,
    selectable: false,
    hasControls: false,
    zIndex: 0
  });

  await canvas.add(mainImg);

  if(order === 1)
  {
    const verticalOneBar = new fabric.Rect({
      id: "verticalOneBar",
      top: mainImg.top,
      left: mainImg.left + mainImg.width / 2 - borderthickness/2,
      height: mainImg.height,
      width: borderthickness,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      selectable: true,
      hasControls: false,
    });

    canvas.add(verticalOneBar);
  }
  if(order === 2)
  {
    const verticalOneBar = new fabric.Rect({
      id: "verticalOneBar",
      top: mainImg.top,
      left: mainImg.left + mainImg.width / 3 - borderthickness/2,
      height: mainImg.height,
      width: borderthickness,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      selectable: true,
      hasControls: false,
    });

    canvas.add(verticalOneBar);

    const verticalOneBar1 = new fabric.Rect({
      id: "verticalOneBar",
      top: mainImg.top,
      left: mainImg.left + mainImg.width / 3 * 2 - borderthickness/2,
      height: mainImg.height,
      width: borderthickness,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      selectable: true,
      hasControls: false,
    });

    canvas.add(verticalOneBar1);
  }
  if(order === 3)
  {
    const horizontalOneBar = new fabric.Rect({
      id: "horizontalBar",
      left: mainImg.left,
      top: mainImg.top + mainImg.height / 2 - borderthickness/2,
      width: mainImg.width,
      height: borderthickness,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      selectable: true,
      hasControls: false,
    });

    canvas.add(horizontalOneBar);

  }
  if(order === 4)
  {
    const horizontalOneBar = new fabric.Rect({
      id: "horizontalBar",
      left: mainImg.left,
      top: mainImg.top + mainImg.height / 3 - borderthickness/2,
      width: mainImg.width,
      height: borderthickness,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      selectable: true,
      hasControls: false,
    });

    await canvas.add(horizontalOneBar);

    const verticalOneBar = new fabric.Rect({
      id: "verticalOneBar",
      top: mainImg.top + mainImg.height / 3 + borderthickness/2,
      left: mainImg.left + mainImg.width / 2 - borderthickness/2,
      height: mainImg.height /3 *2 - borderthickness/2,
      width: borderthickness,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      selectable: true,
      hasControls: false,
    });

    canvas.add(verticalOneBar);
  }
  if(order === 5)
  {
    const horizontalOneBar = new fabric.Rect({
      id: "horizontalBar",
      left: mainImg.left,
      top: mainImg.top + mainImg.height / 2 - borderthickness/2,
      width: mainImg.width,
      height: borderthickness,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      selectable: true,
      hasControls: false,
    });

    await canvas.add(horizontalOneBar);

    const verticalOneBar = new fabric.Rect({
      id: "verticalOneBar",
      top: mainImg.top,
      left: mainImg.left + mainImg.width / 2 - borderthickness/2,
      height: mainImg.height /2 - borderthickness/2,
      width: borderthickness,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      selectable: true,
      hasControls: false,
    });

    canvas.add(verticalOneBar);

    const verticalOneBar1 = new fabric.Rect({
      id: "verticalOneBar",
      top: mainImg.top + mainImg.height / 2 + borderthickness/2,
      left: mainImg.left + mainImg.width / 2 - borderthickness/2,
      height: mainImg.height /2 - borderthickness/2,
      width: borderthickness,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      selectable: true,
      hasControls: false,
    });

    canvas.add(verticalOneBar1);
  }

  await handleCreateFrame(canvas);
  await insertDimentions(canvas, scaleAlt, "D");

  const beforeState =await canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);

   await setCanvasState(() => [beforeState]);
   await setScale((prevScale) => [...prevScale, scaleAlt]);
   await setCreateria((prevScale) => [...prevScale, "D"]);
   await setWidthList((prevScale) => [...prevScale, width]);
   await setHeightList((prevScale) => [...prevScale, height]);

  await mouseMoving(canvas, scaleAlt,"D", setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);
  await canvas.renderAll();

};
