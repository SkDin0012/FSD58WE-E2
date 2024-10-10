import React, { useState } from 'react';

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!/^\d{16}$/.test(cardNumber)) {
            setError('Card number must be 16 digits');
            return;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            setError('Expiry date must be in MM/YY format');
            return;
        }
        if (!/^\d{3}$/.test(cvc)) {
            setError('CVC must be 3 digits');
            return;
        }
        setError('');
        setLoading(true);
        
        setTimeout(() => {
            console.log({ cardNumber, expiryDate, cvc });
            setLoading(false);
            alert('Payment submitted successfully!');
        }, 2000);
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5>Payment Information</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Card Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="cardNumber"
                            maxLength="16"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiryDate" className="form-label">Expiry Date (MM/YY)</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="expiryDate"
                            placeholder="MM/YY"
                            maxLength="5"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cvc" className="form-label">CVC</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="cvc"
                            maxLength="3"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : 'Submit Payment'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
