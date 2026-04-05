// @source 21st.dev/r/itaizeilig/tetris-loader
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
 * Types
 * ----------------------------------------------------------------*/

interface Cell {
  filled: boolean;
  color: string;
}

interface FallingPiece {
  shape: number[][];
  color: string;
  x: number;
  y: number;
  id: string;
}

export interface LoadingTetrisProps {
  size?: "sm" | "md" | "lg";
  speed?: "slow" | "normal" | "fast";
  showLoadingText?: boolean;
  loadingText?: string;
  className?: string;
}

/* ------------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------*/

const TETRIS_PIECES = [
  { shape: [[1, 1, 1, 1]] },
  { shape: [[1, 1], [1, 1]] },
  { shape: [[0, 1, 0], [1, 1, 1]] },
  { shape: [[1, 0], [1, 0], [1, 1]] },
  { shape: [[0, 1, 1], [1, 1, 0]] },
  { shape: [[1, 1, 0], [0, 1, 1]] },
  { shape: [[0, 1], [0, 1], [1, 1]] },
] as const;

const SIZE_CONFIG = {
  sm: { cellSize: "w-2 h-2", gridWidth: 8, gridHeight: 16, padding: "p-0.5" },
  md: { cellSize: "w-3 h-3", gridWidth: 10, gridHeight: 20, padding: "p-1" },
  lg: { cellSize: "w-4 h-4", gridWidth: 10, gridHeight: 20, padding: "p-1.5" },
} as const;

const SPEED_CONFIG = {
  slow: 150,
  normal: 80,
  fast: 40,
} as const;

const FILLED_CLASS = "bg-[var(--foreground,#000)] dark:bg-[var(--foreground,#fff)]";
const EMPTY_CLASS = "bg-[var(--background,#fff)] dark:bg-[var(--background,#000)]";

/* ------------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------*/

function rotateShape(shape: readonly (readonly number[])[]): number[][] {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated: number[][] = Array.from({ length: cols }, () =>
    Array(rows).fill(0)
  );

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][rows - 1 - i] = shape[i][j];
    }
  }

  return rotated;
}

function createEmptyGrid(width: number, height: number): Cell[][] {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ filled: false, color: "" }))
  );
}

/* ------------------------------------------------------------------
 * Main Component
 * ----------------------------------------------------------------*/

