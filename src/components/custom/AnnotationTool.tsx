import type { Dispatch, SetStateAction } from "react";

type Props = {
  tool: "square" | "line" | "text" | null;
  setTool: Dispatch<SetStateAction<"square" | "line" | "text" | null>>;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRefresh: () => void;
  onMoveCanvas: (dir: any) => void;
};

const AnnotationTool = ({
  tool,
  setTool,
  onZoomIn,
  onZoomOut,
  onRefresh,
  onMoveCanvas,
}: Props) => {
  return (
    <div className="absolute top-4 left-4 z-50 bg-white/90 backdrop-blur-md rounded-lg shadow-md flex flex-col items-center gap-2 p-2 border border-gray-200">
      <button
        type="button"
        onClick={() => setTool("square")}
        className={`p-2 rounded-md text-lg ${
          tool === "square"
            ? "bg-blue-600 text-white shadow-md"
            : "hover:bg-gray-100 text-gray-700"
        }`}
        title="Rectangle Tool"
      >
        ▭
      </button>

      <button
        type="button"
        onClick={() => setTool("line")}
        className={`p-2 rounded-md text-lg ${
          tool === "line"
            ? "bg-blue-600 text-white shadow-md"
            : "hover:bg-gray-100 text-gray-700"
        }`}
        title="Line Tool"
      >
        ─
      </button>

      <button
        type="button"
        onClick={() => setTool("text")}
        className={`p-2 rounded-md text-lg ${
          tool === "text"
            ? "bg-blue-600 text-white shadow-md"
            : "hover:bg-gray-100 text-gray-700"
        }`}
        title="Text Tool"
      >
        T
      </button>

      <div className="w-6 border-t border-gray-300 my-1" />

      <button
        type="button"
        onClick={onZoomIn}
        className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
        title="Zoom In"
      >
        +
      </button>

      <button
        type="button"
        onClick={onZoomOut}
        className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
        title="Zoom Out"
      >
        -
      </button>

      <button
        type="button"
        onClick={onRefresh}
        className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
        title="Reset View"
      >
        ⟳
      </button>

      <div className="w-6 border-t border-gray-300 my-1" />

      {["up", "down", "left", "right"].map((dir: any) => (
        <button
          key={dir}
          type="button"
          onClick={() => onMoveCanvas(dir)}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
          title={`Move ${dir.charAt(0).toUpperCase() + dir.slice(1)}`}
        >
          {dir === "up"
            ? "↑"
            : dir === "down"
            ? "↓"
            : dir === "left"
            ? "←"
            : "→"}
        </button>
      ))}
    </div>
  );
};

export default AnnotationTool;
