import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { total, clear } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';

const CartContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { cartItems, total: totalAmount } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(total()); 
  }, [cartItems, dispatch]);

  if (totalAmount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  const handleClearCartConfirmation = () => {
    setIsModalOpen(true);
  };

  const clearCartAndCloseModal = () => {
    dispatch(clear()); 
    dispatch(total()); 
    setIsModalOpen(true); }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${totalAmount.toFixed(2)}</span>
          </h4>
        </div>
        <>
          {isModalOpen && <Modal onConfirm={clearCartAndCloseModal} onCancel={() => setIsModalOpen(false)} />}
          <section className="cart">
            <button className="btn clear-btn" onClick={handleClearCartConfirmation}>
              Clear cart
            </button>
          </section>
        </>
      </footer>
    </section>
  );
};

export default CartContainer;
