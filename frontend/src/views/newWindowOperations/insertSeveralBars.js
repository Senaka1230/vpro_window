import { fabric } from 'fabric';
import { borderthickness, getObjectById, getObjectsArrayById } from '../initialSettings/InitValues.js';
import { horizontalMiddleBarSort, verticalMiddleBarSort } from '../functions/SortandFlagMiddleBars.js';
import { insertDimentions } from '../functions/InsertDimensions.js';

export const handleInsertSeveralHorizontalBar = (canvas, scale, createria, setCanvasState, setRestoreNum, number) => {

  const mouseMoveFunction = async (event) => {
    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;
    var barLeft = 0;
    var barwidth = 0;
    var barTop = 0;
    var barHeight = 0;

    var sortedVerticalOrderBars = [];
    var sortedHorizontalOrderBars = [];

    var Remove = await getObjectsArrayById(canvas, "cashHorizontalBar")
    canvas.remove(...Remove);

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
          barTop = objs[oj].top;
          barHeight = objs[oj].height;
          newObj = objs[oj];
          break;
        }

      if (isCursorOverImage) {

        var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);
        var flag = true;

        for (var fh = 0; fh < horizontalOrderBars.length; fh++) {
          if (horizontalOrderBars[fh].left <= x && (horizontalOrderBars[fh].left + horizontalOrderBars[fh].width) >= x)
            sortedHorizontalOrderBars.push(horizontalOrderBars[fh]);
        }

        for (fh = 0; fh < sortedHorizontalOrderBars.length; fh++) {
          if (sortedHorizontalOrderBars[fh].top - borderthickness / 2 < y && sortedHorizontalOrderBars[fh].top + sortedHorizontalOrderBars[fh].height + borderthickness / 2 > y) {
            flag = false; break;
          }
        }

        if (flag) {

          for (fh = sortedHorizontalOrderBars.length - 1; fh >= 0; fh--) {
            if (sortedHorizontalOrderBars[fh].top <= y) {
              barTop = sortedHorizontalOrderBars[fh].top + sortedHorizontalOrderBars[fh].height;
              break;
            }
          }
          for (fh = 0; fh < sortedHorizontalOrderBars.length; fh++) {
            if (sortedHorizontalOrderBars[fh].top >= y) {
              barHeight = sortedHorizontalOrderBars[fh].top - barTop;
              break;
            }
          }
          if (sortedHorizontalOrderBars.length !== 0 && barHeight === newObj.height) { barHeight = newObj.top + newObj.height - barTop }


          if (barHeight <= number * (borderthickness + 2))
            flag = false;

          if (flag) {
            var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
            for (var fv = 0; fv < verticalOrderBars.length; fv++) {
              if (verticalOrderBars[fv].top + borderthickness / 2 < y && (verticalOrderBars[fv].top + verticalOrderBars[fv].height - borderthickness / 2) > y)
                sortedVerticalOrderBars.push(verticalOrderBars[fv]);
            }

            if (sortedVerticalOrderBars.length !== 0) {
              if (x < sortedVerticalOrderBars[0].left) {
                barwidth = sortedVerticalOrderBars[0].left - barLeft;
              }
              else if (x > sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left + borderthickness) {
                barwidth = barLeft + barwidth - sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left - borderthickness;
                barLeft = sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left + borderthickness;
              }
              else
                for (var i = 0; i < sortedVerticalOrderBars.length - 1; i++) {
                  if ((x <= (sortedVerticalOrderBars[i].left + borderthickness) && x >= sortedVerticalOrderBars[i].left) || (x <= (sortedVerticalOrderBars[i + 1].left + borderthickness) && x >= sortedVerticalOrderBars[i + 1].left)) { flag = false; break; }
                  if (x > (sortedVerticalOrderBars[i].left + borderthickness) && x < sortedVerticalOrderBars[i + 1].left) {
                    barwidth = sortedVerticalOrderBars[i + 1].left - sortedVerticalOrderBars[i].left - borderthickness;
                    barLeft = sortedVerticalOrderBars[i].left + borderthickness;
                    break;
                  }
                }
              if (x <= (sortedVerticalOrderBars[0].left + borderthickness) && x >= sortedVerticalOrderBars[0].left) { flag = false; }
            }
            if (flag)
              for (var k = 0; k < number; k++) {
                var horizontalOneBar = new fabric.Rect({
                  id: "cashHorizontalBar",
                  left: barLeft,
                  top: barTop + barHeight / (number + 1) * (k + 1) - borderthickness / 2,
                  width: barwidth,
                  height: borderthickness,
                  fill: 'grey',
                  stroke: 'black',
                  strokeWidth: 1,
                  opacity: 0.5
                });

                canvas.add(horizontalOneBar);
                canvas.renderAll();
              }

          }
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

    var sortedVerticalOrderBars = [];
    var sortedHorizontalOrderBars = [];

    var Remove = await getObjectsArrayById(canvas, "cashHorizontalBar")
    canvas.remove(...Remove);

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
          barTop = objs[oj].top;
          barHeight = objs[oj].height;
          newObj = objs[oj];
          break;
        }

      if (isCursorOverImage) {

        var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);
        var flag = true;

        for (var fh = 0; fh < horizontalOrderBars.length; fh++) {
          if (horizontalOrderBars[fh].left <= x && (horizontalOrderBars[fh].left + horizontalOrderBars[fh].width) >= x)
            sortedHorizontalOrderBars.push(horizontalOrderBars[fh]);
        }

        for (fh = 0; fh < sortedHorizontalOrderBars.length; fh++) {
          if (sortedHorizontalOrderBars[fh].top - borderthickness / 2 < y && sortedHorizontalOrderBars[fh].top + sortedHorizontalOrderBars[fh].height + borderthickness / 2 > y) {
            flag = false; break;
          }
        }

        if (flag) {

          for (fh = sortedHorizontalOrderBars.length - 1; fh >= 0; fh--) {
            if (sortedHorizontalOrderBars[fh].top <= y) {
              barTop = sortedHorizontalOrderBars[fh].top + sortedHorizontalOrderBars[fh].height;
              break;
            }
          }
          for (fh = 0; fh < sortedHorizontalOrderBars.length; fh++) {
            if (sortedHorizontalOrderBars[fh].top >= y) {
              barHeight = sortedHorizontalOrderBars[fh].top - barTop;
              break;
            }
          }
          if (sortedHorizontalOrderBars.length !== 0 && barHeight === newObj.height) { barHeight = newObj.top + newObj.height - barTop }


          if (barHeight <= number * (borderthickness + 2))
            flag = false;

          if (flag) {
            var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
            for (var fv = 0; fv < verticalOrderBars.length; fv++) {
              if (verticalOrderBars[fv].top + borderthickness / 2 < y && (verticalOrderBars[fv].top + verticalOrderBars[fv].height - borderthickness / 2) > y)
                sortedVerticalOrderBars.push(verticalOrderBars[fv]);
            }

            if (sortedVerticalOrderBars.length !== 0) {
              if (x < sortedVerticalOrderBars[0].left) {
                barwidth = sortedVerticalOrderBars[0].left - barLeft;
              }
              else if (x > sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left + borderthickness) {
                barwidth = barLeft + barwidth - sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left - borderthickness;
                barLeft = sortedVerticalOrderBars[sortedVerticalOrderBars.length - 1].left + borderthickness;
              }
              else
                for (var i = 0; i < sortedVerticalOrderBars.length - 1; i++) {
                  if ((x <= (sortedVerticalOrderBars[i].left + borderthickness) && x >= sortedVerticalOrderBars[i].left) || (x <= (sortedVerticalOrderBars[i + 1].left + borderthickness) && x >= sortedVerticalOrderBars[i + 1].left)) { flag = false; break; }
                  if (x > (sortedVerticalOrderBars[i].left + borderthickness) && x < sortedVerticalOrderBars[i + 1].left) {
                    barwidth = sortedVerticalOrderBars[i + 1].left - sortedVerticalOrderBars[i].left - borderthickness;
                    barLeft = sortedVerticalOrderBars[i].left + borderthickness;
                    break;
                  }
                }
              if (x <= (sortedVerticalOrderBars[0].left + borderthickness) && x >= sortedVerticalOrderBars[0].left) { flag = false; }
            }
            if (flag) {
              for (var k = 0; k < number; k++) {
                var horizontalOneBar = new fabric.Rect({
                  id: "horizontalBar",
                  left: barLeft,
                  top: barTop + barHeight / (number + 1) * (k + 1) - borderthickness / 2,
                  width: barwidth,
                  height: borderthickness,
                  fill: 'white',
                  stroke: 'black',
                  strokeWidth: 1,
                  hasControls: false,
                  selectable: true
                });

                canvas.add(horizontalOneBar);
              }
            }
            await insertDimentions(canvas, scale, createria);
            canvas.renderAll();
            setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
            setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])])
          }
        }
      }
    }
  }

  canvas.on('mouse:move', mouseMoveFunction);
  canvas.on('mouse:down', mouseDownFunction);

  document.addEventListener('mousedown', () => {
    canvas.off('mouse:move', mouseMoveFunction);
    canvas.off('mouse:down', mouseDownFunction);
  });

};


