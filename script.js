// import * as THREE from "three";

// // Scene setup
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xf0f0f0);

// // Camera setup - fixed orthographic camera for 2D-like view
// const width = window.innerWidth;
// const height = window.innerHeight;
// const camera = new THREE.OrthographicCamera(
//   width / -2,
//   width / 2,
//   height / 2,
//   height / -2,
//   1,
//   1000
// );
// camera.position.set(0, 0, 50);
// camera.lookAt(0, 0, 0);

// // Renderer setup
// const renderer = new THREE.WebGLRenderer({
//   canvas: document.getElementById("canvas"),
//   antialias: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);

// // Initial variables for the cube
// let perspectiveType = "one-point";
// let vanishingPoints = {
//   vp1: { x: 300, y: 0 },
//   vp2: { x: -300, y: 0 },
//   vp3: { x: 0, y: 300 },
// };

// // // Define colors for cube faces
// // const colors = {
// //   front: 0x63a4ff, // Light blue
// //   back: 0x1976d2, // Dark blue
// //   right: 0x66bb6a, // Light green
// //   left: 0x2e7d32, // Dark green
// //   top: 0xffb74d, // Light orange
// //   bottom: 0xe65100, // Dark orange
// //   edges: 0x212121, // Almost black for edges
// //   perspectiveLines: 0x757575, // Gray for perspective lines
// // };

// const colors = {
//   front: 0xffccee, // Light pink
//   back: 0xcc6699, // Dark pink
//   edges: 0x000000, // Black for edges
//   perspectiveLines: 0x757575, // Gray for perspective lines
// };

// // Create the scene
// const cubeGroup = new THREE.Group();
// scene.add(cubeGroup);

// // Main drawing function
// function drawPerspectiveScene() {
//   // Clear previous objects
//   while (cubeGroup.children.length > 0) {
//     cubeGroup.remove(cubeGroup.children[0]);
//   }

//   // Draw based on perspective type
//   if (perspectiveType === "one-point") {
//     drawOnePointPerspective();
//   } else if (perspectiveType === "two-point") {
//     drawTwoPointPerspective();
//   } else if (perspectiveType === "three-point") {
//     drawThreePointPerspective();
//   }

//   // Draw vanishing points
//   drawVanishingPoints();
// }

// function drawVanishingPoints() {
//   // Draw VP1
//   const vp1Geometry = new THREE.CircleGeometry(10, 32);
//   const vp1Material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//   const vp1 = new THREE.Mesh(vp1Geometry, vp1Material);
//   vp1.position.set(vanishingPoints.vp1.x, vanishingPoints.vp1.y, 0);
//   cubeGroup.add(vp1);

//   // Draw VP2 (if needed)
//   if (perspectiveType === "two-point" || perspectiveType === "three-point") {
//     const vp2Geometry = new THREE.CircleGeometry(10, 32);
//     const vp2Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const vp2 = new THREE.Mesh(vp2Geometry, vp2Material);
//     vp2.position.set(vanishingPoints.vp2.x, vanishingPoints.vp2.y, 0);
//     cubeGroup.add(vp2);
//   }

//   // Draw VP3 (if needed)
//   if (perspectiveType === "three-point") {
//     const vp3Geometry = new THREE.CircleGeometry(10, 32);
//     const vp3Material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
//     const vp3 = new THREE.Mesh(vp3Geometry, vp3Material);
//     vp3.position.set(vanishingPoints.vp3.x, vanishingPoints.vp3.y, 0);
//     cubeGroup.add(vp3);
//   }
// }

// function drawOnePointPerspective() {
//   // Define cube parameters
//   const frontFaceWidth = 150;
//   const frontFaceHeight = 150;
//   const centerX = 0;
//   const centerY = 0;

//   // Calculate front face corners
//   const frontTopLeft = {
//     x: centerX - frontFaceWidth / 2,
//     y: centerY - frontFaceHeight / 2,
//   };
//   const frontTopRight = {
//     x: centerX + frontFaceWidth / 2,
//     y: centerY - frontFaceHeight / 2,
//   };
//   const frontBottomRight = {
//     x: centerX + frontFaceWidth / 2,
//     y: centerY + frontFaceHeight / 2,
//   };
//   const frontBottomLeft = {
//     x: centerX - frontFaceWidth / 2,
//     y: centerY + frontFaceHeight / 2,
//   };

//   // Calculate how far back lines should go (between front face and vanishing point)
//   const vpX = vanishingPoints.vp1.x;
//   const vpY = vanishingPoints.vp1.y;

//   // Calculate back face corners based on lines from front corners to vanishing point
//   // We'll use a scaling factor to determine where to stop
//   const scaleFactor = 0.5;

//   // Calculate direction vectors from corners to vanishing point
//   const dirTopLeft = {
//     x: vpX - frontTopLeft.x,
//     y: vpY - frontTopLeft.y,
//   };
//   const dirTopRight = {
//     x: vpX - frontTopRight.x,
//     y: vpY - frontTopRight.y,
//   };
//   const dirBottomRight = {
//     x: vpX - frontBottomRight.x,
//     y: vpY - frontBottomRight.y,
//   };
//   const dirBottomLeft = {
//     x: vpX - frontBottomLeft.x,
//     y: vpY - frontBottomLeft.y,
//   };

//   // Calculate back corners
//   const backTopLeft = {
//     x: frontTopLeft.x + dirTopLeft.x * scaleFactor,
//     y: frontTopLeft.y + dirTopLeft.y * scaleFactor,
//   };
//   const backTopRight = {
//     x: frontTopRight.x + dirTopRight.x * scaleFactor,
//     y: frontTopRight.y + dirTopRight.y * scaleFactor,
//   };
//   const backBottomRight = {
//     x: frontBottomRight.x + dirBottomRight.x * scaleFactor,
//     y: frontBottomRight.y + dirBottomRight.y * scaleFactor,
//   };
//   const backBottomLeft = {
//     x: frontBottomLeft.x + dirBottomLeft.x * scaleFactor,
//     y: frontBottomLeft.y + dirBottomLeft.y * scaleFactor,
//   };

//   // Draw colored faces
//   // Front face (light blue)
//   drawColoredFace(
//     [frontTopLeft, frontTopRight, frontBottomRight, frontBottomLeft],
//     colors.front,
//     -1 // Z-index to make front face appear in front
//   );

//   // Back face (dark pink)
//   drawColoredFace(
//     [backTopLeft, backTopRight, backBottomRight, backBottomLeft],
//     colors.back,
//     -5
//   );

//   // Right face (light or dark pink depending on visibility)
//   drawColoredFace(
//     [frontTopRight, backTopRight, backBottomRight, frontBottomRight],
//     colors.front,
//     -2
//   );

//   // Left face (light or dark pink depending on visibility)
//   drawColoredFace(
//     [frontTopLeft, backTopLeft, backBottomLeft, frontBottomLeft],
//     colors.back,
//     -3
//   );

//   // Top face (light or dark pink depending on visibility)
//   drawColoredFace(
//     [frontTopLeft, frontTopRight, backTopRight, backTopLeft],
//     colors.front,
//     -2
//   );

//   // Bottom face (light or dark pink depending on visibility)
//   drawColoredFace(
//     [frontBottomLeft, frontBottomRight, backBottomRight, backBottomLeft],
//     colors.back,
//     -3
//   );

//   // Draw edges
//   // Front face
//   drawLine(frontTopLeft, frontTopRight, colors.edges);
//   drawLine(frontTopRight, frontBottomRight, colors.edges);
//   drawLine(frontBottomRight, frontBottomLeft, colors.edges);
//   drawLine(frontBottomLeft, frontTopLeft, colors.edges);

//   // Back face
//   drawLine(backTopLeft, backTopRight, colors.edges);
//   drawLine(backTopRight, backBottomRight, colors.edges);
//   drawLine(backBottomRight, backBottomLeft, colors.edges);
//   drawLine(backBottomLeft, backTopLeft, colors.edges);

//   // Connecting edges
//   drawLine(frontTopLeft, backTopLeft, colors.edges);
//   drawLine(frontTopRight, backTopRight, colors.edges);
//   drawLine(frontBottomRight, backBottomRight, colors.edges);
//   drawLine(frontBottomLeft, backBottomLeft, colors.edges);

//   // Draw perspective lines to vanishing point
//   drawDashedLine(frontTopLeft, { x: vpX, y: vpY }, colors.perspectiveLines);
//   drawDashedLine(frontTopRight, { x: vpX, y: vpY }, colors.perspectiveLines);
//   drawDashedLine(frontBottomRight, { x: vpX, y: vpY }, colors.perspectiveLines);
//   drawDashedLine(frontBottomLeft, { x: vpX, y: vpY }, colors.perspectiveLines);
// }

// function drawTwoPointPerspective() {
//   // In two-point, the front vertical edge is centered
//   const centerY = 0;
//   const centerX = 0;
//   const height = 150;
//   const width = 150; // Making sure we have equal dimensions for a cube

//   // Define vertical edge positions
//   const topMiddle = { x: centerX, y: centerY - height / 2 };
//   const bottomMiddle = { x: centerX, y: centerY + height / 2 };

//   // Get vanishing points
//   const vp1X = vanishingPoints.vp1.x;
//   const vp1Y = vanishingPoints.vp1.y;
//   const vp2X = vanishingPoints.vp2.x;
//   const vp2Y = vanishingPoints.vp2.y;

//   // Calculate how far lines should go towards each vanishing point
//   const scaleFactor = 0.25;

//   // Calculate direction vectors
//   const dirTopToVP1 = {
//     x: vp1X - topMiddle.x,
//     y: vp1Y - topMiddle.y,
//   };
//   const dirTopToVP2 = {
//     x: vp2X - topMiddle.x,
//     y: vp2Y - topMiddle.y,
//   };
//   const dirBottomToVP1 = {
//     x: vp1X - bottomMiddle.x,
//     y: vp1Y - bottomMiddle.y,
//   };
//   const dirBottomToVP2 = {
//     x: vp2X - bottomMiddle.x,
//     y: vp2Y - bottomMiddle.y,
//   };

