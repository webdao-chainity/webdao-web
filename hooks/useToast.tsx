import {useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import toast, {Toaster, useToasterStore} from 'react-hot-toast';

const useToast = () => {
  const {toasts} = useToasterStore();
  const TOAST_LIMIT = 3;
  const toastSuccess = useCallback((msg: JSX.Element | string, duration = 3000): void => {
    toast.success(msg, {duration});
  }, []);

  const toastError = useCallback((msg: JSX.Element | string, duration = 3000): void => {
    toast.error(msg, {duration});
  }, []);

  useEffect(() => {
    toasts
      .filter((t: any) => t.visible) // Only consider visible toasts
      .filter((_: any, i: any) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t: any) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  const toasterComponent = useMemo(() => {
    return (
      <LayoutWrapper>
        <Toaster toastOptions={{className: 'toast', position: 'bottom-center'}} />
      </LayoutWrapper>
    );
  }, []);

  return {toastSuccess, toastError, toasterComponent};
};

export default useToast;

// language=SCSS prefix=*{ suffix=}
const LayoutWrapper = styled.div`
  .toast {
    background-color: #888;
    color: #ffffff;
    z-index: 99999999999;
  }
`;
