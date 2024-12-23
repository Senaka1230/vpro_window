import { fabric } from 'fabric';
import { inputToEditDimensions } from "./EditDimensions.js";
import { getObjectById, getObjectsArrayById, firstDim, lastDim, borderthickness } from '../initialSettings/InitValues.js';
import { horizontalMiddleBarSort, verticalMiddleBarSort } from './SortandFlagMiddleBars.js';

export const insertVDimFirst = (canvas, setCanvasState, setRestoreNum, GroupId, heightVD, leftVD, topVD) => {

  var flag = getObjectById(canvas, GroupId);
  if (flag)
    canvas.remove(flag);

  const leftV = new fabric.Line([0, 0, 18, 0], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const widthV = new fabric.Line([9, 0, 9, heightVD], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const rightV = new fabric.Line([0, heightVD, 18, heightVD], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const labelV = new fabric.Text(heightVD.toString(), {
    top: heightVD / 2,
    left: -1,
    fontSize: 20,
    fill: 'blue',
    angle: -90,
    originX: 'center',
    originY: 'center'
  });

  const group = new fabric.Group([leftV, widthV, rightV, labelV], {
    left: leftVD,
    top: topVD,
    selectable: false,
    id: GroupId
  });
  canvas.add(group);
  canvas.renderAll();

  // group.on('mousedown', function () {
  //   inputToEditDimensions(canvas, setCanvasState, setRestoreNum, group, heightVD, "V");
  // });
};

export const insertHDimFirst = (canvas, setCanvasState, setRestoreNum, GroupId, widthHD, leftHD, topHD) => {

  var flag = getObjectById(canvas, GroupId);
  if (flag)
    canvas.remove(flag);

  const leftH = new fabric.Line([0, 0, 0, 18], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const widthH = new fabric.Line([0, 9, widthHD, 9], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const rightH = new fabric.Line([widthHD, 0, widthHD, 18], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const labelH = new fabric.Text(widthHD.toString(), {
    left: widthHD / 2 - 15,
    top: -15,
    fontSize: 20,
    fill: 'blue',
  });

  const group = new fabric.Group([leftH, widthH, rightH, labelH], {
    left: leftHD,
    top: topHD,
    selectable: false,
    id: GroupId
  });
  canvas.add(group);
  canvas.renderAll();

  // group.on('mousedown', function () {
  //   inputToEditDimensions(canvas, setCanvasState, setRestoreNum, group, widthHD, "H");
  // });
}

const insertVDim = (canvas, scale, GroupId, heightVD, leftVD, topVD) => {

  const leftV = new fabric.Line([0, 0, 18, 0], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const widthV = new fabric.Line([9, 0, 9, heightVD], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const rightV = new fabric.Line([0, heightVD, 18, heightVD], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const labelV = new fabric.Text((heightVD / scale).toFixed(0).toString(), {
    top: heightVD / 2,
    left: -1,
    fontSize: 20,
    fill: 'blue',
    angle: -90,
    originX: 'center',
    originY: 'center'
  });

  const groupV = new fabric.Group([leftV, widthV, rightV, labelV], {
    left: leftVD,
    top: topVD,
    selectable: false,
    id: GroupId
  });
  canvas.add(groupV);
}

const insertHDim = (canvas, scale, GroupId, widthHD, leftHD, topHD) => {

  const leftH = new fabric.Line([0, 0, 0, 18], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const widthH = new fabric.Line([0, 9, widthHD, 9], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const rightH = new fabric.Line([widthHD, 0, widthHD, 18], {
    stroke: 'blue',
    strokeWidth: 1,
  });

  const labelH = new fabric.Text((widthHD / scale).toFixed(0).toString(), {
    left: widthHD / 2 - 15,
    top: -15,
    fontSize: 20,
    fill: 'blue',
  });

  const groupH = new fabric.Group([leftH, widthH, rightH, labelH], {
    left: leftHD,
    top: topHD,
    selectable: false,
    id: GroupId
  });
  canvas.add(groupH);
}


export const insertDimentions = async (canvas, scale, createria) => {

  var firstDimensions = await getObjectsArrayById(canvas, 'Dim');

  for (const firstDimension of firstDimensions) {
    canvas.remove(firstDimension);
  }

  var mainImages = await getObjectsArrayById(canvas, 'mainImg');

  if (createria === "D") {
    const plusId = mainImages[0].id.replace("mainImg", "").trim();
    insertVDim(canvas, scale, 'firstDimV' + plusId, mainImages[0].height, mainImages[0].left - firstDim, mainImages[0].top);
    insertHDim(canvas, scale, 'firstDimH' + plusId, mainImages[0].width, mainImages[0].left, mainImages[0].top - firstDim);

    var SortedSubHorizontals = await horizontalMiddleBarSort(canvas, mainImages[0]);

    if (SortedSubHorizontals) {
      insertVDim(canvas, scale, "lastDimV" + 0, SortedSubHorizontals[0].top + borderthickness / 2 - mainImages[0].top, mainImages[0].left - lastDim, mainImages[0].top);
      for (var sh = 1; sh < SortedSubHorizontals.length; sh++) {
        if (SortedSubHorizontals[sh].top - SortedSubHorizontals[sh - 1].top > 9)
          insertVDim(canvas, scale, "lastDimV" + sh, SortedSubHorizontals[sh].top - SortedSubHorizontals[sh - 1].top, mainImages[0].left - lastDim, SortedSubHorizontals[sh - 1].top + borderthickness / 2);
      }
      insertVDim(canvas, scale, "lastDimV" + SortedSubHorizontals.length, mainImages[0].top + mainImages[0].height - SortedSubHorizontals[SortedSubHorizontals.length - 1].top - borderthickness / 2, mainImages[0].left - lastDim, SortedSubHorizontals[SortedSubHorizontals.length - 1].top + borderthickness / 2);
    }

    var SortedSubVerticals = await verticalMiddleBarSort(canvas, mainImages[0]);

    if (SortedSubVerticals) {
      insertHDim(canvas, scale, "lastDimH" + 0, SortedSubVerticals[0].left + borderthickness / 2 - mainImages[0].left, mainImages[0].left, mainImages[0].top - lastDim);

      for (var sv = 1; sv < SortedSubVerticals.length; sv++) {
        if (SortedSubVerticals[sv].left - SortedSubVerticals[sv - 1].left > 9)
          insertHDim(canvas, scale, "lastDimH" + sv, SortedSubVerticals[sv].left - SortedSubVerticals[sv - 1].left, SortedSubVerticals[sv - 1].left + borderthickness / 2, mainImages[0].top - lastDim);
      }

      insertHDim(canvas, scale, "lastDimH" + SortedSubVerticals.length, mainImages[0].left + mainImages[0].width - SortedSubVerticals[SortedSubVerticals.length - 1].left - borderthickness / 2, SortedSubVerticals[SortedSubVerticals.length - 1].left + borderthickness / 2, mainImages[0].top - lastDim);
    }

  }

  else if (createria === "T" || createria === "B") {

    var newMainImages = [...mainImages].sort((a, b) => { return a.left - b.left });
    var forTopImages = [...mainImages].sort((a, b) => { return a.top - b.top });
    for (var i = 0; i < newMainImages.length; i++) {
      insertVDim(canvas, scale, "firstDimV" + newMainImages[i].id.replace("mainImg", ""), newMainImages[i].height, newMainImages[0].left - firstDim - ((firstDim - borderthickness) * (newMainImages.length - 1 - i)), newMainImages[i].top)
      insertHDim(canvas, scale, "firstDimH" + newMainImages[i].id.replace("mainImg", ""), newMainImages[i].width, newMainImages[i].left, forTopImages[0].top - firstDim);

       SortedSubHorizontals = await horizontalMiddleBarSort(canvas, newMainImages[i]);

      if (SortedSubHorizontals) {
        insertVDim(canvas, scale, "lastDimV" + 0, SortedSubHorizontals[0].top + borderthickness / 2 - newMainImages[i].top, newMainImages[0].left - lastDim - ((firstDim - borderthickness) * (newMainImages.length - 1 - i)), newMainImages[i].top);
        for ( sh = 1; sh < SortedSubHorizontals.length; sh++) {
          if (SortedSubHorizontals[sh].top - SortedSubHorizontals[sh - 1].top > 9)
            insertVDim(canvas, scale, "lastDimV" + sh, SortedSubHorizontals[sh].top - SortedSubHorizontals[sh - 1].top, newMainImages[0].left - lastDim - ((firstDim - borderthickness) * (newMainImages.length - 1 - i)), SortedSubHorizontals[sh - 1].top + borderthickness / 2);
        }
        insertVDim(canvas, scale, "lastDimV" + SortedSubHorizontals.length, newMainImages[i].top + newMainImages[i].height - SortedSubHorizontals[SortedSubHorizontals.length - 1].top - borderthickness / 2, newMainImages[0].left - lastDim - ((firstDim - borderthickness) * (newMainImages.length - 1 - i)), SortedSubHorizontals[SortedSubHorizontals.length - 1].top + borderthickness / 2);
      }

       SortedSubVerticals = await verticalMiddleBarSort(canvas, newMainImages[i]);

      if (SortedSubVerticals) {
        insertHDim(canvas, scale, "lastDimH" + 0, SortedSubVerticals[0].left + borderthickness / 2 - newMainImages[i].left, newMainImages[i].left, forTopImages[0].top - lastDim);
  
        for ( sv = 1; sv < SortedSubVerticals.length; sv++) {
          if (SortedSubVerticals[sv].left - SortedSubVerticals[sv - 1].left > 9)
            insertHDim(canvas, scale, "lastDimH" + sv, SortedSubVerticals[sv].left - SortedSubVerticals[sv - 1].left, SortedSubVerticals[sv - 1].left + borderthickness / 2, forTopImages[0].top - lastDim);
        }
  
        insertHDim(canvas, scale, "lastDimH" + SortedSubVerticals.length, newMainImages[i].left + newMainImages[i].width - SortedSubVerticals[SortedSubVerticals.length - 1].left - borderthickness / 2, SortedSubVerticals[SortedSubVerticals.length - 1].left + borderthickness / 2, forTopImages[0].top - lastDim);
      }

    }
    insertHDim(canvas, scale, "totalDimH", newMainImages[newMainImages.length - 1].width + newMainImages[newMainImages.length - 1].left - newMainImages[0].left, newMainImages[0].left, forTopImages[0].top - 2 * firstDim + 2 * borderthickness);

  }
  else if (createria === "L" || createria === "R") {
    newMainImages = [...mainImages].sort((a, b) => { return a.top - b.top });
    var forLeftImages = [...mainImages].sort((a, b) => { return a.left - b.left });
    for (i = 0; i < newMainImages.length; i++) {
      insertHDim(canvas, scale, "firstDimH" + newMainImages[i].id.replace("mainImg", ""), newMainImages[i].width, newMainImages[i].left, newMainImages[0].top - firstDim - ((firstDim - borderthickness) * (newMainImages.length - 1 - i)))
      insertVDim(canvas, scale, "firstDimV" + newMainImages[i].id.replace("mainImg", ""), newMainImages[i].height, forLeftImages[0].left - firstDim, newMainImages[i].top);
    
      SortedSubHorizontals = await horizontalMiddleBarSort(canvas, newMainImages[i]);

      if (SortedSubHorizontals) {
        insertVDim(canvas, scale, "lastDimV" + 0, SortedSubHorizontals[0].top + borderthickness / 2 - newMainImages[i].top,  forLeftImages[0].left - lastDim, newMainImages[i].top);
        for ( sh = 1; sh < SortedSubHorizontals.length; sh++) {
          if (SortedSubHorizontals[sh].top - SortedSubHorizontals[sh - 1].top > 9)
            insertVDim(canvas, scale, "lastDimV" + sh, SortedSubHorizontals[sh].top - SortedSubHorizontals[sh - 1].top, forLeftImages[0].left - lastDim, SortedSubHorizontals[sh - 1].top + borderthickness / 2);
        }
        insertVDim(canvas, scale, "lastDimV" + SortedSubHorizontals.length, newMainImages[i].top + newMainImages[i].height - SortedSubHorizontals[SortedSubHorizontals.length - 1].top - borderthickness / 2, forLeftImages[0].left - lastDim, SortedSubHorizontals[SortedSubHorizontals.length - 1].top + borderthickness / 2);
      }

       SortedSubVerticals = await verticalMiddleBarSort(canvas, newMainImages[i]);

      if (SortedSubVerticals) {
        insertHDim(canvas, scale, "lastDimH" + 0, SortedSubVerticals[0].left + borderthickness / 2 - newMainImages[i].left, newMainImages[i].left, newMainImages[0].top - lastDim - ((firstDim - borderthickness) * (newMainImages.length - 1 - i)));
  
        for ( sv = 1; sv < SortedSubVerticals.length; sv++) {
          if (SortedSubVerticals[sv].left - SortedSubVerticals[sv - 1].left > 9)
            insertHDim(canvas, scale, "lastDimH" + sv, SortedSubVerticals[sv].left - SortedSubVerticals[sv - 1].left, SortedSubVerticals[sv - 1].left + borderthickness / 2, newMainImages[0].top - lastDim - ((firstDim - borderthickness) * (newMainImages.length - 1 - i)));
        }
  
        insertHDim(canvas, scale, "lastDimH" + SortedSubVerticals.length, newMainImages[i].left + newMainImages[i].width - SortedSubVerticals[SortedSubVerticals.length - 1].left - borderthickness / 2, SortedSubVerticals[SortedSubVerticals.length - 1].left + borderthickness / 2, newMainImages[0].top - lastDim - ((firstDim - borderthickness) * (newMainImages.length - 1 - i)));
      }
  
    }
    insertVDim(canvas, scale, "totalDimV", newMainImages[newMainImages.length - 1].height + newMainImages[newMainImages.length - 1].top - newMainImages[0].top, forLeftImages[0].left - 2 * firstDim + 2 * borderthickness, newMainImages[0].top);
  }


  // group.on('mousedown', function() {
  //   inputToEditDimensions(canvas, setCanvasState, setRestoreNum, group, heightVD, "V");
  //  });
};