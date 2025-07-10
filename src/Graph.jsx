import React, { useEffect, useState } from 'react'
import Node from './Node';
import dijkstra, { getNodeswithShortestPath } from './Algo/Dijkstra';
const Graph = ({ startAnimation }) => {

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    createNewGrid();
  }, [])

  useEffect(() => {
    if (startAnimation && grid.length > 0) {
      animate(grid);
    }
  }, [startAnimation]);


  const createNewGrid = () => {
    let row = [];
    for (let r = 0; r < 20; r++) {
      let col = [];
      for (let c = 0; c < 50; c++) {
        col.push(createNewNode(r, c))
      }
      row.push(col);
    }
    setGrid(row);
  }

  const createNewNode = (row, col) => {
    const node = {
      isStart: row === 10 && col === 10,
      isEnd: row === 2 && col === 40,
      col: col,
      row: row,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
      isPath: false,
      isWall: false
    }
    return node;
  }


  const toggleWall = (row, col) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(rowArr => rowArr.map(n => ({ ...n })));
      const node = newGrid[row][col];
  
      // Don’t allow toggling start or end
      if (!node.isStart && !node.isEnd) {
        node.isWall = !node.isWall;
      }
      return newGrid;
    });
  };
  


  function animate(grid) {
    const startNode = grid[10][10];
const endNode = grid[2][40];
const visited = dijkstra(grid, startNode, endNode);
const path = getNodeswithShortestPath(visited[visited.length - 1]); // ✅ more reliable
animateAlgo(visited, path);

  }

  function animateAlgo(visitedNodes, shortestPath) {
    const animateVisited = () => {
      return new Promise(resolve => {
        for (let i = 0; i <= visitedNodes.length; i++) {
          if (i === visitedNodes.length) {
            setTimeout(resolve, 10 * i); // finish visiting
          } else {
            setTimeout(() => {
              const { row, col } = visitedNodes[i];
              setGrid(prevGrid => {
                const newGrid = prevGrid.map(rowArr => rowArr.map(n => ({ ...n })));
                newGrid[row][col].isVisited = true;
                return newGrid;
              });
            }, 10 * i);
          }
        }
      });
    };

    animateVisited().then(() => {
      animateShortestPath(shortestPath);
    });
  }


  function animateShortestPath(shortestPath) {
    for (let i = 0; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        const { row, col } = shortestPath[i];
        setGrid(prev => {
          const newGrid = prev.map(r => r.map(n => ({ ...n })));
          newGrid[row][col].isPath = true;
          return newGrid;
        });
      }, 50 * i);
    }
    
  }



  return (
    <div className='max-w-full '>
      {
        grid?.map((row, index) => (
          <div key={index} className='flex w-full over'>
            {
              row.map((node, sindex) => (
                <Node key={sindex} node={node} index={sindex} onClick={() => toggleWall(node.row, node.col)} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Graph
