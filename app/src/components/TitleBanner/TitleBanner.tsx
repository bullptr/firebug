import { memo } from 'react';
import { Sheet, Chip } from '@mui/joy';

interface TitleBannerProps {
  viewMode: 'Historic' | 'Predicted';
}

export const TitleBanner = memo(({ viewMode }: TitleBannerProps) => (
  <Sheet
    variant="soft"
    color="primary"
    sx={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      top: 8,
      zIndex: 400,
      px: 1.25,
      py: 0.5,
      borderRadius: 6,
      bgcolor: 'var(--joy-palette-primary-softColor)',
    }}
  >
    <Chip color="primary" variant="solid">
      <h1 style={{ fontSize: '16px', fontWeight: 'normal', margin: 0 }}>
        California {viewMode === 'Historic' ? 'Recent Large Fire Perimeters | 2020 - 2025' : 'Predicted Fire Risk'}
      </h1>
    </Chip>
  </Sheet>
));
