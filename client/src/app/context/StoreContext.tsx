import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
	basket: Basket | null;
	setBasket: (basket: Basket) => void;
	removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
	const context = useContext(StoreContext);

	if (context === undefined) {
		throw Error('Oops - we do not seem to be inside the provider');
	}

	return context;
}

export function StoreProvider({ children }: PropsWithChildren<unknown>) {
	const [basket, setBasket] = useState<Basket | null>();

	// WHen we set state inside a component, it's not advisable to mutate state,
	// but instead aim to make a new copy of that state and replace the existing state
	// React prefers it that way
	// The spread operator creates a new copy of that state
	function removeItem(productId: number, quantity: number) {
		if (!basket) return;
		const items = [...basket.items];
		const itemIndex = items.findIndex(i => i.productId === productId);
		if (itemIndex >= 0) {
			items[itemIndex].quantity -= quantity;
			// items.splice mutates copy of the original array, so this is ok
			if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
			// replace prevState (basket with items) with items
			setBasket(prevState => {
				return { ...prevState!, items };
			});
		}
	}

	return (
		<StoreContext.Provider value={{ basket, setBasket, removeItem }}>
			{children}
		</StoreContext.Provider>
	);
}