//   // Calculate corner positions
//   const topRight = {
//     x: topMiddle.x + dirTopToVP1.x * scaleFactor,
//     y: topMiddle.y + dirTopToVP1.y * scaleFactor,
//   };
//   const topLeft = {
//     x: topMiddle.x + dirTopToVP2.x * scaleFactor,
//     y: topMiddle.y + dirTopToVP2.y * scaleFactor,
//   };
//   const bottomRight = {
//     x: bottomMiddle.x + dirBottomToVP1.x * scaleFactor,
//     y: bottomMiddle.y + dirBottomToVP1.y * scaleFactor,
//   };
//   const bottomLeft = {
//     x: bottomMiddle.x + dirBottomToVP2.x * scaleFactor,
//     y: bottomMiddle.y + dirBottomToVP2.y * scaleFactor,
//   };

//   // Calculate back corners
//   const scaleFactor2 = 0.25;
//   const backTopRight = {
//     x: topRight.x + dirTopToVP2.x * scaleFactor2,
//     y: topRight.y + dirTopToVP2.y * scaleFactor2,
//   };
//   const backTopLeft = {
//     x: topLeft.x + dirTopToVP1.x * scaleFactor2,
//     y: topLeft.y + dirTopToVP1.y * scaleFactor2,
//   };
//   const backBottomRight = {
//     x: bottomRight.x + dirBottomToVP2.x * scaleFactor2,
//     y: bottomRight.y + dirBottomToVP2.y * scaleFactor2,
//   };
//   const backBottomLeft = {
//     x: bottomLeft.x + dirBottomToVP1.x * scaleFactor2,
//     y: bottomLeft.y + dirBottomToVP1.y * scaleFactor2,
//   };

//   // Draw colored faces
//   // Front face vertical plane (light blue)
//   drawColoredFace(
//     [topMiddle, bottomMiddle, bottomLeft, topLeft],
//     colors.front,
//     -1
//   );

//   // Front face right plane (light green)
//   drawColoredFace(
//     [topMiddle, topRight, bottomRight, bottomMiddle],
//     colors.front,
//     -1
//   );

//   // Back face (dark blue)
//   drawColoredFace(
//     [backTopRight, backTopLeft, backBottomLeft, backBottomRight],
//     colors.back,
//     -3
//   );

//   // Right side face (darker green)
//   drawColoredFace(
//     [topRight, backTopRight, backBottomRight, bottomRight],
//     colors.back,
//     -2
//   );

//   // Left side face (dark green)
//   drawColoredFace(
//     [topLeft, backTopLeft, backBottomLeft, bottomLeft],
//     colors.left,
//     -2
//   );

//   // Top face (light orange)
//   drawColoredFace(
//     [topMiddle, topRight, backTopRight, backTopLeft, topLeft],
//     colors.front,
//     -2
//   );

//   // Bottom face (dark orange)
//   drawColoredFace(
//     [bottomMiddle, bottomRight, backBottomRight, backBottomLeft, bottomLeft],
//     colors.back,
//     -2
//   );

//   // Draw edges
//   // Front edges
//   drawLine(topMiddle, bottomMiddle, colors.edges);
//   drawLine(topMiddle, topRight, colors.edges);
//   drawLine(topMiddle, topLeft, colors.edges);
//   drawLine(bottomMiddle, bottomRight, colors.edges);
//   drawLine(bottomMiddle, bottomLeft, colors.edges);
//   drawLine(topRight, bottomRight, colors.edges);
//   drawLine(topLeft, bottomLeft, colors.edges);

//   // Back edges
//   drawLine(backTopRight, backBottomRight, colors.edges);
//   drawLine(backTopLeft, backBottomLeft, colors.edges);
//   drawLine(backTopRight, backTopLeft, colors.edges);
//   drawLine(backBottomRight, backBottomLeft, colors.edges);

//   // Connecting edges
//   drawLine(topRight, backTopRight, colors.edges);
//   drawLine(topLeft, backTopLeft, colors.edges);
//   drawLine(bottomRight, backBottomRight, colors.edges);
//   drawLine(bottomLeft, backBottomLeft, colors.edges);

//   // Draw perspective lines
//   drawDashedLine(topMiddle, { x: vp1X, y: vp1Y }, colors.perspectiveLines);
//   drawDashedLine(bottomMiddle, { x: vp1X, y: vp1Y }, colors.perspectiveLines);
//   drawDashedLine(topRight, { x: vp1X, y: vp1Y }, colors.perspectiveLines);
//   drawDashedLine(bottomRight, { x: vp1X, y: vp1Y }, colors.perspectiveLines);

//   drawDashedLine(topMiddle, { x: vp2X, y: vp2Y }, colors.perspectiveLines);
//   drawDashedLine(bottomMiddle, { x: vp2X, y: vp2Y }, colors.perspectiveLines);
//   drawDashedLine(topLeft, { x: vp2X, y: vp2Y }, colors.perspectiveLines);
//   drawDashedLine(bottomLeft, { x: vp2X, y: vp2Y }, colors.perspectiveLines);
// }

// function drawThreePointPerspective() {
//   // In three-point, we'll have three vanishing points
//   const size = 100;
//   const centerX = 0;
//   const centerY = 0;

//   // Get vanishing points
//   const vp1X = vanishingPoints.vp1.x;
//   const vp1Y = vanishingPoints.vp1.y;
//   const vp2X = vanishingPoints.vp2.x;
//   const vp2Y = vanishingPoints.vp2.y;
//   const vp3X = vanishingPoints.vp3.x;
//   const vp3Y = vanishingPoints.vp3.y;

//   // Define initial central point
//   const center = { x: centerX, y: centerY };

//   // Calculate direction vectors to each vanishing point
//   const dirToVP1 = { x: vp1X - center.x, y: vp1Y - center.y };
//   const dirToVP2 = { x: vp2X - center.x, y: vp2Y - center.y };
//   const dirToVP3 = { x: vp3X - center.x, y: vp3Y - center.y };

//   // Scaling factors for drawing edges
//   const scaleFactor1 = 0.3;
//   const scaleFactor2 = 0.3;
//   const scaleFactor3 = 0.3;

//   // Calculate edge endpoints
//   const edge1 = {
//     x: center.x + dirToVP1.x * scaleFactor1,
//     y: center.y + dirToVP1.y * scaleFactor1,
//   };

//   const edge2 = {
//     x: center.x + dirToVP2.x * scaleFactor2,
//     y: center.y + dirToVP2.y * scaleFactor2,
//   };

//   const edge3 = {
//     x: center.x + dirToVP3.x * scaleFactor3,
//     y: center.y + dirToVP3.y * scaleFactor3,
//   };

//   // Calculate more corners
//   const corner12 = calculateCorner(edge1, vp3X, vp3Y, edge2, vp3X, vp3Y);
//   const corner23 = calculateCorner(edge2, vp1X, vp1Y, edge3, vp1X, vp1Y);
//   const corner31 = calculateCorner(edge3, vp2X, vp2Y, edge1, vp2X, vp2Y);

//   const farCorner = calculateCorner(corner12, vp1X, vp1Y, corner23, vp2X, vp2Y);

//   // Draw colored faces
//   // Front face (center to edges 1, 2, 3) - light blue
//   drawColoredFace([center, edge1, corner12, edge2], colors.front, -1);
//   drawColoredFace([center, edge2, corner23, edge3], colors.front, -1);
//   drawColoredFace([center, edge3, corner31, edge1], colors.front, -1);

//   // Far faces - darker colors
//   drawColoredFace([edge1, corner12, farCorner, corner31], colors.right, -2);
//   drawColoredFace([edge2, corner23, farCorner, corner12], colors.left, -2);
//   drawColoredFace([edge3, corner31, farCorner, corner23], colors.top, -2);

//   // Now draw all lines
//   drawLine(center, edge1, colors.edges);
//   drawLine(center, edge2, colors.edges);
//   drawLine(center, edge3, colors.edges);

//   drawLine(edge1, corner12, colors.edges);
//   drawLine(edge1, corner31, colors.edges);
//   drawLine(edge2, corner12, colors.edges);
//   drawLine(edge2, corner23, colors.edges);
//   drawLine(edge3, corner23, colors.edges);
//   drawLine(edge3, corner31, colors.edges);

//   drawLine(corner12, farCorner, colors.edges);
//   drawLine(corner23, farCorner, colors.edges);
//   drawLine(corner31, farCorner, colors.edges);

//   // Draw perspective lines
//   drawDashedLine(center, { x: vp1X, y: vp1Y }, colors.perspectiveLines);
//   drawDashedLine(edge2, { x: vp1X, y: vp1Y }, colors.perspectiveLines);
//   drawDashedLine(edge3, { x: vp1X, y: vp1Y }, colors.perspectiveLines);
//   drawDashedLine(corner23, { x: vp1X, y: vp1Y }, colors.perspectiveLines);

//   drawDashedLine(center, { x: vp2X, y: vp2Y }, colors.perspectiveLines);
//   drawDashedLine(edge1, { x: vp2X, y: vp2Y }, colors.perspectiveLines);
//   drawDashedLine(edge3, { x: vp2X, y: vp2Y }, colors.perspectiveLines);
//   drawDashedLine(corner31, { x: vp2X, y: vp2Y }, colors.perspectiveLines);

//   drawDashedLine(center, { x: vp3X, y: vp3Y }, colors.perspectiveLines);
//   drawDashedLine(edge1, { x: vp3X, y: vp3Y }, colors.perspectiveLines);
//   drawDashedLine(edge2, { x: vp3X, y: vp3Y }, colors.perspectiveLines);
//   drawDashedLine(corner12, { x: vp3X, y: vp3Y }, colors.perspectiveLines);
// }

// // Helper function to draw a colored face from points
// function drawColoredFace(points, color, zOrder = 0) {
//   const shape = new THREE.Shape();

//   shape.moveTo(points[0].x, points[0].y);
//   for (let i = 1; i < points.length; i++) {
//     shape.lineTo(points[i].x, points[i].y);
//   }
//   shape.lineTo(points[0].x, points[0].y);

//   const geometry = new THREE.ShapeGeometry(shape);
//   const material = new THREE.MeshBasicMaterial({
//     color: color,
//     transparent: true,
//     opacity: 0.8,
//     side: THREE.DoubleSide,
//   });

//   const face = new THREE.Mesh(geometry, material);
//   face.position.z = zOrder; // Set z-order for proper layering
//   cubeGroup.add(face);
// }

// // Helper function to calculate corner points
// function calculateCorner(point1, vp1X, vp1Y, point2, vp2X, vp2Y) {
//   // Calculate slopes
//   const m1 = (vp1Y - point1.y) / (vp1X - point1.x);
//   const m2 = (vp2Y - point2.y) / (vp2X - point2.x);

