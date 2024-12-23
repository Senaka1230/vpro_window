import {borderthickness, getObjectById, lastDim} from '../initialSettings/InitValues.js';
import {insertVDimFirst, insertHDimFirst} from '../functions/InsertDimensions.js';
import {horizontalMiddleBarSort, verticalMiddleBarSort } from '../functions/SortandFlagMiddleBars.js'

export const handleLastVDimInsert = (canvas,  setCanvasState, setRestoreNum) => {

          canvas.forEachObject((obj) => {
          if(/lastVDim/.test(obj.id))
            canvas.remove(obj);
          });

           var SortedSubHorizontals = horizontalMiddleBarSort(canvas);

            const firstDHCash = getObjectById(canvas, "firstVDim");

            if(firstDHCash && SortedSubHorizontals)
            {
            insertVDimFirst(canvas, setCanvasState, setRestoreNum, "lastVDim"+0, SortedSubHorizontals[0].top + borderthickness/2 - firstDHCash.top-0.5, firstDHCash.left + lastDim,  firstDHCash.top);

            for(var sh=1; sh< SortedSubHorizontals.length; sh++)
            {
              if(SortedSubHorizontals[sh].top !== SortedSubHorizontals[sh-1].top)
            insertVDimFirst(canvas, setCanvasState, setRestoreNum, "lastVDim"+sh, SortedSubHorizontals[sh].top - SortedSubHorizontals[sh-1].top, firstDHCash.left + lastDim,  SortedSubHorizontals[sh-1].top +borderthickness/2-0.5);
            }

            insertVDimFirst(canvas, setCanvasState, setRestoreNum, "lastVDim"+SortedSubHorizontals.length, firstDHCash.top + firstDHCash.height - SortedSubHorizontals[SortedSubHorizontals.length-1].top-borderthickness/2-0.5, firstDHCash.left + lastDim,  SortedSubHorizontals[SortedSubHorizontals.length-1].top +borderthickness/2-0.5);
      };
 }

export const handleLastHDimInsert = (canvas,  setCanvasState, setRestoreNum) => {

    canvas.forEachObject((obj) => {
    if(/lastHDim/.test(obj.id))
      canvas.remove(obj);
    });


      var SortedSubVerticals = verticalMiddleBarSort(canvas);


      const firstDVCash = getObjectById(canvas, "firstHDim");

      if(firstDVCash && SortedSubVerticals)
      {
      insertHDimFirst(canvas, setCanvasState, setRestoreNum, "lastHDim"+0, SortedSubVerticals[0].left + borderthickness/2 - firstDVCash.left-0.5, firstDVCash.left, firstDVCash.top + lastDim);

      for(var sv=1; sv< SortedSubVerticals.length; sv++)
      { if(SortedSubVerticals[sv].left !== SortedSubVerticals[sv-1].left)
      insertHDimFirst(canvas, setCanvasState, setRestoreNum, "lastHDim"+sv, SortedSubVerticals[sv].left - SortedSubVerticals[sv-1].left, SortedSubVerticals[sv-1].left +borderthickness/2-0.5, firstDVCash.top + lastDim);
      }

      insertHDimFirst(canvas, setCanvasState, setRestoreNum, "lastHDim"+SortedSubVerticals.length, firstDVCash.left + firstDVCash.width - SortedSubVerticals[SortedSubVerticals.length-1].left-borderthickness/2-0.5,  SortedSubVerticals[SortedSubVerticals.length-1].left +borderthickness/2-0.5, firstDVCash.top + lastDim);
      }
}