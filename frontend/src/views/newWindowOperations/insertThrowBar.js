import { fabric } from 'fabric';
import { borderthickness, getObjectsArrayById } from '../initialSettings/InitValues.js';
import { verticalMiddleBarSort, horizontalMiddleBarSort } from '../functions/SortandFlagMiddleBars.js';
import { insertDimentions } from '../functions/InsertDimensions.js';

export const handleInsertHorizontalThroghBar = (canvas, scale, createria, setCanvasState, setRestoreNum) => {

  const mouseMoveFunction = async (event) => {
    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;

    var sortedVerticalOrderBars = [];

    var Remove = await getObjectsArrayById(canvas, "cashHorizontalBar")
    canvas.remove(...Remove);

    var objs = await getObjectsArrayById(canvas, "mainImg");
    var newObj;

    for (var oj = 0; oj < objs.length; oj++)
      if (x >= objs[oj].left && x <= objs[oj].left + objs[oj].width && y >= objs[oj].top + borderthickness / 2 && y <= objs[oj].top + objs[oj].height - borderthickness / 2) {
        isCursorOverImage = true;
        newObj = objs[oj];
        break;
      }

    if (isCursorOverImage) {

      var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
      var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
      var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);

      for (var fv = 0; fv < verticalOrderBars.length; fv++) {
        if (verticalOrderBars[fv].top + borderthickness / 2 < y && (verticalOrderBars[fv].top + verticalOrderBars[fv].height - borderthickness / 2) > y)
          sortedVerticalOrderBars.push(verticalOrderBars[fv]);
      }

      var limits = [];

      if (sortedVerticalOrderBars.length === 0) {
        limits.push({ top: y - borderthickness / 2, bottom: y + borderthickness / 2, left: newObj.left, right: newObj.left + newObj.width });
      } else {
        limits.push({ top: y - borderthickness / 2, bottom: y + borderthickness / 2, left: newObj.left, right: sortedVerticalOrderBars[0].left });

        for (var k = 0; k < sortedVerticalOrderBars.length - 1; k++) {
          limits.push({ top: y - borderthickness / 2, bottom: y + borderthickness / 2, left: sortedVerticalOrderBars[k].left + borderthickness, right: sortedVerticalOrderBars[k + 1].left });
        }

        limits.push({ top: y - borderthickness / 2, bottom: y + borderthickness / 2, left: sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left + borderthickness, right: newObj.left + newObj.width });
      }

      for (const limit of limits) {
            var flag = true;
        for (var fh = 0; fh < horizontalOrderBars.length; fh++) {
          if (horizontalOrderBars[fh].left + horizontalOrderBars[fh].width > limit.left && (horizontalOrderBars[fh].left) < limit.right && horizontalOrderBars[fh].top < limit.bottom && horizontalOrderBars[fh].top + horizontalOrderBars[fh].height > limit.top)
            {flag = false;
          break;}
        }
        if(flag){
          for (const coverWindow of coverWindows) {
            if (coverWindow.left + coverWindow.width > limit.left && (coverWindow.left) < limit.right && coverWindow.top < limit.bottom && coverWindow.top + coverWindow.height > limit.top)
             { flag = false;
            break;}
          } 
        }
        if(flag){
          var horizontalOneBar = new fabric.Rect({
            id: "cashHorizontalBar",
            left: limit.left,
            top: limit.top,
            width: limit.right - limit.left,
            height: borderthickness,
            fill: 'grey',
            stroke: 'black',
            strokeWidth: 1,
            opacity: 0.5
          });

          canvas.add(horizontalOneBar);
        }
      }
    }
  }

  const mouseDownFunction = async (event) => {

    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;

    var sortedVerticalOrderBars = [];

    var Remove = await getObjectsArrayById(canvas, "cashHorizontalBar")
    canvas.remove(...Remove);

    var objs = await getObjectsArrayById(canvas, "mainImg");
    var newObj;

    for (var oj = 0; oj < objs.length; oj++)
      if (x >= objs[oj].left && x <= objs[oj].left + objs[oj].width && y >= objs[oj].top + borderthickness / 2 && y <= objs[oj].top + objs[oj].height - borderthickness / 2) {
        isCursorOverImage = true;
        newObj = objs[oj];
        break;
      }

    if (isCursorOverImage) {

      var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
      var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
      var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);

      for (var fv = 0; fv < verticalOrderBars.length; fv++) {
        if (verticalOrderBars[fv].top + borderthickness / 2 < y && (verticalOrderBars[fv].top + verticalOrderBars[fv].height - borderthickness / 2) > y)
          sortedVerticalOrderBars.push(verticalOrderBars[fv]);
      }

      var limits = [];

      if (sortedVerticalOrderBars.length === 0) {
        limits.push({ top: y - borderthickness / 2, bottom: y + borderthickness / 2, left: newObj.left, right: newObj.left + newObj.width });
      } else {
        limits.push({ top: y - borderthickness / 2, bottom: y + borderthickness / 2, left: newObj.left, right: sortedVerticalOrderBars[0].left });

        for (var k = 0; k < sortedVerticalOrderBars.length - 1; k++) {
          limits.push({ top: y - borderthickness / 2, bottom: y + borderthickness / 2, left: sortedVerticalOrderBars[k].left + borderthickness, right: sortedVerticalOrderBars[k + 1].left });
        }

        limits.push({ top: y - borderthickness / 2, bottom: y + borderthickness / 2, left: sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left + borderthickness, right: newObj.left + newObj.width });
      }

      for (const limit of limits) {
            var flag = true;
        for (var fh = 0; fh < horizontalOrderBars.length; fh++) {
          if (horizontalOrderBars[fh].left + horizontalOrderBars[fh].width > limit.left && (horizontalOrderBars[fh].left) < limit.right && horizontalOrderBars[fh].top < limit.bottom && horizontalOrderBars[fh].top + horizontalOrderBars[fh].height > limit.top)
            {flag = false;
          break;}
        }
        if(flag){
          for (const coverWindow of coverWindows) {
            if (coverWindow.left + coverWindow.width > limit.left && (coverWindow.left) < limit.right && coverWindow.top < limit.bottom && coverWindow.top + coverWindow.height > limit.top)
             { flag = false;
            break;}
          } 
        }
        if(flag){
          var horizontalOneBar = new fabric.Rect({
            id: "horizontalBar",
            left: limit.left,
            top: limit.top,
            width: limit.right - limit.left,
            height: borderthickness,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 1,
            hasControls:false,
            selectable:true
          });

          canvas.add(horizontalOneBar);
        }
      }

      await insertDimentions(canvas, scale, createria);
      canvas.renderAll();
      setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
      setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);

    }
  }

  canvas.on('mouse:move', mouseMoveFunction);
  canvas.on('mouse:down', mouseDownFunction);

  document.addEventListener('mousedown', () => {
    canvas.off('mouse:move', mouseMoveFunction);
    canvas.off('mouse:down', mouseDownFunction);
  });

};


