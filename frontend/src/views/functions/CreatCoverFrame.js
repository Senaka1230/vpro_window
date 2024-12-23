import { fabric } from 'fabric';
import {borderthickness} from '../initialSettings/InitValues.js';

export const handleCreateCoverFrameCash = async(boundingLeft, boundingRight, boundingTop, boundingBottom) => {

          var TopFrame = new fabric.Polyline([
              { x: borderthickness, y: borderthickness },
              { x: borderthickness+boundingRight-boundingLeft-borderthickness, y: borderthickness },
              { x: borderthickness+boundingRight-boundingLeft, y: 0},
              { x: 0, y: 0 },
              { x: borderthickness, y: borderthickness }
          ], {
          fill : "grey",
          selectable: false,
          hasControls: true,
          stroke: 'black',
          strokeWidth: 1,
          });

          const MidLineTop = new fabric.Line([borderthickness*3/4, borderthickness*3/4, boundingRight-boundingLeft + borderthickness/2, borderthickness*3/4], {
            stroke: 'black',
            strokeWidth: 1,
          });
          
          const group1 = new fabric.Group([TopFrame, MidLineTop], {
            left: boundingLeft - borderthickness/2, 
            top: boundingTop - borderthickness/2,  
            selectable: false
          });

                   
        var LeftFrame = new fabric.Polyline([
            { x: 0, y: 0 },
            { x: -borderthickness, y: -borderthickness },
            { x: -borderthickness, y: boundingBottom - boundingTop},
            { x: 0, y: boundingBottom - boundingTop - borderthickness },
            { x: 0, y: 0 }
        ], {
          fill : "grey",
          selectable: false,
          hasControls: true,
          stroke: 'black',
          strokeWidth: 1,
        });

        const MidLineLeft = new fabric.Line([-borderthickness/4, -borderthickness/4, -borderthickness/4, boundingBottom-boundingTop-borderthickness/2], {
          stroke: 'black',
          strokeWidth: 1,
        });
        
        const group2 = new fabric.Group([LeftFrame, MidLineLeft], {
          left: boundingLeft - borderthickness/2, 
          top: boundingTop - borderthickness/2,  
          selectable: false
        });


        var RightFrame = new fabric.Polyline([
            { x: 0, y: 0 },
            { x: 0, y: boundingBottom - boundingTop - borderthickness },
            { x: borderthickness, y: boundingBottom - boundingTop},
            { x: borderthickness, y: - borderthickness },
            { x: 0, y: 0 }
        ], {
          fill : "grey",
          selectable: false,
          hasControls: true,
          stroke: 'black',
          strokeWidth: 1
        });

        const MidLineRight = new fabric.Line([borderthickness/4, -borderthickness/4, borderthickness/4, boundingBottom-boundingTop-borderthickness/2], {
          stroke: 'black',
          strokeWidth: 1,
        });

        const group3 = new fabric.Group([RightFrame, MidLineRight], {
          left: boundingRight - borderthickness/2, 
          top: boundingTop - borderthickness/2,  
          selectable: false
        });
  
        var BottomFrame = new fabric.Polyline([
            { x: 0, y: 0 },
            { x: -borderthickness, y: borderthickness },
            { x: boundingRight - boundingLeft, y:  borderthickness},
            { x: boundingRight - boundingLeft -borderthickness , y: 0 },
            { x: 0, y: 0 }
        ], {
          fill : "grey",
          selectable: false,
          hasControls: true,
          stroke: 'black',
          strokeWidth: 1
        });

        const MidLineBottom = new fabric.Line([-borderthickness/4, borderthickness/4, boundingRight-boundingLeft - borderthickness*3/4, borderthickness/4], {
          stroke: 'black',
          strokeWidth: 1,
        });

        const group4 = new fabric.Group([BottomFrame, MidLineBottom], {
          left: boundingLeft - borderthickness/2,
          top: boundingBottom - borderthickness/2,
          selectable: false
        });


        const finalGroup = new fabric.Group([group1, group2, group3, group4], {
          selectable: false, 
        });

        return finalGroup;

};

