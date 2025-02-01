// // components/ThreeDCanvas.js

// import React, { useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

// function Cube({ size, color }) {
//   return (
//     <mesh position={[-2, 0, 0]}>
//       <boxGeometry args={[size.width, size.height, size.depth]} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// }

// function Sphere({ size, color }) {
//   return (
//     <mesh position={[2, 0, 0]}>
//       <sphereGeometry args={[size.radius, 32, 32]} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// }

// export default function ThreeDCanvas() {
//   // State for Cube
//   const [cubeSize, setCubeSize] = useState({ width: 1, height: 1, depth: 1 });
//   const [cubeColor, setCubeColor] = useState("#ff0000");

//   // State for Sphere
//   const [sphereSize, setSphereSize] = useState({ radius: 1 });
//   const [sphereColor, setSphereColor] = useState("#0000ff");

//   return (
//     <div style={{ display: "flex", margin: "20px 0" }}>
//       {/* 3D Canvas */}
//       <div style={{ width: "60%", height: "500px", border: "1px solid #ddd" }}>
//         <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
//           <ambientLight />
//           <pointLight position={[10, 10, 10]} />

//           {/* Cube */}
//           <Cube size={cubeSize} color={cubeColor} />

//           {/* Sphere */}
//           <Sphere size={sphereSize} color={sphereColor} />

//           <OrbitControls />
//         </Canvas>
//       </div>

//       {/* Controls */}
//       <div style={{ padding: 20 }}>
//         <h2>Customize Cube</h2>
//         <label>Width: </label>
//         <input
//           type="range"
//           min="1"
//           max="5"
//           value={cubeSize.width}
//           onChange={(e) => setCubeSize({ ...cubeSize, width: e.target.value })}
//         />
//         <br />
//         <label>Height: </label>
//         <input
//           type="range"
//           min="1"
//           max="5"
//           value={cubeSize.height}
//           onChange={(e) => setCubeSize({ ...cubeSize, height: e.target.value })}
//         />
//         <br />
//         <label>Depth: </label>
//         <input
//           type="range"
//           min="1"
//           max="5"
//           value={cubeSize.depth}
//           onChange={(e) => setCubeSize({ ...cubeSize, depth: e.target.value })}
//         />
//         <br />
//         <label>Color: </label>
//         <input
//           type="color"
//           value={cubeColor}
//           onChange={(e) => setCubeColor(e.target.value)}
//         />
//         <br />

//         <h2>Customize Sphere</h2>
//         <label>Radius: </label>
//         <input
//           type="range"
//           min="1"
//           max="5"
//           value={sphereSize.radius}
//           onChange={(e) => setSphereSize({ radius: e.target.value })}
//         />
//         <br />
//         <label>Color: </label>
//         <input
//           type="color"
//           value={sphereColor}
//           onChange={(e) => setSphereColor(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// }
