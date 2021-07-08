import { useEffect, useState } from 'react';
import theme from '../../theme';

const useScrollHeaderShadow = ({ navigation }: { navigation: any }) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const scroll = (event: any) => {
    if (event.nativeEvent.contentOffset.y > 30) {
      setIsScrolling(true);
    }
    if (event.nativeEvent.contentOffset.y < 30) {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerStyle: {
          shadowColor: isScrolling && theme.colors.shadow,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: isScrolling ? 0.3 : 0,
          shadowRadius: isScrolling && 4,
          elevation: isScrolling ? 3 : 0
        }
      });
    }
  }, [navigation, isScrolling]);

  return { scroll, isScrolling };
};

export default useScrollHeaderShadow;
