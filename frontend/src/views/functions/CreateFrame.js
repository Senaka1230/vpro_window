import { fabric } from 'fabric';
import { borderthickness, getObjectsArrayById } from '../initialSettings/InitValues.js';

export const handleCreateFrame = async (canvas) => {

  const objects = canvas.getObjects();
  for(const obj of objects)
  {
    if (obj.id.includes("topframe")|| obj.id.includes("leftframe") || obj.id.includes("rightframe") || obj.id.includes("bottomframe"))
    canvas.remove(obj);
  }

  var mainImages = await getObjectsArrayById(canvas, 'mainImg');

  for (const mainImg of mainImages) {

    var TopFrame = new fabric.Polyline([
      { x: borderthickness, y: borderthickness },
      { x: borderthickness + mainImg.width, y: borderthickness },
      { x: borderthickness + mainImg.width + borderthickness, y: 0 },
      { x: 0, y: 0 },
      { x: borderthickness, y: borderthickness }
    ], {
      left: mainImg.left - borderthickness,
      top: mainImg.top - borderthickness,
      id: "topframe" + mainImg.id.replace("mainImg", "").trim(),
      fill: 'white',
      selectable: false,
      hasControls: false,
      stroke: 'black',
      strokeWidth: 1,
    });

    canvas.add(TopFrame);

    var LeftFrame = new fabric.Polyline([
      { x: 0, y: 0 },
      { x: -borderthickness, y: -borderthickness },
      { x: -borderthickness, y: mainImg.height + borderthickness },
      { x: 0, y: mainImg.height },
      { x: 0, y: 0 }
    ], {
      left: mainImg.left - borderthickness,
      top: mainImg.top - borderthickness,
      id: "leftframe" + mainImg.id.replace("mainImg", "").trim(),
      fill: 'white',
      selectable: false,
      hasControls: false,
      stroke: 'black',
      strokeWidth: 1,
    });
    canvas.add(LeftFrame);

    var RightFrame = new fabric.Polyline([
      { x: 0, y: 0 },
      { x: 0, y: mainImg.height },
      { x: borderthickness, y: mainImg.height + borderthickness },
      { x: borderthickness, y: - borderthickness },
      { x: 0, y: 0 }
    ], {
      left: mainImg.left + mainImg.width,
      top: mainImg.top - borderthickness,
      id: "rightframe" + mainImg.id.replace("mainImg", "").trim(),
      fill: 'white',
      borderWidth: 0,
      selectable: false,
      hasControls: false,
      stroke: 'black',
      strokeWidth: 1
    });

    canvas.add(RightFrame);

    var BottomFrame = new fabric.Polyline([
      { x: 0, y: 0 },
      { x: -borderthickness, y: borderthickness },
      { x: mainImg.width + borderthickness, y: borderthickness },
      { x: mainImg.width, y: 0 },
      { x: 0, y: 0 }
    ], {
      left: mainImg.left - borderthickness,
      top: mainImg.top + mainImg.height,
      id: "bottomframe" + mainImg.id.replace("mainImg", "").trim(),
      fill: 'white',
      borderWidth: 0,
      selectable: false,
      hasControls: false,
      stroke: 'black',
      strokeWidth: 1
    });

    canvas.add(BottomFrame);
  }

};