//   // Calculate y-intercepts
//   const b1 = point1.y - m1 * point1.x;
//   const b2 = point2.y - m2 * point2.x;

//   // Calculate intersection
//   const x = (b2 - b1) / (m1 - m2);
//   const y = m1 * x + b1;

//   return { x, y };
// }

// function drawLine(p1, p2, color = 0x000000) {
//   const material = new THREE.LineBasicMaterial({
//     color: color,
//     linewidth: 2,
//   });
//   const geometry = new THREE.BufferGeometry().setFromPoints([
//     new THREE.Vector3(p1.x, p1.y, 0),
//     new THREE.Vector3(p2.x, p2.y, 0),
//   ]);
//   const line = new THREE.Line(geometry, material);
//   cubeGroup.add(line);
// }

// function drawDashedLine(p1, p2, color = 0x777777) {
//   const material = new THREE.LineDashedMaterial({
//     color: color,
//     dashSize: 5,
//     gapSize: 5,
//     linewidth: 1,
//   });
//   const geometry = new THREE.BufferGeometry().setFromPoints([
//     new THREE.Vector3(p1.x, p1.y, 0),
//     new THREE.Vector3(p2.x, p2.y, 0),
//   ]);
//   const line = new THREE.Line(geometry, material);
//   line.computeLineDistances(); // Required for dashed lines
//   cubeGroup.add(line);
// }

// // Handle window resize
// window.addEventListener("resize", () => {
//   const width = window.innerWidth;
//   const height = window.innerHeight;

//   camera.left = width / -2;
//   camera.right = width / 2;
//   camera.top = height / 2;
//   camera.bottom = height / -2;
//   camera.updateProjectionMatrix();

//   renderer.setSize(width, height);
// });

// // Slider event handlers
// document.getElementById("vp1-x").addEventListener("input", (e) => {
//   vanishingPoints.vp1.x = parseInt(e.target.value);
//   document.getElementById("vp1-x-value").textContent = e.target.value;
//   drawPerspectiveScene();
// });

// document.getElementById("vp1-y").addEventListener("input", (e) => {
//   vanishingPoints.vp1.y = parseInt(e.target.value);
//   document.getElementById("vp1-y-value").textContent = e.target.value;
//   drawPerspectiveScene();
// });

// document.getElementById("vp2-x").addEventListener("input", (e) => {
//   vanishingPoints.vp2.x = parseInt(e.target.value);
//   document.getElementById("vp2-x-value").textContent = e.target.value;
//   drawPerspectiveScene();
// });

// document.getElementById("vp2-y").addEventListener("input", (e) => {
//   vanishingPoints.vp2.y = parseInt(e.target.value);
//   document.getElementById("vp2-y-value").textContent = e.target.value;
//   drawPerspectiveScene();
// });

// document.getElementById("vp3-x").addEventListener("input", (e) => {
//   vanishingPoints.vp3.x = parseInt(e.target.value);
//   document.getElementById("vp3-x-value").textContent = e.target.value;
//   drawPerspectiveScene();
// });

// document.getElementById("vp3-y").addEventListener("input", (e) => {
//   vanishingPoints.vp3.y = parseInt(e.target.value);
//   document.getElementById("vp3-y-value").textContent = e.target.value;
//   drawPerspectiveScene();
// });

// // Button handlers
// document.getElementById("one-point").addEventListener("click", () => {
//   perspectiveType = "one-point";
//   updatePerspectiveButtons();
//   document.getElementById("vp2-controls").style.display = "none";
//   document.getElementById("vp2-controls-y").style.display = "none";
//   document.getElementById("vp3-controls").style.display = "none";
//   document.getElementById("vp3-controls-y").style.display = "none";
//   drawPerspectiveScene();
// });

// document.getElementById("two-point").addEventListener("click", () => {
//   perspectiveType = "two-point";
//   updatePerspectiveButtons();
//   document.getElementById("vp2-controls").style.display = "block";
//   document.getElementById("vp2-controls-y").style.display = "block";
//   document.getElementById("vp3-controls").style.display = "none";
//   document.getElementById("vp3-controls-y").style.display = "none";
//   drawPerspectiveScene();
// });

// document.getElementById("three-point").addEventListener("click", () => {
//   perspectiveType = "three-point";
//   updatePerspectiveButtons();
//   document.getElementById("vp2-controls").style.display = "block";
//   document.getElementById("vp2-controls-y").style.display = "block";
//   document.getElementById("vp3-controls").style.display = "block";
//   document.getElementById("vp3-controls-y").style.display = "block";
//   drawPerspectiveScene();
// });

// document.getElementById("reset-vps").addEventListener("click", () => {
//   vanishingPoints = {
//     vp1: { x: 300, y: 0 },
//     vp2: { x: -300, y: 0 },
//     vp3: { x: 0, y: 300 },
//   };

//   document.getElementById("vp1-x").value = 300;
//   document.getElementById("vp1-y").value = 0;
//   document.getElementById("vp2-x").value = -300;
//   document.getElementById("vp2-y").value = 0;
//   document.getElementById("vp3-x").value = 0;
//   document.getElementById("vp3-y").value = 300;

//   document.getElementById("vp1-x-value").textContent = "300";
//   document.getElementById("vp1-y-value").textContent = "0";
//   document.getElementById("vp2-x-value").textContent = "-300";
//   document.getElementById("vp2-y-value").textContent = "0";
//   document.getElementById("vp3-x-value").textContent = "0";
//   document.getElementById("vp3-y-value").textContent = "300";

//   drawPerspectiveScene();
// });

// function updatePerspectiveButtons() {
//   document.getElementById("one-point").classList.remove("active-button");
//   document.getElementById("two-point").classList.remove("active-button");
//   document.getElementById("three-point").classList.remove("active-button");

//   document.getElementById(perspectiveType).classList.add("active-button");
// }

// // Draw initial scene
// drawPerspectiveScene();

// // Animation loop
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();

import * as THREE from "three";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5); // Lighter background

// Camera setup - fixed orthographic camera for 2D-like view
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000
);
camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);

// Renderer setup
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Initial variables for the objects
let perspectiveType = "one-point";
let vanishingPoints = {
  vp1: { x: 300, y: 0 },
  vp2: { x: -300, y: 0 },
  vp3: { x: 0, y: 300 },
};

// Updated color scheme
const colors = {
  // Cube colors
  cubeFront: 0x6a4c93, // Purple
  cubeBack: 0x301934,
  cubeEdges: 0x1a1a2e, // Dark blue

  // Torus colors
  torusFront: 0xff595e, // Red
  torusBack: 0xf9c74f, // Yellow
  torusEdges: 0x1a1a2e, // Dark blue

  // Cone colors
  coneFront: 0x00b4d8, // Cyan
  coneBack: 0x06d6a0, // Teal
  coneEdges: 0x1a1a2e, // Dark blue

  // Perspective lines
  perspectiveLines: 0x757575, // Gray
};
// const selectedShape = document.getElementById("shape-select").value;
// console.log(selectedShape);

const selected = document.getElementById("shape-select");
let selectedShape = "cube";

selected.addEventListener("change", function () {
  selectedShape = selected.value;
  console.log("Selected shape:", selectedShape);
});

// Create the scene groups
const cubeGroup = new THREE.Group();
const torusGroup = new THREE.Group();
const coneGroup = new THREE.Group();
scene.add(cubeGroup, torusGroup, coneGroup);

// Main drawing function
function drawPerspectiveScene() {
  // Clear previous objects
  while (cubeGroup.children.length > 0) {
    cubeGroup.remove(cubeGroup.children[0]);
  }
  while (torusGroup.children.length > 0) {
    torusGroup.remove(torusGroup.children[0]);
  }
  while (coneGroup.children.length > 0) {
    coneGroup.remove(coneGroup.children[0]);
  }

  // Draw based on perspective type
  if (perspectiveType === "one-point") {
    drawOnePointPerspective();
  } else if (perspectiveType === "two-point") {
    drawTwoPointPerspective();
  } else if (perspectiveType === "three-point") {
    drawThreePointPerspective();
  }

  // Draw vanishing points
  drawVanishingPoints();
}

function drawVanishingPoints() {
  // Draw VP1
  const vp1Geometry = new THREE.CircleGeometry(10, 32);
  const vp1Material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const vp1 = new THREE.Mesh(vp1Geometry, vp1Material);
  vp1.position.set(vanishingPoints.vp1.x, vanishingPoints.vp1.y, 0);
  cubeGroup.add(vp1);

  // Draw VP2 (if needed)
  if (perspectiveType === "two-point" || perspectiveType === "three-point") {
    const vp2Geometry = new THREE.CircleGeometry(10, 32);
    const vp2Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const vp2 = new THREE.Mesh(vp2Geometry, vp2Material);
    vp2.position.set(vanishingPoints.vp2.x, vanishingPoints.vp2.y, 0);
    cubeGroup.add(vp2);
  }

  // Draw VP3 (if needed)
  if (perspectiveType === "three-point") {
    const vp3Geometry = new THREE.CircleGeometry(10, 32);
    const vp3Material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const vp3 = new THREE.Mesh(vp3Geometry, vp3Material);
    vp3.position.set(vanishingPoints.vp3.x, vanishingPoints.vp3.y, 0);
    cubeGroup.add(vp3);
  }
}

