import React, { useState, useEffect } from "react";

type Props = {};

export default function Elevator({}: Props) {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [direction, setDirection] = useState("");
  const [requestedFloors, setRequestedFloors] = useState<number[]>([]);

  const handleFloorButtonClick = (floor: number) => {
    const newRequestedFloors = [...requestedFloors];
    const currentFloorIndex = newRequestedFloors.indexOf(currentFloor);
    if (currentFloorIndex === -1) {
      newRequestedFloors.push(floor);
    } else {
      const nextFloorIndex = currentFloorIndex + (direction === "up" ? 1 : -1);
      newRequestedFloors.splice(nextFloorIndex, 0, floor);
    }
    setRequestedFloors(newRequestedFloors);
  };

  const handleUpButtonClick = () => {
    setDirection("up");
  };

  const handleDownButtonClick = () => {
    setDirection("down");
  };

  const calculateRoute = () => {
    const floors = [...requestedFloors];
    if (direction === "up") {
      floors.sort((a, b) => a - b);
    } else if (direction === "down") {
      floors.sort((a, b) => b - a);
    }
    return floors;
  };

  const moveElevator = (from: number, to: number) => {
    let floorsToMove: number;

    switch (to - from) {
      case 1:
        floorsToMove = 1;
        break;
      case -1:
        floorsToMove = 1;
        break;
      case 0:
        floorsToMove = 0;
        break;
      default:
        floorsToMove = Math.abs(to - from);
    }

    const timeToMove = floorsToMove * 1000;

    setTimeout(() => {
      setCurrentFloor(to);
    }, timeToMove);
  };

  useEffect(() => {
    if (requestedFloors.length === 0) return;

    const route = calculateRoute();
    const nextFloor = route[0];
    const isGoingUp = direction === "up";
    const isNextFloorUp = nextFloor > currentFloor;
    const isNextFloorDown = nextFloor < currentFloor;

    if ((isGoingUp && isNextFloorUp) || (!isGoingUp && isNextFloorDown)) {
      // move elevator to next floor
      moveElevator(currentFloor, nextFloor);
      // remove the current floor from requested floors
      setRequestedFloors((prev) => prev.slice(1));
    }
  }, [currentFloor, direction, requestedFloors]);

  return (
    <div className="elevator-container">
      Elevator
      <div className="floor-buttons">
        <div className="column">
          <button
            onClick={() => handleFloorButtonClick(0)}
            disabled={!direction}
          >
            Ground Floor
          </button>
          <button
            onClick={() => handleFloorButtonClick(1)}
            disabled={!direction}
          >
            Floor 1
          </button>
        </div>
        <div className="column">
          <button
            disabled={!direction}
            onClick={() => handleFloorButtonClick(2)}
          >
            Floor 2
          </button>
          <button
            disabled={!direction}
            onClick={() => handleFloorButtonClick(3)}
          >
            Floor 3
          </button>
          <button
            disabled={!direction}
            onClick={() => handleFloorButtonClick(4)}
          >
            Floor 4
          </button>
          <button
            disabled={!direction}
            onClick={() => handleFloorButtonClick(5)}
          >
            Floor 5
          </button>
        </div>
        <div className="direction-buttons">
          <button onClick={handleUpButtonClick} disabled={currentFloor === 5}>
            Up
          </button>
          <button onClick={handleDownButtonClick} disabled={currentFloor === 0}>
            Down
          </button>
        </div>
      </div>
      <div className="current-floor">
        <div>
          <h3>Current Floor:</h3>
          <h3>{currentFloor}</h3>
          <h3>Direction:</h3>
          <h3>{direction || "none"}</h3>
        </div>
      </div>
    </div>
  );
}
