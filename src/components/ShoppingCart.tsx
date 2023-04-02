import { Offcanvas } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface ShoppingCartProps {
	isOpen: boolean;
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
	const { closeCart } = useShoppingCart();
	return (
		<Offcanvas show={isOpen} onHide={closeCart} placement="end">
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Title</Offcanvas.Title>
			</Offcanvas.Header>
		</Offcanvas>
	);
};

export default ShoppingCart;
