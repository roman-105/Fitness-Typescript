import analytics from '@react-native-firebase/analytics';

type StreamingEventName =
  | 'openCastingMenu'
  | 'connectCastingDevice'
  | 'disconnectCastingDevice'
  | 'togglePlay'
  | 'adaptTime'
  | 'stopWorkout'
  | 'triggerError';

type StreamingEvent<T extends StreamingEventName> = T extends 'openCastingMenu'
  ? { location: 'workoutSingular' | 'activeWorkout' }
  : T extends 'connectCastingDevice'
  ? { targetType: string }
  : T extends 'disconnectCastingDevice'
  ? { targetType: string }
  : T extends 'togglePlay'
  ? { mode: 'play' | 'pause' }
  : T extends 'adaptTime'
  ? { target: 'forwardButton' | 'backwardsButton' | 'timeline'; direction: 'forward' | 'backwards' }
  : T extends 'stopWorkout'
  ? { type?: 'gxr' | 'home' | 'gym' | 'audio' }
  : T extends 'triggerError'
  ? { view?: 'workoutSingular' | 'workoutArchive'; type: 'castingConnectionError' }
  : never;

const BFAnalytics = {
  logEvent: async (eventName: string, event?: object) => {
    await analytics().logEvent(eventName, event);
  },
  logStreamingEvent: async <T extends StreamingEventName>(
    eventName: T,
    event: StreamingEvent<T>
  ) => {
    BFAnalytics.logEvent(eventName, event);
  }
};

export default BFAnalytics;
