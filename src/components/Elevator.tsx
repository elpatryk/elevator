import React, { useState, useEffect } from "react";

export default function Elevator() {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [direction, setDirection] = useState("");
  const [requestedFloors, setRequestedFloors] = useState<number[]>([]);
  const handleFloorButtonClick = (floor: number) => {
    const newRequestedFloors = [...requestedFloors];
    const index =
      direction === "up"
        ? newRequestedFloors.findIndex((f) => f > floor)
        : newRequestedFloors.findIndex((f) => f < floor);

    newRequestedFloors.splice(
      index === -1 ? newRequestedFloors.length : index,
      0,
      floor
    );
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
  }, [currentFloor, requestedFloors]);

  return (
    <div className="elevator-container">
      Elevator
      <div className="floor-buttons">
        <div className="column">
          <div>
            <button
              onClick={() => handleFloorButtonClick(0)}
              disabled={!direction}
              className={currentFloor === 0 ? "active" : ""}
            >
              Ground Floor
            </button>
            <button onClick={handleUpButtonClick}>↑</button>
          </div>
          <div>
            <button
              onClick={() => handleFloorButtonClick(1)}
              disabled={!direction}
              className={currentFloor === 1 ? "active" : ""}
            >
              Floor 1
            </button>
            <button onClick={handleUpButtonClick}>↑</button>
            <button onClick={handleDownButtonClick}>↓</button>
          </div>

          <div>
            <button
              disabled={!direction}
              className={currentFloor === 2 ? "active" : ""}
              onClick={() => handleFloorButtonClick(2)}
            >
              Floor 2
            </button>
            <button onClick={handleUpButtonClick}>↑</button>
            <button onClick={handleDownButtonClick}>↓</button>
          </div>
          <div>
            <button
              disabled={!direction}
              className={currentFloor === 3 ? "active" : ""}
              onClick={() => handleFloorButtonClick(3)}
            >
              Floor 3
            </button>
            <button onClick={handleUpButtonClick}>↑</button>
            <button onClick={handleDownButtonClick}>↓</button>
          </div>
          <div>
            <button
              disabled={!direction}
              className={currentFloor === 4 ? "active" : ""}
              onClick={() => handleFloorButtonClick(4)}
            >
              Floor 4
            </button>
            <button onClick={handleUpButtonClick}>↑</button>
            <button onClick={handleDownButtonClick}>↓</button>
          </div>
          <div>
            <button
              disabled={!direction}
              className={currentFloor === 5 ? "active" : ""}
              onClick={() => handleFloorButtonClick(5)}
            >
              Floor 5
            </button>

            <button onClick={handleDownButtonClick}>↓</button>
          </div>
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