function drawOnePointPerspective() {
  console.log(selectedShape);

  switch (selectedShape) {
    case "cube":
      // ========== CUBE ==========
      // Define cube parameters
      const frontFaceWidth = 150;
      const frontFaceHeight = 150;
      const centerX = 0;
      const centerY = 0;

      // Calculate front face corners
      const frontTopLeft = {
        x: centerX - frontFaceWidth / 2,
        y: centerY - frontFaceHeight / 2,
      };
      const frontTopRight = {
        x: centerX + frontFaceWidth / 2,
        y: centerY - frontFaceHeight / 2,
      };
      const frontBottomRight = {
        x: centerX + frontFaceWidth / 2,
        y: centerY + frontFaceHeight / 2,
      };
      const frontBottomLeft = {
        x: centerX - frontFaceWidth / 2,
        y: centerY + frontFaceHeight / 2,
      };

      // Calculate how far back lines should go
      const vpX = vanishingPoints.vp1.x;
      const vpY = vanishingPoints.vp1.y;
      const scaleFactor = 0.5;

      // Calculate direction vectors from corners to vanishing point
      const dirTopLeft = {
        x: vpX - frontTopLeft.x,
        y: vpY - frontTopLeft.y,
      };
      const dirTopRight = {
        x: vpX - frontTopRight.x,
        y: vpY - frontTopRight.y,
      };
      const dirBottomRight = {
        x: vpX - frontBottomRight.x,
        y: vpY - frontBottomRight.y,
      };
      const dirBottomLeft = {
        x: vpX - frontBottomLeft.x,
        y: vpY - frontBottomLeft.y,
      };

      // Calculate back corners
      const backTopLeft = {
        x: frontTopLeft.x + dirTopLeft.x * scaleFactor,
        y: frontTopLeft.y + dirTopLeft.y * scaleFactor,
      };
      const backTopRight = {
        x: frontTopRight.x + dirTopRight.x * scaleFactor,
        y: frontTopRight.y + dirTopRight.y * scaleFactor,
      };
      const backBottomRight = {
        x: frontBottomRight.x + dirBottomRight.x * scaleFactor,
        y: frontBottomRight.y + dirBottomRight.y * scaleFactor,
      };
      const backBottomLeft = {
        x: frontBottomLeft.x + dirBottomLeft.x * scaleFactor,
        y: frontBottomLeft.y + dirBottomLeft.y * scaleFactor,
      };

      // Draw cube colored faces
      // Front face
      drawColoredFace(
        [frontTopLeft, frontTopRight, frontBottomRight, frontBottomLeft],
        colors.cubeFront,
        -1,
        cubeGroup
      );

      // Back face
      drawColoredFace(
        [backTopLeft, backTopRight, backBottomRight, backBottomLeft],
        colors.cubeBack,
        -5,
        cubeGroup
      );

      // Side faces
      drawColoredFace(
        [frontTopRight, backTopRight, backBottomRight, frontBottomRight],
        colors.cubeFront,
        -2,
        cubeGroup
      );
      drawColoredFace(
        [frontTopLeft, backTopLeft, backBottomLeft, frontBottomLeft],
        colors.cubeBack,
        -3,
        cubeGroup
      );
      drawColoredFace(
        [frontTopLeft, frontTopRight, backTopRight, backTopLeft],
        colors.cubeFront,
        -2,
        cubeGroup
      );
      drawColoredFace(
        [frontBottomLeft, frontBottomRight, backBottomRight, backBottomLeft],
        colors.cubeBack,
        -3,
        cubeGroup
      );

      // Draw cube edges
      // Front face
      drawLine(frontTopLeft, frontTopRight, colors.cubeEdges, cubeGroup);
      drawLine(frontTopRight, frontBottomRight, colors.cubeEdges, cubeGroup);
      drawLine(frontBottomRight, frontBottomLeft, colors.cubeEdges, cubeGroup);
      drawLine(frontBottomLeft, frontTopLeft, colors.cubeEdges, cubeGroup);

      // Back face
      drawLine(backTopLeft, backTopRight, colors.cubeEdges, cubeGroup);
      drawLine(backTopRight, backBottomRight, colors.cubeEdges, cubeGroup);
      drawLine(backBottomRight, backBottomLeft, colors.cubeEdges, cubeGroup);
      drawLine(backBottomLeft, backTopLeft, colors.cubeEdges, cubeGroup);

      // Connecting edges
      drawLine(frontTopLeft, backTopLeft, colors.cubeEdges, cubeGroup);
      drawLine(frontTopRight, backTopRight, colors.cubeEdges, cubeGroup);
      drawLine(frontBottomRight, backBottomRight, colors.cubeEdges, cubeGroup);
      drawLine(frontBottomLeft, backBottomLeft, colors.cubeEdges, cubeGroup);

      // Draw cube perspective lines
      drawDashedLine(
        frontTopLeft,
        { x: vpX, y: vpY },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        frontTopRight,
        { x: vpX, y: vpY },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        frontBottomRight,
        { x: vpX, y: vpY },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        frontBottomLeft,
        { x: vpX, y: vpY },
        colors.perspectiveLines,
        cubeGroup
      );

      break;

    case "torus":
      // ========== TORUS ==========
      // Draw torus as a 2D representation (two concentric rings with perspective)
      const torusPosition = { x: -200, y: -150 };
      const outerRadius = 60;
      const innerRadius = 30;

      // Draw front face of torus (two concentric circles)
      const torusFrontOuter = generateCirclePoints(
        torusPosition.x,
        torusPosition.y,
        outerRadius,
        16
      );
      const torusFrontInner = generateCirclePoints(
        torusPosition.x,
        torusPosition.y,
        innerRadius,
        16
      );

      // Calculate vanishing point directions for torus
      const torusScaleFactor = 0.4;
      const torusVpDir = {
        x: vpX - torusPosition.x,
        y: vpY - torusPosition.y,
      };

      // Calculate back face position
      const torusBackPosition = {
        x: torusPosition.x + torusVpDir.x * torusScaleFactor,
        y: torusPosition.y + torusVpDir.y * torusScaleFactor,
      };

      // Generate back circles
      const torusBackOuter = generateCirclePoints(
        torusBackPosition.x,
        torusBackPosition.y,
        outerRadius * 0.8,
        16
      );
      const torusBackInner = generateCirclePoints(
        torusBackPosition.x,
        torusBackPosition.y,
        innerRadius * 0.8,
        16
      );

      // Draw front and back surfaces
      drawColoredCircle(
        torusPosition.x,
        torusPosition.y,
        outerRadius,
        colors.torusFront,
        -1,
        torusGroup
      );
      drawColoredCircle(
        torusPosition.x,
        torusPosition.y,
        innerRadius,
        colors.torusBack,
        -0.5,
        torusGroup
      );
      drawColoredCircle(
        torusBackPosition.x,
        torusBackPosition.y,
        outerRadius * 0.8,
        colors.torusBack,
        -3,
        torusGroup
      );
      drawColoredCircle(
        torusBackPosition.x,
        torusBackPosition.y,
        innerRadius * 0.8,
        colors.torusFront,
        -2.5,
        torusGroup
      );

      // Draw edges
      for (let i = 0; i < torusFrontOuter.length; i++) {
        const next = (i + 1) % torusFrontOuter.length;
        // Outer ring edges
        drawLine(
          torusFrontOuter[i],
          torusFrontOuter[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusBackOuter[i],
          torusBackOuter[next],
          colors.torusEdges,
          torusGroup
        );

        // Inner ring edges
        drawLine(
          torusFrontInner[i],
          torusFrontInner[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusBackInner[i],
          torusBackInner[next],
          colors.torusEdges,
          torusGroup
        );

        // Connecting edges (selected points to avoid clutter)
        if (i % 4 === 0) {
          drawLine(
            torusFrontOuter[i],
            torusBackOuter[i],
            colors.torusEdges,
            torusGroup
          );
          drawLine(
            torusFrontInner[i],
            torusBackInner[i],
            colors.torusEdges,
            torusGroup
          );

          // Perspective lines
          drawDashedLine(
            torusFrontOuter[i],
            { x: vpX, y: vpY },
            colors.perspectiveLines,
            torusGroup
          );
          drawDashedLine(
            torusFrontInner[i],
            { x: vpX, y: vpY },
            colors.perspectiveLines,
            torusGroup
          );
        }
      }
      break;

    case "cone":
      // ========== CONE ==========
      // Draw cone
      const conePosition = { x: 200, y: -150 };
      const coneBaseRadius = 50;
      const coneHeight = 100;

      // Base center and apex
      const coneBase = {
        x: conePosition.x,
        y: conePosition.y + coneHeight / 2,
      };
      const coneApex = {
        x: conePosition.x,
        y: conePosition.y - coneHeight / 2,
      };

      // Generate points for the base circle
      const coneBasePoints = generateCirclePoints(
        coneBase.x,
        coneBase.y,
        coneBaseRadius,
        16
      );

      // Calculate vanishing point directions for cone
      const coneScaleFactor = 0.4;
      const coneBaseVpDir = {
        x: vpX - coneBase.x,
        y: vpY - coneBase.y,
      };
      const coneApexVpDir = {
        x: vpX - coneApex.x,
        y: vpY - coneApex.y,
      };

      // Calculate back positions
      const coneBackBase = {
        x: coneBase.x + coneBaseVpDir.x * coneScaleFactor,
        y: coneBase.y + coneBaseVpDir.y * coneScaleFactor,
      };
      const coneBackApex = {
        x: coneApex.x + coneApexVpDir.x * coneScaleFactor,
        y: coneApex.y + coneApexVpDir.y * coneScaleFactor,
      };

      // Generate back base circle
      const coneBackBasePoints = generateCirclePoints(
        coneBackBase.x,
        coneBackBase.y,
        coneBaseRadius * 0.8,
        16
      );

      // Draw colored faces
      // Front base
      drawColoredCircle(
        coneBase.x,
        coneBase.y,
        coneBaseRadius,
        colors.coneFront,
        -1,
        coneGroup
      );

      // Back base
      drawColoredCircle(
        coneBackBase.x,
        coneBackBase.y,
        coneBaseRadius * 0.8,
        colors.coneBack,
        -3,
        coneGroup
      );

      // Draw side of cone (segments)
      for (let i = 0; i < coneBasePoints.length; i++) {
        const next = (i + 1) % coneBasePoints.length;

        // Front cone faces
        drawColoredFace(
          [coneApex, coneBasePoints[i], coneBasePoints[next]],
          colors.coneFront,
          -2,
          coneGroup
        );

        // Back cone faces
        drawColoredFace(
          [coneBackApex, coneBackBasePoints[i], coneBackBasePoints[next]],
          colors.coneBack,
          -2,
          coneGroup
        );
      }

      // Draw edges
      // Base circles
      for (let i = 0; i < coneBasePoints.length; i++) {
        const next = (i + 1) % coneBasePoints.length;
        drawLine(
          coneBasePoints[i],
          coneBasePoints[next],
          colors.coneEdges,
          coneGroup
        );
        drawLine(
          coneBackBasePoints[i],
          coneBackBasePoints[next],
          colors.coneEdges,
          coneGroup
        );

        // Lines from apex to base (selected points to avoid clutter)
        if (i % 4 === 0) {
          drawLine(coneApex, coneBasePoints[i], colors.coneEdges, coneGroup);
          drawLine(
            coneBackApex,
            coneBackBasePoints[i],
            colors.coneEdges,
            coneGroup
          );
          drawLine(
            coneBasePoints[i],
            coneBackBasePoints[i],
            colors.coneEdges,
            coneGroup
          );

          // Perspective lines
          drawDashedLine(
            coneBasePoints[i],
            { x: vpX, y: vpY },
            colors.perspectiveLines,
            coneGroup
          );
        }
      }

      // Draw lines from apex
      drawLine(coneApex, coneBackApex, colors.coneEdges, coneGroup);
      drawDashedLine(
        coneApex,
        { x: vpX, y: vpY },
        colors.perspectiveLines,
        coneGroup
      );
  }
}

function drawTwoPointPerspective() {
  switch (
    selectedShape // ========== CUBE ==========
  ) {
    // In two-point, the front vertical edge is centered
    case "cube":
      const centerY = 0;
      const centerX = 0;
      const height = 150;
      const width = 150;

      // Define vertical edge positions
      const topMiddle = { x: centerX, y: centerY - height / 2 };
      const bottomMiddle = { x: centerX, y: centerY + height / 2 };

      // Get vanishing points
      const vp1X = vanishingPoints.vp1.x;
      const vp1Y = vanishingPoints.vp1.y;
      const vp2X = vanishingPoints.vp2.x;
      const vp2Y = vanishingPoints.vp2.y;

      // Calculate how far lines should go towards each vanishing point
      const scaleFactor = 0.25;

      // Calculate direction vectors
      const dirTopToVP1 = {
        x: vp1X - topMiddle.x,
        y: vp1Y - topMiddle.y,
      };
      const dirTopToVP2 = {
        x: vp2X - topMiddle.x,
        y: vp2Y - topMiddle.y,
      };
      const dirBottomToVP1 = {
        x: vp1X - bottomMiddle.x,
        y: vp1Y - bottomMiddle.y,
      };
      const dirBottomToVP2 = {
        x: vp2X - bottomMiddle.x,
        y: vp2Y - bottomMiddle.y,
      };

      // Calculate corner positions
      const topRight = {
        x: topMiddle.x + dirTopToVP1.x * scaleFactor,
        y: topMiddle.y + dirTopToVP1.y * scaleFactor,
      };
      const topLeft = {
        x: topMiddle.x + dirTopToVP2.x * scaleFactor,
        y: topMiddle.y + dirTopToVP2.y * scaleFactor,
      };
      const bottomRight = {
        x: bottomMiddle.x + dirBottomToVP1.x * scaleFactor,
        y: bottomMiddle.y + dirBottomToVP1.y * scaleFactor,
      };
      const bottomLeft = {
        x: bottomMiddle.x + dirBottomToVP2.x * scaleFactor,
        y: bottomMiddle.y + dirBottomToVP2.y * scaleFactor,
      };

      // Calculate back corners
      const scaleFactor2 = 0.25;
      const backTopRight = {
        x: topRight.x + dirTopToVP2.x * scaleFactor2,
        y: topRight.y + dirTopToVP2.y * scaleFactor2,
      };
      const backTopLeft = {
        x: topLeft.x + dirTopToVP1.x * scaleFactor2,
        y: topLeft.y + dirTopToVP1.y * scaleFactor2,
      };
      const backBottomRight = {
        x: bottomRight.x + dirBottomToVP2.x * scaleFactor2,
        y: bottomRight.y + dirBottomToVP2.y * scaleFactor2,
      };
      const backBottomLeft = {
        x: bottomLeft.x + dirBottomToVP1.x * scaleFactor2,
        y: bottomLeft.y + dirBottomToVP1.y * scaleFactor2,
      };

      // Draw cube colored faces
      // Front faces
      drawColoredFace(
        [topMiddle, bottomMiddle, bottomLeft, topLeft],
        colors.cubeFront,
        -1,
        cubeGroup
      );
      drawColoredFace(
        [topMiddle, topRight, bottomRight, bottomMiddle],
        colors.cubeFront,
        -1,
        cubeGroup
      );

      // Back face
      drawColoredFace(
        [backTopRight, backTopLeft, backBottomLeft, backBottomRight],
        colors.cubeBack,
        -3,
        cubeGroup
      );

      // Side faces
      drawColoredFace(
        [topRight, backTopRight, backBottomRight, bottomRight],
        colors.cubeBack,
        -2,
        cubeGroup
      );
      drawColoredFace(
        [topLeft, backTopLeft, backBottomLeft, bottomLeft],
        colors.cubeBack,
        -2,
        cubeGroup
      );
      drawColoredFace(
        [topMiddle, topRight, backTopRight, backTopLeft, topLeft],
        colors.cubeFront,
        -2,
        cubeGroup
      );
      drawColoredFace(
        [
          bottomMiddle,
          bottomRight,
          backBottomRight,
          backBottomLeft,
          bottomLeft,
        ],
        colors.cubeBack,
        -2,
        cubeGroup
      );

      // Draw cube edges
      // Front edges
      drawLine(topMiddle, bottomMiddle, colors.cubeEdges, cubeGroup);
      drawLine(topMiddle, topRight, colors.cubeEdges, cubeGroup);
      drawLine(topMiddle, topLeft, colors.cubeEdges, cubeGroup);
      drawLine(bottomMiddle, bottomRight, colors.cubeEdges, cubeGroup);
      drawLine(bottomMiddle, bottomLeft, colors.cubeEdges, cubeGroup);
      drawLine(topRight, bottomRight, colors.cubeEdges, cubeGroup);
      drawLine(topLeft, bottomLeft, colors.cubeEdges, cubeGroup);

      // Back edges
      drawLine(backTopRight, backBottomRight, colors.cubeEdges, cubeGroup);
      drawLine(backTopLeft, backBottomLeft, colors.cubeEdges, cubeGroup);
      drawLine(backTopRight, backTopLeft, colors.cubeEdges, cubeGroup);
      drawLine(backBottomRight, backBottomLeft, colors.cubeEdges, cubeGroup);

      // Connecting edges
      drawLine(topRight, backTopRight, colors.cubeEdges, cubeGroup);
      drawLine(topLeft, backTopLeft, colors.cubeEdges, cubeGroup);
      drawLine(bottomRight, backBottomRight, colors.cubeEdges, cubeGroup);
      drawLine(bottomLeft, backBottomLeft, colors.cubeEdges, cubeGroup);

      // Draw perspective lines
      drawDashedLine(
        topMiddle,
        { x: vp1X, y: vp1Y },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        bottomMiddle,
        { x: vp1X, y: vp1Y },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        topMiddle,
        { x: vp2X, y: vp2Y },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        bottomMiddle,
        { x: vp2X, y: vp2Y },
        colors.perspectiveLines,
        cubeGroup
      );
      break;

    case "torus":
      // ========== TORUS ==========
      // Draw torus with two-point perspective
      const torusPosition = { x: -200, y: -150 };
      const outerRadius = 60;
      const innerRadius = 30;

      // Calculate direction vectors for torus
      const torusToVP1 = {
        x: vp1X - torusPosition.x,
        y: vp1Y - torusPosition.y,
      };
      const torusToVP2 = {
        x: vp2X - torusPosition.x,
        y: vp2Y - torusPosition.y,
      };

      const torusScaleFactor = 0.2;

      // Generate front circles
      const torusFrontOuter = generateCirclePoints(
        torusPosition.x,
        torusPosition.y,
        outerRadius,
        16
      );
      const torusFrontInner = generateCirclePoints(
        torusPosition.x,
        torusPosition.y,
        innerRadius,
        16
      );

      // Create displaced points in both VP directions
      const torusRightPos = {
        x: torusPosition.x + torusToVP1.x * torusScaleFactor,
        y: torusPosition.y + torusToVP1.y * torusScaleFactor,
      };

      const torusLeftPos = {
        x: torusPosition.x + torusToVP2.x * torusScaleFactor,
        y: torusPosition.y + torusToVP2.y * torusScaleFactor,
      };

      // Generate side circles
      const torusRightOuter = generateCirclePoints(
        torusRightPos.x,
        torusRightPos.y,
        outerRadius * 0.9,
        16
      );
      const torusRightInner = generateCirclePoints(
        torusRightPos.x,
        torusRightPos.y,
        innerRadius * 0.9,
        16
      );

      const torusLeftOuter = generateCirclePoints(
        torusLeftPos.x,
        torusLeftPos.y,
        outerRadius * 0.9,
        16
      );
      const torusLeftInner = generateCirclePoints(
        torusLeftPos.x,
        torusLeftPos.y,
        innerRadius * 0.9,
        16
      );

      // Draw colored circles
      drawColoredCircle(
        torusPosition.x,
        torusPosition.y,
        outerRadius,
        colors.torusFront,
        -1,
        torusGroup
      );
      drawColoredCircle(
        torusPosition.x,
        torusPosition.y,
        innerRadius,
        colors.torusBack,
        -0,
        torusGroup
      );

      drawColoredCircle(
        torusRightPos.x,
        torusRightPos.y,
        outerRadius * 0.9,
        colors.torusBack,
        -3,
        torusGroup
      );
      drawColoredCircle(
        torusRightPos.x,
        torusRightPos.y,
        innerRadius * 0.9,
        colors.torusFront,
        -2,
        torusGroup
      );

      drawColoredCircle(
        torusLeftPos.x,
        torusLeftPos.y,
        outerRadius * 0.9,
        colors.torusBack,
        -3,
        torusGroup
      );
      drawColoredCircle(
        torusLeftPos.x,
        torusLeftPos.y,
        innerRadius * 0.9,
        colors.torusFront,
        -2,
        torusGroup
      );

      // Draw edges
      for (let i = 0; i < torusFrontOuter.length; i++) {
        const next = (i + 1) % torusFrontOuter.length;

        // Ring edges
        drawLine(
          torusFrontOuter[i],
          torusFrontOuter[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusFrontInner[i],
          torusFrontInner[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusRightOuter[i],
          torusRightOuter[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusRightInner[i],
          torusRightInner[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusLeftOuter[i],
          torusLeftOuter[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusLeftInner[i],
          torusLeftInner[next],
          colors.torusEdges,
          torusGroup
        );

        // Connect key points
        if (i % 4 === 0) {
          // Perspective lines to VP1
          drawDashedLine(
            torusFrontOuter[i],
            { x: vp1X, y: vp1Y },
            colors.perspectiveLines,
            torusGroup
          );
          drawDashedLine(
            torusFrontInner[i],
            { x: vp1X, y: vp1Y },
            colors.perspectiveLines,
            torusGroup
          );

          // Perspective lines to VP2
          drawDashedLine(
            torusFrontOuter[(i + 8) % 16],
            { x: vp2X, y: vp2Y },
            colors.perspectiveLines,
            torusGroup
          );
          drawDashedLine(
            torusFrontInner[(i + 8) % 16],
            { x: vp2X, y: vp2Y },
            colors.perspectiveLines,
            torusGroup
          );
        }
      }
      break;

    case "cone":
      //============== Cone =
      const conePosition = { x: 200, y: -150 };
      const coneBaseRadius = 50;
      const coneHeight = 100;
      // Base center and apex
      const coneBase = {
        x: conePosition.x,
        y: conePosition.y + coneHeight / 2,
      };
      const coneApex = {
        x: conePosition.x,
        y: conePosition.y - coneHeight / 2,
      };

      // Calculate direction vectors for cone
      const coneBaseToVP1 = {
        x: vp1X - coneBase.x,
        y: vp1Y - coneBase.y,
      };
      const coneBaseToVP2 = {
        x: vp2X - coneBase.x,
        y: vp2Y - coneBase.y,
      };
      const coneApexToVP1 = {
        x: vp1X - coneApex.x,
        y: vp1Y - coneApex.y,
      };
      const coneApexToVP2 = {
        x: vp2X - coneApex.x,
        y: vp2Y - coneApex.y,
      };

      const coneScaleFactor = 0.2;

      // Calculate displaced positions
      const coneRightBase = {
        x: coneBase.x + coneBaseToVP1.x * coneScaleFactor,
        y: coneBase.y + coneBaseToVP1.y * coneScaleFactor,
      };
      const coneLeftBase = {
        x: coneBase.x + coneBaseToVP2.x * coneScaleFactor,
        y: coneBase.y + coneBaseToVP2.y * coneScaleFactor,
      };
      const coneRightApex = {
        x: coneApex.x + coneApexToVP1.x * coneScaleFactor,
        y: coneApex.y + coneApexToVP1.y * coneScaleFactor,
      };
      const coneLeftApex = {
        x: coneApex.x + coneApexToVP2.x * coneScaleFactor,
        y: coneApex.y + coneApexToVP2.y * coneScaleFactor,
      };

      // Generate base circles
      const coneFrontBasePoints = generateCirclePoints(
        coneBase.x,
        coneBase.y,
        coneBaseRadius,
        16
      );
      const coneRightBasePoints = generateCirclePoints(
        coneRightBase.x,
        coneRightBase.y,
        coneBaseRadius * 0.9,
        16
      );
      const coneLeftBasePoints = generateCirclePoints(
        coneLeftBase.x,
        coneLeftBase.y,
        coneBaseRadius * 0.9,
        16
      );

      // Draw colored faces
      // Front base
      drawColoredCircle(
        coneBase.x,
        coneBase.y,
        coneBaseRadius,
        colors.coneFront,
        -1,
        coneGroup
      );

      // Right and left bases
      drawColoredCircle(
        coneRightBase.x,
        coneRightBase.y,
        coneBaseRadius * 0.9,
        colors.coneBack,
        -3,
        coneGroup
      );
      drawColoredCircle(
        coneLeftBase.x,
        coneLeftBase.y,
        coneBaseRadius * 0.9,
        colors.coneBack,
        -3,
        coneGroup
      );

      // Draw cone sides
      for (let i = 0; i < coneFrontBasePoints.length; i++) {
        const next = (i + 1) % coneFrontBasePoints.length;

        // Front cone faces
        drawColoredFace(
          [coneApex, coneFrontBasePoints[i], coneFrontBasePoints[next]],
          colors.coneFront,
          -2,
          coneGroup
        );

        // Side cone faces (selective)
        if (i % 4 === 0) {
          drawColoredFace(
            [
              coneApex,
              coneRightApex,
              coneFrontBasePoints[i],
              coneRightBasePoints[i],
            ],
            colors.coneBack,
            -2,
            coneGroup
          );

          drawColoredFace(
            [
              coneApex,
              coneLeftApex,
              coneFrontBasePoints[(i + 8) % 16],
              coneLeftBasePoints[(i + 8) % 16],
            ],
            colors.coneBack,
            -2,
            coneGroup
          );
        }
      }

      // Draw edges
      // Base circles
      for (let i = 0; i < coneFrontBasePoints.length; i++) {
        const next = (i + 1) % coneFrontBasePoints.length;
        drawLine(
          coneFrontBasePoints[i],
          coneFrontBasePoints[next],
          colors.coneEdges,
          coneGroup
        );
        drawLine(
          coneRightBasePoints[i],
          coneRightBasePoints[next],
          colors.coneEdges,
          coneGroup
        );
        drawLine(
          coneLeftBasePoints[i],
          coneLeftBasePoints[next],
          colors.coneEdges,
          coneGroup
        );

        // Connect selective points
        if (i % 4 === 0) {
          // Lines from apex to base
          drawLine(
            coneApex,
            coneFrontBasePoints[i],
            colors.coneEdges,
            coneGroup
          );

          // Perspective lines
          drawDashedLine(
            coneFrontBasePoints[i],
            { x: vp1X, y: vp1Y },
            colors.perspectiveLines,
            coneGroup
          );
          drawDashedLine(
            coneFrontBasePoints[(i + 8) % 16],
            { x: vp2X, y: vp2Y },
            colors.perspectiveLines,
            coneGroup
          );
        }
      }

      // Connect apexes
      drawLine(coneApex, coneRightApex, colors.coneEdges, coneGroup);
      drawLine(coneApex, coneLeftApex, colors.coneEdges, coneGroup);

      // Perspective lines from apex
      drawDashedLine(
        coneApex,
        { x: vp1X, y: vp1Y },
        colors.perspectiveLines,
        coneGroup
      );
      drawDashedLine(
        coneApex,
        { x: vp2X, y: vp2Y },
        colors.perspectiveLines,
        coneGroup
      );

      break;
  }
}

function drawThreePointPerspective() {
  switch (selectedShape) {
    case "cube":
      // ========== CUBE ==========
      // In three-point, we'll have three vanishing points
      const size = 100;
      const centerX = 0;
      const centerY = 0;

      // Get vanishing points
      const vp1X = vanishingPoints.vp1.x;
      const vp1Y = vanishingPoints.vp1.y;
      const vp2X = vanishingPoints.vp2.x;
      const vp2Y = vanishingPoints.vp2.y;
      const vp3X = vanishingPoints.vp3.x;
      const vp3Y = vanishingPoints.vp3.y;

      // const vp1X = 300;
      // const vp1Y = -250;
      // const vp2X = -300;
      // const vp2Y = -250;
      // const vp3X = 0;
      // const vp3Y = 300;

      // Define initial central point
      const center = { x: centerX, y: centerY };

      // Calculate direction vectors to each vanishing point
      const dirToVP1 = { x: vp1X - center.x, y: vp1Y - center.y };
      const dirToVP2 = { x: vp2X - center.x, y: vp2Y - center.y };
      const dirToVP3 = { x: vp3X - center.x, y: vp3Y - center.y };

      // Scaling factors for drawing edges
      const scaleFactor1 = 0.3;
      const scaleFactor2 = 0.3;
      const scaleFactor3 = 0.3;

      // Calculate edge endpoints
      const edge1 = {
        x: center.x + dirToVP1.x * scaleFactor1,
        y: center.y + dirToVP1.y * scaleFactor1,
      };

      const edge2 = {
        x: center.x + dirToVP2.x * scaleFactor2,
        y: center.y + dirToVP2.y * scaleFactor2,
      };

      const edge3 = {
        x: center.x + dirToVP3.x * scaleFactor3,
        y: center.y + dirToVP3.y * scaleFactor3,
      };

      // // Calculate more corners
      // const corner12 = calculateCorner(edge1, vp3X, vp3Y, edge2, vp3X, vp3Y);
      // const corner23 = calculateCorner(edge2, vp1X, vp1Y, edge3, vp1X, vp1Y);
      // const corner31 = calculateCorner(edge3, vp2X, vp2Y, edge1, vp2X, vp2Y);

      // Calculate more corners - each using DIFFERENT vanishing points
      const corner12 = calculateCorner(edge1, vp3X, vp3Y, edge3, vp1X, vp1Y);
      const corner31 = calculateCorner(edge2, vp1X, vp1Y, edge1, vp2X, vp2Y);
      const corner23 = calculateCorner(edge3, vp2X, vp2Y, edge2, vp3X, vp3Y);

      // const farCorner = calculateCorner(
      //   corner12,
      //   vp1X,
      //   vp1Y,
      //   corner23,
      //   vp2X,
      //   vp2Y
      // );

      const farCorner = {
        x: (center.x + corner31.x) / 2 / 2,
        y: (center.y + corner31.y) / 2 / 2,
      };

      // Draw colored faces
      // Front faces
      drawColoredFace(
        [center, edge1, corner12, edge3],
        colors.cubeFront,
        -1,
        cubeGroup
      );
      drawColoredFace(
        [center, edge2, corner23, edge3],
        colors.cubeFront,
        -1,
        cubeGroup
      );
      drawColoredFace(
        [center, edge2, corner31, edge1],
        colors.cubeFront,
        -1,
        cubeGroup
      );

      // // Far faces
      drawColoredFace(
        [edge2, corner23, farCorner, corner31],
        colors.cubeBack,
        -2,
        cubeGroup
      );
      drawColoredFace(
        [edge1, corner31, farCorner, corner12],
        colors.cubeBack,
        -2,
        cubeGroup
      );
      drawColoredFace(
        [edge3, corner12, farCorner, corner23],
        colors.cubeBack,
        -2,
        cubeGroup
      );

      // Now draw all lines
      drawLine(center, edge1, colors.cubeEdges, cubeGroup);
      drawLine(center, edge2, colors.cubeEdges, cubeGroup);
      drawLine(center, edge3, colors.cubeEdges, cubeGroup);

      drawLine(edge1, corner12, colors.cubeEdges, cubeGroup);
      drawLine(edge1, corner31, colors.cubeEdges, cubeGroup);
      drawLine(edge3, corner12, colors.cubeEdges, cubeGroup);
      drawLine(edge2, corner23, colors.cubeEdges, cubeGroup);
      drawLine(edge3, corner23, colors.cubeEdges, cubeGroup);
      drawLine(edge2, corner31, colors.cubeEdges, cubeGroup);

      drawLine(corner12, farCorner, colors.cubeEdges, cubeGroup);
      drawLine(corner23, farCorner, colors.cubeEdges, cubeGroup);
      drawLine(corner31, farCorner, colors.cubeEdges, cubeGroup);

      // drawLine(center, farCorner, 0xff0000, cubeGroup); // Red
      // drawLine(corner31, edge2, 0x00ff00, cubeGroup); // Green
      // drawLine(center, edge3, 0x0000ff, cubeGroup); // Blue

      // drawLine(edge1, corner12, 0xffff00, cubeGroup); // Yellow
      // drawLine(edge2, corner23, 0xff00ff, cubeGroup); // Magenta
      // drawLine(center, corner31, 0x00ffff, cubeGroup); // Cyan

      // Draw perspective lines
      drawDashedLine(
        center,
        { x: vp1X, y: vp1Y },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        edge2,
        { x: vp1X, y: vp1Y },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        edge3,
        { x: vp1X, y: vp1Y },
        colors.perspectiveLines,
        cubeGroup
      );

      drawDashedLine(
        center,
        { x: vp2X, y: vp2Y },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        edge1,
        { x: vp2X, y: vp2Y },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        edge3,
        { x: vp2X, y: vp2Y },
        colors.perspectiveLines,
        cubeGroup
      );

      drawDashedLine(
        center,
        { x: vp3X, y: vp3Y },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        edge1,
        { x: vp3X, y: vp3Y },
        colors.perspectiveLines,
        cubeGroup
      );
      drawDashedLine(
        edge2,
        { x: vp3X, y: vp3Y },
        colors.perspectiveLines,
        cubeGroup
      );
      break;

    case "torus":
      // ========== TORUS ==========
      // Draw torus with three-point perspective
      const torusPosition = { x: -200, y: -150 };
      const outerRadius = 60;
      const innerRadius = 30;

      // Calculate direction vectors for torus
      const torusToVP1 = {
        x: vp1X - torusPosition.x,
        y: vp1Y - torusPosition.y,
      };
      const torusToVP2 = {
        x: vp2X - torusPosition.x,
        y: vp2Y - torusPosition.y,
      };
      const torusToVP3 = {
        x: vp3X - torusPosition.x,
        y: vp3Y - torusPosition.y,
      };

      const torusScaleFactor = 0.15;

      // Calculate displaced positions based on all three vanishing points
      const torusVP1Pos = {
        x: torusPosition.x + torusToVP1.x * torusScaleFactor,
        y: torusPosition.y + torusToVP1.y * torusScaleFactor,
      };
      const torusVP2Pos = {
        x: torusPosition.x + torusToVP2.x * torusScaleFactor,
        y: torusPosition.y + torusToVP2.y * torusScaleFactor,
      };
      const torusVP3Pos = {
        x: torusPosition.x + torusToVP3.x * torusScaleFactor,
        y: torusPosition.y + torusToVP3.y * torusScaleFactor,
      };

      // Generate all circles
      const torusFrontOuter = generateCirclePoints(
        torusPosition.x,
        torusPosition.y,
        outerRadius,
        16
      );
      const torusFrontInner = generateCirclePoints(
        torusPosition.x,
        torusPosition.y,
        innerRadius,
        16
      );

      const torusVP1Outer = generateCirclePoints(
        torusVP1Pos.x,
        torusVP1Pos.y,
        outerRadius * 0.9,
        16
      );
      const torusVP1Inner = generateCirclePoints(
        torusVP1Pos.x,
        torusVP1Pos.y,
        innerRadius * 0.9,
        16
      );

      const torusVP2Outer = generateCirclePoints(
        torusVP2Pos.x,
        torusVP2Pos.y,
        outerRadius * 0.9,
        16
      );
      const torusVP2Inner = generateCirclePoints(
        torusVP2Pos.x,
        torusVP2Pos.y,
        innerRadius * 0.9,
        16
      );

      const torusVP3Outer = generateCirclePoints(
        torusVP3Pos.x,
        torusVP3Pos.y,
        outerRadius * 0.85,
        16
      );
      const torusVP3Inner = generateCirclePoints(
        torusVP3Pos.x,
        torusVP3Pos.y,
        innerRadius * 0.85,
        16
      );

      // Draw colored circles
      drawColoredCircle(
        torusPosition.x,
        torusPosition.y,
        outerRadius,
        colors.torusFront,
        -1,
        torusGroup
      );
      drawColoredCircle(
        torusPosition.x,
        torusPosition.y,
        innerRadius,
        colors.torusBack,
        -0.5,
        torusGroup
      );

      drawColoredCircle(
        torusVP1Pos.x,
        torusVP1Pos.y,
        outerRadius * 0.9,
        colors.torusBack,
        -2,
        torusGroup
      );
      drawColoredCircle(
        torusVP1Pos.x,
        torusVP1Pos.y,
        innerRadius * 0.9,
        colors.torusFront,
        -1.5,
        torusGroup
      );

      drawColoredCircle(
        torusVP2Pos.x,
        torusVP2Pos.y,
        outerRadius * 0.9,
        colors.torusBack,
        -2,
        torusGroup
      );
      drawColoredCircle(
        torusVP2Pos.x,
        torusVP2Pos.y,
        innerRadius * 0.9,
        colors.torusFront,
        -1.5,
        torusGroup
      );

      drawColoredCircle(
        torusVP3Pos.x,
        torusVP3Pos.y,
        outerRadius * 0.85,
        colors.torusBack,
        -3,
        torusGroup
      );
      drawColoredCircle(
        torusVP3Pos.x,
        torusVP3Pos.y,
        innerRadius * 0.85,
        colors.torusFront,
        -2.5,
        torusGroup
      );

      // Draw edges
      for (let i = 0; i < torusFrontOuter.length; i++) {
        const next = (i + 1) % torusFrontOuter.length;

        // Draw circle edges
        drawLine(
          torusFrontOuter[i],
          torusFrontOuter[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusFrontInner[i],
          torusFrontInner[next],
          colors.torusEdges,
          torusGroup
        );

        drawLine(
          torusVP1Outer[i],
          torusVP1Outer[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusVP1Inner[i],
          torusVP1Inner[next],
          colors.torusEdges,
          torusGroup
        );

        drawLine(
          torusVP2Outer[i],
          torusVP2Outer[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusVP2Inner[i],
          torusVP2Inner[next],
          colors.torusEdges,
          torusGroup
        );

        drawLine(
          torusVP3Outer[i],
          torusVP3Outer[next],
          colors.torusEdges,
          torusGroup
        );
        drawLine(
          torusVP3Inner[i],
          torusVP3Inner[next],
          colors.torusEdges,
          torusGroup
        );

        // Connect selective points
        if (i % 4 === 0) {
          // Perspective lines
          drawDashedLine(
            torusFrontOuter[i],
            { x: vp1X, y: vp1Y },
            colors.perspectiveLines,
            torusGroup
          );
          drawDashedLine(
            torusFrontOuter[(i + 4) % 16],
            { x: vp2X, y: vp2Y },
            colors.perspectiveLines,
            torusGroup
          );
          drawDashedLine(
            torusFrontOuter[(i + 8) % 16],
            { x: vp3X, y: vp3Y },
            colors.perspectiveLines,
            torusGroup
          );
        }
      }
      break;

    case "cone":
      // ========== CONE ==========
      // Draw cone with three-point perspective
      const conePosition = { x: 200, y: -150 };
      const coneBaseRadius = 50;
      const coneHeight = 100;

      // Base center and apex
      const coneBase = {
        x: conePosition.x,
        y: conePosition.y + coneHeight / 2,
      };
      const coneApex = {
        x: conePosition.x,
        y: conePosition.y - coneHeight / 2,
      };

      // Calculate direction vectors
      const coneBaseToVP1 = {
        x: vp1X - coneBase.x,
        y: vp1Y - coneBase.y,
      };
      const coneBaseToVP2 = {
        x: vp2X - coneBase.x,
        y: vp2Y - coneBase.y,
      };
      const coneBaseToVP3 = {
        x: vp3X - coneBase.x,
        y: vp3Y - coneBase.y,
      };
      const coneApexToVP1 = {
        x: vp1X - coneApex.x,
        y: vp1Y - coneApex.y,
      };
      const coneApexToVP2 = {
        x: vp2X - coneApex.x,
        y: vp2Y - coneApex.y,
      };
      const coneApexToVP3 = {
        x: vp3X - coneApex.x,
        y: vp3Y - coneApex.y,
      };

      const coneScaleFactor = 0.15;

      // Calculate displaced positions
      const coneVP1Base = {
        x: coneBase.x + coneBaseToVP1.x * coneScaleFactor,
        y: coneBase.y + coneBaseToVP1.y * coneScaleFactor,
      };
      const coneVP2Base = {
        x: coneBase.x + coneBaseToVP2.x * coneScaleFactor,
        y: coneBase.y + coneBaseToVP2.y * coneScaleFactor,
      };
      const coneVP3Base = {
        x: coneBase.x + coneBaseToVP3.x * coneScaleFactor,
        y: coneBase.y + coneBaseToVP3.y * coneScaleFactor,
      };

      const coneVP1Apex = {
        x: coneApex.x + coneApexToVP1.x * coneScaleFactor,
        y: coneApex.y + coneApexToVP1.y * coneScaleFactor,
      };
      const coneVP2Apex = {
        x: coneApex.x + coneApexToVP2.x * coneScaleFactor,
        y: coneApex.y + coneApexToVP2.y * coneScaleFactor,
      };
      const coneVP3Apex = {
        x: coneApex.x + coneApexToVP3.x * coneScaleFactor,
        y: coneApex.y + coneApexToVP3.y * coneScaleFactor,
      };

      // Generate base circles
      const coneFrontBasePoints = generateCirclePoints(
        coneBase.x,
        coneBase.y,
        coneBaseRadius,
        16
      );
      const coneVP1BasePoints = generateCirclePoints(
        coneVP1Base.x,
        coneVP1Base.y,
        coneBaseRadius * 0.9,
        16
      );
      const coneVP2BasePoints = generateCirclePoints(
        coneVP2Base.x,
        coneVP2Base.y,
        coneBaseRadius * 0.9,
        16
      );
      const coneVP3BasePoints = generateCirclePoints(
        coneVP3Base.x,
        coneVP3Base.y,
        coneBaseRadius * 0.85,
        16
      );

      // Draw colored bases
      drawColoredCircle(
        coneBase.x,
        coneBase.y,
        coneBaseRadius,
        colors.coneFront,
        -1,
        coneGroup
      );
      drawColoredCircle(
        coneVP1Base.x,
        coneVP1Base.y,
        coneBaseRadius * 0.9,
        colors.coneBack,
        -2,
        coneGroup
      );
      drawColoredCircle(
        coneVP2Base.x,
        coneVP2Base.y,
        coneBaseRadius * 0.9,
        colors.coneBack,
        -2,
        coneGroup
      );
      drawColoredCircle(
        coneVP3Base.x,
        coneVP3Base.y,
        coneBaseRadius * 0.85,
        colors.coneBack,
        -3,
        coneGroup
      );

      // Draw cone sides
      for (let i = 0; i < coneFrontBasePoints.length; i++) {
        const next = (i + 1) % coneFrontBasePoints.length;

        // Front cone faces
        drawColoredFace(
          [coneApex, coneFrontBasePoints[i], coneFrontBasePoints[next]],
          colors.coneFront,
          -1.5,
          coneGroup
        );

        // Connect selective points
        if (i % 4 === 0) {
          // Draw some side faces
          drawColoredFace(
            [
              coneApex,
              coneVP1Apex,
              coneFrontBasePoints[i],
              coneVP1BasePoints[i],
            ],
            colors.coneBack,
            -2,
            coneGroup
          );

          drawColoredFace(
            [
              coneApex,
              coneVP2Apex,
              coneFrontBasePoints[(i + 4) % 16],
              coneVP2BasePoints[(i + 4) % 16],
            ],
            colors.coneBack,
            -2,
            coneGroup
          );

          drawColoredFace(
            [
              coneApex,
              coneVP3Apex,
              coneFrontBasePoints[(i + 8) % 16],
              coneVP3BasePoints[(i + 8) % 16],
            ],
            colors.coneBack,
            -2.5,
            coneGroup
          );
        }
      }

      // Draw edges
      // Base circles
      for (let i = 0; i < coneFrontBasePoints.length; i++) {
        const next = (i + 1) % coneFrontBasePoints.length;
        drawLine(
          coneFrontBasePoints[i],
          coneFrontBasePoints[next],
          colors.coneEdges,
          coneGroup
        );
        drawLine(
          coneVP1BasePoints[i],
          coneVP1BasePoints[next],
          colors.coneEdges,
          coneGroup
        );
        drawLine(
          coneVP2BasePoints[i],
          coneVP2BasePoints[next],
          colors.coneEdges,
          coneGroup
        );
        drawLine(
          coneVP3BasePoints[i],
          coneVP3BasePoints[next],
          colors.coneEdges,
          coneGroup
        );

        // Connect selective points
        if (i % 4 === 0) {
          // Connect apexes to bases
          drawLine(
            coneApex,
            coneFrontBasePoints[i],
            colors.coneEdges,
            coneGroup
          );

          // Perspective lines
          drawDashedLine(
            coneFrontBasePoints[i],
            { x: vp1X, y: vp1Y },
            colors.perspectiveLines,
            coneGroup
          );
          drawDashedLine(
            coneFrontBasePoints[(i + 4) % 16],
            { x: vp2X, y: vp2Y },
            colors.perspectiveLines,
            coneGroup
          );
          drawDashedLine(
            coneFrontBasePoints[(i + 8) % 16],
            { x: vp3X, y: vp3Y },
            colors.perspectiveLines,
            coneGroup
          );
        }
      }

      // Connect apexes
      drawLine(coneApex, coneVP1Apex, colors.coneEdges, coneGroup);
      drawLine(coneApex, coneVP2Apex, colors.coneEdges, coneGroup);
      drawLine(coneApex, coneVP3Apex, colors.coneEdges, coneGroup);

      // Perspective lines from apex
      drawDashedLine(
        coneApex,
        { x: vp1X, y: vp1Y },
        colors.perspectiveLines,
        coneGroup
      );
      drawDashedLine(
        coneApex,
        { x: vp2X, y: vp2Y },
        colors.perspectiveLines,
        coneGroup
      );
      drawDashedLine(
        coneApex,
        { x: vp3X, y: vp3Y },
        colors.perspectiveLines,
        coneGroup
      );

      break;
  }
}

// Helper function to draw a colored face from points
function drawColoredFace(points, color, zOrder = 0, group) {
  const shape = new THREE.Shape();

  shape.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i].x, points[i].y);
  }
  shape.lineTo(points[0].x, points[0].y);

  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  });

  const face = new THREE.Mesh(geometry, material);
  face.position.z = zOrder; // Set z-order for proper layering
  group.add(face);
}

// Helper function to draw a colored circle
function drawColoredCircle(x, y, radius, color, zOrder = 0, group) {
  const circleShape = new THREE.Shape();
  circleShape.absarc(x, y, radius, 0, Math.PI * 2, false);

  const circleGeometry = new THREE.ShapeGeometry(circleShape);
  const circleMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  });

  const circle = new THREE.Mesh(circleGeometry, circleMaterial);
  circle.position.z = zOrder;
  group.add(circle);
}

// Helper function to generate points for a circle
function generateCirclePoints(centerX, centerY, radius, segments) {
  const points = [];
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    });
  }
  return points;
}

