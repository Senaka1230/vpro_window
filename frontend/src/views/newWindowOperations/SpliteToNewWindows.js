import { fabric } from 'fabric';
import { borderthickness, borderImages, LoadImg, getObjectById, getObjectsArrayById } from '../initialSettings/InitValues.js';
import { verticalMiddleBarSort, horizontalMiddleBarSort } from '../functions/SortandFlagMiddleBars.js';
import { handleCreateFrame } from '../functions/CreateFrame.js';
import { insertDimentions } from '../functions/InsertDimensions.js';
import { mouseMoving } from '../functions/mouseMoving.js';

export const handleHorizontalSplitWindows = (canvas, rightMenuIndex, scale, createria, setCreateria, newCreateria, setCanvasState, setRestoreNum, setDeleteFlag, zoomSetting) => {

  const mouseMoveFunction = async (event) => {
    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;
    var barLeft = 0;
    var barwidth = 0
    var barHeight = 0;

    var Remove = await getObjectById(canvas, "cashSplitHorizontal")
    canvas.remove(Remove);

    var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
    var startFlag = true;
    for (const coverWindow of coverWindows) {
      if (coverWindow.left <= x && coverWindow.left + coverWindow.width >= x && coverWindow.top <= y && coverWindow.top + coverWindow.height >= y) {
        startFlag = false; break;
      }
    }
    if (startFlag) {
      var objs = await getObjectsArrayById(canvas, "mainImg");
      var newObj;

      for (var oj = 0; oj < objs.length; oj++)
        if (x >= objs[oj].left && x <= objs[oj].left + objs[oj].width && y >= objs[oj].top && y <= objs[oj].top + objs[oj].height) {
          isCursorOverImage = true;
          barLeft = objs[oj].left;
          barwidth = objs[oj].width;
          barHeight = objs[oj].height;
          newObj = objs[oj];
          break;
        }

      if (isCursorOverImage && barHeight > (2 * borderthickness + 4)) {

        var sortedVerticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
        var sortedHorizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);

        if (!sortedVerticalOrderBars && !sortedHorizontalOrderBars) {
          var horizontalOneBar = new fabric.Rect({
            id: "cashSplitHorizontal",
            left: barLeft,
            top: y - 2,
            width: barwidth,
            height: 4,
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
    var barLeft = 0;
    var barwidth = 0;
    var barTop = 0;
    var barHeight = 0;
    var CurrentMainImg = {};

    var Remove = await getObjectById(canvas, "cashSplitHorizontal");
    canvas.remove(Remove);

    var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
    var startFlag = true;
    for (const coverWindow of coverWindows) {
      if (coverWindow.left <= x && coverWindow.left + coverWindow.width >= x && coverWindow.top <= y && coverWindow.top + coverWindow.height >= y) {
        startFlag = false; break;
      }
    }

    if (startFlag) {

      var objs = await getObjectsArrayById(canvas, "mainImg");

      for (var oj = 0; oj < objs.length; oj++)
        if (x >= objs[oj].left && x <= objs[oj].left + objs[oj].width && y >= objs[oj].top && y <= objs[oj].top + objs[oj].height) {
          isCursorOverImage = true;
          barLeft = objs[oj].left;
          barwidth = objs[oj].width;
          barTop = objs[oj].top;
          barHeight = objs[oj].height;
          CurrentMainImg = objs[oj];
        }

      if (isCursorOverImage && barHeight > (2 * borderthickness + 4)) {

        var mainImg = await LoadImg(borderImages.main);

        var sortedVerticalOrderBars = await verticalMiddleBarSort(canvas, CurrentMainImg);
        var sortedHorizontalOrderBars = await horizontalMiddleBarSort(canvas, CurrentMainImg);

        if (!sortedVerticalOrderBars && !sortedHorizontalOrderBars) {
          CurrentMainImg.set({ height: y - barTop - 2 - borderthickness });

          mainImg.set({
            id: "mainImg" + objs.length,
            width: barwidth,
            height: barTop + barHeight - y - 2 - borderthickness,
            left: barLeft,
            top: y + 2 + borderthickness,
            stroke: 'black',
            strokeWidth: 1,
            selectable: false,
            hasControls: false,
            zIndex: 0
          });

          canvas.add(mainImg);

          await handleCreateFrame(canvas);
          await insertDimentions(canvas, scale, newCreateria);
          if (createria === "D") {
            await setCreateria((prev) => {
              const newState = [...prev];
              newState[rightMenuIndex] = newCreateria;
              return newState;
            });
            // canvas.off();
            // await mouseMoving(canvas, scale, newCreateria, setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);
          }
          canvas.off();
          await mouseMoving(canvas, scale, newCreateria, setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);
          setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
          setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
          canvas.renderAll();
        }
      }
    }
  }

  if (createria === "D" || createria === newCreateria) {
    canvas.on('mouse:move', mouseMoveFunction);
    canvas.on('mouse:down', mouseDownFunction);

    document.addEventListener('mousedown', () => {
      canvas.off('mouse:move', mouseMoveFunction);
      canvas.off('mouse:down', mouseDownFunction);
    });
  }
};

export const handleVerticalSplitWindows = (canvas, rightMenuIndex, scale, createria, setCreateria, newCreateria, setCanvasState, setRestoreNum, setDeleteFlag, zoomSetting) => {

  const mouseMoveFunction = async (event) => {
    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;
    var barwidth = 0;
    var barTop = 0;
    var barHeight = 0;

    var Remove = await getObjectById(canvas, "cashSplitVertical");
    canvas.remove(Remove);

    var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
    var startFlag = true;
    for (const coverWindow of coverWindows) {
      if (coverWindow.left <= x && coverWindow.left + coverWindow.width >= x && coverWindow.top <= y && coverWindow.top + coverWindow.height >= y) {
        startFlag = false; break;
      }
    }

    if (startFlag) {

      var objs = await getObjectsArrayById(canvas, "mainImg");
      var newObj;

      for (var oj = 0; oj < objs.length; oj++)
        if (x >= objs[oj].left && x <= objs[oj].left + objs[oj].width && y >= objs[oj].top && y <= objs[oj].top + objs[oj].height) {
          isCursorOverImage = true;
          barwidth = objs[oj].width;
          barTop = objs[oj].top;
          barHeight = objs[oj].height;
          newObj = objs[oj];
          break;
        }

      if (isCursorOverImage && barwidth > (2 * borderthickness + 4)) {

        var sortedVerticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
        var sortedHorizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);

        if (!sortedVerticalOrderBars && !sortedHorizontalOrderBars) {
          var verticalOneBar = new fabric.Rect({
            id: "cashSplitVertical",
            left: x - 2,
            top: barTop,
            width: 4,
            height: barHeight,
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
    var barLeft = 0;
    var barwidth = 0;
    var barTop = 0;
    var barHeight = 0;
    var CurrentMainImg = {};

    var Remove = await getObjectById(canvas, "cashSplitVertical");
    canvas.remove(Remove);

    var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
    var startFlag = true;
    for (const coverWindow of coverWindows) {
      if (coverWindow.left <= x && coverWindow.left + coverWindow.width >= x && coverWindow.top <= y && coverWindow.top + coverWindow.height >= y) {
        startFlag = false; break;
      }
    }

    if (startFlag) {

      var objs = await getObjectsArrayById(canvas, "mainImg");

      for (var oj = 0; oj < objs.length; oj++)
        if (x >= objs[oj].left && x <= objs[oj].left + objs[oj].width && y >= objs[oj].top && y <= objs[oj].top + objs[oj].height) {
          isCursorOverImage = true;
          barLeft = objs[oj].left;
          barwidth = objs[oj].width;
          barTop = objs[oj].top;
          barHeight = objs[oj].height;
          CurrentMainImg = objs[oj];
        }

      if (isCursorOverImage && barwidth > (2 * borderthickness + 4)) {

        var mainImg = await LoadImg(borderImages.main);

        var sortedVerticalOrderBars = await verticalMiddleBarSort(canvas, CurrentMainImg);
        var sortedHorizontalOrderBars = await horizontalMiddleBarSort(canvas, CurrentMainImg);

        if (!sortedVerticalOrderBars && !sortedHorizontalOrderBars) {
          CurrentMainImg.set({ width: x - barLeft - 2 - borderthickness });

          mainImg.set({
            id: "mainImg" + objs.length,
            height: barHeight,
            width: barLeft + barwidth - x - 2 - borderthickness,
            top: barTop,
            left: x + 2 + borderthickness,
            stroke: 'black',
            strokeWidth: 1,
            selectable: false,
            hasControls: false,
            zIndex: 0
          });

          canvas.add(mainImg);
          await handleCreateFrame(canvas);
          await insertDimentions(canvas, scale, newCreateria);

          if (createria === "D") {
            await setCreateria((prev) => {
              const newState = [...prev];
              newState[rightMenuIndex] = newCreateria;
              return newState;
            });
            // canvas.off();
            // await mouseMoving(canvas, scale, newCreateria, setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);
          }
          canvas.off();
          await mouseMoving(canvas, scale, newCreateria, setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);
          setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
          setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
          canvas.renderAll();
        }
      }
    }
  }

  if (createria === "D" || createria === newCreateria) {
    canvas.on('mouse:move', mouseMoveFunction);
    canvas.on('mouse:down', mouseDownFunction);

    document.addEventListener('mousedown', () => {
      canvas.off('mouse:move', mouseMoveFunction);
      canvas.off('mouse:down', mouseDownFunction);
    });
  }
}


