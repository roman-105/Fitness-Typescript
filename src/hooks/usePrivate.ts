import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../router/routes';

/**
 * React Hook that kicks back the user to Login route
 * If he isn't authed.
 * @returns {boolean} optionally indicating if auth was confirmed or not.
 * that return value can be used to dont render screens until confirmation
 */
export default function () {
  const [confirmed, setConfirmed] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.authModel);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleAuthed() {
      try {
        await dispatch.authModel.refreshAuthedAxios();
      } catch (e) {
        navigation.reset({ index: 0, routes: [{ name: Routes.Login }] });
      }
      setConfirmed(true);
    }
    handleAuthed();
  }, [dispatch, navigation]);

  useEffect(() => {
    if (isAuthenticated === false && confirmed) {
      navigation.reset({ index: 0, routes: [{ name: Routes.Login }] });
    }
  }, [isAuthenticated, confirmed, navigation]);

  return confirmed;
}