// Helper function to calculate corner points
function calculateCorner(point1, vp1X, vp1Y, point2, vp2X, vp2Y) {
  // Calculate slopes
  const m1 = (vp1Y - point1.y) / (vp1X - point1.x);
  const m2 = (vp2Y - point2.y) / (vp2X - point2.x);

  // Calculate y-intercepts
  const b1 = point1.y - m1 * point1.x;
  const b2 = point2.y - m2 * point2.x;

  // Calculate intersection
  const x = (b2 - b1) / (m1 - m2);
  const y = m1 * x + b1;

  return { x, y };
}

function drawLine(p1, p2, color = 0x000000, group) {
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: 2,
  });
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(p1.x, p1.y, 0),
    new THREE.Vector3(p2.x, p2.y, 0),
  ]);
  const line = new THREE.Line(geometry, material);
  group.add(line);
}

function drawDashedLine(p1, p2, color = 0x777777) {
  const material = new THREE.LineDashedMaterial({
    color: color,
    dashSize: 5,
    gapSize: 5,
    linewidth: 1,
  });
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(p1.x, p1.y, 0),
    new THREE.Vector3(p2.x, p2.y, 0),
  ]);
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances(); // Required for dashed lines
  cubeGroup.add(line);
}

// Handle window resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.left = width / -2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = height / -2;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