export const handleCreateCoverFrame = async(boundingLeft, boundingRight, boundingTop, boundingBottom) => {

  var horizontalOneBar = new fabric.Rect({
    left: 0,
    top: 0,
    width: boundingRight - boundingLeft,
    height: boundingBottom - boundingTop,
    fill: 'transparent',
    stroke: 'white',
    strokeWidth: 0,
    opacity: 0
  });

  return horizontalOneBar;


//   var TopFrame = new fabric.Polyline([
//       { x: borderthickness, y: borderthickness },
//       { x: borderthickness+boundingRight-boundingLeft-borderthickness, y: borderthickness },
//       { x: borderthickness+boundingRight-boundingLeft, y: 0},
//       { x: 0, y: 0 },
//       { x: borderthickness, y: borderthickness }
//   ], {
//   fill : "white",
//   selectable: true,
//   hasControls: true,
//   stroke: 'black',
//   strokeWidth: 1,
//   });

//   const MidLineTop = new fabric.Line([borderthickness*3/4, borderthickness*3/4, boundingRight-boundingLeft + borderthickness/2, borderthickness*3/4], {
//     stroke: 'black',
//     strokeWidth: 1,
//   });
  
//   const group1 = new fabric.Group([TopFrame, MidLineTop], {
//     left: boundingLeft - borderthickness/2, 
//     top: boundingTop - borderthickness/2,  
//     selectable: false
//   });

           
// var LeftFrame = new fabric.Polyline([
//     { x: 0, y: 0 },
//     { x: -borderthickness, y: -borderthickness },
//     { x: -borderthickness, y: boundingBottom - boundingTop},
//     { x: 0, y: boundingBottom - boundingTop - borderthickness },
//     { x: 0, y: 0 }
// ], {
//   fill : "white",
//   selectable: true,
//   hasControls: true,
//   stroke: 'black',
//   strokeWidth: 1,
// });

// const MidLineLeft = new fabric.Line([-borderthickness/4, -borderthickness/4, -borderthickness/4, boundingBottom-boundingTop-borderthickness/2], {
//   stroke: 'black',
//   strokeWidth: 1,
// });

// const group2 = new fabric.Group([LeftFrame, MidLineLeft], {
//   left: boundingLeft - borderthickness/2, 
//   top: boundingTop - borderthickness/2,  
//   selectable: false
// });


// var RightFrame = new fabric.Polyline([
//     { x: 0, y: 0 },
//     { x: 0, y: boundingBottom - boundingTop - borderthickness },
//     { x: borderthickness, y: boundingBottom - boundingTop},
//     { x: borderthickness, y: - borderthickness },
//     { x: 0, y: 0 }
// ], {
//   fill : "white",
//   selectable: true,
//   hasControls: true,
//   stroke: 'black',
//   strokeWidth: 1
// });

// const MidLineRight = new fabric.Line([borderthickness/4, -borderthickness/4, borderthickness/4, boundingBottom-boundingTop-borderthickness/2], {
//   stroke: 'black',
//   strokeWidth: 1,
// });

// const group3 = new fabric.Group([RightFrame, MidLineRight], {
//   left: boundingRight - borderthickness/2, 
//   top: boundingTop - borderthickness/2,  
//   selectable: false
// });

// var BottomFrame = new fabric.Polyline([
//     { x: 0, y: 0 },
//     { x: -borderthickness, y: borderthickness },
//     { x: boundingRight - boundingLeft, y:  borderthickness},
//     { x: boundingRight - boundingLeft -borderthickness , y: 0 },
//     { x: 0, y: 0 }
// ], {
//   fill : "white",
//   selectable: true,
//   hasControls: true,
//   stroke: 'black',
//   strokeWidth: 1
// });

// const MidLineBottom = new fabric.Line([-borderthickness/4, borderthickness/4, boundingRight-boundingLeft - borderthickness*3/4, borderthickness/4], {
//   stroke: 'black',
//   strokeWidth: 1,
// });

// const group4 = new fabric.Group([BottomFrame, MidLineBottom], {
//   left: boundingLeft - borderthickness/2,
//   top: boundingBottom - borderthickness/2,
//   selectable: false
// });


// const finalGroup = new fabric.Group([group1, group2, group3, group4], {
//   selectable: false, 
// });


// const finalGroup = new fabric.Group([], {
//   selectable: false, 
// });

// return finalGroup;

};
