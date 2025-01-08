import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ToastProvider(
  { children }: {children: React.ReactNode;}) {

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={"rounded-lg min-w-96 text-center"}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
