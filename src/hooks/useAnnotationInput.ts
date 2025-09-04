import type { AnnotationType, InputType } from "@interfaces/formInterface";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type WheelEvent,
} from "react";
import { useController, useWatch, type Control } from "react-hook-form";

const useAnnotationInput = (
  inputData: InputType,
  control: Control<any, any>
) => {
  const [tool, setTool] = useState<"square" | "text" | "line" | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [currentEndPoint, setCurrentEndPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(
    null
  );

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { field } = useController({
    name: inputData.name,
    control,
  });

  const image = useWatch({
    control,
    name: "image",
  });

  const onZoomIn = () => setScale(scale + 1);

  const onZoomOut = () => setScale(scale > 0.2 ? scale - 0.1 : scale);

  const onRefresh = () => {
    setOffset({ x: 0, y: 0 });
    setScale(1);
  };

  const onMoveCanvas = (direction: "up" | "down" | "left" | "right") => {
    const moveAmount = 30;

    setOffset((prev) => {
      switch (direction) {
        case "up":
          return { ...prev, y: prev.y + moveAmount };
        case "down":
          return { ...prev, y: prev.y - moveAmount };
        case "left":
          return { ...prev, x: prev.x + moveAmount };
        case "right":
          return { ...prev, x: prev.x - moveAmount };
        default:
          return prev;
      }
    });
  };

  const onDraw = () => {
    if (!canvasRef.current || !imageRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    ctx.drawImage(
      imageRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    field.value.forEach((ann: AnnotationType) => {
      if (ann.type === "square" && ann.width && ann.height) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2 / scale;
        ctx.strokeRect(ann.x, ann.y, ann.width, ann.height);
        ctx.fillStyle = "red";
        ctx.font = `${14 / scale}px Arial`;
        ctx.fillText(ann.text, ann.x, ann.y - 5);
      } else if (ann.type === "text") {
        ctx.fillStyle = "blue";
        ctx.font = `${16 / scale}px Arial`;
        ctx.fillText(ann.text, ann.x, ann.y);
      } else if (
        ann.type === "line" &&
        ann.width !== undefined &&
        ann.height !== undefined
      ) {
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2 / scale;
        ctx.beginPath();
        ctx.moveTo(ann.x, ann.y);
        ctx.lineTo(ann.x + ann.width, ann.y + ann.height);
        ctx.stroke();

        ctx.fillStyle = "green";
        ctx.font = `${14 / scale}px Arial`;
        ctx.fillText(
          ann.text,
          ann.x + ann.width / 2,
          ann.y + ann.height / 2 - 5
        );
      }
    });

    if (isDrawing && startPoint && currentEndPoint) {
      if (tool === "line") {
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2 / scale;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currentEndPoint.x, currentEndPoint.y);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (tool === "square") {
        const width = currentEndPoint.x - startPoint.x;
        const height = currentEndPoint.y - startPoint.y;
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2 / scale;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(startPoint.x, startPoint.y, width, height);
        ctx.setLineDash([]);
      }
    }

    ctx.restore();
  };

  const onUpdate = (updated: AnnotationType[]) => {
    field.onChange(updated);
  };

  const onHandleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    if (e.button === 1 || e.ctrlKey) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing";
      }
      return;
    }

    if (!tool) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    if (tool === "square" || tool === "line") {
      setIsDrawing(true);
      setStartPoint({ x, y });
      setCurrentEndPoint({ x, y });
    } else if (tool === "text") {
      const text = prompt("Enter text annotation:") || "Text";
      const newAnnotation: AnnotationType = {
        id: Date.now().toString(),
        type: "text",
        x,
        y,
        text,
      };

      onUpdate([...field.value, newAnnotation]);
    }
  };

  const onHandleMouseUp = (e: React.MouseEvent) => {
    if (isPanning) {
      setIsPanning(false);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "crosshair";
      }
      return;
    }

    if (!canvasRef.current || !startPoint) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const endX = (e.clientX - rect.left - offset.x) / scale;
    const endY = (e.clientY - rect.top - offset.y) / scale;

    let newAnnotation: AnnotationType | null = null;

    if (tool === "square") {
      const label =
        prompt("Enter label for this box:") || `Box ${field.value.length + 1}`;
      newAnnotation = {
        id: Date.now().toString(),
        type: "square",
        x: startPoint.x,
        y: startPoint.y,
        width: endX - startPoint.x,
        height: endY - startPoint.y,
        text: label,
      };
    } else if (tool === "line") {
      const label =
        prompt("Enter label for this line:") ||
        `Line ${field.value.length + 1}`;
      newAnnotation = {
        id: Date.now().toString(),
        type: "line",
        x: startPoint.x,
        y: startPoint.y,
        width: endX - startPoint.x,
        height: endY - startPoint.y,
        text: label,
      };
    }

    if (newAnnotation) {
      onUpdate([...field.value, newAnnotation]);
    }

    setIsDrawing(false);
    setStartPoint(null);
    setCurrentEndPoint(null);
  };

  const onHandleMouseMove = (e: MouseEvent) => {
    if (isPanning && panStart) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setPanStart({ x: e.clientX, y: e.clientY });
      onDraw();
      return;
    }

    if (!canvasRef.current || !isDrawing || !startPoint) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    setCurrentEndPoint({ x, y });
    onDraw();
  };

  // Add wheel event for zooming
  const onHandleWheel = (e: WheelEvent) => {
    e.preventDefault();

    const LINE = 16;
    const dx = e.deltaMode === 1 ? e.deltaX * LINE : e.deltaX;
    const dy = e.deltaMode === 1 ? e.deltaY * LINE : e.deltaY;

    const isPinchZoom = e.ctrlKey;

    if (isPinchZoom) {
      const rect = canvasRef.current!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const zoomFactor = Math.exp(-dy * 0.001);
      const nextScale = Math.min(5, Math.max(0.2, scale * zoomFactor));

      setOffset((prev) => ({
        x: mx - ((mx - prev.x) * nextScale) / scale,
        y: my - ((my - prev.y) * nextScale) / scale,
      }));
      setScale(nextScale);
    } else {
      setOffset((prev) => ({
        x: prev.x - dx,
        y: prev.y - dy,
      }));
    }
  };

  const onHandleLabel = (id: string, newLabel: string) => {
    const updated = field.value.map((ann: AnnotationType) =>
      ann.id === id ? { ...ann, text: newLabel } : ann
    );

    onUpdate(updated);
  };

  const onHandleDelete = (id: string) => {
    const updated = field.value.filter((ann: AnnotationType) => ann.id !== id);

    onUpdate(updated);
  };

  useEffect(() => {
    if (image) {
      onDraw();
    }
  }, [
    image,
    field.value,
    scale,
    offset,
    isDrawing,
    startPoint,
    currentEndPoint,
  ]);

  return {
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
    onUpdate,
    onHandleMouseDown,
    onHandleMouseUp,
    onHandleMouseMove,
    onHandleWheel,
    onHandleDelete,
    onHandleLabel,
  };
};

export default useAnnotationInput;