export const handleInsertVerticalThroghBar = (canvas, scale, createria, setCanvasState, setRestoreNum) => {

  const mouseMoveFunction = async (event) => {
    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;

    var sortedHorizontalBars = [];

    var Remove = await getObjectsArrayById(canvas, "cashVerticalOneBar")
    canvas.remove(...Remove);

    var objs = await getObjectsArrayById(canvas, "mainImg");
    var newObj;

    for (var oj = 0; oj < objs.length; oj++)
      if (x >= objs[oj].left +  + borderthickness / 2 && x <= objs[oj].left + objs[oj].width && y >= objs[oj].top && y <= objs[oj].top + objs[oj].height + borderthickness / 2) {
        isCursorOverImage = true;
        newObj = objs[oj];
        break;
      }

    if (isCursorOverImage) {

      var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
      var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
      var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);

      for (var fv = 0; fv < horizontalOrderBars.length; fv++) {
        if (horizontalOrderBars[fv].left + borderthickness / 2 < x && (horizontalOrderBars[fv].left + horizontalOrderBars[fv].width - borderthickness / 2) > x)
        sortedHorizontalBars.push(horizontalOrderBars[fv]);
      }

      var limits = [];

      if (sortedHorizontalBars.length === 0) {
        limits.push({ left: x - borderthickness / 2, right: x + borderthickness / 2, top: newObj.top, bottom: newObj.top + newObj.height });
      } else {
        limits.push({ left: x - borderthickness / 2, right: x + borderthickness / 2, top: newObj.top, bottom: sortedHorizontalBars[0].top });

        for (var k = 0; k < sortedHorizontalBars.length - 1; k++) {
          limits.push({ left: x - borderthickness / 2, right: x + borderthickness / 2, top: sortedHorizontalBars[k].top + borderthickness, bottom: sortedHorizontalBars[k + 1].top });
        }

        limits.push({ left: x - borderthickness / 2, right: x + borderthickness / 2, top: sortedHorizontalBars[sortedHorizontalBars.length - 1].top + borderthickness, bottom: newObj.top + newObj.height });
      }

      for (const limit of limits) {
            var flag = true;
        for (var fh = 0; fh < verticalOrderBars.length; fh++) {
          if (verticalOrderBars[fh].top + verticalOrderBars[fh].height > limit.top && (verticalOrderBars[fh].top) < limit.bottom && verticalOrderBars[fh].left < limit.right && verticalOrderBars[fh].left + verticalOrderBars[fh].width > limit.left)
            {flag = false;
          break;}
        }
        if(flag){
          for (const coverWindow of coverWindows) {
            if (coverWindow.top + coverWindow.height > limit.top && (coverWindow.top) < limit.bottom && coverWindow.left < limit.right && coverWindow.left + coverWindow.width > limit.left)
             { flag = false;
            break;}
          } 
        }
        if(flag){
          var verticalOneBar = new fabric.Rect({
            id: "cashVerticalOneBar",
            left: limit.left,
            top: limit.top,
            width: borderthickness,
            height: limit.bottom - limit.top,
            fill: 'grey',
            stroke: 'black',
            strokeWidth: 1,
            opacity: 0.5
          });

          canvas.add(verticalOneBar);
        }
      }
    }
  }

  const mouseDownFunction = async (event) => {

    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;

    var sortedHorizontalBars = [];

    var Remove = await getObjectsArrayById(canvas, "cashVerticalOneBar")
    canvas.remove(...Remove);

    var objs = await getObjectsArrayById(canvas, "mainImg");
    var newObj;

    for (var oj = 0; oj < objs.length; oj++)
      if (x >= objs[oj].left +  + borderthickness / 2 && x <= objs[oj].left + objs[oj].width && y >= objs[oj].top && y <= objs[oj].top + objs[oj].height + borderthickness / 2) {
        isCursorOverImage = true;
        newObj = objs[oj];
        break;
      }

    if (isCursorOverImage) {

      var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
      var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
      var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);

      for (var fv = 0; fv < horizontalOrderBars.length; fv++) {
        if (horizontalOrderBars[fv].left + borderthickness / 2 < x && (horizontalOrderBars[fv].left + horizontalOrderBars[fv].width - borderthickness / 2) > x)
        sortedHorizontalBars.push(horizontalOrderBars[fv]);
      }

      var limits = [];

      if (sortedHorizontalBars.length === 0) {
        limits.push({ left: x - borderthickness / 2, right: x + borderthickness / 2, top: newObj.top, bottom: newObj.top + newObj.height });
      } else {
        limits.push({ left: x - borderthickness / 2, right: x + borderthickness / 2, top: newObj.top, bottom: sortedHorizontalBars[0].top });

        for (var k = 0; k < sortedHorizontalBars.length - 1; k++) {
          limits.push({ left: x - borderthickness / 2, right: x + borderthickness / 2, top: sortedHorizontalBars[k].top + borderthickness, bottom: sortedHorizontalBars[k + 1].top });
        }

        limits.push({ left: x - borderthickness / 2, right: x + borderthickness / 2, top: sortedHorizontalBars[sortedHorizontalBars.length - 1].top + borderthickness, bottom: newObj.top + newObj.height });
      }

      for (const limit of limits) {
            var flag = true;
        for (var fh = 0; fh < verticalOrderBars.length; fh++) {
          if (verticalOrderBars[fh].top + verticalOrderBars[fh].height > limit.top && (verticalOrderBars[fh].top) < limit.bottom && verticalOrderBars[fh].left < limit.right && verticalOrderBars[fh].left + verticalOrderBars[fh].width > limit.left)
            {flag = false;
          break;}
        }
        if(flag){
          for (const coverWindow of coverWindows) {
            if (coverWindow.top + coverWindow.height > limit.top && (coverWindow.top) < limit.bottom && coverWindow.left < limit.right && coverWindow.left + coverWindow.width > limit.left)
             { flag = false;
            break;}
          } 
        }
        if(flag){
          var verticalOneBar = new fabric.Rect({
            id: "verticalOneBar",
            left: limit.left,
            top: limit.top,
            width: borderthickness,
            height: limit.bottom - limit.top,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 1,
            selectable: true,
            hasControls: false,
          });

          canvas.add(verticalOneBar);
        }
      }

      await insertDimentions(canvas, scale, createria);
      canvas.renderAll();
      setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
      setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);

    }
  }

  canvas.on('mouse:move', mouseMoveFunction);
  canvas.on('mouse:down', mouseDownFunction);

  document.addEventListener('mousedown', () => {
    canvas.off('mouse:move', mouseMoveFunction);
    canvas.off('mouse:down', mouseDownFunction);
  });

}

