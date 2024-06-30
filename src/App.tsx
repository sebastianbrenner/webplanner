import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box, Drawer, IconButton, Tab, Tabs, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import SettingsCmp from './components/Settings';
import Flow from './modules/Flow';
import NoteBookCmp from './modules/NoteBookCmp';
import defaultSettings, { ModuleNames, Settings } from './settings';

const App = () => {
    const [value, setValue] = useState<ModuleNames>('notebook');
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const handleSettingsChange = (newSettings: Settings) => {
        setSettings(newSettings);
    };

    const handleChange = (e: React.SyntheticEvent, newValue: ModuleNames) => {
        setValue(newValue);
    };

    useEffect(() => {
        const lsSettings = localStorage.getItem('webPlannerSettings');
        if (lsSettings !== null) {
            setSettings(JSON.parse(lsSettings));
        }
    }, []);
    return (
        <Box height="100%" width="100%">
            <Box display="flex" justifyContent="space-between">
                <Typography>WebPlanner</Typography>
                <IconButton onClick={() => setSettingsOpen(true)}>
                    <SettingsIcon />
                </IconButton>
            </Box>
            <Box>
                <Drawer anchor="right" open={settingsOpen} onClose={() => setSettingsOpen(false)}>
                    <SettingsCmp settings={settings} handleSettingsChange={handleSettingsChange} />
                </Drawer>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    {Object.keys(settings.modules)
                    // @ts-ignore
                        .filter((module: ModuleNames) => settings.modules[module] === true)
                        .map((module) => {
                            return <Tab key={`tab-${module}`} value={module} label={module.charAt(0).toUpperCase() + module.slice(1)} />;
                        })}
                </Tabs>
                {value === 'notebook' && <NoteBookCmp />}
                {value === 'flow' && <Flow />}
            </Box>
        </Box>
    );
};

export default App;