export default function LoadingTetris({
  size = "md",
  speed = "normal",
  showLoadingText = true,
  loadingText = "Loading...",
  className,
}: LoadingTetrisProps) {
  const config = SIZE_CONFIG[size];
  const fallSpeed = SPEED_CONFIG[speed];

  const [grid, setGrid] = useState<Cell[][]>(() =>
    createEmptyGrid(config.gridWidth, config.gridHeight)
  );
  const [fallingPiece, setFallingPiece] = useState<FallingPiece | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const frameRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const gridRef = useRef(grid);

  // Keep ref in sync
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const createNewPiece = useCallback((): FallingPiece => {
    const pieceData =
      TETRIS_PIECES[Math.floor(Math.random() * TETRIS_PIECES.length)];
    let shape: number[][] = pieceData.shape.map((row) => [...row]);

    const rotations = Math.floor(Math.random() * 4);
    for (let i = 0; i < rotations; i++) {
      shape = rotateShape(shape);
    }

    const maxX = config.gridWidth - shape[0].length;
    const x = Math.floor(Math.random() * (maxX + 1));

    return {
      shape,
      color: FILLED_CLASS,
      x,
      y: -shape.length,
      id: Math.random().toString(36).slice(2, 11),
    };
  }, [config.gridWidth]);

  const canPlacePiece = useCallback(
    (
      piece: FallingPiece,
      newX: number,
      newY: number,
      currentGrid: Cell[][]
    ): boolean => {
      for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
          if (piece.shape[row][col]) {
            const gridX = newX + col;
            const gridY = newY + row;

            if (
              gridX < 0 ||
              gridX >= config.gridWidth ||
              gridY >= config.gridHeight
            ) {
              return false;
            }

            if (gridY >= 0 && currentGrid[gridY][gridX].filled) {
              return false;
            }
          }
        }
      }
      return true;
    },
    [config.gridWidth, config.gridHeight]
  );

  const placePiece = useCallback(
    (piece: FallingPiece) => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) =>
          row.map((cell) => ({ ...cell }))
        );

        for (let row = 0; row < piece.shape.length; row++) {
          for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
              const gridX = piece.x + col;
              const gridY = piece.y + row;

              if (
                gridY >= 0 &&
                gridY < config.gridHeight &&
                gridX >= 0 &&
                gridX < config.gridWidth
              ) {
                newGrid[gridY][gridX] = {
                  filled: true,
                  color: piece.color,
                };
              }
            }
          }
        }

        return newGrid;
      });
    },
    [config.gridHeight, config.gridWidth]
  );

  const clearFullLines = useCallback(() => {
    setGrid((prevGrid) => {
      const linesToClear: number[] = [];

      prevGrid.forEach((row, index) => {
        if (row.every((cell) => cell.filled)) {
          linesToClear.push(index);
        }
      });

      if (linesToClear.length > 0) {
        setIsClearing(true);

        const markedGrid = prevGrid.map((row, rowIndex) => {
          if (linesToClear.includes(rowIndex)) {
            return row.map((cell) => ({
              ...cell,
              color: `${FILLED_CLASS} animate-pulse motion-reduce:animate-none opacity-50`,
            }));
          }
          return row;
        });

        setTimeout(() => {
          setGrid((currentGrid) => {
            const filteredGrid = currentGrid.filter(
              (_, index) => !linesToClear.includes(index)
            );
            const emptyRows = Array.from(
              { length: linesToClear.length },
              () =>
                Array.from({ length: config.gridWidth }, () => ({
                  filled: false,
                  color: "",
                }))
            );
            setIsClearing(false);
            return [...emptyRows, ...filteredGrid];
          });
        }, 200);

        return markedGrid;
      }

      return prevGrid;
    });
  }, [config.gridWidth]);

  const checkAndReset = useCallback(() => {
    const topRows = gridRef.current.slice(0, 4);
    const needsReset = topRows.some(
      (row) =>
        row.filter((cell) => cell.filled).length > config.gridWidth * 0.7
    );

    if (needsReset) {
      setIsClearing(true);
      setTimeout(() => {
        setGrid(createEmptyGrid(config.gridWidth, config.gridHeight));
        setFallingPiece(null);
        setIsClearing(false);
      }, 500);
      return true;
    }
    return false;
  }, [config.gridWidth, config.gridHeight]);

  // Game loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Static display for reduced motion
      return;
    }

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= fallSpeed) {
        lastUpdateRef.current = timestamp;

        if (!isClearing && !checkAndReset()) {
          setFallingPiece((prevPiece) => {
            if (!prevPiece) {
              return createNewPiece();
            }

            const newY = prevPiece.y + 1;

            if (canPlacePiece(prevPiece, prevPiece.x, newY, gridRef.current)) {
              return { ...prevPiece, y: newY };
            } else {
              placePiece(prevPiece);
              setTimeout(clearFullLines, 50);
              return createNewPiece();
            }
          });
        }
      }

      frameRef.current = requestAnimationFrame(gameLoop);
    };

    frameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    canPlacePiece,
    createNewPiece,
    placePiece,
    clearFullLines,
    checkAndReset,
    isClearing,
    fallSpeed,
  ]);

  // Render the grid with the falling piece overlaid
  const renderGrid = () => {
    const displayGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    if (fallingPiece && !isClearing) {
      for (let row = 0; row < fallingPiece.shape.length; row++) {
        for (let col = 0; col < fallingPiece.shape[row].length; col++) {
          if (fallingPiece.shape[row][col]) {
            const gridX = fallingPiece.x + col;
            const gridY = fallingPiece.y + row;

            if (
              gridY >= 0 &&
              gridY < config.gridHeight &&
              gridX >= 0 &&
              gridX < config.gridWidth
            ) {
              displayGrid[gridY][gridX] = {
                filled: true,
                color: fallingPiece.color,
              };
            }
          }
        }
      }
    }

    return displayGrid.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={cn(
              config.cellSize,
              "transition-all duration-100 motion-reduce:transition-none",
              cell.filled ? `${cell.color} scale-100` : `${EMPTY_CLASS} scale-95`,
              isClearing && rowIndex < 4
                ? "animate-pulse motion-reduce:animate-none"
                : ""
            )}
            style={{
              border: "1px solid var(--border, #d1d5db)",
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <div className="mb-6">
        <div
          className={cn("transition-colors", config.padding)}
          style={{
            border: "2px solid var(--foreground, #1f2937)",
            backgroundColor: "var(--background, #fff)",
          }}
        >
          {renderGrid()}
        </div>
      </div>

      {showLoadingText && (
        <div className="text-center">
          <p
            className="font-medium transition-colors motion-reduce:transition-none"
            style={{ color: "var(--foreground, #000)" }}
          >
            {loadingText}
          </p>
        </div>
      )}
    </div>
  );
}
