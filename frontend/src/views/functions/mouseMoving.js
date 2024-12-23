// import { horizontalMiddleBarSort, verticalMiddleBarSort } from './SortandFlagMiddleBars';
import { handleCreateFrame } from './CreateFrame';
// import { getObjectsArrayById, borderthickness, getObjectById } from '../initialSettings/InitValues';
import { insertDimentions } from './InsertDimensions';
// import { handleInsertCoverWindowResize, coverWindowTest } from './InsertCoverWindowResize';
// import { objectsRePositioning } from './objectsRePositioning';
import { handleObjectSelect, handleSelectClear} from '../newWindowOperations/deleteObject';
import {inputToEditDimensions} from './EditDimensions';


var initLeft = 0;
var initTop = 0;

var movingFlag = false;


export const mouseDownHandler = (event, canvas,scale, createria, setCanvasState, setRestoreNum, setDeleteFlag, zoomSetting) => {
  if (event.target) {
    if(event.target.id.includes("Dim") && (!event.target.id.includes("totalDimH") && (!event.target.id.includes("totalDimV"))) && (zoomSetting === "zoomOff")){
      inputToEditDimensions(canvas,scale, createria, setCanvasState, setRestoreNum, event.target, setDeleteFlag, zoomSetting);
    }
    else{
    event.target.setCoords();
    event.target.set({ isDragging: true });
    initLeft = event.target.left;
    initTop = event.target.top;
    }
    // canvas.requestRenderAll();
  }
};


export const mouseMoveHandler = (event) => {
  if (event.target && event.target.id && event.target.isDragging) {
    if (event.target.id.includes("topframe")) {
      event.target.set({ left: initLeft, top: initTop });
      movingFlag = true;
    }
    else if (event.target.id.includes("leftframe")) { event.target.set({ top: initTop, left: initLeft }); movingFlag = true; }
    else if (event.target.id.includes("rightframe")) { event.target.set({ top: initTop, left: initLeft }); movingFlag = true; }
    else if (event.target.id.includes("bottomframe")) { event.target.set({ left: initLeft, top: initTop }); movingFlag = true; }
    else if (event.target.id.includes("verticalOneBar")) { event.target.set({ top: initTop, left: initLeft }); movingFlag = true; }
    else if (event.target.id.includes("horizontalBar")) { event.target.set({ left: initLeft, top: initTop }); movingFlag = true; }
  }
};

