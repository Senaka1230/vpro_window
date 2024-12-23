import { fabric } from 'fabric';
import { borderthickness, firstDim, getObjectById, getObjectsArrayById } from '../initialSettings/InitValues.js';
import { horizontalMiddleBarSort, verticalMiddleBarSort } from './SortandFlagMiddleBars.js'
import { handleInsertCoverWindowResize, coverWindowTest } from './InsertCoverWindowResize';
import { objectsRePositioning } from './objectsRePositioning';
import { insertDimentions } from './InsertDimensions.js';
import { handleCreateFrame } from './CreateFrame';
import { mouseMoving } from './mouseMoving.js';



export function getCoordinatesDifference(canvas) {
  const canvasElement = canvas.getElement();
  const canvasRect = canvasElement.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();

  const differenceX = canvasRect.left - bodyRect.left;
  const differenceY = canvasRect.top - bodyRect.top;
  return { differenceX, differenceY };
}


export function inputToEditDimensions(canvas, scale, createria, setCanvasState, setRestoreNum, textObj, setDeleteFlag, zoomSetting) {
  var BeforeInput = document.getElementsByTagName('input');
  for (var a = 0; a < BeforeInput.length; a++) {
    if (BeforeInput[a].id === "DimInput")
      document.body.removeChild(BeforeInput[a]);
  }

  var customInput = document.createElement('input');
  var { differenceX, differenceY } = getCoordinatesDifference(canvas);
  customInput.id = "DimInput";
  customInput.type = 'number';
  customInput.style.width = '60px';
  customInput.style.fontSize = '17px';
  customInput.value = "";
  customInput.style.position = 'absolute';

  if (textObj.id.includes("DimH")) {
    customInput.style.top = textObj.top + differenceY + 'px';
    customInput.style.left = textObj.left + differenceX + Math.ceil(textObj.width / 2) - 15 + 'px';
  }
  else {
    // customInput.style.transform = 'rotate(-90deg)';
    customInput.style.top = textObj.top + differenceY + Math.ceil(textObj.height / 2) - 15 + 'px';
    customInput.style.left = textObj.left + differenceX - 20 + 'px';
  }

  document.body.appendChild(customInput);
  customInput.focus();

  customInput.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') {
      const editedDim = parseFloat(customInput.value);
      canvas.renderAll();
      document.body.removeChild(customInput);

      if (!isNaN(editedDim)) {

        if (textObj.id.includes("firstDimV")) {

          var currentObj = await getObjectById(canvas, "mainImg" + textObj.id.replace("firstDimV", ""));
         if(createria === "D")
         { var rate = editedDim * scale / currentObj.height;
          var targetWidth = (currentObj.width/rate);
          var distance = targetWidth - currentObj.width;
          var sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
          var sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);
 

          if ((!sortedVerticalBars && targetWidth > 10) || (sortedVerticalBars && targetWidth + currentObj.left > sortedVerticalBars[sortedVerticalBars.length - 1].left + sortedVerticalBars[sortedVerticalBars.length - 1].width + 10)) {
            if (sortedHorizontalBars)
              for (const horizontalBar of sortedHorizontalBars) {
                if (horizontalBar.left + horizontalBar.width <= currentObj.left + currentObj.width + 2 && horizontalBar.left + horizontalBar.width >= currentObj.left + currentObj.width - 2) {
                  await horizontalBar.set({ width: horizontalBar.width + distance });
                }
              }

            const coverWindows = await coverWindowTest(canvas, currentObj, "rightframe");

            if (coverWindows) {
              for (const coverWindow of coverWindows) {
                await handleInsertCoverWindowResize(canvas, coverWindow.left, currentObj.left + targetWidth, coverWindow.top, coverWindow.top + coverWindow.height, coverWindow.id.replace("realCoverWindow", ""));
                canvas.remove(coverWindow);
              }
            }

            var objs = await getObjectsArrayById(canvas, "mainImg");

            for (var obj of objs) {
              if (obj.id !== currentObj.id && createria === "R") {
                await objectsRePositioning(canvas, obj, distance, "L");
                await obj.set({ left: obj.left + distance });
              }
              if (obj.id !== currentObj.id && (createria === "T" || createria === "B")) {
                if (obj.left > currentObj.left) {
                  await objectsRePositioning(canvas, obj, distance, "L");
                  await obj.set({ left: obj.left + distance });
                }
              }
            }

            currentObj.set({ width: currentObj.width + distance });

            await handleCreateFrame(canvas);
          }
          

          await insertDimentions(canvas, 400/editedDim.toFixed(2), createria);
          setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
          setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
          canvas.off();
          await mouseMoving(canvas, 400/editedDim.toFixed(2), createria, setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);
          await canvas.renderAll();

          // var currentObj = await getObjectById(canvas, "mainImg" + textObj.id.replace("firstDimV", ""));
        }else {
          var distance = editedDim * scale - currentObj.height;
          var sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
          var sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);

          if ((!sortedHorizontalBars && editedDim * scale > 10) || (sortedHorizontalBars && editedDim * scale + currentObj.top > sortedHorizontalBars[sortedHorizontalBars.length - 1].top + sortedHorizontalBars[sortedHorizontalBars.length - 1].height + 10)) {
            if (sortedVerticalBars)
              for (const verticalBar of sortedVerticalBars) {
                if (verticalBar.top + verticalBar.height <= currentObj.top + currentObj.height + 2 && verticalBar.top + verticalBar.height >= currentObj.top + currentObj.height - 2) {
                  await verticalBar.set({ height: verticalBar.height + distance });
                }
              }

            const coverWindows = await coverWindowTest(canvas, currentObj, "bottomframe");

            if (coverWindows) {
              for (const coverWindow of coverWindows) {
                await handleInsertCoverWindowResize(canvas, coverWindow.left, coverWindow.left + coverWindow.width, coverWindow.top, currentObj.top + editedDim * scale, coverWindow.id.replace("realCoverWindow", ""));
                canvas.remove(coverWindow);
              }
            }

            var objs = await getObjectsArrayById(canvas, "mainImg");

            for (var obj of objs) {
              if (obj.id !== currentObj.id && createria === "B") {
                await objectsRePositioning(canvas, obj, distance, "T");
                await obj.set({ top: obj.top + distance });
              }
              if (obj.id !== currentObj.id && (createria === "L" || createria === "R")) {
                if (obj.top > currentObj.top) {
                  await objectsRePositioning(canvas, obj, distance, "T");
                  await obj.set({ top: obj.top + distance });
                }
              }
            }
            await currentObj.set({ height: currentObj.height + distance });

            await handleCreateFrame(canvas);
            await insertDimentions(canvas, scale, createria);
            await canvas.renderAll();
            setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
            setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
          }
        }
        }

        else if (textObj.id.includes("firstDimH")) {

          var currentObj = await getObjectById(canvas, "mainImg" + textObj.id.replace("firstDimH", ""));
          var distance = editedDim * scale - currentObj.width;
          var sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
          var sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);

          if ((!sortedVerticalBars && editedDim * scale > 10) || (sortedVerticalBars && editedDim * scale + currentObj.left > sortedVerticalBars[sortedVerticalBars.length - 1].left + sortedVerticalBars[sortedVerticalBars.length - 1].width + 10)) {
            if (sortedHorizontalBars)
              for (const horizontalBar of sortedHorizontalBars) {
                if (horizontalBar.left + horizontalBar.width <= currentObj.left + currentObj.width + 2 && horizontalBar.left + horizontalBar.width >= currentObj.left + currentObj.width - 2) {
                  await horizontalBar.set({ width: horizontalBar.width + distance });
                }
              }

            const coverWindows = await coverWindowTest(canvas, currentObj, "rightframe");

            if (coverWindows) {
              for (const coverWindow of coverWindows) {
                await handleInsertCoverWindowResize(canvas, coverWindow.left, currentObj.left + editedDim * scale, coverWindow.top, coverWindow.top + coverWindow.height, coverWindow.id.replace("realCoverWindow", ""));
                canvas.remove(coverWindow);
              }
            }

            var objs = await getObjectsArrayById(canvas, "mainImg");

            for (var obj of objs) {
              if (obj.id !== currentObj.id && createria === "R") {
                await objectsRePositioning(canvas, obj, distance, "L");
                await obj.set({ left: obj.left + distance });
              }
              if (obj.id !== currentObj.id && (createria === "T" || createria === "B")) {
                if (obj.left > currentObj.left) {
                  await objectsRePositioning(canvas, obj, distance, "L");
                  await obj.set({ left: obj.left + distance });
                }
              }
            }

            currentObj.set({ width: currentObj.width + distance });

            await handleCreateFrame(canvas);
            await insertDimentions(canvas, scale, createria);
            await canvas.renderAll();
            setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
            setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
          }
        }

        if (textObj.id.includes("lastDimV")) {

          var firstDimVs = await getObjectsArrayById(canvas, "firstDimV");
          var plusId = "";
          firstDimVs = firstDimVs.sort((a, b) => a.left - b.left)

          for (var k = 0; k < firstDimVs.length; k++) {
            if(!(createria === "L" || createria === "R")){
              if (firstDimVs[k].top <= textObj.top && firstDimVs[k].top + firstDimVs[k].height >= textObj.top + textObj.height && firstDimVs[k].left < textObj.left && firstDimVs[k + 1] ? (firstDimVs[k + 1].left > textObj.left) : (1 === 1)) {
                plusId = firstDimVs[k].id.replace("firstDimV", "");
                break;
              }
            }
            else if(createria === "L" || createria === "R")
            if (firstDimVs[k].top <= textObj.top && firstDimVs[k].top + firstDimVs[k].height >= textObj.top + textObj.height) {
              plusId = firstDimVs[k].id.replace("firstDimV", "");
              break;
            }
          }

          currentObj = await getObjectById(canvas, "mainImg" + plusId);

          sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
          sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);
          var newHorizontalBars = [];
          var topLimit = currentObj.top, bottomLimit = currentObj.top + currentObj.height;
          var SelectedObject = sortedHorizontalBars[textObj.id.replace("lastDimV", "")] ? (sortedHorizontalBars[textObj.id.replace("lastDimV", "")]) : false;
          const initTop = SelectedObject.top, initLeft = SelectedObject.left;
          distance = editedDim * scale - (textObj.height - 1);
          if (SelectedObject) {
            for (var fh = 0; fh < sortedHorizontalBars.length; fh++) {
              if (sortedHorizontalBars[fh].left + sortedHorizontalBars[fh].width >= SelectedObject.left && sortedHorizontalBars[fh].left <= SelectedObject.left + SelectedObject.width)
                if (!(sortedHorizontalBars[fh].left === SelectedObject.left && sortedHorizontalBars[fh].top === SelectedObject.top))
                  newHorizontalBars.push(sortedHorizontalBars[fh]);
            }

            for (fh = newHorizontalBars.length - 1; fh >= 0; fh--) {
              if (newHorizontalBars[fh].top <= initTop) {
                topLimit = newHorizontalBars[fh].top + newHorizontalBars[fh].height;
                break;
              }
            }
            for (fh = 0; fh < newHorizontalBars.length; fh++) {
              if (newHorizontalBars[fh].top >= initTop) {
                bottomLimit = newHorizontalBars[fh].top;
                break;
              }
            }

            await SelectedObject.set({ top: initTop + distance }).setCoords();

            if (SelectedObject.top > topLimit && SelectedObject.top + SelectedObject.height < bottomLimit) {
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
            }
            else {
              await SelectedObject.set({ top: initTop }).setCoords();
            }



            await handleCreateFrame(canvas);
            await insertDimentions(canvas, scale, createria);
            await canvas.renderAll();
            setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
            setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
          }
        }

        if (textObj.id.includes("lastDimH")) {
          var firstDimVs = await getObjectsArrayById(canvas, "firstDimH");
          var plusId = "";
          firstDimVs = firstDimVs.sort((a, b) => a.top - b.top)

          for (var k = 0; k < firstDimVs.length; k++) {
            if(!(createria === "T" || createria === "B")){
              if (firstDimVs[k].left <= textObj.left && firstDimVs[k].left + firstDimVs[k].width >= textObj.left + textObj.width && firstDimVs[k].top < textObj.top && (firstDimVs[k + 1]) ? (firstDimVs[k + 1].top > textObj.top) : (1 === 1)) {
                plusId = firstDimVs[k].id.replace("firstDimH", "");
                break;
              }
            }
            else if((createria === "T" || createria === "B")){
              if (firstDimVs[k].left <= textObj.left && firstDimVs[k].left + firstDimVs[k].width >= textObj.left + textObj.width) {
                plusId = firstDimVs[k].id.replace("firstDimH", "");
                break;
              }
            }

          }

          currentObj = await getObjectById(canvas, "mainImg" + plusId);

          sortedHorizontalBars = await horizontalMiddleBarSort(canvas, currentObj);
          sortedVerticalBars = await verticalMiddleBarSort(canvas, currentObj);
          var newVerticalBars = [];
          var leftLimit = currentObj.left, rightLimit = currentObj.left + currentObj.width;
          var SelectedObject = sortedVerticalBars[textObj.id.replace("lastDimH", "")] ? (sortedVerticalBars[textObj.id.replace("lastDimH", "")]) : false;
          const initTop = SelectedObject.top, initLeft = SelectedObject.left;
          distance = editedDim * scale - (textObj.width - 1);

          if (SelectedObject) {
            for (var fv = 0; fv < sortedVerticalBars.length; fv++) {
              if (sortedVerticalBars[fv].top + sortedVerticalBars[fv].height >= SelectedObject.top && sortedVerticalBars[fv].top <= SelectedObject.top + SelectedObject.height)
                if (!(sortedVerticalBars[fv].top === SelectedObject.top && sortedVerticalBars[fv].left === SelectedObject.left))
                  newVerticalBars.push(sortedVerticalBars[fv]);
            }

            for (fv = newVerticalBars.length - 1; fv >= 0; fv--) {
              if (newVerticalBars[fv].left <= initLeft) {
                leftLimit = newVerticalBars[fv].left + newVerticalBars[fv].width;
                break;
              }
            }
            for (fv = 0; fv < newVerticalBars.length; fv++) {
              if (newVerticalBars[fv].left >= initLeft) {
                rightLimit = newVerticalBars[fv].left;
                break;
              }
            }

            await SelectedObject.set({ left: initLeft + distance }).setCoords();

            if (SelectedObject.left > leftLimit && SelectedObject.left + SelectedObject.width < rightLimit) {
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
            }
            else {
              await SelectedObject.set({ left: initLeft }).setCoords();
            }

            await handleCreateFrame(canvas);
            await insertDimentions(canvas, scale, createria);
            await canvas.renderAll();
            setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
            setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);

          }
        }
      }
    }
  });


}
