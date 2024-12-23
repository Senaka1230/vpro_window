import { fabric } from 'fabric';
import { borderthickness, getObjectsArrayById } from '../initialSettings/InitValues.js';
import { handleCreateCoverFrame } from './CreatCoverFrame.js';
// import {CoverHandle} from './CoverWindowHandle.js';

export const handleInsertCoverWindowResize = async (canvas, boundingLeft, boundingRight, boundingTop, boundingBottom, name) => {
  if (boundingLeft !== 0 && boundingRight !== 0 && boundingTop !== 0 && boundingBottom !== 0) {
    if (boundingBottom - boundingTop > 4 * borderthickness / 2.5 && boundingRight - boundingLeft > 4 * borderthickness / 2.5) {

      if (name === "csl" || name === "ccsl") {
        var frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // var handle = await CoverHandle(boundingLeft - borderthickness/3,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        // var hinge1 = await handleCreateHinge(boundingRight+borderthickness*3/8, (boundingBottom - boundingTop)/4 + boundingTop-24);
        // var hinge2 = await handleCreateHinge(boundingRight+borderthickness*3/8, (boundingBottom - boundingTop)*3/4 + boundingTop-24);
        var openPolygon = new fabric.Polyline([
          { x: boundingRight - boundingLeft, y: 0 },
          { x: 0, y: (boundingBottom - boundingTop) / 2 },
          { x: boundingRight - boundingLeft, y: boundingBottom - boundingTop }
        ], {
          fill: '',
          stroke: 'blue',
          strokeWidth: 1,
          closed: false
        });

        const nameLabel = new fabric.Text(name === "csl" ? "CS - L" : "CCS - L", {
          top: (boundingBottom - boundingTop) / 2 - 20,
          left: (boundingRight - boundingLeft) / 2 - 40,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, openPolygon, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "csl") ? "realCoverWindowcsl" : "realCoverWindowccsl"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "csr" || name === "ccsr") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(boundingRight-borderthickness/8,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        // const hinge1 = await handleCreateHinge(boundingLeft-borderthickness*5/8, (boundingBottom - boundingTop)/4 + boundingTop-24);
        // const hinge2 = await handleCreateHinge(boundingLeft-borderthickness*5/8, (boundingBottom - boundingTop)*3/4 + boundingTop-24);
        openPolygon = new fabric.Polyline([
          { x: 0, y: 0 },
          { x: boundingRight - boundingLeft, y: (boundingBottom - boundingTop) / 2 },
          { x: 0, y: boundingBottom - boundingTop }
        ], {
          fill: '',
          stroke: 'blue',
          strokeWidth: 1,
          closed: false
        });

        const nameLabel = new fabric.Text(name === "csr" ? "CS - R" : "CCS - R", {
          top: (boundingBottom - boundingTop) / 2 - 20,
          left: (boundingRight - boundingLeft) / 2 - 40,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, openPolygon, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "csr") ? "realCoverWindowcsr" : "realCoverWindowccsr"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "awv" || name === "cawv") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // handle = await CoverHandle(( boundingRight - boundingLeft)/2 + boundingLeft - 24, boundingTop + borderthickness/8);
        // handle.set({ angle: -90 });
        // hinge1 = await handleCreateHinge((boundingRight - boundingLeft)/4 + boundingLeft+24, boundingBottom+borderthickness*3/8);
        // hinge1.set({ angle: 90 });
        // hinge2 = await handleCreateHinge((boundingRight - boundingLeft)*3/4 + boundingLeft+24, boundingBottom+borderthickness*3/8);
        // hinge2.set({ angle: 90 });

        openPolygon = new fabric.Polyline([
          { x: 0, y: boundingBottom - boundingTop },
          { x: (boundingRight - boundingLeft) / 2, y: borderthickness / 8 },
          { x: boundingRight - boundingLeft, y: boundingBottom - boundingTop }
        ], {
          fill: '',
          stroke: 'blue',
          strokeWidth: 1,
          closed: false
        });

        const nameLabel = new fabric.Text(name === "awv" ? "AW - V" : "CAW - V", {
          top: (boundingBottom - boundingTop) / 2,
          left: (boundingRight - boundingLeft) / 2 - 40,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, openPolygon, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "awv") ? "realCoverWindowawv" : "realCoverWindowcawv"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vf" || name === "cvf") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);

        // const contentLabel = new fabric.Text("F", {
        //   top: boundingTop + (boundingBottom - boundingTop)/2-borderthickness,
        //   left: boundingLeft + (boundingRight - boundingLeft)/2-borderthickness,  
        //   fontSize: borderthickness*2,
        //   fill: 'blue',
        //   fontWeight:"bold"
        // });

        const nameLabel = new fabric.Text(name === "vf" ? "V - F" : "CV - F", {
          top: (boundingBottom - boundingTop) / 2,
          left: (boundingRight - boundingLeft) / 2 - 35,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vf") ? "realCoverWindowvf" : "realCoverWindowcvf"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vsf" || name === "cvsf") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);

        const nameLabel = new fabric.Text(name === "vsf" ? "V - SF" : "CV - SF", {
          top: (boundingBottom - boundingTop) / 2 - borderthickness / 2,
          left: (boundingRight - boundingLeft) / 2 - borderthickness,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vsf") ? "realCoverWindowvsf" : "realCoverWindowcvsf"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vss" || name === "ss") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(boundingLeft - borderthickness/3,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow = new fabric.Line([0, (boundingBottom - boundingTop) / 2, (boundingRight - boundingLeft) / 2 - borderthickness / 2, (boundingBottom - boundingTop) / 2], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) / 2, 0, (boundingRight - boundingLeft) / 2, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });


        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: 90,
          left: (boundingRight - boundingLeft) / 2 - borderthickness / 2,
          top: (boundingBottom - boundingTop) / 2 - 10,
          selectable: false
        });

        const nameLabel = new fabric.Text(name === "vss" ? "V - SS" : "SS", {
          top: (boundingBottom - boundingTop) / 2 - borderthickness / 2,
          left: (boundingRight - boundingLeft) / 2 + 3,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, Arrow2, triangle, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vss") ? "realCoverWindowvss" : "realCoverWindowss"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vslo" || name === "slo") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(boundingLeft - borderthickness/3,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow = new fabric.Line([0, boundingBottom - boundingTop, (boundingRight - boundingLeft) / 2 - borderthickness / 4, 0], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) / 2, 0, (boundingRight - boundingLeft) / 2, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: (Math.atan(Math.abs((boundingRight - boundingLeft) / 2 - borderthickness / 2) / Math.abs(boundingTop - boundingBottom)) * 180) / Math.PI,
          left: (boundingRight - boundingLeft) / 2 - borderthickness / 1.4,
          top: 0,
          selectable: false
        });
        const nameLabel = new fabric.Text(name === "vslo" ? "V - SLO" : "SLO", {
          top: (boundingBottom - boundingTop) / 2 - borderthickness / 2,
          left: (boundingRight - boundingLeft) / 2 + 3,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, Arrow2, triangle, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vslo") ? "realCoverWindowvslo" : "realCoverWindowslo"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vsso" || name === "sso") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(boundingLeft - borderthickness/3,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow = new fabric.Line([0, (boundingBottom - boundingTop) / 2, (boundingRight - boundingLeft) / 3 - borderthickness / 4, (boundingBottom - boundingTop) / 2], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) / 3, 0, (boundingRight - boundingLeft) / 3, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: 90,
          left: (boundingRight - boundingLeft) / 3,
          top: (boundingBottom - boundingTop) / 2 - 10,
          selectable: false
        });

        const nameLabel = new fabric.Text(name === "vsso" ? "V - SSO" : "SSO", {
          top: (boundingBottom - boundingTop) / 2 - borderthickness / 2,
          left: (boundingRight - boundingLeft) / 3 + 3,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, Arrow2, triangle, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vsso") ? "realCoverWindowvsso" : "realCoverWindowsso"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vssr" || name === "ssr") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(boundingRight - borderthickness/8,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow = new fabric.Line([boundingRight - boundingLeft - 20, (boundingBottom - boundingTop) / 2, (boundingRight - boundingLeft) * 2 / 3 + borderthickness / 2, (boundingBottom - boundingTop) / 2], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) * 2 / 3, 0, (boundingRight - boundingLeft) * 2 / 3, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });


        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: -90,
          left: (boundingRight - boundingLeft) * 2 / 3 + borderthickness / 2,
          top: (boundingBottom - boundingTop) / 2 + 10,
          selectable: false
        });
        const nameLabel = new fabric.Text(name === "vssr" ? "V - SS - R" : "SS - R", {
          top: (boundingBottom - boundingTop) / 2 - borderthickness / 2,
          left: (boundingRight - boundingLeft) * 2 / 3 - 125,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, Arrow2, triangle, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vssr") ? "realCoverWindowvssr" : "realCoverWindowssr"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vslos" || name === "slos") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(boundingLeft - borderthickness/3,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow = new fabric.Line([0, boundingBottom - boundingTop, (boundingRight - boundingLeft) / 3 - borderthickness / 4, 0], {
          stroke: 'blue',
          strokeWidth: 1,
        });


        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) / 3, 0, (boundingRight - boundingLeft) / 3, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: (Math.atan(Math.abs((boundingRight - boundingLeft) / 3 - borderthickness / 2) / Math.abs(boundingTop - boundingBottom)) * 180) / Math.PI,
          left: (boundingRight - boundingLeft) / 3 - borderthickness / 1.2,
          top: 0,
          selectable: false
        });
        const nameLabel = new fabric.Text(name === "vslos" ? "V - SLOS" : "SLOS", {
          top: (boundingBottom - boundingTop) / 2 - borderthickness / 2,
          left: (boundingRight - boundingLeft) / 3 + 3,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, Arrow2, triangle, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vslos") ? "realCoverWindowvslos" : "realCoverWindowslos"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vslosr" || name === "slosr") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(boundingRight - borderthickness/8,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow = new fabric.Line([boundingRight - boundingLeft, boundingBottom - boundingTop, (boundingRight - boundingLeft) * 2 / 3 + borderthickness / 2, 0], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) * 2 / 3, 0, (boundingRight - boundingLeft) * 2 / 3, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: -(Math.atan(Math.abs((boundingRight - boundingLeft) / 3) / Math.abs(boundingTop - boundingBottom)) * 180) / Math.PI,
          left: (boundingRight - boundingLeft) * 2 / 3,
          top: 5,
          selectable: false
        });

        const nameLabel = new fabric.Text(name === "vslosr" ? "V - SLOSR" : "SLOSR", {
          top: (boundingBottom - boundingTop) / 2 - borderthickness / 2,
          left: (boundingRight - boundingLeft) * 2 / 3 - 145,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, Arrow2, triangle, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vslosr") ? "realCoverWindowvslosr" : "realCoverWindowslosr"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vsh" || name === "sh") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(( boundingRight - boundingLeft)/2 + boundingLeft - 24, boundingBottom + borderthickness/2);
        //  handle.set({ angle: -90 });

        const Arrow = new fabric.Line([(boundingRight - boundingLeft) / 2, boundingBottom - boundingTop, (boundingRight - boundingLeft) / 2, (boundingBottom - boundingTop) / 2 + borderthickness / 2], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const Arrow2 = new fabric.Line([0, (boundingBottom - boundingTop) / 2, boundingRight - boundingLeft, (boundingBottom - boundingTop) / 2], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: 0,
          left: (boundingRight - boundingLeft) / 2 - 10,
          top: (boundingBottom - boundingTop) / 2 + borderthickness / 2,
          selectable: false
        });
        const nameLabel = new fabric.Text(name === "vsh" ? "V - SH" : "SH", {
          top: (boundingBottom - boundingTop) / 2 - 30,
          left: (boundingRight - boundingLeft) / 2 - 30,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, Arrow2, triangle, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vsh") ? "realCoverWindowvsh" : "realCoverWindowsh"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vsho" || name === "sho") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(( boundingRight - boundingLeft)/2 + boundingLeft - 24, boundingBottom + borderthickness/2);
        // handle.set({ angle: -90 });

        const Arrow = new fabric.Line([(boundingRight - boundingLeft) / 2, boundingBottom - boundingTop, (boundingRight - boundingLeft) / 2, (boundingBottom - boundingTop) * 2 / 3 + borderthickness / 2], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const Arrow2 = new fabric.Line([0, (boundingBottom - boundingTop) * 2 / 3, boundingRight - boundingLeft, (boundingBottom - boundingTop) * 2 / 3], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: 0,
          left: (boundingRight - boundingLeft) / 2 - 10,
          top: (boundingBottom - boundingTop) * 2 / 3 + borderthickness / 2,
          selectable: false
        });
        const nameLabel = new fabric.Text(name === "vsho" ? "V - SHO" : "SHO", {
          top: (boundingBottom - boundingTop) * 2 / 3 - 35,
          left: (boundingRight - boundingLeft) / 2 - 40,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, Arrow2, triangle, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "vsho") ? "realCoverWindowvsho" : "realCoverWindowsho"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "va") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);

        // const  handle1 = await CoverHandle(( boundingRight - boundingLeft)/2 + boundingLeft - 24, boundingBottom + borderthickness/2);
        // handle1.set({ angle: -90 });

        const Arrow1 = new fabric.Line([(boundingRight - boundingLeft) / 2, boundingBottom - boundingTop, (boundingRight - boundingLeft) / 2, (boundingBottom - boundingTop) / 2 + borderthickness / 2], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const Arrow3 = new fabric.Line([0, (boundingBottom - boundingTop) / 2, boundingRight - boundingLeft, (boundingBottom - boundingTop) / 2], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const triangle1 = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: 0,
          left: (boundingRight - boundingLeft) / 2 - 10,
          top: (boundingBottom - boundingTop) / 2 + borderthickness / 2,
          selectable: false
        });

        // const handle2 = await CoverHandle(( boundingRight - boundingLeft)/2 + boundingLeft - 24, boundingTop - borderthickness/3);
        // handle2.set({ angle: -90 });

        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) / 2, 0, (boundingRight - boundingLeft) / 2, (boundingBottom - boundingTop) / 2 - borderthickness / 2 - 40], {
          stroke: 'blue',
          strokeWidth: 1,
        });
        const triangle2 = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: 180,
          left: (boundingRight - boundingLeft) / 2 + 10,
          top: (boundingBottom - boundingTop) / 2 - borderthickness / 2 - 40,
          selectable: false
        });

        const nameLabel = new fabric.Text("V - A", {
          top: (boundingBottom - boundingTop) / 2 - 35,
          left: (boundingRight - boundingLeft) / 2 - 35,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow1, Arrow3, triangle1, Arrow2, triangle2, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: "realCoverWindowva"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "vao") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);

        // const  handle1 = await CoverHandle(( boundingRight - boundingLeft)/2 + boundingLeft - 24, boundingBottom + borderthickness/2);
        // handle1.set({ angle: -90 });

        const Arrow1 = new fabric.Line([(boundingRight - boundingLeft) / 2, boundingBottom - boundingTop, (boundingRight - boundingLeft) / 2, (boundingBottom - boundingTop) * 2 / 3 + borderthickness / 2], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const triangle1 = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: 0,
          left: (boundingRight - boundingLeft) / 2 - 10,
          top: (boundingBottom - boundingTop) * 2 / 3 + borderthickness / 2,
          selectable: false
        });

        // const handle2 = await CoverHandle(( boundingRight - boundingLeft)/2 + boundingLeft - 24, boundingTop - borderthickness/3);
        // handle2.set({ angle: -90 });

        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) / 2, 0, (boundingRight - boundingLeft) / 2, (boundingBottom - boundingTop) * 2 / 3 - borderthickness / 2 - 40], {
          stroke: 'blue',
          strokeWidth: 1,
        });
        const triangle2 = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: 180,
          left: (boundingRight - boundingLeft) / 2 + 10,
          top: (boundingBottom - boundingTop) * 2 / 3 - borderthickness / 2 - 40,
          selectable: false
        });

        const Arrow3 = new fabric.Line([0, (boundingBottom - boundingTop) * 2 / 3, boundingRight - boundingLeft, (boundingBottom - boundingTop) * 2 / 3], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const nameLabel = new fabric.Text("V - AO", {
          top: (boundingBottom - boundingTop) * 2 / 3 - 35,
          left: (boundingRight - boundingLeft) / 2 - 35,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow1, triangle1, Arrow2, Arrow3, triangle2, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: "realCoverWindowvao"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "des" || name === "des4") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(boundingLeft - borderthickness/3,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow = new fabric.Line([0, (boundingBottom - boundingTop) / 2, (boundingRight - boundingLeft) / 3 - borderthickness / 2, (boundingBottom - boundingTop) / 2], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: 90,
          left: (boundingRight - boundingLeft) / 3 - borderthickness / 2,
          top: (boundingBottom - boundingTop) / 2 - 10,
          selectable: false
        });

        // const handle1 = await CoverHandle(boundingRight - borderthickness/8,( boundingBottom - boundingTop)/2 + boundingTop - 24);

        // const frame1 = await handleCreateCoverFrame(boundingLeft + (boundingRight - boundingLeft) * 2 / 3, boundingRight, boundingTop, boundingBottom);
        // const handle1 = await CoverHandle(boundingRight - borderthickness/8,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow1 = new fabric.Line([boundingRight - boundingLeft, (boundingBottom - boundingTop) / 2, (boundingRight - boundingLeft) * 2 / 3 + borderthickness / 2, (boundingBottom - boundingTop) / 2], {
          stroke: 'blue',
          strokeWidth: 1,
        });


        const triangle1 = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: -90,
          left: (boundingRight - boundingLeft) * 2 / 3 + borderthickness / 2,
          top: (boundingBottom - boundingTop) / 2 + 10,
          selectable: false
        });

        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) / 3, 0, (boundingRight - boundingLeft) / 3, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });
        const Arrow3 = new fabric.Line([(boundingRight - boundingLeft) * 2 / 3, 0, (boundingRight - boundingLeft) * 2 / 3, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const nameLabel = new fabric.Text(name === "des" ? "DES" : "DES4", {
          top: (boundingBottom - boundingTop) / 2 - borderthickness,
          left: (boundingRight - boundingLeft) / 2 - 30,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, triangle, Arrow1, triangle1, Arrow2, Arrow3, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "des") ? "realCoverWindowdes" : "realCoverWindowdes4"
        });
        canvas.add(CoverGroup);
      }
      else if (name === "deslo" || name === "deslo4") {
        const frame = await handleCreateCoverFrame(boundingLeft, boundingRight, boundingTop, boundingBottom);
        // const handle = await CoverHandle(boundingLeft - borderthickness/3,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow = new fabric.Line([0, boundingBottom - boundingTop, (boundingRight - boundingLeft) / 3 - borderthickness / 2, 0], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const triangle = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: (Math.atan(Math.abs((boundingRight - boundingLeft) / 3 - borderthickness / 2) / Math.abs(boundingTop - boundingBottom)) * 180) / Math.PI,
          left: (boundingRight - boundingLeft) / 3 - borderthickness,
          top: 2,
          selectable: false
        });

        // const frame1 = await handleCreateCoverFrame(boundingLeft + (boundingRight - boundingLeft) * 2 / 3, boundingRight, boundingTop, boundingBottom);
        // const handle1 = await CoverHandle(boundingRight - borderthickness/8,( boundingBottom - boundingTop)/2 + boundingTop - 24);
        const Arrow1 = new fabric.Line([boundingRight - boundingLeft, boundingBottom - boundingTop, (boundingRight - boundingLeft) * 2 / 3 + borderthickness / 2, 0], {
          stroke: 'blue',
          strokeWidth: 1,
        });

        const triangle1 = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: '',
          stroke: 'blue',
          angle: -(Math.atan(Math.abs((boundingRight - boundingLeft) / 3) / Math.abs(boundingTop - boundingBottom)) * 180) / Math.PI,
          left: (boundingRight - boundingLeft) * 2 / 3,
          top: 4,
          selectable: false
        });

        const Arrow2 = new fabric.Line([(boundingRight - boundingLeft) / 3, 0, (boundingRight - boundingLeft) / 3, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });
        const Arrow3 = new fabric.Line([(boundingRight - boundingLeft) * 2 / 3, 0, (boundingRight - boundingLeft) * 2 / 3, boundingBottom - boundingTop], {
          stroke: 'blue',
          strokeWidth: 2,
        });

        const nameLabel = new fabric.Text(name === "deslo" ? "DESLO" : "DESLO4", {
          top: (boundingBottom - boundingTop) / 2 - borderthickness / 2,
          left: (boundingRight - boundingLeft) / 2 - 55,
          fontSize: 30,
          fill: 'blue',
          fontWeight: "bold"
        });

        const CoverGroup = new fabric.Group([frame, Arrow, triangle, Arrow1, triangle1, Arrow2, Arrow3, nameLabel], {
          left: boundingLeft,
          top: boundingTop,
          selectable: false,
          id: (name === "deslo") ? "realCoverWindowdeslo" : "realCoverWindowdeslo4"
        });
        canvas.add(CoverGroup);

      }
      canvas.renderAll();

    }
  }
};

