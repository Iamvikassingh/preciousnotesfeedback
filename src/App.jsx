import Feedbackformforpreciousnotes from "./components/Feedbackformforpreciousnotes"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Getallfeedback from "./components/Getallfeedback"




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feedbackformforpreciousnotes />} />
          <Route path="/Getallfeedback" element={<Getallfeedback/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
