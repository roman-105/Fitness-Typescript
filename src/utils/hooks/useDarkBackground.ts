import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { barStyleType } from '../../store/models/app';
import theme from '../../theme';

const darkMode: { backgroundColor: string; barStyle: barStyleType } = {
  backgroundColor: theme.colors.primary.asphaltGrey,
  barStyle: 'light-content'
};

const lightMode: { backgroundColor: string; barStyle: barStyleType } = {
  backgroundColor: theme.colors.primary.white,
  barStyle: 'dark-content'
};

const useDarkBackground = () => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch.appModel.changeUI(darkMode);

    return () => {
      dispatch.appModel.changeUI(lightMode);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useDarkBackground;
