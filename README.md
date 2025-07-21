# **Orthographic & Perspective Projections Viewer**

**VISIT HERE:**  
[https://prachi5791.github.io/Projections/](https://prachi5791.github.io/Projections/)  
[https://flipframe.vercel.app/](https://flipframe.vercel.app/)

A web application for interactive visualization of **3D shapes** featuring both **orthographic** and **perspective projections**. Users can select, manipulate, and study geometric shapes, toggle grid/wireframe/boundary settings, and experience real-time adjustment of vanishing points in different perspective modes. With intuitive controls and multiple viewing options, this tool is ideal for education and exploration in graphics, engineering, and design fields.


## **Table of Contents**

- [**Demo Overview**](#demo-overview)
- [**Features**](#features)
- [**Screenshots**](#screenshots)
- [**Project Structure**](#project-structure)
- [**Getting Started**](#getting-started)
- [**Usage**](#usage)
- [**Contributing**](#contributing)

## **Demo Overview**
**Orthographic & Perspective Projections Viewer** is a visual learning tool that allows users to:

- Select different 3D shapes (cube, sphere, cylinder, dodecahedron, torus knot, etc.)
- Switch between orthographic and **one-, two-, and three-point perspective** modes
- Interactively move vanishing points and see changes in real time
- Toggle grid, wireframe, and boundary overlays to enhance understanding

## **Features**
- **Wide Shape Selection:** Choose from a variety of geometric solids and parametric forms.
- **Multi-Panel Layout:** Instantly view a shape in 3D perspective, top, front, and side orthographic projections.
- **Perspective Simulation:** Adjust 1-, 2-, and 3-point vanishing points with sliders and observe live updates.
- **UI Controls:** Toggle grid, wireframe, and boundaries to suit your visualization needs.
- **Educational Tooltips:** Helpful text and instructions for learning and experimentation.

## **Screenshots**
<img width="1917" height="921" alt="image" src="https://github.com/user-attachments/assets/7c2895f6-2676-4123-bd1b-d03091a43b39" />

https://github.com/user-attachments/assets/b6434cb8-2788-40c1-b9ea-278048c04505

- **Orthographic Projections View:**  
  - Shape selector dropdown (cube, sphere, etc.)
  - 3D and top/front/side orthographic projection panels
  - Grid, wireframe, and boundaries toggle buttons

- **Perspective View Controls:**  
  - Choose between 1-, 2-, or 3-point perspective modes
  - Adjustable vanishing points via sliders
  - Interactive diagram that updates in real time

## **Project Structure**
  - index.html ->   # Main landing / shape selection & orthographic views
  - ortho.html ->   # Orthographic projections view
  - pres.html  ->   # Perspective projections/vanishing point controls
  - script.js  ->   # Main logic for 3D rendering and UI
  - style.css  ->   # Styles and layout

## **Getting Started**
1. **Clone or Download the Project**
   git clone https://github.com/Prachi5791/Projections.git

2. **Open HTML Files Directly**
- Double-click `index.html`, or  
- Use a local server for best results:
  ```
  npx serve .
  ```
- Open your browser to `http://localhost:5000` (or the port shown)

*No build or complex setup needed—just HTML, CSS, and JS.*

## **Usage**
- **Shape Selection:** Use the dropdown to pick your geometric figure.
- **Projection Views:**  
- Explore real-time 3D and orthographic panels.
- Use `Toggle Grid`, `Toggle Wireframe`, and `Toggle Boundaries` for visual preference.
- **Perspective Controls:**  
- Select between one-, two-, or three-point perspective.
- Adjust vanishing points with the sliders and immediately see shape changes.

## **Contributing**
- Fork the repository, create your own branch, and open a pull request with improvements.
- Suggest new shapes, features, UI upgrades, or educational enhancements.
