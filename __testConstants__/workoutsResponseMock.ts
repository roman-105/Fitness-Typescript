import { IWorkoutsDataResponse } from '../src/services/response-types';

export const workoutsResponseMock: IWorkoutsDataResponse = {
  id: '24s73O8fj9lxWN23CP7RD7',
  administrativeTitle: 'Demo normal workout with assembler TEST data',
  name: 'Demo workout with assembler TEST data',
  description: 'hgkdghkdghk',
  location: {
    name: 'Home'
  },
  goal: [],
  type: [
    {
      name: 'Cardio'
    }
  ],
  visible: true,
  duration: '01:30:00',
  author: 'David',
  level: {
    title: 'Beginner'
  },
  picture: {
    url:
      'https://images.ctfassets.net/ztnn01luatek/4jn2sGvhUAzJdicaTXMU70/1c04e58825e47ec6a0a3a6e65e1d4413/webimage-Covid-19-measures'
  }
};
