import { fabric } from 'fabric';
import {borderthickness} from '../initialSettings/InitValues.js';

export const CoverHandle = async(left, top) => {

          var mainRect = new fabric.Rect({
            left: 0,
            top: 0,
            width: borderthickness/2,
            height: 48,
            fill: 'lightgrey',
            stroke: 'black',
            strokeWidth: 1,
            rx: 5,
            ry: 5  
          });

          var subRect = new fabric.Rect({
            left: borderthickness/8,
            top: 24,
            width: borderthickness/4,
            height: 48,
            fill: 'lightgrey',
            stroke: 'black',
            strokeWidth: 1,
            rx: 5,
            ry: 5  
          });
          
          const group1 = new fabric.Group([mainRect, subRect], {
            left: left,
            top: top,  
            selectable: false
          });

        return group1;

};

export const handleCreateHinge = async(left, top) => {

  var mainRect = new fabric.Rect({
    left: 0,
    top: 0,
    width: borderthickness/4,
    height: 22,
    fill: 'lightgrey',
    stroke: 'black',
    strokeWidth: 1,
    rx: 4,
    ry: 4  
  });

  var subRect = new fabric.Rect({
    left: 0,
    top: 26,
    width: borderthickness/4,
    height: 22,
    fill: 'lightgrey',
    stroke: 'black',
    strokeWidth: 1,
    rx: 4,
    ry: 4  
  });
  
  const group1 = new fabric.Group([mainRect, subRect], {
    left: left,
    top: top,  
    selectable: false
  });

return group1;

};

