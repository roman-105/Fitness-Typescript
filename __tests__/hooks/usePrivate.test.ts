import '../../src/hooks/usePrivate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import usePrivate from '../../src/hooks/usePrivate';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('react-redux', () => {
  const useDispatchMock = jest.fn();

  return {
    useDispatch: () => ({ authModel: { refreshAuthedAxios: useDispatchMock } }),
    useSelector: jest.fn()
  };
});

jest.mock('@react-navigation/native', () => {
  const useNavigationMock = jest.fn();
  return { useNavigation: () => ({ reset: useNavigationMock }) };
});

describe('UsePrivate hook tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch() as any).authModel.refreshAuthedAxios.mockClear();
    (useSelector as jest.Mock<any, any>).mockClear();
    (useNavigation().reset as any).mockClear();
  });

  it('should kick unauthed user back to login', async () => {
    (useDispatch() as any).authModel.refreshAuthedAxios.mockRejectedValue({ error: true });
    (useSelector as jest.Mock<any, any>).mockReturnValue({ isAuthenticated: true });
    const { result, waitForValueToChange } = renderHook(() => usePrivate());
    expect(result.current).toBe(false);
    await waitForValueToChange(() => result.current);
    expect(useNavigation().reset).toBeCalledWith({ index: 0, routes: [{ name: 'LOGIN' }] });
    expect(result.current).toBe(true);
  });

  it('should let the user continue and confirm that is authed', async () => {
    (useDispatch() as any).authModel.refreshAuthedAxios.mockResolvedValue({ mocked: true });
    (useSelector as jest.Mock<any, any>).mockReturnValue({ isAuthenticated: true });
    const { result, waitForValueToChange } = renderHook(() => usePrivate());
    expect(result.current).toBe(false);
    await waitForValueToChange(() => result.current);
    expect(useNavigation().reset).not.toBeCalled();
    expect(result.current).toBe(true);
  });

  it('should let the user be authed if is confirmed and is authenticated', async () => {
    (useDispatch() as any).authModel.refreshAuthedAxios.mockResolvedValue({ mocked: true });
    (useSelector as jest.Mock<any, any>).mockReturnValue({ isAuthenticated: true });
    const { result, waitForValueToChange } = renderHook(() => usePrivate());
    expect(result.current).toBe(false);
    await waitForValueToChange(() => result.current);
    expect(useNavigation().reset).not.toBeCalled();
    expect(result.current).toBe(true); //confirmed is true

    (useSelector as jest.Mock<any, any>).mockReturnValue({ isAuthenticated: true });
    expect(useNavigation().reset).not.toBeCalled();
  });

  it('should logout user if is confirmed and is not authenticated anymore', async () => {
    (useDispatch() as any).authModel.refreshAuthedAxios.mockResolvedValue({ mocked: true });
    (useSelector as jest.Mock<any, any>).mockReturnValue({ isAuthenticated: false });
    const { result, waitForValueToChange } = renderHook(() => usePrivate());
    expect(result.current).toBe(false);
    await waitForValueToChange(() => result.current);
    expect(useNavigation().reset).toBeCalled();
    expect(result.current).toBe(true); //confirmed is true
  });
});
