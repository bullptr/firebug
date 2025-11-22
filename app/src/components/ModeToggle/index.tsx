import { useState, useEffect } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { SunIcon, MoonIcon } from 'lucide-react';

export default function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Select
      size="sm"
      variant="soft"
      color="neutral"
      value={mode}
      onChange={(_, newMode) => {
        setMode(newMode);
      }}
      startDecorator={mode === 'light' ? <SunIcon /> : <MoonIcon />}
      sx={{ bgcolor: 'background.body' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}
