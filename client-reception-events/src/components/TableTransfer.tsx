import { useState, useEffect } from "react";
import {
  BiHash,
  BiChevronRight,
  BiChevronLeft,
  BiMoney,
  BiCalendar,
  BiMap,
} from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../redux";
import {
  getTransfers,
  startListeningForNewTransfer,
} from "../redux/transfers/transfersApi";
import { TransferData } from "../interfaces/TransferData";

export function TableTransfers() {
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useAppDispatch();
  const { transfers, loadingTransfers } = useAppSelector(
    (state) => state.transfersSlice
  );

  useEffect(() => {
    dispatch(getTransfers());
    startListeningForNewTransfer();
  }, [dispatch]);

  return (
    <div className="container">
      {showAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          New transfer event received!
          <button
            type="button"
            className="close"
            onClick={() => setShowAlert(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      {!loadingTransfers ? (
        <div className="card mt-5">
          <div className="card-header">
            <h5 className="mb-0">Transfers</h5>
          </div>
          <div className="card-body">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">
                    <BiHash /> ID
                  </th>
                  <th scope="col">
                    <BiChevronRight /> Sender
                  </th>
                  <th scope="col">
                    <BiChevronLeft /> Receiver
                  </th>
                  <th scope="col">
                    <BiMoney /> Amount
                  </th>
                  <th scope="col">
                    <BiCalendar /> Transfer Date
                  </th>
                  <th scope="col">
                    <BiMap /> Commune
                  </th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer: TransferData) => (
                  <tr key={transfer.id}>
                    <td>{transfer.id}</td>
                    <td>{transfer.sender}</td>
                    <td>{transfer.receiver}</td>
                    <td>{transfer.amount}</td>
                    <td>{transfer.transfer_date}</td>
                    <td>{transfer.commune}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        "cargando..."
      )}
    </div>
  );
}
