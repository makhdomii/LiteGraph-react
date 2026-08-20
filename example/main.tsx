import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/Home';
import { BasicPage } from './pages/basic';
import { ProgrammaticPage } from './pages/programmatic';
import { HooksPage } from './pages/hooks';
import { ThemePage } from './pages/theme';
import { LiveModePage } from './pages/live-mode';
import { OptionsPage } from './pages/options';
import { ExternalGraphPage } from './pages/external-graph';
import { DataPropPage } from './pages/data-prop';
import { ViewportPage } from './pages/viewport';
import { ConnectPage } from './pages/connect';
import { CallbacksPage } from './pages/callbacks';
import { CustomNodesPage } from './pages/custom-nodes';
import { SubgraphsPage } from './pages/subgraphs';
import { GroupsPage } from './pages/groups';
import { BasicNodesPage } from './pages/nodes/basic';
import { MathNodesPage } from './pages/nodes/math';
import { EventsNodesPage } from './pages/nodes/events';
import { WidgetsNodesPage } from './pages/nodes/widgets';
import { LogicNodesPage } from './pages/nodes/logic';
import { StringInputNodesPage } from './pages/nodes/string-input';
import { Math3dNodesPage } from './pages/nodes/math3d';
import 'litegraph-react/styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="basic" element={<BasicPage />} />
          <Route path="programmatic" element={<ProgrammaticPage />} />
          <Route path="hooks" element={<HooksPage />} />
          <Route path="theme" element={<ThemePage />} />
          <Route path="live-mode" element={<LiveModePage />} />
          <Route path="options" element={<OptionsPage />} />
          <Route path="external-graph" element={<ExternalGraphPage />} />
          <Route path="data-prop" element={<DataPropPage />} />
          <Route path="viewport" element={<ViewportPage />} />
          <Route path="connect" element={<ConnectPage />} />
          <Route path="callbacks" element={<CallbacksPage />} />
          <Route path="custom-nodes" element={<CustomNodesPage />} />
          <Route path="subgraphs" element={<SubgraphsPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="nodes/basic" element={<BasicNodesPage />} />
          <Route path="nodes/math" element={<MathNodesPage />} />
          <Route path="nodes/events" element={<EventsNodesPage />} />
          <Route path="nodes/widgets" element={<WidgetsNodesPage />} />
          <Route path="nodes/logic" element={<LogicNodesPage />} />
          <Route path="nodes/string-input" element={<StringInputNodesPage />} />
          <Route path="nodes/math3d" element={<Math3dNodesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