export const mouseUpHandler = async (event, canvas, scale, createria, setRestoreNum, setCanvasState) => {
  if (event.target && event.target.isDragging && movingFlag) {

    event.target.isDragging = false;
    // var SelectedObject = event.target;

    // if (SelectedObject.id.includes("topframe")) {

    //   var currentObj = await getObjectById(canvas, "mainImg" + SelectedObject.id.replace("topframe", ""));
    //   var distance = SelectedObject.top + SelectedObject.height - currentObj.top;
    //   var sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
    //   var sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);

    //   if ((!sortedHorizontalBars && SelectedObject.top < currentObj.top + currentObj.height - SelectedObject.height - 10 * scale) || (sortedHorizontalBars && SelectedObject.top < sortedHorizontalBars[0].top - SelectedObject.height - 10 * scale)) {
    //     if (sortedVerticalBars)
    //       for (const verticalBar of sortedVerticalBars) {
    //         if (verticalBar.top === currentObj.top) {
    //           await verticalBar.set({ top: verticalBar.top + distance, height: verticalBar.height - distance });
    //         }
    //       }
    //     const coverWindows = await coverWindowTest(canvas, currentObj, "topframe");

    //     if (coverWindows) {
    //       for (const coverWindow of coverWindows) {
    //         await handleInsertCoverWindowResize(canvas, coverWindow.left, coverWindow.left + coverWindow.width, SelectedObject.top + SelectedObject.height, coverWindow.top + coverWindow.height, coverWindow.id.replace("realCoverWindow", ""));
    //         canvas.remove(coverWindow);
    //       }
    //     }

    //     var objs = await getObjectsArrayById(canvas, "mainImg");

    //     for (var obj of objs) {
    //       if (obj.id !== currentObj.id && createria === "T") {
    //         await objectsRePositioning(canvas, obj, distance, "T");
    //         await obj.set({ top: obj.top + distance });
    //       }
    //       if (obj.id !== currentObj.id && (createria === "L" || createria === "R")) {
    //         if (obj.top < currentObj.top) {
    //           await objectsRePositioning(canvas, obj, distance, "T");
    //           await obj.set({ top: obj.top + distance });
    //         }
    //       }
    //     }

    //     await currentObj.set({ top: SelectedObject.top + SelectedObject.height, height: currentObj.height + (currentObj.top - SelectedObject.top - SelectedObject.height) });
    //   }
    //   else {
    //     await SelectedObject.set({ top: currentObj.top - SelectedObject.height });
    //   }
    // }

    // if (SelectedObject.id.includes("leftframe")) {
    //   currentObj = await getObjectById(canvas, "mainImg" + SelectedObject.id.replace("leftframe", ""));
    //   distance = SelectedObject.left + SelectedObject.width - currentObj.left;
    //   sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
    //   sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);

    //   if ((!sortedVerticalBars && SelectedObject.left < currentObj.left + currentObj.width - SelectedObject.width - 10 * scale) || (sortedVerticalBars && SelectedObject.left < sortedVerticalBars[0].left - SelectedObject.width - 10 * scale)) {
    //     if (sortedHorizontalBars)
    //       for (const horizontalBar of sortedHorizontalBars) {
    //         if (horizontalBar.left === currentObj.left) {
    //           await horizontalBar.set({ left: horizontalBar.left + distance, width: horizontalBar.width - distance });
    //         }
    //       }
    //     const coverWindows = await coverWindowTest(canvas, currentObj, "leftframe");

    //     if (coverWindows) {
    //       for (const coverWindow of coverWindows) {
    //         await handleInsertCoverWindowResize(canvas, SelectedObject.left + SelectedObject.width, coverWindow.left + coverWindow.width, coverWindow.top, coverWindow.top + coverWindow.height, coverWindow.id.replace("realCoverWindow", ""));
    //         canvas.remove(coverWindow);
    //       }
    //     }

    //     objs = await getObjectsArrayById(canvas, "mainImg");

    //     for (obj of objs) {
    //       if (obj.id !== currentObj.id && createria === "L") {
    //         await objectsRePositioning(canvas, obj, distance, "L");
    //         await obj.set({ left: obj.left + distance });
    //       }
    //       if (obj.id !== currentObj.id && (createria === "T" || createria === "B")) {
    //         if (obj.left < currentObj.left) {
    //           await objectsRePositioning(canvas, obj, distance, "L");
    //           await obj.set({ left: obj.left + distance });
    //         }
    //       }
    //     }

    //     await currentObj.set({ left: SelectedObject.left + SelectedObject.width, width: currentObj.width - distance });
    //   }
    //   else {
    //     await SelectedObject.set({ left: currentObj.left - borderthickness })
    //   }
    // }

    // if (SelectedObject.id.includes("rightframe")) {
    //   currentObj = await getObjectById(canvas, "mainImg" + SelectedObject.id.replace("rightframe", ""));
    //   distance = SelectedObject.left - currentObj.left - currentObj.width;
    //   sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
    //   sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);

    //   if ((!sortedVerticalBars && SelectedObject.left > currentObj.left + 10 * scale) || (sortedVerticalBars && SelectedObject.left > sortedVerticalBars[sortedVerticalBars.length - 1].left + borderthickness + 10 * scale)) {
    //     if (sortedHorizontalBars)
    //       for (const horizontalBar of sortedHorizontalBars) {
    //         if (horizontalBar.left + horizontalBar.width <= currentObj.left + currentObj.width + 2 && horizontalBar.left + horizontalBar.width >= currentObj.left + currentObj.width - 2) {
    //           await horizontalBar.set({ width: horizontalBar.width + distance });
    //         }
    //       }

    //     const coverWindows = await coverWindowTest(canvas, currentObj, "rightframe");

    //     if (coverWindows) {
    //       for (const coverWindow of coverWindows) {
    //         await handleInsertCoverWindowResize(canvas, coverWindow.left, SelectedObject.left, coverWindow.top, coverWindow.top + coverWindow.height, coverWindow.id.replace("realCoverWindow", ""));
    //         canvas.remove(coverWindow);
    //       }
    //     }

    //     objs = await getObjectsArrayById(canvas, "mainImg");

    //     for (obj of objs) {
    //       if (obj.id !== currentObj.id && createria === "R") {
    //         await objectsRePositioning(canvas, obj, distance, "L");
    //         await obj.set({ left: obj.left + distance });
    //       }
    //       if (obj.id !== currentObj.id && (createria === "T" || createria === "B")) {
    //         if (obj.left > currentObj.left) {
    //           await objectsRePositioning(canvas, obj, distance, "L");
    //           await obj.set({ left: obj.left + distance });
    //         }
    //       }
    //     }

    //     currentObj.set({ width: currentObj.width + (SelectedObject.left - currentObj.left - currentObj.width) });
    //   }
    //   else {
    //     SelectedObject.set({ left: currentObj.left + currentObj.width })
    //   }
    // }

    // if (SelectedObject.id.includes("bottomframe")) {
    //   currentObj = await getObjectById(canvas, "mainImg" + SelectedObject.id.replace("bottomframe", ""));
    //   distance = SelectedObject.top - currentObj.top - currentObj.height;
    //   sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
    //   sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);

    //   if ((!sortedHorizontalBars && SelectedObject.top > currentObj.top + 10) || (sortedHorizontalBars && SelectedObject.top > sortedHorizontalBars[sortedHorizontalBars.length - 1].top + sortedHorizontalBars[sortedHorizontalBars.length - 1].height + 10 * scale)) {
    //     if (sortedVerticalBars)
    //       for (const verticalBar of sortedVerticalBars) {
    //         if (verticalBar.top + verticalBar.height <= currentObj.top + currentObj.height + 2 && verticalBar.top + verticalBar.height >= currentObj.top + currentObj.height - 2) {
    //           await verticalBar.set({ height: verticalBar.height + distance });
    //         }
    //       }

    //     const coverWindows = await coverWindowTest(canvas, currentObj, "bottomframe");

    //     if (coverWindows) {
    //       for (const coverWindow of coverWindows) {
    //         await handleInsertCoverWindowResize(canvas, coverWindow.left, coverWindow.left + coverWindow.width, coverWindow.top, SelectedObject.top, coverWindow.id.replace("realCoverWindow", ""));
    //         canvas.remove(coverWindow);
    //       }
    //     }

    //     objs = await getObjectsArrayById(canvas, "mainImg");

    //     for (obj of objs) {
    //       if (obj.id !== currentObj.id && createria === "B") {
    //         await objectsRePositioning(canvas, obj, distance, "T");
    //         await obj.set({ top: obj.top + distance });
    //       }
    //       if (obj.id !== currentObj.id && (createria === "L" || createria === "R")) {
    //         if (obj.top > currentObj.top) {
    //           await objectsRePositioning(canvas, obj, distance, "T");
    //           await obj.set({ top: obj.top + distance });
    //         }
    //       }
    //     }
    //     await currentObj.set({ height: currentObj.height + distance });
    //   } else {
    //     await SelectedObject.set({ top: currentObj.top + currentObj.height })
    //   }
    // }

    // if (SelectedObject.id.includes("verticalOneBar")) {
    //   objs = await getObjectsArrayById(canvas, "mainImg");
    //   for (obj of objs) {
    //     if (obj.left <= initLeft && obj.left + obj.width >= initLeft + borderthickness && obj.top <= SelectedObject.top && obj.top + obj.height >= SelectedObject.top + SelectedObject.height) {
    //       currentObj = obj;
    //       break;
    //     }
    //   }

    //   distance = SelectedObject.left - initLeft;
    //   sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
    //   sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);
    //   var newVerticalBars = [];
    //   var leftLimit = currentObj.left, rightLimit = currentObj.left + currentObj.width;

    //   for (var fv = 0; fv < sortedVerticalBars.length; fv++) {
    //     if (sortedVerticalBars[fv].top + sortedVerticalBars[fv].height >= SelectedObject.top && sortedVerticalBars[fv].top <= SelectedObject.top + SelectedObject.height)
    //       if (!(sortedVerticalBars[fv].top === SelectedObject.top && sortedVerticalBars[fv].left === SelectedObject.left))
    //         newVerticalBars.push(sortedVerticalBars[fv]);
    //   }

    //   for (fv = newVerticalBars.length - 1; fv >= 0; fv--) {
    //     if (newVerticalBars[fv].left <= initLeft) {
    //       leftLimit = newVerticalBars[fv].left + newVerticalBars[fv].width;
    //       break;
    //     }
    //   }
    //   for (fv = 0; fv < newVerticalBars.length; fv++) {
    //     if (newVerticalBars[fv].left >= initLeft) {
    //       rightLimit = newVerticalBars[fv].left;
    //       break;
    //     }
    //   }

    //   if (SelectedObject.left > leftLimit && SelectedObject.left + SelectedObject.width < rightLimit) {
    //     if (sortedHorizontalBars)
    //       for (const horizontalBar of sortedHorizontalBars) {
    //         if (horizontalBar.left === initLeft + borderthickness && horizontalBar.top >= SelectedObject.top && horizontalBar.top + horizontalBar.height <= SelectedObject.top + SelectedObject.height) {
    //           await horizontalBar.set({ left: horizontalBar.left + distance, width: horizontalBar.width - distance }).setCoords();
    //         }
    //         if (horizontalBar.left + horizontalBar.width < initLeft + 3 && horizontalBar.left + horizontalBar.width > initLeft - 3 && horizontalBar.top >= SelectedObject.top && horizontalBar.top + horizontalBar.height <= SelectedObject.top + SelectedObject.height) {
    //           await horizontalBar.set({ width: horizontalBar.width + distance }).setCoords();
    //         }
    //       }

    //     const cashObj = { left: initLeft, top: initTop, bottom: (initTop + SelectedObject.height) };

    //     const coverWindows = await coverWindowTest(canvas, cashObj, "verticalOneBarBefore");

    //     if (coverWindows) {
    //       for (const coverWindow of coverWindows) {
    //         await handleInsertCoverWindowResize(canvas, coverWindow.left, SelectedObject.left, coverWindow.top, coverWindow.top + coverWindow.height, coverWindow.id.replace("realCoverWindow", ""));
    //         canvas.remove(coverWindow);
    //       }
    //     }

    //     const coverWindows1 = await coverWindowTest(canvas, cashObj, "verticalOneBarAfter");

    //     if (coverWindows1) {
    //       for (const coverWindow1 of coverWindows1) {
    //         await handleInsertCoverWindowResize(canvas, SelectedObject.left + borderthickness, coverWindow1.left + coverWindow1.width, coverWindow1.top, coverWindow1.top + coverWindow1.height, coverWindow1.id.replace("realCoverWindow", ""));
    //         canvas.remove(coverWindow1);
    //       }
    //     }
    //   }
    //   else {
    //     await SelectedObject.set({ left: initLeft }).setCoords();
    //   }
    // }

    // if (SelectedObject.id.includes("horizontalBar")) {
    //   objs = await getObjectsArrayById(canvas, "mainImg");
    //   for (obj of objs) {
    //     if (obj.left <= initLeft && obj.left + obj.width + borderthickness >= initLeft + SelectedObject.width && obj.top <= initTop && obj.top + obj.height >= initTop + borderthickness) {
    //       currentObj = obj;
    //       break;
    //     }
    //   }

    //   distance = SelectedObject.top - initTop;
    //   sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
    //   sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);
    //   var newHorizontalBars = [];
    //   var topLimit = currentObj.top, bottomLimit = currentObj.top + currentObj.height;

    //   for (var fh = 0; fh < sortedHorizontalBars.length; fh++) {
    //     if (sortedHorizontalBars[fh].left + sortedHorizontalBars[fh].width >= SelectedObject.left && sortedHorizontalBars[fh].left <= SelectedObject.left + SelectedObject.width)
    //       if (!(sortedHorizontalBars[fh].left === SelectedObject.left && sortedHorizontalBars[fh].top === SelectedObject.top))
    //       newHorizontalBars.push(sortedHorizontalBars[fh]);
    //   }

    //   for (fh = newHorizontalBars.length - 1; fh >= 0; fh--) {
    //     if (newHorizontalBars[fh].top <= initTop) {
    //       topLimit = newHorizontalBars[fh].top + newHorizontalBars[fh].height;
    //       break;
    //     }
    //   }
    //   for (fh = 0; fh < newHorizontalBars.length; fh++) {
    //     if (newHorizontalBars[fh].top >= initTop) {
    //       bottomLimit = newHorizontalBars[fh].top;
    //       break;
    //     }
    //   }

    //   if (SelectedObject.top > topLimit && SelectedObject.top + SelectedObject.height < bottomLimit) {
    //     if (sortedVerticalBars)
    //       for (const verticalBar of sortedVerticalBars) {
    //         if (verticalBar.top === initTop + borderthickness && verticalBar.left >= SelectedObject.left && verticalBar.left + verticalBar.width <= SelectedObject.left + SelectedObject.width) {
    //           await verticalBar.set({ top: verticalBar.top + distance, height: verticalBar.height - distance }).setCoords();
    //         }
    //         if (verticalBar.top + verticalBar.height < initTop + 3 && verticalBar.top + verticalBar.height > initTop - 3 && verticalBar.left >= SelectedObject.left && verticalBar.left + verticalBar.width <= SelectedObject.left + SelectedObject.width) {
    //           await verticalBar.set({ height: verticalBar.height + distance }).setCoords();
    //         }
    //       }

    //     const cashObj = { left: initLeft, top: initTop, right: (initLeft + SelectedObject.width) };

    //     const coverWindows = await coverWindowTest(canvas, cashObj, "horizontalBarBefore");

    //     if (coverWindows) {
    //       for (const coverWindow of coverWindows) {
    //         await handleInsertCoverWindowResize(canvas, coverWindow.left, coverWindow.left + coverWindow.width, coverWindow.top, SelectedObject.top, coverWindow.id.replace("realCoverWindow", ""));
    //         canvas.remove(coverWindow);
    //       }
    //     }

    //     const coverWindows1 = await coverWindowTest(canvas, cashObj, "horizontalBarAfter");

    //     if (coverWindows1) {
    //       for (const coverWindow1 of coverWindows1) {
    //         await handleInsertCoverWindowResize(canvas, coverWindow1.left, coverWindow1.left + coverWindow1.width, SelectedObject.top + borderthickness, coverWindow1.top + coverWindow1.height, coverWindow1.id.replace("realCoverWindow", ""));
    //         canvas.remove(coverWindow1);
    //       }
    //     }
    //   }
    //   else {
    //     await SelectedObject.set({ top: initTop }).setCoords();
    //   }
    // }

    if (movingFlag) {
      movingFlag = false;
      await handleCreateFrame(canvas);
      await insertDimentions(canvas, scale, createria);
      await canvas.renderAll();
      // setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
      // setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
    }
  }
};

export var aa;


// Enable drag and drop for objects on the canvas
export const mouseMoving = async (canvas, scale, createria, setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting) => {

  canvas.isDrawingMode = false;
  canvas.selection = true;

  var bb = (event) => mouseDownHandler(event, canvas,scale, createria, setCanvasState, setRestoreNum, setDeleteFlag, zoomSetting);


  canvas.on('mouse:down', bb);

  canvas.on('mouse:move', mouseMoveHandler);

  aa = (event) => mouseUpHandler(event, canvas, scale, createria, setRestoreNum, setCanvasState);

  canvas.on('mouse:up', aa);
  // await insertDimentions(canvas, scale, createria);

  canvas.on('selection:cleared', () => handleSelectClear(setDeleteFlag));
  canvas.on('selection:created', (e) => handleObjectSelect(e, setDeleteFlag));
}