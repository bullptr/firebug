import { memo } from 'react';
import {
  Sheet,
  Stack,
  Button,
  Input,
  Typography,
  Select,
  Option,
  Chip,
  Box,
  Slider,
  Divider,
  LinearProgress,
  Alert,
  ChipDelete,
} from '@mui/joy';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';
import { FIRE_CAUSES } from '../../constants';

interface SidebarProps {
  loading: boolean;
  viewMode: 'Historic' | 'Predicted';
  onViewModeChange: (value: string) => void;
  onResetFilters: () => void;

  // Historic filters
  nameFilter: string;
  onNameFilterChange: (value: string) => void;
  selectedYears: number[];
  onYearsChange: (years: number[]) => void;
  allYears: number[];
  selectedCauses: number[];
  onCausesChange: (causes: number[]) => void;
  allCauses: number[];
  selectedAgencies: string[];
  onAgenciesChange: (agencies: string[]) => void;
  allAgencies: string[];

  // Predicted filters
  probabilityThreshold: number;
  onProbabilityThresholdChange: (value: number) => void;

  error: string | null;
}

export const Sidebar = memo(({
  loading,
  viewMode,
  onViewModeChange,
  onResetFilters,
  nameFilter,
  onNameFilterChange,
  selectedYears,
  onYearsChange,
  allYears,
  selectedCauses,
  onCausesChange,
  allCauses,
  selectedAgencies,
  onAgenciesChange,
  allAgencies,
  probabilityThreshold,
  onProbabilityThresholdChange,
  error,
}: SidebarProps) => {
  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 1.25,
        width: 340,
        maxHeight: 'calc(100vh - 160px)',
        overflowY: 'auto',
        position: 'absolute',
        left: 12,
        top: 12,
        zIndex: 500,
        borderRadius: 8,
        bgcolor: 'background.body',
      }}
    >
      {loading && <LinearProgress sx={{ position: "absolute", top: 0, left: 0, right: 0 }} />}
      <Stack gap={1.25}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <SegmentedControl
            options={['Historic', 'Predicted']}
            value={viewMode}
            onChange={onViewModeChange}
            size="sm"
          />
          <Button size="sm" variant="plain" onClick={onResetFilters}>
            Reset
          </Button>
        </Stack>

        {error && (
          <Typography level="body-sm" color="danger">
            {/* {error} */}
            <Alert size="sm" color="danger">Error: Unable to load data. Try refreshing the page.</Alert>
          </Typography>
        )}

        <Stack gap={1} flexWrap="wrap">
          {/* Name Search Filter - Historic only */}
          {viewMode === 'Historic' && (
            <Stack gap={1.5}>
              <Typography level="title-sm">Fire Name Search</Typography>
              <Box>
                <Input
                  size="sm"
                  placeholder="Search fire name..."
                  value={nameFilter}
                  onChange={e => onNameFilterChange(e.target.value)}
                />
              </Box>
            </Stack>
          )}

          {/* Probability Threshold - Predicted only */}
          {viewMode === 'Predicted' && (
            <Stack gap={1.5}>
              <Typography level="title-sm">
                Probability Threshold: {(probabilityThreshold * 100).toFixed(0)}%
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  aria-label="Probability Threshold"
                  value={probabilityThreshold}
                  step={0.05}
                  min={0}
                  max={1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
                  onChange={(_, newValue) => onProbabilityThresholdChange(newValue as number)}
                />
              </Box>
              <Typography level="body-xs" textColor="text.tertiary">
                Zoom in/out to see more or fewer data points based on viewport
              </Typography>
            </Stack>
          )}

          {/* Historic Filters */}
          {viewMode === 'Historic' && (
            <>
              {/* Year Filter */}
              <Stack gap={1.5}>
                <Typography level="title-sm">
                  Year {selectedYears.length > 0 && `(${selectedYears.length})`}
                </Typography>
                <Box>
                  <Select
                    multiple
                    size="sm"
                    placeholder="All years"
                    value={selectedYears}
                    onChange={(_, newValue) => onYearsChange(newValue as number[])}
                    sx={{ mb: 1, maxWidth: 340 }}
                  >
                    {allYears.map(year => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                  {selectedYears.length > 0 && (
                    <Stack direction="row" gap={0.5} flexWrap="wrap">
                      {selectedYears.map(year => (
                        <Chip
                          key={year}
                          size="sm"
                          variant="soft"
                          endDecorator={
                            <ChipDelete onDelete={() => onYearsChange(selectedYears.filter(y => y !== year))} />
                          }
                        >
                          {year}
                        </Chip>
                      ))}
                    </Stack>
                  )}
                </Box>
              </Stack>

              {/* Fire Cause Filter */}
              <Stack gap={1.5}>
                <Typography level="title-sm">
                  Fire Cause {selectedCauses.length > 0 && `(${selectedCauses.length})`}
                </Typography>
                <Box>
                  <Select
                    multiple
                    size="sm"
                    placeholder="All causes"
                    value={selectedCauses}
                    onChange={(_, newValue) => onCausesChange(newValue as number[])}
                    sx={{ mb: 1, maxWidth: 340 }}
                  >
                    {allCauses.map(cause => (
                      <Option key={cause} value={cause}>
                        {FIRE_CAUSES[cause] || `Unknown (${cause})`}
                      </Option>
                    ))}
                  </Select>
                  {selectedCauses.length > 0 && (
                    <Stack direction="row" gap={0.5} flexWrap="wrap">
                      {selectedCauses.map(cause => (
                        <Chip
                          key={cause}
                          size="sm"
                          variant="soft"
                          endDecorator={
                            <ChipDelete onDelete={() => onCausesChange(selectedCauses.filter(c => c !== cause))} />
                          }
                        >
                          {FIRE_CAUSES[cause] || cause}
                        </Chip>
                      ))}
                    </Stack>
                  )}
                </Box>
              </Stack>

              {/* Agency Filter */}
              <Stack gap={1.5}>
                <Typography level="title-sm">
                  Agency {selectedAgencies.length > 0 && `(${selectedAgencies.length})`}
                </Typography>
                <Box>
                  <Select
                    multiple
                    size="sm"
                    placeholder="All agencies"
                    value={selectedAgencies}
                    onChange={(_, newValue) => onAgenciesChange(newValue as string[])}
                    sx={{ mb: 1, maxWidth: 340 }}
                  >
                    {allAgencies.map(agency => (
                      <Option key={agency} value={agency}>
                        {agency}
                      </Option>
                    ))}
                  </Select>
                  {selectedAgencies.length > 0 && (
                    <Stack direction="row" gap={0.5} flexWrap="wrap">
                      {selectedAgencies.map(agency => (
                        <Chip
                          key={agency}
                          size="sm"
                          variant="soft"
                          endDecorator={
                            <ChipDelete onDelete={() => onAgenciesChange(selectedAgencies.filter(a => a !== agency))} />
                          }
                        >
                          {agency}
                        </Chip>
                      ))}
                    </Stack>
                  )}
                </Box>
              </Stack>
            </>
          )}
        </Stack>

        <Divider />

        <Stack direction="row" gap={1}>
          <img src="./firebug-logo.png" alt="Firebug Logo" width={24} height={24} />
          <Typography level="body-xs" component="footer" textColor="text.tertiary">
            Project by Gatech CSE 6242: Data and Visual Analytics Team 4 (2025).{' '}
            <a href="https://github.com/Automatoe/CSE-6242-Visualization" target="_blank" rel="noopener noreferrer">
              Learn more
            </a>
          </Typography>
        </Stack>
      </Stack>
    </Sheet>
  );
});
