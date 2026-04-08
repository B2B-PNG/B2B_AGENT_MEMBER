import { BrowserRouter } from "react-router-dom"
import { Router } from "./routes"
import ToastComponent from "./components/notification/useToast"

function App() {

  return (
    <BrowserRouter>
      <Router />
      <ToastComponent />
      {/* <LoginPopup /> */}
    </BrowserRouter>
  )
}

export default App
