import type { AnnotationType } from "@interfaces/formInterface";

type Props = {
  values: AnnotationType[];
  onHandleLabel: (id: string, newLabel: string) => void;
  onHandleDelete: (id: string) => void;
};

const AnnotationTable = ({ values, onHandleLabel, onHandleDelete }: Props) => {
  return (
    <div className="mt-4 bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3 text-gray-800">Annotation List</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-3">
                Type
              </th>
              <th scope="col" className="px-4 py-3">
                Detail
              </th>
              <th scope="col" className="px-4 py-3">
                Position
              </th>
              <th scope="col" className="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {values.map((ann: AnnotationType) => (
              <tr key={ann.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">
                  {ann.type === "square" ? (
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
                    onChange={(e) => onHandleLabel(ann.id, e.target.value)}
                    className="border px-3 py-1 rounded-lg text-sm w-full"
                    placeholder="Label"
                  />
                </td>
                <td className="px-4 py-2">
                  {ann.type === "square"
                    ? `(${Math.round(ann.x)}, ${Math.round(
                        ann.y
                      )}) - (${Math.round(
                        ann.x + (ann.width || 0)
                      )}, ${Math.round(ann.y + (ann.height || 0))})`
                    : `(${Math.round(ann.x)}, ${Math.round(ann.y)})`}
                </td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    onClick={() => onHandleDelete(ann.id)}
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
  );
};

export default AnnotationTable;
