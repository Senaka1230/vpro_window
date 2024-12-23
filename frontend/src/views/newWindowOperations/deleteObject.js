
import { insertDimentions } from '../functions/InsertDimensions';
import { getObjectsArrayById } from '../initialSettings/InitValues';
import { coverWindowTest } from '../functions/InsertCoverWindowResize';


export const handleSelectClear = (setDeleteFlag) => {
  setDeleteFlag(false);
};

export const handleObjectSelect = (e, setDeleteFlag) => {

  if (/verticalOneBar/.test(e.selected[0].id) || /horizontalBar/.test(e.selected[0].id)) {

    setDeleteFlag(true);
  }
  else setDeleteFlag(false);
};

export const handleDeleteObject = async (canvas, scale, createria, deleteFlag, setDeleteFlag, setCanvasState, setRestoreNum) => {

  if (canvas && (deleteFlag)) {
    const selectedObjects = await canvas.getActiveObjects();
    var cashFlag = true;
    if (/verticalOneBar/.test(selectedObjects[0].id)) {
      var relatedHorizontalBars = await getObjectsArrayById(canvas, "horizontalBar");
      for (var h = 0; h < relatedHorizontalBars.length; h++) {
        if (relatedHorizontalBars[h].left + relatedHorizontalBars[h].width < selectedObjects[0].left + 3 && relatedHorizontalBars[h].left + relatedHorizontalBars[h].width > selectedObjects[0].left - 3 && relatedHorizontalBars[h].top >= selectedObjects[0].top && relatedHorizontalBars[h].top + relatedHorizontalBars[h].height <= selectedObjects[0].top + selectedObjects[0].height) {
          cashFlag = false; break;
        }
        else if (relatedHorizontalBars[h].left < selectedObjects[0].left + selectedObjects[0].width + 3 && relatedHorizontalBars[h].left > selectedObjects[0].left + selectedObjects[0].width - 3 && relatedHorizontalBars[h].top >= selectedObjects[0].top && relatedHorizontalBars[h].top + relatedHorizontalBars[h].height <= selectedObjects[0].top + selectedObjects[0].height) {
          cashFlag = false; break;
        }
      }
      if(cashFlag)
      {
        const cashObj = { left: selectedObjects[0].left, top: selectedObjects[0].top, bottom: (selectedObjects[0].top + selectedObjects[0].height) };
        const coverWindows = await coverWindowTest(canvas, cashObj, "verticalOneBarBefore");
        if(coverWindows){cashFlag=false;}
        else{
        const coverWindows1 = await coverWindowTest(canvas, cashObj, "verticalOneBarAfter");
        if(coverWindows1)
         cashFlag = false;
        }
      }
    }
    if (/horizontalBar/.test(selectedObjects[0].id)) {
      var relatedVerticalBars = await getObjectsArrayById(canvas, "verticalOneBar");
      for ( h = 0; h < relatedVerticalBars.length; h++) {
        if (relatedVerticalBars[h].top + relatedVerticalBars[h].height < selectedObjects[0].top + 3 && relatedVerticalBars[h].top + relatedVerticalBars[h].height > selectedObjects[0].top - 3 && relatedVerticalBars[h].left >= selectedObjects[0].left && relatedVerticalBars[h].left + relatedVerticalBars[h].width <= selectedObjects[0].left + selectedObjects[0].width) {
          cashFlag = false; break;
        }
        else if (relatedVerticalBars[h].top < selectedObjects[0].top + selectedObjects[0].height + 3 && relatedVerticalBars[h].top > selectedObjects[0].top + selectedObjects[0].height - 3 && relatedVerticalBars[h].left >= selectedObjects[0].left && relatedVerticalBars[h].left + relatedVerticalBars[h].width <= selectedObjects[0].left + selectedObjects[0].width) {
          cashFlag = false; break;
        }
      }
      if(cashFlag)
      {
        const cashObj = { left: selectedObjects[0].left, top: selectedObjects[0].top, right: (selectedObjects[0].left + selectedObjects[0].width) };
        const coverWindows = await coverWindowTest(canvas, cashObj, "horizontalBarBefore");
        if(coverWindows){cashFlag=false;}
        else{
          const coverWindows1 = await coverWindowTest(canvas, cashObj, "horizontalBarAfter");
        if(coverWindows1)
         cashFlag = false;
        }
      }
    }


    if(!cashFlag){
     window.alert("You can't delete this bar.");
     await canvas.renderAll();
     setDeleteFlag(false);
    }
    else {
      await canvas.remove(selectedObjects[0]);
      await canvas.discardActiveObject();

      await insertDimentions(canvas, scale, createria);
      await canvas.renderAll();
      setDeleteFlag(false);
      setRestoreNum((prevRestoreNum) => prevRestoreNum + 1);
      setCanvasState((prevCanvasState) => [...prevCanvasState, canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex'])]);
    }
  }
};