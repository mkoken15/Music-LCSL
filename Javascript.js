import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { FilesProvider } from './contexts/FilesContext';
import HomePage from './pages/HomePage';
import FolderPage from './pages/FolderPage';
import TrashPage from './pages/TrashPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
return (
<ThemeProvider>
<FilesProvider>
<BrowserRouter>
<div className="App">
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/folder/:folderId" element={<FolderPage />} />
<Route path="/trash" element={<TrashPage />} />
<Route path="/settings" element={<SettingsPage />} />
</Routes>
</div>
</BrowserRouter>
</FilesProvider>
</ThemeProvider>
);
}

export default App;

