import {borderthickness, getObjectsArrayById} from '../initialSettings/InitValues.js';
import {horizontalMiddleBarSort, verticalMiddleBarSort} from '../functions/SortandFlagMiddleBars.js'
import { handleInsertCoverWindowResize, coverWindowTest } from '../functions/InsertCoverWindowResize.js';
import {insertDimentions} from '../functions/InsertDimensions.js';


export const verticalMiddleBarCentering = async(canvas, scale, createria, setCanvasState, setRestoreNum, deleteFlag, setDeleteFlag) => {
  if(canvas && deleteFlag)
  {
    const selectedObjects =await canvas.getActiveObjects();
    var SelectedObject = selectedObjects[0];
    if(/verticalOneBar/.test(SelectedObject.id))
    { 

      var initLeft = SelectedObject.left; 
      var initTop = SelectedObject.top;
      var currentObj;

      var objs = await getObjectsArrayById(canvas, "mainImg");
      for ( var obj of objs) {
        if (obj.left <= initLeft && obj.left + obj.width >= initLeft + borderthickness && obj.top <= initTop && obj.top + obj.height + 3 >= initTop + SelectedObject.height) {
          currentObj = obj;
          break;
        }
      }

      var sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
      var sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);
      var newVerticalBars = [];
      var leftLimit = currentObj.left, rightLimit = currentObj.left + currentObj.width;
      var cashFlag = true;

      for (var fv = 0; fv < sortedVerticalBars.length; fv++) {
        if (sortedVerticalBars[fv].top + sortedVerticalBars[fv].height >= SelectedObject.top && sortedVerticalBars[fv].top <= SelectedObject.top + SelectedObject.height)
          if (!(sortedVerticalBars[fv].top === SelectedObject.top && sortedVerticalBars[fv].left === SelectedObject.left))
            newVerticalBars.push(sortedVerticalBars[fv]);
      }


      for (fv = newVerticalBars.length - 1; fv >= 0; fv--) {
        if (newVerticalBars[fv].left <= initLeft) {
          if(newVerticalBars[fv].top>initTop || newVerticalBars[fv].top + newVerticalBars[fv].height<initTop + SelectedObject.height){
            cashFlag = false;
          }
          else
          leftLimit = newVerticalBars[fv].left + newVerticalBars[fv].width;
          break;
        }
      }
      for (fv = 0; fv < newVerticalBars.length; fv++) {
        if (newVerticalBars[fv].left >= initLeft) {
          if(newVerticalBars[fv].top>initTop || newVerticalBars[fv].top + newVerticalBars[fv].height<initTop + SelectedObject.height){
            cashFlag = false;
          }
          else
          rightLimit = newVerticalBars[fv].left;
          break;
        }
      }

      
      if (cashFlag && SelectedObject.left > leftLimit && SelectedObject.left + SelectedObject.width < rightLimit) {

        await SelectedObject.set({left:leftLimit + (rightLimit - leftLimit)/2 - borderthickness/2}).setCoords();
        const distance = SelectedObject.left - initLeft;
        if (sortedHorizontalBars)
          for (const horizontalBar of sortedHorizontalBars) {
            if (horizontalBar.left === initLeft + borderthickness && horizontalBar.top >= SelectedObject.top && horizontalBar.top + horizontalBar.height <= SelectedObject.top + SelectedObject.height) {
              await horizontalBar.set({ left: horizontalBar.left + distance, width: horizontalBar.width - distance }).setCoords();
            }
            if (horizontalBar.left + horizontalBar.width < initLeft + 3 && horizontalBar.left + horizontalBar.width > initLeft - 3 && horizontalBar.top >= SelectedObject.top && horizontalBar.top + horizontalBar.height <= SelectedObject.top + SelectedObject.height) {
              await horizontalBar.set({ width: horizontalBar.width + distance }).setCoords();
            }
          }

        const cashObj = { left: initLeft, top: initTop, bottom: (initTop + SelectedObject.height) };

        const coverWindows = await coverWindowTest(canvas, cashObj, "verticalOneBarBefore");

        if (coverWindows) {
          for (const coverWindow of coverWindows) {
            await handleInsertCoverWindowResize(canvas, coverWindow.left, SelectedObject.left, coverWindow.top, coverWindow.top + coverWindow.height, coverWindow.id.replace("realCoverWindow", ""));
            canvas.remove(coverWindow);
          }
        }

        const coverWindows1 = await coverWindowTest(canvas, cashObj, "verticalOneBarAfter");

        if (coverWindows1) {
          for (const coverWindow1 of coverWindows1) {
            await handleInsertCoverWindowResize(canvas, SelectedObject.left + borderthickness, coverWindow1.left + coverWindow1.width, coverWindow1.top, coverWindow1.top + coverWindow1.height, coverWindow1.id.replace("realCoverWindow", ""));
            canvas.remove(coverWindow1);
          }
        }
        setDeleteFlag(false);
        await insertDimentions(canvas, scale, createria);
        await canvas.renderAll();
        setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
        setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);

      }
      else {
        window.alert("You can't move this bar.");
        setDeleteFlag(false);
      }
   }
  }
}