// Slider event handlers
document.getElementById("vp1-x").addEventListener("input", (e) => {
  vanishingPoints.vp1.x = parseInt(e.target.value);
  document.getElementById("vp1-x-value").textContent = e.target.value;
  drawPerspectiveScene();
});

document.getElementById("vp1-y").addEventListener("input", (e) => {
  vanishingPoints.vp1.y = parseInt(e.target.value);
  document.getElementById("vp1-y-value").textContent = e.target.value;
  drawPerspectiveScene();
});

document.getElementById("vp2-x").addEventListener("input", (e) => {
  vanishingPoints.vp2.x = parseInt(e.target.value);
  document.getElementById("vp2-x-value").textContent = e.target.value;
  drawPerspectiveScene();
});

document.getElementById("vp2-y").addEventListener("input", (e) => {
  vanishingPoints.vp2.y = parseInt(e.target.value);
  document.getElementById("vp2-y-value").textContent = e.target.value;
  drawPerspectiveScene();
});

document.getElementById("vp3-x").addEventListener("input", (e) => {
  vanishingPoints.vp3.x = parseInt(e.target.value);
  document.getElementById("vp3-x-value").textContent = e.target.value;
  drawPerspectiveScene();
});

document.getElementById("vp3-y").addEventListener("input", (e) => {
  vanishingPoints.vp3.y = parseInt(e.target.value);
  document.getElementById("vp3-y-value").textContent = e.target.value;
  drawPerspectiveScene();
});

