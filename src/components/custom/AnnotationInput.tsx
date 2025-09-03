import useAnnotationInput from "@hooks/useAnnotationInput";
import type { InputType } from "@interfaces/formInterface";
import { type Control } from "react-hook-form";
import AnnotationTool from "./AnnotationTool";
import AnnotationTable from "./AnnotationTable";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const AnnotationInput = ({ inputData, control }: Props) => {
  const {
    tool,
    setTool,
    imageRef,
    canvasRef,
    field,
    image,
    onZoomIn,
    onZoomOut,
    onRefresh,
    onMoveCanvas,
    onDraw,
    onHandleMouseDown,
    onHandleMouseUp,
    onHandleMouseMove,
    onHandleWheel,
    onHandleLabel,
    onHandleDelete,
  } = useAnnotationInput(inputData, control);

  if (!image) return null;

  return (
    <div className="gap-[8px]">
      {inputData.label && (
        <p className="text-body-sm font-medium text-neutral-900">
          {inputData.label}

          {inputData.required && <span className="text-red-600"> *</span>}
        </p>
      )}

      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-body-sm font-medium text-blue-800 mb-1">
          Instructions:
        </p>

        <ul className="text-body-xs text-blue-600 space-y-1">
          <li>• Use mouse wheel to zoom in/out</li>
          <li>• Hold Ctrl + drag or Middle mouse button to pan</li>
          <li>• Use the arrow buttons to move the canvas</li>
          <li>• Select a tool first (Square or Text) before annotating</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-4 relative">
        <AnnotationTool
          tool={tool}
          setTool={setTool}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onRefresh={onRefresh}
          onMoveCanvas={onMoveCanvas}
        />

        <div className="relative overflow-auto max-w-full border rounded-lg bg-gray-100 flex justify-center items-center min-h-[400px]">
          <img
            ref={imageRef}
            src={image}
            alt="to annotate"
            style={{ display: "none" }}
            onLoad={onDraw}
          />

          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{ cursor: tool ? "crosshair" : "default" }}
            onMouseDown={onHandleMouseDown}
            onMouseUp={onHandleMouseUp}
            onMouseMove={onHandleMouseMove}
            onWheel={onHandleWheel}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {field.value.length > 0 && (
        <AnnotationTable
          values={field.value}
          onHandleLabel={onHandleLabel}
          onHandleDelete={onHandleDelete}
        />
      )}
    </div>
  );
};

export default AnnotationInput;
