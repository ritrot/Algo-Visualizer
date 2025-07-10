// import { useRef, useEffect } from "react";

// export default function TreeCanvas({ tree }) {
//   const canvasRef = useRef();

//   useEffect(() => {
//     if (!tree) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     layout(tree, canvas.width / 2, 50, 160);
//     draw(ctx, tree);
//   }, [tree]);

//   function layout(node, x, y, gap) {
//     if (!node) return;
//     node.x = x;
//     node.y = y;
//     layout(node.left, x - gap, y + 80, gap / 2);
//     layout(node.right, x + gap, y + 80, gap / 2);
//   }

//   function draw(ctx, node) {
//     if (!node) return;

//     // Draw lines
//     if (node.left) drawLine(ctx, node.x, node.y, node.left.x, node.left.y);
//     if (node.right) drawLine(ctx, node.x, node.y, node.right.x, node.right.y);

//     // Node appearance
//     ctx.beginPath();
//     ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
//     ctx.fillStyle = node.highlight ? "#f59e0b" : "#4caf50"; // Yellow for new node
//     ctx.shadowColor = node.highlight ? "#facc15" : "transparent";
//     ctx.shadowBlur = node.highlight ? 20 : 0;
//     ctx.fill();
//     ctx.stroke();

//     ctx.fillStyle = "white";
//     ctx.font = "16px Arial";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(node.value, node.x, node.y);

//     // After drawing, remove highlight (next time)
//     if (node.highlight) {
//       setTimeout(() => {
//         node.highlight = false;
//       }, 800);
//     }

//     draw(ctx, node.left);
//     draw(ctx, node.right);
//   }

//   function drawLine(ctx, x1, y1, x2, y2) {
//     ctx.strokeStyle = "#333";
//     ctx.lineWidth = 2;
//     ctx.beginPath();
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//     ctx.stroke();
//   }

//   return <canvas ref={canvasRef} width={800} height={500}  />;
// }


export default function TreeCanvas({ tree }) {
    const nodes = [];
    const lines = [];
  
    const layout = (node, x, y, gap) => {
      if (!node) return;
      node.x = x;
      node.y = y;
      if (node.left) {
        layout(node.left, x - gap, y + 100, gap / 1.5);
        lines.push({ x1: x, y1: y, x2: x - gap, y2: y + 100 });
      }
      if (node.right) {
        layout(node.right, x + gap, y + 100, gap / 1.5);
        lines.push({ x1: x, y1: y, x2: x + gap, y2: y + 100 });
      }
      nodes.push(node);
    };
  
    layout(tree, 400, 50, 160);
  
    return (
      <svg width={800} height={500}  className="bg-gray-900 rounded shadow-md">
        {lines.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#4b5563"
            strokeWidth={2}
          />
        ))}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r={20}
              fill={node.highlight ? "#f59e0b" : "#10b981"}
              stroke="#e5e7eb"
              strokeWidth={2}
              className="transition-all duration-300"
            />
            <text
              x={node.x}
              y={node.y}
              fill="white"
              fontSize={16}
              textAnchor="middle"
              alignmentBaseline="central"
            >
              {node.value}
            </text>
          </g>
        ))}
      </svg>
    );
  };
  