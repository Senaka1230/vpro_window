import { fabric } from 'fabric';
import { borderthickness, getObjectById, getObjectsArrayById } from '../initialSettings/InitValues.js';
import { horizontalMiddleBarSort, verticalMiddleBarSort } from '../functions/SortandFlagMiddleBars.js';
import {insertDimentions} from '../functions/InsertDimensions.js';

export const handleInsertHorizontalBar = (canvas, scale, createria, setCanvasState, setRestoreNum) => {

  const mouseMoveFunction = async (event) => {
    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;
    var barLeft = 0;
    var barwidth = 0;

    var sortedVerticalOrderBars = [];
    var sortedHorizontalOrderBars = [];

    var Remove = await getObjectById(canvas, "cashHorizontalBar")
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
      if (x >= objs[oj].left && x <= objs[oj].left + objs[oj].width && y >= objs[oj].top + borderthickness / 2 && y <= objs[oj].top + objs[oj].height - borderthickness / 2) {
        isCursorOverImage = true;
        barLeft = objs[oj].left;
        barwidth = objs[oj].width;
        newObj = objs[oj];
        break;
      }

    if (isCursorOverImage) {

      var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
      var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);

      for (var fv = 0; fv < verticalOrderBars.length; fv++) {
        if (verticalOrderBars[fv].top + borderthickness / 2 < y && (verticalOrderBars[fv].top + verticalOrderBars[fv].height - borderthickness / 2) > y)
          sortedVerticalOrderBars.push(verticalOrderBars[fv]);
      }
      for (var fh = 0; fh < horizontalOrderBars.length; fh++) {
        if (horizontalOrderBars[fh].left <= x && (horizontalOrderBars[fh].left + horizontalOrderBars[fh].width) >= x && horizontalOrderBars[fh].top - borderthickness / 2 < y && horizontalOrderBars[fh].top + horizontalOrderBars[fh].height + borderthickness / 2 > y)
          sortedHorizontalOrderBars.push(horizontalOrderBars[fh]);
          break;
      }

      if (sortedHorizontalOrderBars.length === 0) {
        if (sortedVerticalOrderBars.length === 0) {
          var horizontalOneBar = new fabric.Rect({
            id: "cashHorizontalBar",
            left: barLeft,
            top: y - borderthickness / 2,
            width: barwidth,
            height: borderthickness,
            fill: 'grey',
            stroke: 'black',
            strokeWidth: 1,
            opacity: 0.5
          });

          canvas.add(horizontalOneBar);

        }
        else {
          if (x < sortedVerticalOrderBars[0].left) {
            horizontalOneBar = new fabric.Rect({
              id: "cashHorizontalBar",
              left: barLeft,
              top: y - borderthickness / 2,
              width: sortedVerticalOrderBars[0].left - barLeft,
              height: borderthickness,
              fill: 'grey',
              stroke: 'black',
              strokeWidth: 1,
              opacity: 0.5
            });

            canvas.add(horizontalOneBar);
          }
          else if (x > sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left + borderthickness) {
            horizontalOneBar = new fabric.Rect({
              id: "cashHorizontalBar",
              left: sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left + borderthickness,
              top: y - borderthickness / 2,
              width: barLeft + barwidth - (sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left + borderthickness),
              height: borderthickness,
              fill: 'grey',
              stroke: 'black',
              strokeWidth: 1,
              opacity: 0.5
            });
            canvas.add(horizontalOneBar);
          }
          else
            for (var i = 0; i < sortedVerticalOrderBars.length - 1; i++) {
              if (x > (sortedVerticalOrderBars[i].left + borderthickness) && x < sortedVerticalOrderBars[i + 1].left) {
                horizontalOneBar = new fabric.Rect({
                  id: "cashHorizontalBar",
                  left: sortedVerticalOrderBars[i].left + borderthickness,
                  top: y - borderthickness / 2,
                  width: (sortedVerticalOrderBars[i + 1].left) - (sortedVerticalOrderBars[i].left + borderthickness),
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
    }
  }
  }

  const mouseDownFunction = async (event) => {

    if (event.target && event.target.id === "cashHorizontalBar") {
      canvas.remove(event.target);

      var horizontalOneBar = new fabric.Rect({
        id: "horizontalBar",
        left: event.target.left,
        top: event.target.top,
        width: event.target.width,
        height: event.target.height,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
        selectable: true,
        hasControls: false,
      });

      canvas.add(horizontalOneBar);
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


export const handleInsertVerticalBar = (canvas, scale, createria, setCanvasState, setRestoreNum) => {


  const mouseMoveFunction = async (event) => {
    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;
    var verticalOneBarTop = 0;
    var verticalOneBarHeight = 0;

    var sortedHorizontalOrderBars = [];
    var sortedVerticalOrderBars = [];

    var Remove = await getObjectById(canvas, "cashVerticalOneBar")
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
      if (x >= objs[oj].left + borderthickness / 2 && x <= objs[oj].left + objs[oj].width - borderthickness / 2 && y >= objs[oj].top && y <= objs[oj].top + objs[oj].height) {
        isCursorOverImage = true;
        verticalOneBarTop = objs[oj].top;
        verticalOneBarHeight = objs[oj].height;
        newObj = objs[oj];
        break;
      }

    if (isCursorOverImage) {

      var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
      var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);

      for (var fh = 0; fh < horizontalOrderBars.length; fh++) {
        if (horizontalOrderBars[fh].left + borderthickness / 2 < x && (horizontalOrderBars[fh].left + horizontalOrderBars[fh].width - borderthickness / 2) > x)
          sortedHorizontalOrderBars.push(horizontalOrderBars[fh]);
      }
      for (var fv = 0; fv < verticalOrderBars.length; fv++) {
        if (verticalOrderBars[fv].left - borderthickness / 2 < x && (verticalOrderBars[fv].left + verticalOrderBars[fv].width + borderthickness / 2) > x && verticalOrderBars[fv].top <= y && verticalOrderBars[fv].top + verticalOrderBars[fv].height >= y)
          sortedVerticalOrderBars.push(verticalOrderBars[fv]);
      }

      if (sortedVerticalOrderBars.length === 0) {

        if (sortedHorizontalOrderBars.length === 0) {
          var verticalOneBar = new fabric.Rect({
            id: "cashVerticalOneBar",
            left: x - borderthickness / 2,
            top: verticalOneBarTop,
            width: borderthickness,
            height: verticalOneBarHeight,
            fill: 'grey',
            stroke: 'black',
            strokeWidth: 1,
            opacity: 0.5
          });

          canvas.add(verticalOneBar);
        }
        else {

          if (y < sortedHorizontalOrderBars[0].top) {
            verticalOneBar = new fabric.Rect({
              id: "cashVerticalOneBar",
              top: verticalOneBarTop,
              left: x - borderthickness / 2,
              height: sortedHorizontalOrderBars[0].top - verticalOneBarTop,
              width: borderthickness,
              fill: 'grey',
              stroke: 'black',
              strokeWidth: 1,
              opacity: 0.5
            });

            canvas.add(verticalOneBar);
          }

          else if (y > sortedHorizontalOrderBars[sortedHorizontalOrderBars.length - 1].top + borderthickness) {
            verticalOneBar = new fabric.Rect({
              id: "cashVerticalOneBar",
              top: sortedHorizontalOrderBars[sortedHorizontalOrderBars.length - 1].top + borderthickness,
              left: x - borderthickness / 2,
              height: verticalOneBarTop + verticalOneBarHeight - (sortedHorizontalOrderBars[sortedHorizontalOrderBars.length - 1].top + borderthickness),
              width: borderthickness,
              fill: 'grey',
              stroke: 'black',
              strokeWidth: 1,
              opacity: 0.5
            });
            canvas.add(verticalOneBar);
          }
          else
            for (var i = 0; i < sortedHorizontalOrderBars.length - 1; i++) {
              if (y > (sortedHorizontalOrderBars[i].top + borderthickness) && y < sortedHorizontalOrderBars[i + 1].top) {
                verticalOneBar = new fabric.Rect({
                  id: "cashVerticalOneBar",
                  top: sortedHorizontalOrderBars[i].top + borderthickness,
                  left: x - borderthickness / 2,
                  height: (sortedHorizontalOrderBars[i + 1].top) - (sortedHorizontalOrderBars[i].top + borderthickness),
                  width: borderthickness,
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
    }
  }
  }

  const mouseDownFunction = async (event) => {

    if (event.target && event.target.id === "cashVerticalOneBar") {
      canvas.remove(event.target);

      const verticalOneBar = new fabric.Rect({
        id: "verticalOneBar",
        top: event.target.top,
        left: event.target.left,
        height: event.target.height,
        width: event.target.width,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
        selectable: true,
        hasControls: false,
      });

      canvas.add(verticalOneBar);
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