import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Node
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  // Frontend Skills
  { id: "react", position: { x: 100, y: 50 }, data: { label: "⚛️ React" }, style: { background: "#1f2937", color: "#00f5d4" }, type: "default" },
  { id: "ts", position: { x: 250, y: 50 }, data: { label: "🟦 TypeScript" }, style: { background: "#1f2937", color: "#00d8ff" } },
  { id: "redux", position: { x: 400, y: 50 }, data: { label: "Redux Toolkit" }, style: { background: "#1f2937", color: "#c678dd" } },

  // Tooling
  { id: "styled", position: { x: 100, y: 150 }, data: { label: "💅 Styled Components" }, style: { background: "#21262d", color: "#ff69b4" } },
  { id: "webvitals", position: { x: 250, y: 150 }, data: { label: "📊 Web Vitals" }, style: { background: "#21262d", color: "#ffc107" } },
  { id: "vite", position: { x: 400, y: 150 }, data: { label: "⚡ Vite" }, style: { background: "#21262d", color: "#9370db" } },
  { id: "eslint", position: { x: 550, y: 150 }, data: { label: "🔍 ESLint / Prettier" }, style: { background: "#21262d", color: "#f5f5f5" } },

  // Projects
  { id: "gulfhr", position: { x: 150, y: 300 }, data: { label: "🏢 Gulf HR (HRMS)" }, style: { background: "#111827", color: "#ffffff" } },
  { id: "resumeio", position: { x: 350, y: 300 }, data: { label: "📄 Resume.io" }, style: { background: "#111827", color: "#ffffff" } },
  { id: "shs", position: { x: 550, y: 300 }, data: { label: "🏠 SHS Homeopathy" }, style: { background: "#111827", color: "#ffffff" } },
  { id: "twilio", position: { x: 750, y: 300 }, data: { label: "🔐 Twilio FraudGuard" }, style: { background: "#111827", color: "#ffffff" } }
];

const initialEdges = [
  { id: "e1", source: "react", target: "gulfhr" },
  { id: "e2", source: "ts", target: "gulfhr" },
  { id: "e3", source: "redux", target: "gulfhr" },
  { id: "e4", source: "styled", target: "resumeio" },
  { id: "e5", source: "ts", target: "resumeio" },
  { id: "e6", source: "webvitals", target: "resumeio" },
  { id: "e7", source: "react", target: "shs" },
  { id: "e8", source: "ts", target: "shs" },
  { id: "e9", source: "react", target: "twilio" },
  { id: "e10", source: "ts", target: "twilio" },
  { id: "e11", source: "webvitals", target: "twilio" },
  { id: "e12", source: "vite", target: "twilio" },
  { id: "e13", source: "eslint", target: "resumeio" }
];

export default function SkillGraph() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ height: "100vh", background: "#0e101c" }}>
      <h2 style={{ textAlign: "center", color: "#00f5d4", paddingTop: "1rem" }}>
        🧠 Visual Resume Skill Graph
      </h2>
      <ReactFlow
        nodes={nodes}
        edges={edges.map((e) => ({ ...e, markerEnd: { type: MarkerType.ArrowClosed } }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap nodeColor={(n) => n.style?.background as string || "#00f5d4"} />
        <Controls />
        <Background color="#222" gap={16} />
      </ReactFlow>
    </div>
  );
}
