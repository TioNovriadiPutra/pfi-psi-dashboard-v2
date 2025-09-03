import { useState, useRef, useEffect } from "react";
import { AddFooter, AddHeader } from "@components/shared";
import MainContainer from "@containers/MainContainer";
import useResponsive from "@hooks/useResponsive";
import { useForm } from "react-hook-form";

type ToolType = "square" | "text" | null;

interface Annotation {
  id: string;
  type: "square" | "text";
  x: number;
  y: number;
  width?: number;
  height?: number;
  text: string;
}

const AnnotationForm = () => {
  const { control, handleSubmit, setValue, register } = useForm({
    defaultValues: {
      image: null,
      projectName: "",
      category: "",
      description: "",
      annotations: [],
    },
  });

  const { isTablet } = useResponsive();
  const [image, setImage] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [tool, setTool] = useState<ToolType>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [currentEndPoint, setCurrentEndPoint] = useState<{ x: number; y: number } | null>(null);

  // Zoom & Pan state
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(
    null
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  /** ---- Upload ---- */
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files?.[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setImage(base64String);        // for <img> + preview
      setValue("image", base64String); // for API
      setOffset({ x: 0, y: 0 });
      setScale(1);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  };

  /** ---- Mouse Events ---- */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    if (e.button === 1 || e.ctrlKey) {
      // Middle click or Ctrl + click -> Pan
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
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        type: "text",
        x,
        y,
        text,
      };
      updateAnnotations([...annotations, newAnnotation]);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
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

    let newAnnotation: Annotation | null = null;

    if (tool === "square") {
      const label = prompt("Enter label for this box:") || `Box ${annotations.length + 1}`;
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
      const label = prompt("Enter label for this line:") || `Line ${annotations.length + 1}`;
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
      updateAnnotations([...annotations, newAnnotation]);
    }

    // Reset drawing
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentEndPoint(null);

  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && panStart) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setPanStart({ x: e.clientX, y: e.clientY });
      drawAnnotations();
      return;
    }

    if (!canvasRef.current || !isDrawing || !startPoint) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    setCurrentEndPoint({ x, y });
    drawAnnotations();
  };

  // Add wheel event for zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    const wheel = e.deltaY < 0 ? 1 : -1;
    const zoom = Math.exp(wheel * zoomIntensity);

    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calculate the new scale
      const newScale = Math.max(0.1, Math.min(5, scale * zoom));

      // Adjust offset to zoom towards mouse position
      setOffset(prev => ({
        x: prev.x - (mouseX - prev.x) * (zoom - 1),
        y: prev.y - (mouseY - prev.y) * (zoom - 1)
      }));

      setScale(newScale);
    }
  };

  /** ---- Manage Annotations ---- */
  const updateAnnotations = (updated: Annotation[]) => {
    setAnnotations(updated);
    setValue("annotations", updated);
  };

  const handleLabelChange = (id: string, newLabel: string) => {
    const updated = annotations.map((ann) =>
      ann.id === id ? { ...ann, text: newLabel } : ann
    );
    updateAnnotations(updated);
  };

  const handleDelete = (id: string) => {
    const updated = annotations.filter((ann) => ann.id !== id);
    updateAnnotations(updated);
  };

  /** ---- Draw ---- */
  const drawAnnotations = () => {
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

    // Draw existing annotations
    annotations.forEach((ann) => {
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
      } else if (ann.type === "line" && ann.width !== undefined && ann.height !== undefined) {
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2 / scale;
        ctx.beginPath();
        ctx.moveTo(ann.x, ann.y);
        ctx.lineTo(ann.x + ann.width, ann.y + ann.height);
        ctx.stroke();

        ctx.fillStyle = "green";
        ctx.font = `${14 / scale}px Arial`;
        ctx.fillText(ann.text, ann.x + ann.width / 2, ann.y + ann.height / 2 - 5);
      }
    });

    // Draw the current line while drawing
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

  useEffect(() => {
    if (image) {
      drawAnnotations();
    }
  }, [image, annotations, scale, offset, isDrawing, startPoint, currentEndPoint]);

  /** ---- Submit ---- */
