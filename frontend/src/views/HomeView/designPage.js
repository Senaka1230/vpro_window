import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Popover,
  Modal,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  // SvgIcon,
  Slider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { X as XIcon, CornerUpLeft, CornerUpRight, ChevronDown, ChevronsRight } from 'react-feather';
// import { OpenWith as OpenWithIcon } from '@material-ui/icons';
import { fabric } from 'fabric';
import { handleInsertHorizontalBar, handleInsertVerticalBar } from '../newWindowOperations/insertOneBar.js';
import { handleInsertSeveralHorizontalBar, handleInsertSeveralVerticalBar } from '../newWindowOperations/insertSeveralBars.js';
import { handleCreate } from '../newWindowOperations/CreateNewRectWindow.js';
import { handleDeleteObject } from '../newWindowOperations/deleteObject.js';
import { verticalMiddleBarCentering, horizontalMiddleBarCentering } from '../newWindowOperations/MiddleBarCentering.js';
import { handleInsertHorizontalThroghBar, handleInsertVerticalThroghBar } from '../newWindowOperations/insertThrowBar.js';
import { handleHorizontalSplitWindows, handleVerticalSplitWindows } from '../newWindowOperations/SpliteToNewWindows.js';
import { handleInsertCoverWindow } from '../newWindowOperations/InsertCoverWindow.js';
import moment from 'moment';
import { created } from 'src/config';
import { getObjectsArrayById, getObjectById } from '../initialSettings/InitValues.js';
import { handleInsertCoverWindowResize } from '../functions/InsertCoverWindowResize.js';
import axios from 'src/utils/axios';
import { API_BASE_URL } from 'src/config/index.js';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// import { adjustAndCenterCanvasObjects } from '../newWindowOperations/sizeZooming.js'
import { mouseMoving } from '../functions/mouseMoving.js';
import { saveTemplete, loadAllTemplets } from '../newWindowOperations/TempleteOperation.js';

const useStyles = makeStyles((theme) => ({
  root: {},
  hover: {
    '&:hover': {
      cursor: 'pointer',
      border: '2px solid #245281',
    },
    '&:active': {
      border: '2px solid #245281',
    }
  },
  activeIconButton: {
    color: 'blue'
  },
  deactiveIconButton: {
    color: 'grey',
    marginLeft: "5px"
  },
  popover1: {
    maxWidth: "400px",
    maxHeight: "600px"
  },
  customSelect: {
    '& .MuiOutlinedInput-root': {
      padding: 0,
      height: "40px",
      color: "black",
      backgroundColor: "white",
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(12, 179, 229)'
      },
      "& .MuiSelect-root": {
        paddingTop: "7px",
        paddingBottom: "7px"
      }
    }
  },
  radio: {
    '& .MuiSvgIcon-root': {
      width: '18px',
      height: '18px',
      color: "grey"
    },
  },
  radioGroup: {
    display: "flex",
    flexDirection: 'row'
  },
  selectedRadio: {
    '& .MuiSvgIcon-root': {
      width: '18px',
      height: '18px',
      color: "#3949ab"
    }
  }
}));

const measurementOptions = [
  { label: "Inside", value: "inside" },
  { label: "Outside", value: "outside" }
];