// Button handlers
document.getElementById("one-point").addEventListener("click", () => {
  perspectiveType = "one-point";
  updatePerspectiveButtons();
  document.getElementById("vp2-controls").style.display = "none";
  document.getElementById("vp2-controls-y").style.display = "none";
  document.getElementById("vp3-controls").style.display = "none";
  document.getElementById("vp3-controls-y").style.display = "none";
  drawPerspectiveScene();
});

document.getElementById("two-point").addEventListener("click", () => {
  perspectiveType = "two-point";
  updatePerspectiveButtons();
  document.getElementById("vp2-controls").style.display = "block";
  document.getElementById("vp2-controls-y").style.display = "block";
  document.getElementById("vp3-controls").style.display = "none";
  document.getElementById("vp3-controls-y").style.display = "none";
  drawPerspectiveScene();
});

document.getElementById("three-point").addEventListener("click", () => {
  perspectiveType = "three-point";
  updatePerspectiveButtons();
  document.getElementById("vp2-controls").style.display = "block";
  document.getElementById("vp2-controls-y").style.display = "block";
  document.getElementById("vp3-controls").style.display = "block";
  document.getElementById("vp3-controls-y").style.display = "block";
  drawPerspectiveScene();
});

document.getElementById("reset-vps").addEventListener("click", () => {
  vanishingPoints = {
    vp1: { x: 300, y: 0 },
    vp2: { x: -300, y: 0 },
    vp3: { x: 0, y: 300 },
  };

  document.getElementById("vp1-x").value = 300;
  document.getElementById("vp1-y").value = 0;
  document.getElementById("vp2-x").value = -300;
  document.getElementById("vp2-y").value = 0;
  document.getElementById("vp3-x").value = 0;
  document.getElementById("vp3-y").value = 300;

  document.getElementById("vp1-x-value").textContent = "300";
  document.getElementById("vp1-y-value").textContent = "0";
  document.getElementById("vp2-x-value").textContent = "-300";
  document.getElementById("vp2-y-value").textContent = "0";
  document.getElementById("vp3-x-value").textContent = "0";
  document.getElementById("vp3-y-value").textContent = "300";

  drawPerspectiveScene();
});

function updatePerspectiveButtons() {
  document.getElementById("one-point").classList.remove("active-button");
  document.getElementById("two-point").classList.remove("active-button");
  document.getElementById("three-point").classList.remove("active-button");

  document.getElementById(perspectiveType).classList.add("active-button");
}

// Draw initial scene
drawPerspectiveScene();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