const onHandleSubmit = handleSubmit(async (body) => {
  try {
    let finalImage = body.image;

    // If canvas exists, capture with annotations
    if (canvasRef.current) {
      finalImage = canvasRef.current.toDataURL("image/png");
    }

    const blob: Blob = await new Promise((resolve) =>
      canvasRef.current!.toBlob((b) => resolve(b as Blob), "image/png")
    );
if (!canvasRef.current) {
      alert("No canvas to save!");
      return;
    }
    const payload = {
      projectName: body.projectName,
      category: body.category,
      description: body.description,
      image: finalImage, // <-- use canvas capture here
      annotations: annotations.map((ann) => ({
        type: ann.type,
        x: Math.round(ann.x),
        y: Math.round(ann.y),
        width: ann.width ?? 0,
        height: ann.height ?? 0,
        text: ann.text,
      })),
    };

    const response = await fetch("http://localhost:8000/annotations", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ✅ fix content-type
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Failed to save annotations:", err);
      alert("Failed to save annotations");
      return;
    }

    const data = await response.json();
    console.log("Saved successfully:", data);
    alert("Annotations saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Error saving annotations");
  }
});

  
  /** ---- Submit ---- */
  const onHandleSubmit2 = handleSubmit(async (body) => {
  try {
    const payload = {
      projectName: body.projectName,
      category: body.category,
      description: body.description,
      image: body.image, // now base64 string
      annotations: annotations.map((ann) => ({
        type: ann.type,
        x: Math.round(ann.x),
        y: Math.round(ann.y),
        width: ann.width ?? 0,
        height: ann.height ?? 0,
        text: ann.text,
      })),
    };

    const response = await fetch("http://localhost:8000/annotations", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Failed to save annotations:", err);
      alert("Failed to save annotations");
      return;
    }

    const data = await response.json();
    console.log("Saved successfully:", data);
    alert("Annotations saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Error saving annotations");
  }
});

  // Add movement buttons
  const moveCanvas = (direction: 'up' | 'down' | 'left' | 'right') => {
    const moveAmount = 30;
    setOffset(prev => {
      switch (direction) {
        case 'up': return { ...prev, y: prev.y + moveAmount };
        case 'down': return { ...prev, y: prev.y - moveAmount };
        case 'left': return { ...prev, x: prev.x + moveAmount };
        case 'right': return { ...prev, x: prev.x - moveAmount };
        default: return prev;
      }
    });
  };

  return (
    <MainContainer type="add">
      <AddHeader title="Annotation" onSubmit={onHandleSubmit} />


      <div
        ref={formRef}
        className="overflow-y-auto pb-20"
        style={{ maxHeight: 'calc(100vh - 150px)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="lg:col-span-1 space-y-4">

            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-3 text-gray-800">Upload Image</h3>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    onChange={onUploadImage}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-3 text-gray-800">Project Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Building Name</label>
                  <input
                    type="text"
                    {...register("projectName")}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter project name"
                    
                  />

                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Elevation</label>
                  <select
                    {...register("category")}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="E3">E3</option>
                    <option value="E4">E4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                  <textarea
                    {...register("description")}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Describe your annotations"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>


          <div className="lg:col-span-2 space-y-4">

            {image && (
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-3 text-gray-800">Annotation Canvas</h3>

                {/* Instructions */}
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="font-medium text-sm text-blue-800 mb-1">Instructions:</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Use mouse wheel to zoom in/out</li>
                    <li>• Hold Ctrl + drag or Middle mouse button to pan</li>
                    <li>• Use the arrow buttons to move the canvas</li>
                    <li>• Select a tool first (Square or Text) before annotating</li>
                  </ul>
                </div>
              </div>
            )}


            {image && (
              <div className="bg-white rounded-lg shadow p-4 relative">

                <div className="absolute top-4 left-4 z-50 bg-white/90 backdrop-blur-md rounded-lg shadow-md flex flex-col items-center gap-2 p-2 border border-gray-200">

                  <button
                    type="button"
                    onClick={() => setTool("square")}
                    className={`p-2 rounded-md text-lg ${tool === "square" ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-100 text-gray-700"
                      }`}
                    title="Rectangle Tool"
                  >
                    ▭
                  </button>

                  <button
                    type="button"
                    onClick={() => setTool("line")}
                    className={`p-2 rounded-md text-lg ${tool === "line" ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-100 text-gray-700"
                      }`}
                    title="Line Tool"
                  >
                    ─
                  </button>

                  <button
                    type="button"
                    onClick={() => setTool("text")}
                    className={`p-2 rounded-md text-lg ${tool === "text" ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-100 text-gray-700"
                      }`}
                    title="Text Tool"
                  >
                    T
                  </button>

                  {/* Divider */}
                  <div className="w-6 border-t border-gray-300 my-1"></div>

                  {/* Zoom Controls */}
                  <button
                    type="button"
                    onClick={() => setScale(scale + 0.1)}
                    className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    title="Zoom In"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => setScale(scale > 0.2 ? scale - 0.1 : scale)}
                    className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    title="Zoom Out"
                  >
                    -
                  </button>

                  <button
                    type="button"
                    onClick={() => { setOffset({ x: 0, y: 0 }); setScale(1); }}
                    className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    title="Reset View"
                  >
                    ⟳
                  </button>

                  
                  <div className="w-6 border-t border-gray-300 my-1"></div>

                  
                  {["up", "down", "left", "right"].map((dir) => (
                    <button
                      key={dir}
                      type="button"
                      onClick={() => moveCanvas(dir as any)}
                      className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
                      title={`Move ${dir.charAt(0).toUpperCase() + dir.slice(1)}`}
                    >
                      {dir === "up" ? "↑" : dir === "down" ? "↓" : dir === "left" ? "←" : "→"}
                    </button>
                  ))}
                </div>

                
                <div className="relative overflow-auto max-w-full border rounded-lg bg-gray-100 flex justify-center items-center min-h-[400px]">
                  <img
                    ref={imageRef}
                    src={image}
                    alt="to annotate"
                    style={{ display: "none" }}
                    onLoad={drawAnnotations}
                  />
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    style={{ cursor: tool ? "crosshair" : "default" }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onWheel={handleWheel}
                    onContextMenu={(e) => e.preventDefault()} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        
        {image && annotations.length > 0 && (
          <div className="mt-4 bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-3 text-gray-800">Annotation List</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-4 py-3">Type</th>
                    <th scope="col" className="px-4 py-3">Detail</th>
                    <th scope="col" className="px-4 py-3">Position</th>
                    <th scope="col" className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {annotations.map((ann) => (
                    <tr key={ann.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">
                        {ann.type === 'square' ? (
                          <span className="inline-flex items-center gap-1">
                            <span className="text-red-500">▭</span> Box
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <span className="text-blue-500">✎</span> Text
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={ann.text}
                          onChange={(e) => handleLabelChange(ann.id, e.target.value)}
                          className="border px-3 py-1 rounded-lg text-sm w-full"
                          placeholder="Label"
                        />
                      </td>
                      <td className="px-4 py-2">
                        {ann.type === 'square'
                          ? `(${Math.round(ann.x)}, ${Math.round(ann.y)}) - (${Math.round(ann.x + (ann.width || 0))}, ${Math.round(ann.y + (ann.height || 0))})`
                          : `(${Math.round(ann.x)}, ${Math.round(ann.y)})`}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => handleDelete(ann.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                          title="Delete annotation"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isTablet && <AddFooter onSubmit={onHandleSubmit} />}
    </MainContainer>
  );
};

export default AnnotationForm;