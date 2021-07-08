import { IMemberInfoResponse } from '../src/services/response-types';

export const memberInfoResponseMock: IMemberInfoResponse = {
  member: {
    city: 'city',
    name: 'Gymttest 2020 Ces',
    cardnumber: 'cardNumber',
    dateofbirth: '2000-01-01T00:00:00',
    street: 'Wegalaan',
    country: '',
    gender: 'male',
    postcode: '21320',
    membershipnumber: '367010240',
    email: 'email',
    address4: '',
    mobilephone: '0600000000',
    firstname: 'name',
    prefix: '',
    conversionSource: '',
    lastname: 'Ces',
    workphone: '',
    housenumber: '60',
    address3: '',
    id: 'id',
    homephone: '',
    homeClubId: 'HOMECLUBID',
    homeClub: 'homeClub'
  },
  info: {
    friends: [],
    clubs: ['club1', 'club2'],
    bookings: [],
    stats: []
  }
};