function Features({ className, ...rest }) {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const isMountedRef = useIsMountedRef();
  const modal2Ref = useRef(null);

  const refV = useRef(null);
  const refH = useRef(null);

  const [measureOption, setMeasureOption] = useState("inside");

  const [open, setOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [rightMenuIndex, setRightMenuIndex] = useState(-1);

  const [leftMenu, setLeftMenu] = useState(0);
  const [mulionVerticalOpen, setMulionVerticalOpen] = useState(false);
  const [mulionHorizontalOpen, setMulionHorizontalOpen] = useState(false);

  const [width, setWidth] = useState("500");
  const [height, setHeight] = useState("500");
  const [widthList, setWidthList] = useState([]);
  const [heightList, setHeightList] = useState([]);
  const [scale, setScale] = useState([]);
  const [createria, setCreateria] = useState([]);
  const [widtherror, setWidthError] = useState(false);
  const [heighterror, setHeightError] = useState(false);

  const [canvas, setCanvas] = useState(null);
  const [canvasState, setCanvasState] = useState([]);
  const [canvasMenu, setCanvasMenu] = useState([]);
  const [rightMenuImg, setRightMenuImg] = useState([]);

  const [restoreNum, setRestoreNum] = useState(0);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const [selectedType, setSelectedType] = useState('33/4frame');
  const [frameComment, setFrameComment] = useState('');

  const [zoomSetting, setZoomSetting] = useState('zoomOff');
  const [zoom, setZoom] = useState(1);

  const [templetes, setTempletes] = useState([]);
  const [templeteIndex, setTempleteIndex] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [selectedTypeModal, setSelectedTypeModal] = useState('33/4frame');
  const [selectedTypesForModal, setSelectedTypesForModal] = useState([]);
  const [templeteModalOpen, setTempleteModalOpen] = useState(false);



  useEffect(() => {
    if (canvasRef.current) {
      if (!canvas) {
        const newCanvas = new fabric.Canvas(canvasRef.current);
        setCanvas(newCanvas);
      }
    }
  }, [canvas]);

  const getSubscription = useCallback(async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await axios
      .get(API_BASE_URL + '/design/rightMenu/getAll')
      .then(async (response) => {
        if (isMountedRef.current) {
          var cashCanvasMenus = response.data.canvasMenu;

          const offCanvas = new fabric.Canvas();

          for (const cashCanvasMenu of cashCanvasMenus) {
            offCanvas.clear();
            await offCanvas.loadFromJSON(cashCanvasMenu, async () => {
              const dataURL = await offCanvas.toDataURL({
                format: 'png',
                quality: 1,
              });
              await setRightMenuImg((prev) => [...prev, dataURL]);
            });
            await delay(100);
          }

          setScale(response.data.scale);
          setCreateria(response.data.createria);
          setCanvasMenu(cashCanvasMenus);
          setHeightList(response.data.height);
          setWidthList(response.data.width);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getSubscription();
  }, [getSubscription]);

  const coverWidowResize = async () => {
    var coverWindows = await getObjectsArrayById(canvas, "realCoverWindow");
    if (coverWindows.length > 0) {
      var objs = await getObjectById(canvas, "mainImg");
      handleInsertCoverWindowResize(canvas, objs.left, objs.left + objs.width, objs.top, objs.top + objs.height, coverWindows[0].id.replace("realCoverWindow", ""))
    }
  }

  useEffect(() => {
    if (canvas) {
      setRightMenuImg(prevCanvasMenu => {
        const updatedCanvasMenu = [...prevCanvasMenu];
        if (updatedCanvasMenu.length > 0) {
          updatedCanvasMenu[rightMenuIndex] = canvas.toDataURL({ format: 'png', quality: 1 });
        }
        return updatedCanvasMenu; // Update the state with the modified array
      });
      setCanvasMenu(prevCanvasMenu => {
        const updatedCanvasMenu = [...prevCanvasMenu]; // Make a copy of the array
        if (updatedCanvasMenu.length > 0) {
          updatedCanvasMenu[rightMenuIndex] = canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']); // Update the last value
        }
        return updatedCanvasMenu; // Update the state with the modified array
      });
      // coverWidowResize();
    }
  }, [restoreNum]);

  // useEffect(() => {
  //  if(activeFlag === "oneV")

  //  else if(activeFlag === "oneH")

  // }, [activeFlag]);

  const handleOpen = (identify) => {
    setLeftMenu(identify);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRightMenuClose = () => {
    setRightMenuOpen(false);
  };

  const handleWidthChange = (event) => {
    event.persist();
    setWidth(event.target.value);
  };

  const handleHeightChange = (event) => {
    event.persist();
    setHeight(event.target.value);
  };


  const handleBeforeCanvasState = () => {
    const previousState = canvasState[restoreNum - 1];
    canvas.clear();
    canvas.loadFromJSON(previousState, () => {
      setRestoreNum(restoreNum - 1);
      canvas.renderAll();
    });

  };

  const handleForWardCanvasState = () => {
    const forWardState = canvasState[restoreNum + 1];
    canvas.clear();
    canvas.loadFromJSON(forWardState, () => {
      setRestoreNum(restoreNum + 1);
      canvas.renderAll();
    });
  };

  const handleCanvasMenuChange = async (index) => {
    setRightMenuIndex(index);
    canvas.clear();
    canvas.off();
    // await mouseMoving(canvas, scale[index], setScale, index, createria[index], setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);

    await mouseMoving(canvas, scale[index], createria[index], setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);
    canvas.loadFromJSON(canvasMenu[index], () => {
      const beforeState = canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);
      setCanvasState(() => [beforeState]);
      setRestoreNum(0);
      canvas.renderAll();
    });
  };

  const handleCreateNewOne = async () => {

    if (width < 10 || width > 500 || height < 10 || height > 500) {
      if (height >= 10 && height <= 500) { setWidthError(true); }
      else setHeightError(true);
      return;
    }
    else {
      setHeightError(false);
      setWidthError(false);
    }

    setOpen(false);
    if (leftMenu === 0) {

      await axios.post(API_BASE_URL + "/design/rightMenu/save", {
        canvas: canvasMenu,
        createria: createria,
        scale: scale,
        width:widthList,
        height:heightList
      });

      await handleCreate(canvas, setScale, setCreateria, setCanvasState, setRestoreNum, setDeleteFlag, Number(width), Number(height), 0, zoomSetting, setWidthList, setHeightList);
      const beforeState = await canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);
      setCanvasMenu((prevCanvasState) => [...prevCanvasState, beforeState]);
      setRightMenuImg((prevCanvasState) => [...prevCanvasState, canvas.toDataURL({ format: 'png', quality: 1, })]);
      setRightMenuIndex(canvasMenu.length);
      setRestoreNum(0);

    }
    else if (leftMenu === 1) {
      await axios.post(API_BASE_URL + "/design/rightMenu/save", {
        canvas: canvasMenu,
        createria: createria,
        scale: scale,
        width:widthList,
        height:heightList
      });

      await handleCreate(canvas, setScale, setCreateria, setCanvasState, setRestoreNum, setDeleteFlag, Number(width), Number(height), 1, zoomSetting, setWidthList, setHeightList);
      const beforeState = await canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);
      setCanvasMenu((prevCanvasState) => [...prevCanvasState, beforeState]);
      setRightMenuImg((prevCanvasState) => [...prevCanvasState, canvas.toDataURL({ format: 'png', quality: 1, })]);
      setRightMenuIndex(canvasMenu.length);
      setRestoreNum(0);
    }
    else if (leftMenu === 2) {
      await axios.post(API_BASE_URL + "/design/rightMenu/save", {
        canvas: canvasMenu,
        createria: createria,
        scale: scale,
        width:widthList,
        height:heightList
      });

      await handleCreate(canvas, setScale, setCreateria, setCanvasState, setRestoreNum, setDeleteFlag, Number(width), Number(height), 2, zoomSetting, setWidthList, setHeightList);
      const beforeState = await canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);
      setCanvasMenu((prevCanvasState) => [...prevCanvasState, beforeState]);
      setRightMenuImg((prevCanvasState) => [...prevCanvasState, canvas.toDataURL({ format: 'png', quality: 1, })]);
      setRightMenuIndex(canvasMenu.length);
      setRestoreNum(0);
    }
    else if (leftMenu === 3) {
      await axios.post(API_BASE_URL + "/design/rightMenu/save", {
        canvas: canvasMenu,
        createria: createria,
        scale: scale,
        width:widthList,
        height:heightList
      });

      await handleCreate(canvas, setScale, setCreateria, setCanvasState, setRestoreNum, setDeleteFlag, Number(width), Number(height), 3, zoomSetting, setWidthList, setHeightList);
      const beforeState = await canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);
      setCanvasMenu((prevCanvasState) => [...prevCanvasState, beforeState]);
      setRightMenuImg((prevCanvasState) => [...prevCanvasState, canvas.toDataURL({ format: 'png', quality: 1, })]);
      setRightMenuIndex(canvasMenu.length);
      setRestoreNum(0);
    }
    else if (leftMenu === 4) {
      await axios.post(API_BASE_URL + "/design/rightMenu/save", {
        canvas: canvasMenu,
        createria: createria,
        scale: scale,
        width:widthList,
        height:heightList
      });

      await handleCreate(canvas, setScale, setCreateria, setCanvasState, setRestoreNum, setDeleteFlag, Number(width), Number(height), 4, zoomSetting, setWidthList, setHeightList);
      const beforeState = await canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);
      setCanvasMenu((prevCanvasState) => [...prevCanvasState, beforeState]);
      setRightMenuImg((prevCanvasState) => [...prevCanvasState, canvas.toDataURL({ format: 'png', quality: 1, })]);
      setRightMenuIndex(canvasMenu.length);
      setRestoreNum(0);
    }
    else if (leftMenu === 5) {
      await axios.post(API_BASE_URL + "/design/rightMenu/save", {
        canvas: canvasMenu,
        createria: createria,
        scale: scale,
        width:widthList,
        height:heightList
      });

      await handleCreate(canvas, setScale, setCreateria, setCanvasState, setRestoreNum, setDeleteFlag, Number(width), Number(height), 5, zoomSetting, setWidthList, setHeightList);
      const beforeState = await canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);
      setCanvasMenu((prevCanvasState) => [...prevCanvasState, beforeState]);
      setRightMenuImg((prevCanvasState) => [...prevCanvasState, canvas.toDataURL({ format: 'png', quality: 1, })]);
      setRightMenuIndex(canvasMenu.length);
      setRestoreNum(0);
    }
  }

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  const handleZoomSetting = async(event) => {

    if(event.target.value === "zoomOff")
    {
      setZoom(1);
      const point = new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
      canvas.zoomToPoint(point, 1);
      canvas.renderAll();
    }
    setZoomSetting(event.target.value);
    canvas.off();
    // await mouseMoving(canvas, scale[rightMenuIndex], setScale, rightMenuIndex, createria[rightMenuIndex], setRestoreNum, setCanvasState, setDeleteFlag, event.target.value);
    await mouseMoving(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setRestoreNum, setCanvasState, setDeleteFlag, event.target.value);
  };
  const handleTypeModalChange = (event) => {
    setSelectedTypeModal(event.target.value);
  };

  const handleRightMenuDelete = async (index) => {
    const cashFlag = window.confirm("Are you really want to delete this?");
    if (!cashFlag)
      return;
    var newArray = [...canvasMenu];
    newArray.splice(index, 1);
    var newArray1 = [...rightMenuImg];
    newArray1.splice(index, 1);
    var newArray2 = [...scale];
    newArray2.splice(index, 1);
    var newArray3 = [...createria];
    newArray3.splice(index, 1);
    var newArray4 = [...widthList];
    newArray4.splice(index, 1);
    var newArray5 = [...heightList];
    newArray5.splice(index, 1);
    setCanvasMenu(newArray);
    setRightMenuImg(newArray1);
    setScale(newArray2);
    setCreateria(newArray3);
    setWidthList(newArray4);
    setHeightList(newArray5);
    handleCanvasMenuChange(rightMenuIndex - 1);

    await axios.post(API_BASE_URL + "/design/rightMenu/save", {
      canvas: newArray,
      createria: newArray3,
      scale: newArray2,
      width:newArray4,
      height:newArray5
    });
  };

  const handleRightMenuDuplicate = async (index) => {
    var cashArray = [...canvasMenu];
    var copiedElement = cashArray[index];
    var cashArray1 = [...rightMenuImg];
    var copiedElement1 = cashArray1[index];
    var cashArray2 = [...scale];
    var copiedElement2 = cashArray2[index];
    var cashArray3 = [...createria];
    var copiedElement3 = cashArray3[index];
    var cashArray4 = [...widthList];
    var copiedElement4 = cashArray4[index];
    var cashArray5 = [...heightList];
    var copiedElement5 = cashArray5[index];

    var newArray, newArray1, newArray2, newArray3, newArray4, newArray5;

    if (index >= canvasMenu.length - 1) {
      newArray = [
        ...cashArray,
        copiedElement,
      ];
      newArray1 = [
        ...cashArray1,
        copiedElement1,
      ];
      newArray2 = [
        ...cashArray2,
        copiedElement2,
      ];
      newArray3 = [
        ...cashArray3,
        copiedElement3,
      ];
      newArray4 = [
        ...cashArray4,
        copiedElement4,
      ];
      newArray5 = [
        ...cashArray5,
        copiedElement5,
      ];
    }
    else {
      newArray = [
        ...cashArray.slice(0, index + 1),
        copiedElement,
        ...cashArray.slice(index + 1)
      ];
      newArray1 = [
        ...cashArray1.slice(0, index + 1),
        copiedElement1,
        ...cashArray1.slice(index + 1)
      ];
      newArray2 = [
        ...cashArray2.slice(0, index + 1),
        copiedElement2,
        ...cashArray2.slice(index + 1)
      ];
      newArray3 = [
        ...cashArray3.slice(0, index + 1),
        copiedElement3,
        ...cashArray3.slice(index + 1)
      ];
      newArray4 = [
        ...cashArray4.slice(0, index + 1),
        copiedElement4,
        ...cashArray4.slice(index + 1)
      ];
      newArray5 = [
        ...cashArray5.slice(0, index + 1),
        copiedElement5,
        ...cashArray5.slice(index + 1)
      ];
    }
    setCanvasMenu(newArray);
    setRightMenuImg(newArray1);
    setScale(newArray2);
    setCreateria(newArray3);
    setWidthList(newArray4);
    setHeightList(newArray5);

    await axios.post(API_BASE_URL + "/design/rightMenu/save", {
      canvas: newArray,
      scale: newArray2,
      createria: newArray3,
      width:newArray4,
      height:newArray5
    });
  };

  const handleZoomIn = (zoomLevel) => {
    let objects = canvas.getObjects();
    if (objects.length === 0) return;

    const point = new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
    canvas.zoomToPoint(point, canvas.getZoom() * zoomLevel);
    canvas.renderAll();
  };

  const handleZoomChange = (event, newValue) => {
    let objects = canvas.getObjects();
    if (objects.length === 0) return;
    setZoom(newValue);

    // canvas.setZoom(newValue);
    // canvas.renderAll();
    const point = new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
    canvas.zoomToPoint(point, newValue);
    canvas.renderAll();
  };


  const clickLoadTempleteButton = () => {
    setTempleteModalOpen(true);
    loadAllTemplets(setTempletes, setTempleteIndex, setSelectedTypesForModal);
  };

  const deleteOneTemplete = async (index) => {
    var confirm = window.confirm("Are you really want to delete this templete?")
    if (confirm) {
      setTempleteModalOpen(false);
      const response = await axios.post(API_BASE_URL + "/templete/delete/one", { id: templeteIndex[index] });
      if (response.data.success)
        window.alert("Successfully deleted!");
      else window.alert("Something went wrong!");
    }
  };

  const loadOneTemplete = async (index) => {
    setTempleteModalOpen(false);
    try {
      const response = await axios.post(API_BASE_URL + "/templete/get/one", { id: templeteIndex[index] });
      if (response.data.success) {
        canvas.clear();
        canvas.off();
        setRightMenuIndex(canvasMenu.length);
        canvas.loadFromJSON(response.data.canvas, async () => {
          const beforeState = await canvas.toJSON(['id', 'width', 'height', 'left', 'top', 'stroke', 'strokeWidth', 'selectable', 'hasControls', 'zIndex']);
          setCanvasMenu((prevCanvasState) => [...prevCanvasState, beforeState]);
          setRightMenuImg((prevCanvasState) => [...prevCanvasState, canvas.toDataURL({ format: 'png', quality: 1, })]);
          setScale((prevScale) => [...prevScale, response.data.scale]);
          setWidthList((prevScale) => [...prevScale, response.data.width]);
          setHeightList((prevScale) => [...prevScale, response.data.height]);
          setCreateria((prevScale) => [...prevScale, "D"]);
          setCanvasState(() => [beforeState]);
          setRestoreNum(0);
          canvas.renderAll();
        });
        await mouseMoving(canvas, response.data.scale, "D", setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);

        // await mouseMoving(canvas, response.data.scale, setScale, canvasMenu.length,  "D", setRestoreNum, setCanvasState, setDeleteFlag, zoomSetting);
      }
      else {
        window.alert("There is no that templete.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box display='flex' style={{ height: "100px", borderBottom: "solid 1px grey" }}>
        <Box style={{ padding: "2px" }} width='160px' >
          <Box onClick={() => clickLoadTempleteButton()} display='flex' justifyContent='center'>
            <img alt='frame1' src='/static/33frames/4.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
            />
          </Box>
          <Typography style={{ textAlign: "center", marginTop: "1px" }} color='textSecondary' variant='body2'>
            Load from library
          </Typography>
        </Box>
        <Box style={{ border: "solid 1px grey", width: 0, height: "80%", marginTop: "10px" }} />
        <Box>
          <Box display='flex'>
            <Box width='100px'>
              <Box display='flex' justifyContent='center'>
                <img alt='rect' src='/static/images/verticalBar.png' height="35px" width='auto' style={{ marginRight: "5px" }} className={classes.hover}
                  onClick={() => { handleInsertVerticalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum) }}
                />
                <img alt='rect' src='/static/images/horizontalBar.png' height="35px" width='auto' className={classes.hover}
                  onClick={() => { handleInsertHorizontalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum) }}
                />
              </Box>
              <Box display='flex' justifyContent='center' style={{ marginLeft: "-5px" }}>
                <Box>
                  <img alt='rect' src='/static/images/verticalTwoBars.png' height="35px" width='auto' className={classes.hover}
                    onClick={() => { handleInsertSeveralVerticalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 2) }}
                  />
                  <IconButton
                    style={{ margin: 0, padding: 0, fontWeight: 'bold', marginTop: "-35px" }}
                    ref={refV}
                    onClick={() => setMulionVerticalOpen(true)}
                  >
                    <ChevronDown width='17px' height='17px' />
                  </IconButton>
                  <Popover
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    classes={{ paper: classes.popover }}
                    anchorEl={refV.current}
                    onClose={() => setMulionVerticalOpen(false)}
                    open={mulionVerticalOpen}
                  >
                    <Button onClick={() => { setMulionVerticalOpen(false); handleInsertSeveralVerticalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 3) }}>3</Button>
                    <Button onClick={() => { setMulionVerticalOpen(false); handleInsertSeveralVerticalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 4) }}>4</Button>
                    <Button onClick={() => { setMulionVerticalOpen(false); handleInsertSeveralVerticalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 5) }}>5</Button>
                    <Button onClick={() => { setMulionVerticalOpen(false); handleInsertSeveralVerticalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 6) }}>6</Button>
                  </Popover>
                </Box>
                <Box>
                  <img alt='rect' src='/static/images/horizontalTwoBars.png' width="25px" height='35px' className={classes.hover}
                    onClick={() => { handleInsertSeveralHorizontalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 2) }}
                  />
                  <IconButton
                    style={{ margin: 0, padding: 0, fontWeight: 'bold', marginTop: "-35px" }}
                    ref={refH}
                    onClick={() => setMulionHorizontalOpen(true)}
                  >
                    <ChevronDown width='17px' height='17px' />
                  </IconButton>
                  <Popover
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    classes={{ paper: classes.popover }}
                    anchorEl={refH.current}
                    onClose={() => setMulionHorizontalOpen(false)}
                    open={mulionHorizontalOpen}
                  >
                    <Button onClick={() => { setMulionHorizontalOpen(false); handleInsertSeveralHorizontalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 3) }}>3</Button>
                    <Button onClick={() => { setMulionHorizontalOpen(false); handleInsertSeveralHorizontalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 4) }}>4</Button>
                    <Button onClick={() => { setMulionHorizontalOpen(false); handleInsertSeveralHorizontalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 5) }}>5</Button>
                    <Button onClick={() => { setMulionHorizontalOpen(false); handleInsertSeveralHorizontalBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, 6) }}>6</Button>
                  </Popover>
                </Box>
              </Box>
            </Box>
            <Box style={{ border: "solid 1px grey", width: 0, height: "60px", marginTop: "10px" }} />
            <Box display='flex' justifyContent='center' flexDirection='column' style={{ marginLeft: "5px" }}>
              <img alt='rect' src='/static/images/ThroughVerticalBar.png' height="30px" width='auto' style={{ marginRight: "5px" }} className={classes.hover}
                onClick={() => { handleInsertVerticalThroghBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum) }}
              />
              <img alt='rect' src='/static/images/ThroughHorizontalBar.png' width="30px" height='auto' className={classes.hover}
                onClick={() => { handleInsertHorizontalThroghBar(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum) }}
              />
            </Box>
          </Box>
          <Typography style={{ textAlign: "center", marginTop: "1px" }} color='textSecondary' variant='body2'>
            Mullion
          </Typography>
        </Box>
        <Box style={{ border: "solid 1px grey", width: 0, height: "80%", marginTop: "10px" }} />
        <Box>
          <Box display='flex'>
            <Box display='flex' justifyContent='center' flexDirection='column' style={{ marginLeft: "15px", marginTop: "5px" }}>
              <img alt='rect' src='/static/images/EditWindowVertical.png' width="30px" height='auto' style={{ marginRight: "5px" }} className={classes.hover}
                onClick={() => {
                  handleVerticalSplitWindows(canvas, rightMenuIndex, scale[rightMenuIndex], createria[rightMenuIndex], setCreateria, "T", setCanvasState, setRestoreNum, setDeleteFlag, zoomSetting);
                }}
              />
              <img alt='rect' src='/static/images/EditWindowHorizontal.png' width="30px" height='auto' className={classes.hover}
                onClick={() => { handleHorizontalSplitWindows(canvas, rightMenuIndex, scale[rightMenuIndex], createria[rightMenuIndex], setCreateria, "L", setCanvasState, setRestoreNum, setDeleteFlag, zoomSetting) }}
              />
            </Box>
            <Box display='flex' justifyContent='center' flexDirection='column' style={{ marginTop: "5px" }}>
              <img alt='rect' src='/static/images/EditWindowVertical.png' width="30px" height='auto' style={{ marginRight: "5px", transform: "scaleX(-1) rotate(180deg)" }} className={classes.hover}
                onClick={() => { handleVerticalSplitWindows(canvas, rightMenuIndex, scale[rightMenuIndex], createria[rightMenuIndex], setCreateria, "B", setCanvasState, setRestoreNum, setDeleteFlag, zoomSetting) }}
              />
              <img alt='rect' src='/static/images/EditWindowHorizontal.png' width="30px" height='auto' style={{ transform: "scaleX(-1)" }} className={classes.hover}
                onClick={() => { handleHorizontalSplitWindows(canvas, rightMenuIndex, scale[rightMenuIndex], createria[rightMenuIndex], setCreateria, "R", setCanvasState, setRestoreNum, setDeleteFlag, zoomSetting) }}
              />
            </Box>
          </Box>
          <Typography style={{ textAlign: "center", marginTop: "5px", marginLeft: "5px", marginRight: "5px" }} color='textSecondary' variant='body2'>
            Coupling
          </Typography>
        </Box>
        <Box style={{ border: "solid 1px grey", width: 0, height: "80%", marginTop: "10px" }} />

        {(selectedType === "33/4frame") &&
          <Box display='flex'>
            <Box>
              <img alt='frame1' src='/static/33frames/1.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'csl')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                CS - L
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/2.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'csr')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                CS - R
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/3.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'awv')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                AW - V
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/4.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vf')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - F
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/5.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vsf')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - SF
              </Typography>
            </Box>
            <Box style={{ border: "solid 1px grey", width: 0, height: "90%", marginTop: "5px", marginLeft: "5px", marginRight: "5px" }} />
            <Box>
              <img alt='frame1' src='/static/33frames/6.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vss')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - SS
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/7.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vslo')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - SLO
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/8.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vsso')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - SSO
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/9.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vssr')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - SS -R
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/10.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vslos')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - SLOS
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/11.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vslosr')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - SLOSR
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/12.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vsh')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - SH
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/13.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vsho')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - SHO
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/14.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'va')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - A
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/15.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'vao')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                V - AO
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/16.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'des')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                DES
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/17.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'deslo')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                DESLO
              </Typography>
            </Box>
          </Box>
        }
        {(selectedType === "49/16frame") &&
          <Box display='flex'>
            <Box>
              <img alt='frame1' src='/static/33frames/1.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'ccsl')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                CCS - L
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/2.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'ccsr')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                CCS - R
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/3.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'cawv')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                CAW - V
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/4.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'cvf')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                CV - F
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/5.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'cvsf')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                CV - SF
              </Typography>
            </Box>
            <Box style={{ border: "solid 1px grey", width: 0, height: "90%", marginTop: "5px", marginLeft: "5px", marginRight: "5px" }} />
            <Box>
              <img alt='frame1' src='/static/33frames/6.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'ss')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                SS
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/7.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'slo')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                SLO
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/8.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'sso')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                SSO
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/9.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'ssr')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                SS -R
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/10.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'slos')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                SLOS
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/11.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'slosr')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                SLOSR
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/12.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'sh')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                SH
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/13.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'sho')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                SHO
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/16.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'des4')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                DES4
              </Typography>
            </Box>
            <Box>
              <img alt='frame1' src='/static/33frames/17.jpg' width="50px" height='70px' className={classes.hover} style={{ margin: "5px", marginBottom: "0px" }}
                onClick={() => handleInsertCoverWindow(canvas, setCanvasState, setRestoreNum, 'deslo4')}
              />
              <Typography style={{ textAlign: "center", marginTop: "0px", marginLeft: "5px", marginRight: "5px", }} variant='body2'>
                DESLO4
              </Typography>
            </Box>
          </Box>
        }
        <Box style={{ border: "solid 1px grey", width: 0, height: "80%", marginTop: "10px", marginLeft: "10px" }} />
        <Box style={{ padding: "2px" }} width='260px'>
          <Box display='flex' justifyContent='center'>
            <Button className={classes.hover}>Shape Window</Button>
            <Button className={classes.hover}>Bay/Bow Window</Button>
            <Button className={classes.hover}>Patio door</Button>
          </Box>
          <Typography style={{ textAlign: "center", marginTop: "1px" }} color='textSecondary' variant='body2'>
            New Item
          </Typography>
        </Box>
        <Box style={{ border: "solid 1px grey", width: 0, height: "80%", marginTop: "10px" }} />
      </Box>
      <Box pl={3} display='flex' style={{ border: "solid 1px black" }}>
        {(!deleteFlag) ?
          (<IconButton size='small' className={classes.deactiveIconButton}>
            <XIcon />
          </IconButton>) :
          (
            <IconButton size='small' className={classes.activeIconButton}
              onClick={async () => {
                await handleDeleteObject(canvas, scale[rightMenuIndex], createria[rightMenuIndex], deleteFlag, setDeleteFlag, setCanvasState, setRestoreNum);
              }}>
              <XIcon />
            </IconButton>
          )
        }
        {(restoreNum <= 0) ?
          (<IconButton size='small' className={classes.deactiveIconButton}>
            <CornerUpLeft />
          </IconButton>) :
          (
            <IconButton size='small' className={classes.activeIconButton} onClick={handleBeforeCanvasState}>
              <CornerUpLeft />
            </IconButton>
          )
        }
        {(restoreNum >= canvasState.length - 1) ?
          (<IconButton size='small' className={classes.deactiveIconButton}>
            <CornerUpRight />
          </IconButton>) :
          (<IconButton size='small' className={classes.activeIconButton} onClick={handleForWardCanvasState}>
            <CornerUpRight />
          </IconButton>)
        }
        <Box style={{ border: "solid 1px black", width: 0, height: "25px", marginTop: "3px", marginLeft: "10px", marginRight: "10px" }} />
        <img alt='verticalCenter' src='/static/images/vertical_center.png' height="32px" width='auto' className={classes.hover}
          onClick={() => { verticalMiddleBarCentering(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, deleteFlag, setDeleteFlag) }}
        />
        <img alt='verticalCenter' src='/static/images/horizontal_center.png' style={{ marginTop: "2px" }} height="28px" width='32px' className={classes.hover}
          onClick={() => { horizontalMiddleBarCentering(canvas, scale[rightMenuIndex], createria[rightMenuIndex], setCanvasState, setRestoreNum, deleteFlag, setDeleteFlag) }}
        />

        {/* <IconButton style={{ backgroundColor: "lightblue", padding: "1px", borderRadius: "0px", height: "22px", marginTop: "5px" }} onClick={() => adjustAndCenterCanvasObjects(canvas)}>
          <SvgIcon >
            <OpenWithIcon />
          </SvgIcon>
        </IconButton> */}
        {/* <IconButton style={{ padding: "1px", border: "Solid 1px grey", borderRadius: "0px", height: "22px", marginTop: "5px", marginLeft: "5px" }} onClick={() => handleZoomIn(0.5)}>
          1/2x
        </IconButton>
        <IconButton style={{ padding: "1px", border: "Solid 1px grey", borderRadius: "0px", height: "22px", marginTop: "5px", marginLeft: "5px" }} onClick={() => handleZoomIn(1 / 3)}>
          1/3x
        </IconButton>
        <IconButton style={{ padding: "1px", border: "Solid 1px grey", borderRadius: "0px", height: "22px", marginTop: "5px", marginLeft: "5px" }} onClick={() => handleZoomIn(1 / 4)}>
          1/4x
        </IconButton>
        <IconButton style={{ padding: "1px", border: "Solid 1px grey", borderRadius: "0px", height: "22px", marginTop: "5px", marginLeft: "5px" }} onClick={() => handleZoomIn(2)}>
          2x
        </IconButton>
        <IconButton style={{ padding: "1px", border: "Solid 1px grey", borderRadius: "0px", height: "22px", marginTop: "5px", marginLeft: "5px" }} onClick={() => handleZoomIn(3)}>
          3x
        </IconButton>
        <IconButton style={{ padding: "1px", border: "Solid 1px grey", borderRadius: "0px", height: "22px", marginTop: "5px", marginLeft: "5px" }} onClick={() => handleZoomIn(4)}>
          4x
        </IconButton> */}
        {/* <input
        type="range"
        min="0.1"
        max="3"
        step="0.1"
        value={zoom}
        onChange={handleZoomChange}
        style={{ width: '200px' }}
      /> */}
        <Box style={{ border: "solid 1px black", width: 0, height: "25px", marginTop: "3px", marginLeft: "10px", marginRight: "10px" }} />
        <Box sx={{ width: '170px', marginTop: "5px" }}>
          <Slider
            value={zoom}
            min={0.1}
            max={3}
            step={0.1}
            onChange={handleZoomChange}
            valueLabelDisplay="auto"
            aria-labelledby="zoom-slider"
            disabled={(zoomSetting==='zoomOff')?true:false}
          />
        </Box>
        <RadioGroup
          aria-label="Options"
          name="zoomSetting"
          value={zoomSetting}
          onChange={(event) => handleZoomSetting(event)}
          className={classes.radioGroup}
        >
          <FormControlLabel
            value="zoomOn"
            control={<Radio className={(zoomSetting === "zoomOn") ? classes.selectedRadio : classes.radio} />}
            label="On"
            style={{marginLeft:"5px", marginRight:'0px'}}
            classes={{ label: classes.label }}
          />
          <FormControlLabel
            value="zoomOff"
            control={<Radio className={(zoomSetting === "zoomOff") ? classes.selectedRadio : classes.radio} />}
            label="Off"
            style={{ marginLeft: "1px" }}
            classes={{ label: classes.label }}
          />
        </RadioGroup>
        <Box style={{ border: "solid 1px black", width: 0, height: "25px", marginTop: "3px", marginLeft: "10px", marginRight: "10px" }} />
        <RadioGroup
          aria-label="Options"
          name="type"
          value={selectedType}
          onChange={(event) => handleTypeChange(event)}
          className={classes.radioGroup}
        >
          <FormControlLabel
            value="33/4frame"
            control={<Radio className={(selectedType === "33/4frame") ? classes.selectedRadio : classes.radio} />}
            label="3 &nbsp; 3/4 Frame"
            classes={{ label: classes.label }}
          />
          <FormControlLabel
            value="49/16frame"
            control={<Radio className={(selectedType === "49/16frame") ? classes.selectedRadio : classes.radio} />}
            label="4  &nbsp; 9/16 Frame"
            style={{ marginLeft: "1px" }}
            classes={{ label: classes.label }}
          />
        </RadioGroup>
        <Button style={{ border: 'solid 2px #00dcff', padding: '2px', margin: "2px", marginLeft: "15px" }} onClick={() => saveTemplete(canvas, scale[rightMenuIndex], createria[rightMenuIndex],widthList[rightMenuIndex],heightList[rightMenuIndex], selectedType)}>
          Save to library
        </Button>
      </Box>
      <Box display='flex' justifyContent='right'>
        <Box style={{ margin: "10px", paddingRight: "25px", overflowY: 'auto', overflowX: 'hidden', maxHeight: window.innerHeight - 250 }}>
          {rightMenuImg.map((item, index) => (
            <Box key={index} display='flex' justifyContent='space-between' style={{ marginLeft: "5px", marginTop: (index === 0) ? "20px" : "20px", border: (index !== rightMenuIndex) ? "solid 1px black" : "solid 2px blue" }} onClick={() => { handleCanvasMenuChange(index) }}>
              <Box>
                <Typography style={{ width: "80px", marginTop: "25px" }}>
                  {index + 1}
                </Typography>
                <Typography style={{ width: "80px" }}>
                  {widthList[index]} * {heightList[index]}
                </Typography>
                <Typography style={{ width: "80px" }}>
                  qty 1
                </Typography>
              </Box>
              <img src={item} alt="Canvas" width="200px" height="120px" />
              {/* <Typography style={{ position: "relative", left: "10px", top: "-150px" }}>
                {index + 1}
              </Typography>
              <Typography style={{ position: "relative", left: "10px", top: "-130px" }}>
                {width} * {height}
              </Typography>
              <Typography style={{ position: "relative", left: "10px", top: "-110px" }}>
                qty 1
              </Typography> */}
              {/* <Box style={{ position: "relative", left: "250px", top: "-200px" }}>
                <IconButton ref={modal2Ref} onClick={() => { setRightMenuOpen(true); }}>
                  <ChevronsRight />
                </IconButton>
              </Box> */}
              <Box width='45px' style={{ marginRight: "15px", marginTop: "30px" }}>
                <IconButton ref={modal2Ref} onClick={() => { setRightMenuOpen(true); }}>
                  <ChevronsRight />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>

        <Box>
          <canvas ref={canvasRef} width={window.innerWidth - 500} height={window.innerHeight - 250} style={{ border: "solid 1px black", marginLeft: "10px" }} />
        </Box>
        {(moment().format("YYYY-MM-DD") < created) &&
          <Box style={{ marginRight: "25px", marginLeft: "25px" }} >
            <Box style={{ marginTop: '5px' }}><img alt='verticalCenter' src='/static/leftSideImages/1.png' width='60px' height="auto" className={classes.hover} onClick={() => handleOpen(0)} /></Box>
            <Box style={{ marginTop: '5px' }}><img alt='verticalCenter' src='/static/leftSideImages/2.png' width='60px' height="auto" className={classes.hover} onClick={() => handleOpen(1)} /></Box>
            <Box style={{ marginTop: '5px' }}><img alt='verticalCenter' src='/static/leftSideImages/3.png' width='60px' height="auto" className={classes.hover} onClick={() => handleOpen(2)} /></Box>
            <Box style={{ marginTop: '5px' }}><img alt='verticalCenter' src='/static/leftSideImages/4.png' width='60px' height="auto" className={classes.hover} onClick={() => handleOpen(3)} /></Box>
            <Box style={{ marginTop: '5px' }}><img alt='verticalCenter' src='/static/leftSideImages/5.png' width='60px' height="auto" className={classes.hover} onClick={() => handleOpen(4)} /></Box>
            <Box style={{ marginTop: '5px' }}><img alt='verticalCenter' src='/static/leftSideImages/6.png' width='60px' height="auto" className={classes.hover} onClick={() => handleOpen(5)} /></Box>
          </Box>
        }
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: "50%",
          marginLeft: "25%"
        }}
      >
        <Box style={{ backgroundColor: 'white', padding: "20px", borderRadius: 2 }}>
          <Box display='flex' justifyContent='space-between'>
            <TextField
              fullWidth
              label="WIDTH"
              margin="normal"
              name="width"
              onChange={(event) => handleWidthChange(event)}
              style={{ marginRight: "10px" }}
              type="number"
              value={width}
              variant="outlined"
              error={widtherror}
              helperText={widtherror ? 'The size of width must be at least 10 and maximum 500.' : ''}
            />

            <TextField
              fullWidth
              label="HEIGHT"
              margin="normal"
              name="height"
              onChange={(event) => handleHeightChange(event)}
              style={{ marginRight: "10px" }}
              type="number"
              value={height}
              variant="outlined"
              error={heighterror}
              helperText={heighterror ? 'The size of height must be at least 10 and maximum 500.' : ''}
            />
            <TextField
              fullWidth
              label="QTY"
              margin="normal"
              name="qty"
              type="number"
              value=""
              variant="outlined"
            />
          </Box>
          <Grid container spacing={3} style={{ marginTop: "15px" }}>
            <Grid item lg={4} xs={4}>
              <Typography style={{ marginTop: "5px" }}>
                Measurement taken from
              </Typography>
            </Grid>
            <Grid item lg={2} xs={2}>
              <TextField
                select
                fullWidth
                value={measureOption}
                onChange={(event) => setMeasureOption(event.target.value)}
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}

              >
                {measurementOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Frame Comment
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                fullWidth
                value={frameComment}
                onChange={(event) => setFrameComment(event.target.value)}
                variant="outlined"
                className={classes.customSelect}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Frame Type
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Flex Color
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Exterior color
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Interior color
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Brick mould
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Brick mould color
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Jamb extension
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Casing
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Rosset
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Glass type
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Glass Thickness
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Grill Material
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Grill pattern
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                select
                fullWidth
                variant="outlined"
                className={classes.customSelect}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  },
                }}
              />
            </Grid>
            <Grid item lg={2} xs={2}>
              <Typography style={{ marginTop: "5px" }}>
                Glass Comment
              </Typography>
            </Grid>
            <Grid item lg={4} xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                className={classes.customSelect}
              />
            </Grid>
          </Grid>
          <Box display='flex' justifyContent='space-between' style={{ marginTop: "25px" }}>
            <Button variant="outlined" onClick={handleClose} style={{ marginTop: "10px" }}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={handleCreateNewOne} style={{ marginTop: "10px" }}>
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>

      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        classes={{ paper: classes.popover1 }}
        anchorEl={modal2Ref.current}
        onClose={() => { setRightMenuOpen(false) }}
        open={rightMenuOpen}
      >
        <Box style={{ backgroundColor: 'white', padding: "20px", borderRadius: 2 }}>
          <TextField
            fullWidth
            label="WIDTH"
            margin="normal"
            name="width"
            // onChange={(event) => handleWidthChange(event)}
            style={{ marginRight: "10px" }}
            type="number"
            value={width}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="HEIGHT"
            margin="normal"
            name="height"
            // onChange={(event) => handleHeightChange(event)}
            style={{ marginRight: "10px" }}
            type="number"
            value={height}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="QTY"
            margin="normal"
            name="qty"
            type="number"
            value=""
            variant="outlined"
          />
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Measurement taken from
            </Typography>
            <TextField
              select
              fullWidth
              value={measureOption}
              onChange={(event) => setMeasureOption(event.target.value)}
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            >
              {measurementOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Frame Comment
            </Typography>
            <TextField
              fullWidth
              value={frameComment}
              onChange={(event) => setFrameComment(event.target.value)}
              variant="outlined"
              className={classes.customSelect}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Frame Type
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Flex Color
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Exterior color
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Interior color
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Brick mould
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Brick mould color
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Jamb extension
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Casing
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Rosset
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Glass type
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Glass Thickness
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Grill Material
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Grill pattern
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              className={classes.customSelect}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
            />
          </Box>
          <Box display='flex'>
            <Typography style={{ marginTop: "5px" }}>
              Glass Comment
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              className={classes.customSelect}
            />
          </Box>
          <Box display='flex' justifyContent='space-between' style={{ marginTop: "25px" }}>
            <Button variant="outlined" onClick={() => { handleRightMenuDuplicate(rightMenuIndex); handleRightMenuClose(); }} style={{ marginTop: "10px", backgroundColor: "darkgreen", color: "white" }}>
              Duplicate
            </Button>
            <Button variant="outlined" onClick={() => { handleRightMenuDelete(rightMenuIndex); handleRightMenuClose(); }} style={{ marginTop: "10px", backgroundColor: "red" }}>
              Delete
            </Button>
          </Box>
          <Box display='flex' justifyContent='space-between' style={{ marginTop: "25px" }}>
            <Button variant="outlined" onClick={handleRightMenuClose} style={{ marginTop: "10px" }}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={handleRightMenuClose} style={{ marginTop: "10px" }}>
              Ok
            </Button>
          </Box>
        </Box>
      </Popover>
      <Modal
        open={templeteModalOpen}
        onClose={() => setTempleteModalOpen(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: "70%",
          height: "80%",
          marginLeft: "15%",
          marginTop: "7%",
          overflow: "scroll"
        }}
      >
        <Box style={{ backgroundColor: 'white', borderRadius: 2 }}>
          <Grid container spacing={1} style={{ marginTop: "5px" }}>
            {templetes.map((item, index) => (
              // <Grid key={index} item lg={3} xs={6}>
              <Box key={index}>
                {(selectedTypesForModal[index] === selectedTypeModal) &&
                  <Box onClick={() => (selectedIndex === index) ? setSelectedIndex("") : setSelectedIndex(index)}>
                    <img src={item} alt="Canvas" height="250px" width='350px' style={{ border: (selectedIndex === index) ? "solid 1px blue" : "none" }} />
                  </Box>
                }
              </Box>
              // </Grid>
            ))}
          </Grid>
          <Box display='flex' justifyContent='space-between' style={{ marginTop: "20px", padding: '5px' }}>
            <RadioGroup
              aria-label="Options"
              name="type"
              value={selectedTypeModal}
              onChange={(event) => handleTypeModalChange(event)}
              className={classes.radioGroup}
            >
              <FormControlLabel
                value="33/4frame"
                control={<Radio className={(selectedTypeModal === "33/4frame") ? classes.selectedRadio : classes.radio} />}
                label="3 &nbsp; 3/4 Frame"
                classes={{ label: classes.label }}
              />
              <FormControlLabel
                value="49/16frame"
                control={<Radio className={(selectedTypeModal === "49/16frame") ? classes.selectedRadio : classes.radio} />}
                label="4  &nbsp; 9/16 Frame"
                style={{ marginLeft: "1px" }}
                classes={{ label: classes.label }}
              />
            </RadioGroup>
            <Button variant="outlined" onClick={() => deleteOneTemplete(selectedIndex)} style={{ margin: "5px", border: (selectedIndex === "") ? "none" : "solid 1px blue" }}>
              Delete Selected
            </Button>
            <Button variant="outlined" onClick={() => loadOneTemplete(selectedIndex)} style={{ margin: "5px", border: (selectedIndex === "") ? "none" : "solid 1px blue" }}>
              Load
            </Button>
            <Button variant="outlined" onClick={() => setTempleteModalOpen(false)} style={{ margin: "5px" }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

Features.propTypes = {
  className: PropTypes.string
};

export default Features;
