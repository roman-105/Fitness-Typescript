import formatMessage from 'format-message';

const bodyParts = ['Abs', 'Arms', 'Back', 'Chest', 'Legs', 'Neck', 'Shoulders'];

const categories = [
  'Endurance',
  'Mobility',
  'Strength',
  'GXR classes',
  'Conditioning',
  'Hypertrophy',
  'Core',
  'Body weight'
];

const goals = [
  { name: 'Lose weight', iconActive: 'weightLossActive', iconInactive: 'weightLoss' },
  { name: 'Performance', iconActive: 'performanceActive', iconInactive: 'performance' },
  { name: 'Shape & tone', iconActive: 'shapeAndToneActive', iconInactive: 'shapeAndTone' },
  { name: 'Get stronger', iconActive: 'getStrongerActive', iconInactive: 'getStronger' },
  { name: 'Get fitter', iconActive: 'getFitActive', iconInactive: 'getFit' }
];

export interface filterDataType {
  label: string;
  key: 'level' | 'bodyPart' | 'duration' | 'category' | 'goal' | 'all';
  values: any[];
  isMultipleChoice?: boolean;
  includeAllOption?: boolean;
}

const durations = [0, 10, 20, 30, 40, 50, 60];

export const workoutFilters: filterDataType[] = [
  {
    label: formatMessage('GOALS'),
    key: 'goal',
    isMultipleChoice: true,
    includeAllOption: false,
    values: [
      {
        key: 'all',
        value: undefined,
        text: formatMessage('All goals'),
        iconActive: 'allFiltersActive',
        iconInactive: 'allFilters'
      },
      ...goals.map((c) => ({
        text: formatMessage(c.name),
        key: c.name,
        value: c.name,
        iconActive: c.iconActive,
        iconInactive: c.iconInactive
      }))
    ]
  },
  {
    label: formatMessage('DURATION'),
    key: 'duration',
    includeAllOption: true,
    values: [
      ...durations.map((duration, index) => {
        const nextItem = durations.length >= index + 1 ? durations[index + 1] : false;
        if (nextItem) {
          return {
            text: `${duration}-${nextItem} ${formatMessage('min')}`,
            key: `duration-${duration}`,
            value: {
              minDuration: duration,
              maxDuration: nextItem
            }
          };
        }
        return {
          text: `${duration}+ ${formatMessage('min')}`,
          key: 'max',
          value: {
            minDuration: duration
          }
        };
      })
    ]
  },
  {
    label: formatMessage('LEVEL'),
    key: 'level',
    includeAllOption: true,
    values: [
      {
        key: 'Beginner',
        text: 'Beginner',
        value: 'Beginner'
      },
      {
        key: 'Intermediate',
        text: formatMessage('Intermediate'),
        value: 'Intermediate'
      }
    ]
  },
  {
    label: formatMessage('BODY PARTS'),
    key: 'bodyPart',
    isMultipleChoice: true,
    includeAllOption: true,
    values: [
      ...bodyParts.map((c) => ({
        text: formatMessage(c),
        key: c,
        value: c
      }))
    ]
  },
  {
    label: formatMessage('CATEGORY'),
    key: 'category',
    isMultipleChoice: true,
    includeAllOption: true,
    values: [
      ...categories.map((c) => ({
        text: formatMessage(c),
        key: c,
        value: c
      }))
    ]
  }
];
