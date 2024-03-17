
export const adjustAndCenterCanvasObjects = (canvas) => {
  let objects = canvas.getObjects();
  if (objects.length === 0) return; // Exit if no objects

  // Step 1: Calculate the bounding box that encompasses all objects
  let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
  objects.forEach((obj) => {
    let objBoundingBox = obj.getBoundingRect(true);
    minX = Math.min(minX, objBoundingBox.left);
    minY = Math.min(minY, objBoundingBox.top);
    maxX = Math.max(maxX, objBoundingBox.left + objBoundingBox.width);
    maxY = Math.max(maxY, objBoundingBox.top + objBoundingBox.height);
  });
  const boundingBox = { left: minX, top: minY, width: maxX - minX, height: maxY - minY };

  // Step 2: Determine the scale factor needed to fit this box within a 500px by 500px area
  const maxWidth = 500, maxHeight = 500;
  const scaleX = maxWidth / boundingBox.width;
  const scaleY = maxHeight / boundingBox.height;
  const scaleFactor = Math.min(scaleX, scaleY);

  // Step 3: Apply the scale factor and adjust positions to center the objects
  const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 };
  objects.forEach((obj) => {
    obj.scaleX *= scaleFactor;
    obj.scaleY *= scaleFactor;
    obj.left = (obj.left - boundingBox.left) * scaleFactor;
    obj.top = (obj.top - boundingBox.top) * scaleFactor;
    // After scaling, move each object to center them as a group
    obj.setCoords(); // This updates the object's coordinates after scaling and moving
  });

  // Recalculate bounding box of scaled objects to find new group center
  let newMinX = Infinity, newMinY = Infinity, newMaxX = 0, newMaxY = 0;
  objects.forEach((obj) => {
    const objBoundingBox = obj.getBoundingRect(true);
    newMinX = Math.min(newMinX, objBoundingBox.left);
    newMinY = Math.min(newMinY, objBoundingBox.top);
    newMaxX = Math.max(newMaxX, objBoundingBox.left + objBoundingBox.width);
    newMaxY = Math.max(newMaxY, objBoundingBox.top + objBoundingBox.height);
  });
  const newBoundingBoxCenter = {
    x: newMinX + (newMaxX - newMinX) / 2,
    y: newMinY + (newMaxY - newMinY) / 2,
  };

  // Apply offset to center all objects in the canvas
  const offsetX = canvasCenter.x - newBoundingBoxCenter.x;
  const offsetY = canvasCenter.y - newBoundingBoxCenter.y;
  objects.forEach((obj) => {
    obj.left += offsetX;
    obj.top += offsetY;
    obj.setCoords();
  });

  canvas.renderAll(); // Re-render the canvas to display changes
};