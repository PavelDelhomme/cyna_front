// src/components/modals/AddPaymentMethodModal.jsx
import React, { useState } from 'react';
import { addPaymentMethod } from '../../api/paymentMethods';
import styles from '../../styles/components/modals/PaymentModal.module.css';

export default function AddPaymentMethodModal({ isOpen, onClose, onSave, userId }) {
  const [form, setForm] = useState({
    type: '',
    last4: '',
    expiry: '',
    isDefault: false,
    user_id: userId,
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('handleSubmit called', form); // Pour vérifier le nombre d'appels
    if (!form.type || !form.last4 || !form.expiry) {
      setError('Tous les champs obligatoires doivent être remplis.');
      return;
    }
    setError('');
    try {
      const { type, last4, expiry, isDefault, user_id } = form;
      const payload = { type, last4, expiry, isDefault, user_id };
      const savedMethod = await addPaymentMethod(payload);
      onSave(savedMethod);
      onClose();
      setForm({
        type: '',
        last4: '',
        expiry: '',
        isDefault: false,
        user_id: userId,
      });
    } catch (err) {
      setError('Erreur lors de la sauvegarde du moyen de paiement.');
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>Ajouter un moyen de paiement</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Type*</label>
            <input
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Visa, MasterCard…"
              required
            />
          </div>
          <div className={styles.field}>
            <label>4 derniers chiffres*</label>
            <input
              name="last4"
              value={form.last4}
              onChange={handleChange}
              maxLength="4"
              pattern="\d{4}"
              placeholder="4242"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Date d'expiration (MM/AA)*</label>
            <input
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="12/24"
              required
            />
          </div>
          <div className={styles.fieldCheckbox}>
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
              id="default"
            />
            <label htmlFor="default">Définir par défaut</label>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <button type="button" onClick={onClose}>Annuler</button>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}