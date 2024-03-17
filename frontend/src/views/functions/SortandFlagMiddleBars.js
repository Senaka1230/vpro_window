import {getObjectsArrayById} from '../initialSettings/InitValues';

export const horizontalMiddleBarSort = async(canvas, mainImg) => {

          var subHorozontals = [];
          var SortedSubHorizontals = [];
          var objs = await getObjectsArrayById(canvas, "horizontalBar");
          for(const obj of objs)
          {
            if(obj.left >= mainImg.left && obj.width + obj.left <= mainImg.left + mainImg.width && obj.top >= mainImg.top && obj.top + obj.height <= mainImg.top + mainImg.height)
            subHorozontals.push(obj);
          }

          if(subHorozontals.length === 0)
          return false;
          
          SortedSubHorizontals = subHorozontals.sort((a, b) => a.top - b.top );
          return SortedSubHorizontals;

 }

export const verticalMiddleBarSort = async(canvas, mainImg) => {

    var subVerticals = [];
    var SortedSubVerticals = [];
    var objs = await getObjectsArrayById(canvas, "verticalOneBar");
    for(const obj of objs)
    {
      if(obj.left >= mainImg.left && obj.width + obj.left <= mainImg.left + mainImg.width && obj.top >= mainImg.top && obj.top + obj.height <= mainImg.top + mainImg.height)
      subVerticals.push(obj);
    }

     if(subVerticals.length === 0)
        return false;

     SortedSubVerticals = subVerticals.sort((a, b) => a.left - b.left );
     return SortedSubVerticals;    
}