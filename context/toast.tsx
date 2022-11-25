import {createContext} from 'react';
import useToast from '@/hooks/useToast';

export interface IToastContext {
  toastSuccess: (arg0: string) => void;
  toastError: (arg0: string) => void;
}

export const ToastContext = createContext<IToastContext>({
  toastSuccess: () => {},
  toastError: () => {},
});

export const ToastProvider = (props: any) => {
  const {toastSuccess, toastError, toasterComponent} = useToast();
  return (
    <ToastContext.Provider value={{toastSuccess, toastError}}>
      {props.children}
      {toasterComponent}
    </ToastContext.Provider>
  );
};