export const horizontalMiddleBarCentering = async(canvas, scale, createria, setCanvasState, setRestoreNum, deleteFlag, setDeleteFlag) => {
  if(canvas && deleteFlag)
  {
    const selectedObjects = canvas.getActiveObjects();
    var SelectedObject = selectedObjects[0];
    if(/horizontalBar/.test(SelectedObject.id))
    { 

      var initLeft = SelectedObject.left; 
      var initTop = SelectedObject.top;
      var currentObj;

      var objs = await getObjectsArrayById(canvas, "mainImg");
      for (var obj of objs) {
        if (obj.left - 3 <= initLeft && obj.left + obj.width + borderthickness >= initLeft + SelectedObject.width && obj.top - 3 <= initTop && obj.top + obj.height >= initTop + borderthickness) {
          currentObj = obj;
          break;
        }
      }

      var sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
      var sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);
      var newHorizontalBars = [];
      var topLimit = currentObj.top, bottomLimit = currentObj.top + currentObj.height;
      var cashFlag = true;

      for (var fh = 0; fh < sortedHorizontalBars.length; fh++) {
        if (sortedHorizontalBars[fh].left + sortedHorizontalBars[fh].width >= SelectedObject.left && sortedHorizontalBars[fh].left <= SelectedObject.left + SelectedObject.width)
          if (!(sortedHorizontalBars[fh].left === SelectedObject.left && sortedHorizontalBars[fh].top === SelectedObject.top))
          newHorizontalBars.push(sortedHorizontalBars[fh]);
      }

      for (fh = newHorizontalBars.length - 1; fh >= 0; fh--) {
        if (newHorizontalBars[fh].top <= initTop) {
          if(newHorizontalBars[fh].left>initLeft || newHorizontalBars[fh].left + newHorizontalBars[fh].width<initLeft + SelectedObject.width){
            cashFlag = false;
          }
          else 
          topLimit = newHorizontalBars[fh].top + newHorizontalBars[fh].height;
          break;
        }
      }
      for (fh = 0; fh < newHorizontalBars.length; fh++) {
        if (newHorizontalBars[fh].top >= initTop) {
          if(newHorizontalBars[fh].left>initLeft || newHorizontalBars[fh].left + newHorizontalBars[fh].width<initLeft + SelectedObject.width){
            cashFlag = false;
          }
          else 
          bottomLimit = newHorizontalBars[fh].top;
          break;
        }
      }

      if (cashFlag && SelectedObject.top > topLimit && SelectedObject.top + SelectedObject.height < bottomLimit) {
        
        await SelectedObject.set({top:topLimit + (bottomLimit - topLimit)/2 - borderthickness/2}).setCoords();
        const distance = SelectedObject.top - initTop;
     
        if (sortedVerticalBars)
          for (const verticalBar of sortedVerticalBars) {
            if (verticalBar.top === initTop + borderthickness && verticalBar.left >= SelectedObject.left && verticalBar.left + verticalBar.width <= SelectedObject.left + SelectedObject.width) {
              await verticalBar.set({ top: verticalBar.top + distance, height: verticalBar.height - distance }).setCoords();
            }
            if (verticalBar.top + verticalBar.height < initTop + 3 && verticalBar.top + verticalBar.height > initTop - 3 && verticalBar.left >= SelectedObject.left && verticalBar.left + verticalBar.width <= SelectedObject.left + SelectedObject.width) {
              await verticalBar.set({ height: verticalBar.height + distance }).setCoords();
            }
          }

        const cashObj = { left: initLeft, top: initTop, right: (initLeft + SelectedObject.width) };

        const coverWindows = await coverWindowTest(canvas, cashObj, "horizontalBarBefore");

        if (coverWindows) {
          for (const coverWindow of coverWindows) {
            await handleInsertCoverWindowResize(canvas, coverWindow.left, coverWindow.left + coverWindow.width, coverWindow.top, SelectedObject.top, coverWindow.id.replace("realCoverWindow", ""));
            canvas.remove(coverWindow);
          }
        }

        const coverWindows1 = await coverWindowTest(canvas, cashObj, "horizontalBarAfter");

        if (coverWindows1) {
          for (const coverWindow1 of coverWindows1) {
            await handleInsertCoverWindowResize(canvas, coverWindow1.left, coverWindow1.left + coverWindow1.width, SelectedObject.top + borderthickness, coverWindow1.top + coverWindow1.height, coverWindow1.id.replace("realCoverWindow", ""));
            canvas.remove(coverWindow1);
          }
        }

        setDeleteFlag(false);
        await insertDimentions(canvas, scale, createria);
        await canvas.renderAll();
        setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
        setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
      }
      else {
        window.alert("You can't move this bar.");
        setDeleteFlag(false);
      }
   }
  }
}