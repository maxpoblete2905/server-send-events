import { useState, ChangeEvent, FormEvent } from 'react';
import { TransferData } from '@interfaces/TransferData';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TransferForm: React.FC = () => {
  const [formData, setFormData] = useState<TransferData>({
    sender: '',
    receiver: '',
    amount: '',
    commune: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData);
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a una API o realizar alguna otra lógica de negocio
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Formulario de Transferencia</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="sender" className="form-label">Remitente:</label>
              <input type="text" id="sender" name="sender" value={formData.sender} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="receiver" className="form-label">Destinatario:</label>
              <input type="text" id="receiver" name="receiver" value={formData.receiver} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Monto:</label>
              <input type="text" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="commune" className="form-label">Comuna:</label>
              <select id="commune" name="commune" value={formData.commune} onChange={handleChange} className="form-select">
                <option value="">Selecciona una comuna</option>
                <option value="comuna1">Comuna 1</option>
                <option value="comuna2">Comuna 2</option>
                <option value="comuna3">Comuna 3</option>
                {/* Agrega más opciones de comuna según sea necesario */}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
