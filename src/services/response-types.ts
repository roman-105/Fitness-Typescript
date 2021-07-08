export interface IMemberResponse {
  city: string;
  name: string;
  cardnumber: string;
  dateofbirth: string;
  street: string;
  country: string;
  gender?: 'female' | 'male';
  postcode: string;
  membershipnumber: string;
  email: string;
  address4: string;
  mobilephone: string;
  firstname: string;
  prefix: string;
  conversionSource: string;
  lastname: string;
  workphone: string;
  housenumber: string;
  address3: string;
  id: string;
  homephone: string;
  homeClubId: string;
  homeClub: string;
  deviceId?: string;
  deviceName?: string;
  accessMethod?: string;
  addOns?: string[];
}

export interface IMemberDataResponse {
  friends?: string[];
  clubs?: string[];
  bookings?: string[];
  stats?: string[];
}

export interface IMemberInfoResponse {
  member: IMemberResponse;
  info: IMemberDataResponse;
}

export interface IClubsResponse {
  id: string;
  clubId: string;
  clubImage?: {
    url?: string;
  };
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  closed: boolean;
  mainPhone: string;
  mainEmail: string;
  location: {
    lat: number;
    lon: number;
  };
  services: {
    id: string;
    name: string;
  }[];
  reopenDate: string;
  hours: Record<
    'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    Record<'openIntervals', { start: string; end: string }[]>
  >;
  url: string;
  holidayHours?: {
    end?: string;
    date: string;
    start?: string;
    remark: string;
    isClosed: boolean;
  }[];
  specialOccasion?: boolean;
  specialOccasionTitle?: string;
  specialOccasionDescription?: string;
}

export interface IClubLessonResponse {
  imageid: string;
  type: string;
  title: string;
  start: string;
  roomid: string;
  room: string;
  language: string;
  kind: string;
  identifier: string;
  id: string;
  iconid: string;
  externalclubid: string;
  endtime: string;
  description: string;
  contentDuration: number;
  active: string;
}

export interface IPersonalisationAnswerResponse {
  id: string;
  title: string;
  description?: string;
  image?: {
    url: string;
  };
}
export interface IPersonalisationQuestionResponse {
  id: string;
  administrativeTitle: string;
  question: string;
  explaination: string;
  type: 'Single Select' | 'Multiple Select' | 'Height and Weight' | 'Slider';
  answerOptions?: IPersonalisationAnswerResponse[];
}

export interface IPersonalisationQuestionDataResponse {
  question?: string;
  answer?:
    | string
    | string[]
    | {
        weight: number;
        height: number;
      };
}

export interface IPersonalisationResponse {
  questions: IPersonalisationQuestionDataResponse[];
}

export interface IWorkoutsDataResponse {
  id: string;
  administrativeTitle: string;
  name: string;
  description: string;
  location: {
    name: string;
  };
  goal?: any;
  type: {
    name: string;
  }[];
  visible: boolean;
  duration: string;
  author: string;
  level?: any;
  picture?: {
    url?: string;
  };
  audioWorkout?: boolean;
  gxr?: boolean;
}

export interface IWorkoutSearchResponse {
  id: string;
  url: string;
  name: string;
  picture?: {
    url?: string;
  };
  goal: {
    title: string;
  }[];
  duration?: string;
  level?: {
    title: string;
  }[];
}

export interface IClubSearchResponse {
  id: string;
  url?: string;
  clubId: string;
  name: string;
  address?: string;
  city?: string;
  closed?: boolean;
}

export interface IPersonalTrainersSearchResponse {
  id: string;
  url?: string;
  profilePicture?: {
    url?: string;
  };
  name: string;
  gender?: string;
  trainerType?: string[];
  spokenLanguage?: string[];
  specialties?: string[];
}

export interface IArticleSearchResponse {
  id: string;
  url?: string;
  headerPicture?: {
    url: string;
  };
  title: string;
  category: {
    name: string;
  }[];
  readingTime: string;
}

export interface IRecipesSearchResponse {
  id: string;
  url?: string;
  picture?: {
    url?: string;
  };
  name: string;
  prepTime: string;
  kcal: string;
  source: string;
  goal: {
    title: string;
  }[];
  mealType: {
    name: string;
  };
  diet: {
    name: string;
  };
}

export interface IProgramSearchResponse {
  id: string;
  url?: string;
  picture?: {
    url?: string;
  };
  name: string;
  goal: {
    title: string;
  }[];
  level?: {
    title: string;
  }[];
  duration: number;
  durationPeriod: string;
}

export interface IFullSearchResponse {
  clubs: IClubSearchResponse[];
  workouts: IWorkoutSearchResponse[];
  personalTrainers: IPersonalTrainersSearchResponse[];
  articles: IArticleSearchResponse[];
  recipes: IRecipesSearchResponse[];
  programs: IProgramSearchResponse[];
}
