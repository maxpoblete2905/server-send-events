import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransferForm } from "../components/TransferForm";
import { TableTransfers } from "../components/TableTransfer";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableTransfers />} />
        <Route path="/transfers" element={<TransferForm />} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;
