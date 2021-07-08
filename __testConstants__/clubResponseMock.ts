import { IClubsResponse } from '../src/services/response-types';

export const clubResponseMock: IClubsResponse = {
  id: '3Q1d423JEuPgLzxHe7UhkT',
  clubId: '558EAA31-2915-4D21-8077-F542AF4697BE',
  name: 'Basic-Fit Reims Rue de Vesle T4',
  description:
    "Vous êtes à la recherche d'une salle de sport sympa près de chez vous ? Quel que soit votre âge ou votre niveau de pratique, vous êtes le bienvenu dans notre centre de fitness situé 106 Rue de Vesle. Soyez le bienvenu chez Basic-Fit Reims Rue de Vesle ! Notre club est équipé d'une large gamme d'appareils de fitness et propose de nombreux cours collectifs. Quels que soient votre âge, votre niveau de pratique et votre objectif forme, nous disposons de la solution d'entraînement qui répond à vos besoins spécifiques. Rendez-nous visite ou inscrivez-vous en ligne dès maintenant !",
  address: 'Rue de Vesle 106',
  city: 'Reims',
  postalCode: '51100',
  country: 'FR',
  closed: true,
  mainPhone: '',
  mainEmail: 'reims.vesle@basic-fit.fr',
  location: {
    lat: 49.2526697,
    lon: 4.02626722
  },
  services: [
    {
      id: '1YvL4D5eG0RABOj0etFwXn',
      name: 'Yanga Sportswater'
    },
    {
      id: '3ti0ysF793N5AnrHXdtag',
      name: 'Virtual Grouplessons'
    }
  ],
  reopenDate: '2016-07-08',
  hours: {
    monday: {
      openIntervals: [
        {
          start: '06:00',
          end: '22:30'
        }
      ]
    },
    tuesday: {
      openIntervals: [
        {
          start: '06:00',
          end: '22:30'
        }
      ]
    },
    wednesday: {
      openIntervals: [
        {
          start: '06:00',
          end: '22:30'
        }
      ]
    },
    thursday: {
      openIntervals: [
        {
          start: '06:00',
          end: '22:30'
        }
      ]
    },
    friday: {
      openIntervals: [
        {
          start: '06:00',
          end: '22:30'
        }
      ]
    },
    saturday: {
      openIntervals: [
        {
          start: '09:00',
          end: '19:00'
        }
      ]
    },
    sunday: {
      openIntervals: [
        {
          start: '09:00',
          end: '19:00'
        }
      ]
    }
  },
  url:
    'https://www.basic-fit.com/fr-fr/salle-de-sport/basic-fit-reims-rue-de-vesle-t4-558eaa3129154d218077f542af4697be.html'
};
