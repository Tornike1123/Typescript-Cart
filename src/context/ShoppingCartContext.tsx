import { useContext, createContext, ReactNode, useState } from "react";

interface ShoppingCartProviderProps {
	children: ReactNode;
}
interface CartItem {
	id: number;
	quantity: number;
}

interface ShoppingCartContext {
	openCart: () => void;
	closeCart: () => void;
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	cartQuantity: number;
	cartItems: CartItem[];
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [isOpen, setIsOpen] = useState(false);

	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	function getItemQuantity(id: number) {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	}

	function increaseCartQuantity(id: number) {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id) == null) {
				return [...currItems, { id, quantity: 1 }];
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	function decreaseCartQuantity(id: number) {
		return setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id)?.quantity === 1) {
				return currItems.filter((item) => item.id !== id);
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	function removeFromCart(id: number) {
		setCartItems((currItems) => {
			return currItems.filter((item) => item.id !== id);
		});
	}

	const cartQuantity = cartItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				openCart,
				closeCart,
				cartItems,
				cartQuantity,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
}