export const coverWindowTest = async (canvas, object, objId) => {
  var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
  var newCoverWindows = [];
  if(objId === "topframe"){
    for (const coverWindow of coverWindows) {
      if (coverWindow.left >= object.left - borderthickness && coverWindow.left + coverWindow.width <= object.left + object.width + borderthickness && coverWindow.top >= object.top - borderthickness && coverWindow.top <= object.top+borderthickness)
        newCoverWindows.push(coverWindow);
    }
  }
  if(objId === "leftframe"){
    for (const coverWindow of coverWindows) {
      if (coverWindow.left >= object.left - borderthickness && coverWindow.left <= object.left + borderthickness && coverWindow.top >= object.top - borderthickness && coverWindow.top + coverWindow.height <= object.top + object.height + borderthickness)
        newCoverWindows.push(coverWindow);
    }
  }
  if(objId === "rightframe"){
    for (const coverWindow of coverWindows) {
      if (coverWindow.left + coverWindow.width >= object.left + object.width - borderthickness && coverWindow.left + coverWindow.width <= object.left + object.width + borderthickness && coverWindow.top >= object.top - borderthickness && coverWindow.top + coverWindow.height <= object.top + object.height + borderthickness)
        newCoverWindows.push(coverWindow);
    }
  }
  if(objId === "bottomframe"){
    for (const coverWindow of coverWindows) {
      if (coverWindow.left >= object.left - borderthickness && coverWindow.left + coverWindow.width <= object.left + object.width + borderthickness && coverWindow.top + coverWindow.height >= object.top + object.height - borderthickness && coverWindow.top + coverWindow.height <= object.top + object.height + borderthickness)
        newCoverWindows.push(coverWindow);
    }
  }

  if(objId === "verticalOneBarBefore"){
    for (const coverWindow of coverWindows) {
      if (coverWindow.left + coverWindow.width >= object.left - borderthickness && coverWindow.left + coverWindow.width <= object.left + borderthickness && coverWindow.top + coverWindow.height <= object.bottom +borderthickness && coverWindow.top >= object.top - borderthickness)
        newCoverWindows.push(coverWindow);
    }
  }

  if(objId === "verticalOneBarAfter"){
    for (const coverWindow of coverWindows) {
      if (coverWindow.left >= object.left && coverWindow.left <= object.left + 2*borderthickness && coverWindow.top + coverWindow.height <= object.bottom +borderthickness && coverWindow.top >= object.top - borderthickness)
        newCoverWindows.push(coverWindow);
    }
  }

  if(objId === "horizontalBarBefore"){
    for (const coverWindow of coverWindows) {
      if (coverWindow.top + coverWindow.height >= object.top - borderthickness && coverWindow.top + coverWindow.height <= object.top + borderthickness && coverWindow.left + coverWindow.width <= object.right +borderthickness && coverWindow.left >= object.left - borderthickness)
        newCoverWindows.push(coverWindow);
    }
  }

  if(objId === "horizontalBarAfter"){
    for (const coverWindow of coverWindows) {
      if (coverWindow.top >= object.top && coverWindow.top <= object.top + 2*borderthickness && coverWindow.left + coverWindow.width <= object.right +borderthickness && coverWindow.left >= object.left - borderthickness)
        newCoverWindows.push(coverWindow);
    }
  }

  if (newCoverWindows.length === 0)
    return false;
  else return newCoverWindows;
}
