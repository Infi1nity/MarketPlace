import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './AddToCartButton.css';

export default function AddToCartButton({ product, quantity = 1 }) {
  const { addToCart, cartItems, removeItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = cartItems?.find(item => 
    item.product_id === product.id || item.product?.id === product.id
  );
  const inCart = !!cartItem;
  const outOfStock = !product?.stock || product.stock <= 0;

  const handleAddToCart = () => {
    if (outOfStock) return;
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (cartItem) {
      removeItem(cartItem.id);
    }
  };

  if (outOfStock && !inCart) {
    return (
      <button className="add-to-cart-btn out-of-stock" disabled title="Нет в наличии">
        НЕТ В НАЛИЧИИ
      </button>
    );
  }

  if (inCart) {
    return (
      <div className="add-to-cart-btn-group">
        <button className="add-to-cart-btn in-cart">
          ✓ {cartItem.quantity} ШТ.
        </button>
        <button 
          className="add-to-cart-btn-remove"
          onClick={handleRemove}
          title="Удалить из корзины"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <button 
      className={`add-to-cart-btn ${justAdded ? 'added' : ''}`}
      onClick={handleAddToCart}
    >
      {justAdded ? '✓ ДОБАВЛЕНО' : 'В КОРЗИНУ'}
    </button>
  );
}