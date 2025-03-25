import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Wrapper = styled.div`
  padding: 4rem 2rem;
  background: #0f111a;
  color: #fff;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: #00f5d4;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #1b1e2b;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #222;
  box-shadow: 0 0 8px rgba(0, 245, 212, 0.08);
`;

const Stat = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #00f5d4;
`;

const Label = styled.p`
  font-size: 0.9rem;
  color: #aaa;
  margin-top: 0.5rem;
`;

export default function PerformanceDashboard() {
  const [fps, setFps] = useState(60);
  const [hydrationTime, setHydrationTime] = useState(200);
  const [bundleSize] = useState("~180kb");
  const [lazyComponents] = useState(6);
  const [fpsHistory, setFpsHistory] = useState<{ time: number; fps: number }[]>(
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextFps = Math.floor(Math.random() * 15 + 50);
      setFps(nextFps);
      setHydrationTime(Math.floor(Math.random() * 100 + 150));
      setFpsHistory((prev) => [
        ...prev.slice(-19),
        { time: Date.now(), fps: nextFps },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <Title>📈 Performance Insights (Simulated)</Title>
      <Grid>
        <Card>
          <Stat>{fps} FPS</Stat>
          <Label>Frame Rate (Live simulated)</Label>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={fpsHistory}>
              <Line
                type="monotone"
                dataKey="fps"
                stroke="#00f5d4"
                strokeWidth={2}
                dot={false}
              />
              <XAxis hide dataKey="time" />
              <YAxis hide domain={[30, 75]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1c1e2b",
                  border: "none",
                  color: "#fff",
                }}
                labelFormatter={() => "Time"}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <Stat>{hydrationTime} ms</Stat>
          <Label>Hydration Time</Label>
        </Card>

        <Card>
          <Stat>{bundleSize}</Stat>
          <Label>Total JS Bundle Size</Label>
        </Card>

        <Card>
          <Stat>{lazyComponents}</Stat>
          <Label>Lazy Loaded Components</Label>
        </Card>

        <Card>
          <h3 style={{ color: "#fff" }}>Optimization Summary</h3>
          <ul
            style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: "#ccc" }}
          >
            <li>✅ Code Splitting Enabled</li>
            <li>✅ Lazy Loaded Routes</li>
            <li>✅ Tree Shaking Active</li>
            <li>✅ Responsive Image Handling</li>
            <li>✅ Preload Critical Assets</li>
          </ul>
        </Card>

        <Card>
          <h3 style={{ color: "#ff4d4f" }}>🚨 Detected Warnings</h3>
          <ul
            style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: "#faa" }}
          >
            <li>🖼️ Large image not optimized</li>
            <li>🔁 Possible unnecessary re-renders</li>
            <li>⛔ Excessive DOM depth (9+ levels)</li>
          </ul>
        </Card>
      </Grid>
    </Wrapper>
  );
}
