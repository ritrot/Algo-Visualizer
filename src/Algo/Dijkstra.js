export default function dijkstra(grid, startNode, endNode) {
    const visitedNodes = [];
    const nodes = grid.map(row => row.map(node => ({ ...node })));
    const start = nodes[startNode.row][startNode.col];
    start.distance = 0;

    const unvisited = getAllNodes(nodes);

    while (unvisited.length) {
        unvisited.sort((a, b) => a.distance - b.distance);
        const closest = unvisited.shift();

        if (closest.distance === Infinity) break;
        closest.isVisited = true;
        visitedNodes.push(closest);

        if (closest.row === endNode.row && closest.col === endNode.col) break;

        const neighbors = getUnvisitedNeighbors(closest, nodes);
        for (const neighbor of neighbors) {
            if (neighbor.distance > closest.distance + 1) {
                neighbor.distance = closest.distance + 1;
                neighbor.previousNode = closest;
            }
        }
    }

    return visitedNodes;
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) for (const node of row) nodes.push(node);
    return nodes;
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(n => !n.isVisited && !n.isWall);
}


// export default function dijkstra(grid, startNode, endNode) {
//     if (!grid || !startNode || !endNode || startNode === endNode) return [];
  
//     // Clone grid and nodes
//     const newGrid = grid.map(row => row.map(node => ({ ...node })));
  
//     const visitedNodes = [];
//     const start = newGrid[startNode.row][startNode.col];
//     const end = newGrid[endNode.row][endNode.col];
//     start.distance = 0;
  
//     const unvisitedNodes = getAllNodes(newGrid);
  
//     while (unvisitedNodes.length) {
//       sortUnvistedNodes(unvisitedNodes);
//       const closestNode = unvisitedNodes.shift();
  
//       if (closestNode.distance === Infinity) break;
  
//       closestNode.isVisited = true;
//       visitedNodes.push(closestNode);
  
//       if (closestNode.row === end.row && closestNode.col === end.col) break;
  
//       updateUnvisitedNeighbors(closestNode, newGrid);
//     }
  
//     return visitedNodes;
//   }
  

// function sortUnvistedNodes(unvisitedNodes) {
//     unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
// }

// function updateUnvisitedNeighbors(node, grid) {
//     const neighbors = getUnvistedNeighbors(node, grid);
//     for (const neighbor of neighbors) {
//         if (neighbor.distance > node.distance + 1) {
//             neighbor.distance = node.distance + 1;
//             neighbor.previousNode = node;
//         }
//     }

// }

// function getUnvistedNeighbors(node, grid) {
//     const neighbors = []
//     const { row, col } = node;
//     if (row > 0) neighbors.push(grid[row - 1][col]);
//     if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//     if (col > 0) neighbors.push(grid[row][col - 1]);
//     if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

//     return neighbors.filter(item => !item.isVisited);
// }


// function getAllNodes(grid) {
//     const nodes = [];
//     for (const row of grid) {
//         for (const node of row) {
//             nodes.push(node);
//         }
//     }
//     return nodes;

// }


// // get the nodes in shorted order path

export function getNodeswithShortestPath(finshNode) {
    const path = [];
    let currentNode = finshNode;

    while (currentNode != null) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return path;
}