import formatMessage from 'format-message';
import { FilterTypeValue } from '../../../components/Fields/select-field/BFSelectFilterField';

const classes = [
  'Abs & Core',
  'Aerobics',
  'Barbell',
  'Bootcamp',
  'Booty',
  'Box',
  'Shape',
  'Xcore',
  'Yoga',
  'Cycle',
  'Latin dance',
  'Specials'
];
export interface filterDataType {
  label: string;
  key: 'kind' | 'title' | 'duration';
  values: FilterTypeValue[];
  isMultipleChoice?: boolean;
  includeAllOption?: boolean;
}

const durations = [0, 10, 20, 30, 40, 50, 60];

export const lessonFilters: filterDataType[] = [
  {
    label: formatMessage('Type'),
    key: 'kind',
    includeAllOption: true,
    values: [
      {
        key: 'VGX',
        text: 'GXR',
        value: 'VGX'
      },
      {
        key: 'LGX',
        text: formatMessage('Live'),
        value: 'LGX'
      }
    ]
  },
  {
    label: formatMessage('Class'),
    key: 'title',
    isMultipleChoice: true,
    includeAllOption: true,
    values: [
      ...classes.map((c) => ({
        text: formatMessage(c),
        key: c,
        value: c
      }))
    ]
  },
  {
    label: formatMessage('Duration'),
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
  }
];