export const handleInsertSeveralVerticalBar = (canvas, scale, createria, setCanvasState, setRestoreNum, number) => {

  const mouseMoveFunction = async (event) => {
    const pointer = canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    var isCursorOverImage = false;
    var barLeft = 0;
    var barwidth = 0;
    var barTop = 0;
    var barHeight = 0;

    var sortedVerticalOrderBars = [];
    var sortedHorizontalOrderBars = [];

    var Remove = await getObjectsArrayById(canvas, "cashVerticalOneBar")
    canvas.remove(...Remove);

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
          barLeft = objs[oj].left;
          barwidth = objs[oj].width;
          barTop = objs[oj].top;
          barHeight = objs[oj].height;
          newObj = objs[oj];
          break;
        }

      if (isCursorOverImage) {

        var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
        var flag = true;

        for (var fh = 0; fh < verticalOrderBars.length; fh++) {
          if (verticalOrderBars[fh].top <= y && (verticalOrderBars[fh].top + verticalOrderBars[fh].height) >= y)
            sortedVerticalOrderBars.push(verticalOrderBars[fh]);
        }

        for (fh = 0; fh < sortedVerticalOrderBars.length; fh++) {
          if (sortedVerticalOrderBars[fh].left - borderthickness / 2 < x && sortedVerticalOrderBars[fh].left + sortedVerticalOrderBars[fh].width + borderthickness / 2 > x) {
            flag = false; break;
          }
        }

        if (flag) {

          for (fh = sortedVerticalOrderBars.length - 1; fh >= 0; fh--) {
            if (sortedVerticalOrderBars[fh].left <= x) {
              barLeft = sortedVerticalOrderBars[fh].left + sortedVerticalOrderBars[fh].width;
              break;
            }
          }
          for (fh = 0; fh < sortedVerticalOrderBars.length; fh++) {
            if (sortedVerticalOrderBars[fh].left >= x) {
              barwidth = sortedVerticalOrderBars[fh].left - barLeft;
              break;
            }
          }
          if (sortedVerticalOrderBars.length !== 0 && barwidth === newObj.width) { barwidth = newObj.left + newObj.width - barLeft }


          if (barwidth <= number * (borderthickness + 2))
            flag = false;

          if (flag) {
            var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);
            for (var fv = 0; fv < horizontalOrderBars.length; fv++) {
              if (horizontalOrderBars[fv].left + borderthickness / 2 < x && (horizontalOrderBars[fv].left + horizontalOrderBars[fv].width - borderthickness / 2) > x)
                sortedHorizontalOrderBars.push(horizontalOrderBars[fv]);
            }

            if (sortedHorizontalOrderBars.length !== 0) {
              if (y < sortedHorizontalOrderBars[0].top) {
                barHeight = sortedHorizontalOrderBars[0].top - barTop;
              }
              else if (y > sortedHorizontalOrderBars[sortedHorizontalOrderBars.length - 1].top + borderthickness) {
                barHeight = barTop + barHeight - sortedHorizontalOrderBars[sortedHorizontalOrderBars.length - 1].top - borderthickness;
                barTop = sortedHorizontalOrderBars[sortedHorizontalOrderBars.length - 1].top + borderthickness;
              }
              else
                for (var i = 0; i < sortedHorizontalOrderBars.length - 1; i++) {
                  if ((y <= (sortedHorizontalOrderBars[i].top + borderthickness) && y >= sortedHorizontalOrderBars[i].top) || (y <= (sortedHorizontalOrderBars[i + 1].top + borderthickness) && y >= sortedHorizontalOrderBars[i + 1].top)) { flag = false; break; }
                  if (y > (sortedHorizontalOrderBars[i].top + borderthickness) && y < sortedHorizontalOrderBars[i + 1].top) {
                    barHeight = sortedHorizontalOrderBars[i + 1].top - sortedHorizontalOrderBars[i].top - borderthickness;
                    barTop = sortedHorizontalOrderBars[i].top + borderthickness;
                    break;
                  }
                }
              if (y <= (sortedHorizontalOrderBars[0].top + borderthickness) && y >= sortedHorizontalOrderBars[0].top) { flag = false; }
            }
            if (flag)
              for (var k = 0; k < number; k++) {
                var horizontalOneBar = new fabric.Rect({
                  id: "cashVerticalOneBar",
                  top: barTop,
                  left: barLeft + barwidth / (number + 1) * (k + 1) - borderthickness / 2,
                  height: barHeight,
                  width: borderthickness,
                  fill: 'grey',
                  stroke: 'black',
                  strokeWidth: 1,
                  opacity: 0.5
                });

                canvas.add(horizontalOneBar);
                canvas.renderAll();
              }

          }
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

    var sortedVerticalOrderBars = [];
    var sortedHorizontalOrderBars = [];

    var Remove = await getObjectsArrayById(canvas, "cashVerticalOneBar")
    canvas.remove(...Remove);

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
          barLeft = objs[oj].left;
          barwidth = objs[oj].width;
          barTop = objs[oj].top;
          barHeight = objs[oj].height;
          newObj = objs[oj];
          break;
        }

      if (isCursorOverImage) {

        var verticalOrderBars = await verticalMiddleBarSort(canvas, newObj);
        var flag = true;

        for (var fh = 0; fh < verticalOrderBars.length; fh++) {
          if (verticalOrderBars[fh].top <= y && (verticalOrderBars[fh].top + verticalOrderBars[fh].height) >= y)
            sortedVerticalOrderBars.push(verticalOrderBars[fh]);
        }

        for (fh = 0; fh < sortedVerticalOrderBars.length; fh++) {
          if (sortedVerticalOrderBars[fh].left - borderthickness / 2 < x && sortedVerticalOrderBars[fh].left + sortedVerticalOrderBars[fh].width + borderthickness / 2 > x) {
            flag = false; break;
          }
        }

        if (flag) {

          for (fh = sortedVerticalOrderBars.length - 1; fh >= 0; fh--) {
            if (sortedVerticalOrderBars[fh].left <= x) {
              barLeft = sortedVerticalOrderBars[fh].left + sortedVerticalOrderBars[fh].width;
              break;
            }
          }
          for (fh = 0; fh < sortedVerticalOrderBars.length; fh++) {
            if (sortedVerticalOrderBars[fh].left >= x) {
              barwidth = sortedVerticalOrderBars[fh].left - barLeft;
              break;
            }
          }
          if (sortedVerticalOrderBars.length !== 0 && barwidth === newObj.width) { barwidth = newObj.left + newObj.width - barLeft }


          if (barwidth <= number * (borderthickness + 2))
            flag = false;

          if (flag) {
            var horizontalOrderBars = await horizontalMiddleBarSort(canvas, newObj);
            for (var fv = 0; fv < horizontalOrderBars.length; fv++) {
              if (horizontalOrderBars[fv].left + borderthickness / 2 < x && (horizontalOrderBars[fv].left + horizontalOrderBars[fv].width - borderthickness / 2) > x)
                sortedHorizontalOrderBars.push(horizontalOrderBars[fv]);
            }

            if (sortedHorizontalOrderBars.length !== 0) {
              if (y < sortedHorizontalOrderBars[0].top) {
                barHeight = sortedHorizontalOrderBars[0].top - barTop;
              }
              else if (y > sortedHorizontalOrderBars[sortedHorizontalOrderBars.length - 1].top + borderthickness) {
                barHeight = barTop + barHeight - sortedHorizontalOrderBars[sortedHorizontalOrderBars.length - 1].top - borderthickness;
                barTop = sortedHorizontalOrderBars[sortedHorizontalOrderBars.length - 1].top + borderthickness;
              }
              else
                for (var i = 0; i < sortedHorizontalOrderBars.length - 1; i++) {
                  if ((y <= (sortedHorizontalOrderBars[i].top + borderthickness) && y >= sortedHorizontalOrderBars[i].top) || (y <= (sortedHorizontalOrderBars[i + 1].top + borderthickness) && y >= sortedHorizontalOrderBars[i + 1].top)) { flag = false; break; }
                  if (y > (sortedHorizontalOrderBars[i].top + borderthickness) && y < sortedHorizontalOrderBars[i + 1].top) {
                    barHeight = sortedHorizontalOrderBars[i + 1].top - sortedHorizontalOrderBars[i].top - borderthickness;
                    barTop = sortedHorizontalOrderBars[i].top + borderthickness;
                    break;
                  }
                }
              if (y <= (sortedHorizontalOrderBars[0].top + borderthickness) && y >= sortedHorizontalOrderBars[0].top) { flag = false; }
            }
            if (flag)
              for (var k = 0; k < number; k++) {
                var horizontalOneBar = new fabric.Rect({
                  id: "verticalOneBar",
                  top: barTop,
                  left: barLeft + barwidth / (number + 1) * (k + 1) - borderthickness / 2,
                  height: barHeight,
                  width: borderthickness,
                  fill: 'white',
                  stroke: 'black',
                  strokeWidth: 1,
                  selectable: true,
                  hasControls: false,
                });

                canvas.add(horizontalOneBar);
              }

            await insertDimentions(canvas, scale, createria);
            canvas.renderAll();
            setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
            setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])])
          }
        }
      }
    }
  }

  canvas.on('mouse:move', mouseMoveFunction);
  canvas.on('mouse:down', mouseDownFunction);

  document.addEventListener('mousedown', () => {
    canvas.off('mouse:move', mouseMoveFunction);
    canvas.off('mouse:down', mouseDownFunction);
  });
}