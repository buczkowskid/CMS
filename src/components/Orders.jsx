import { useState, useContext } from "react";
import {
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBBtn,
	MDBModal,
	MDBModalDialog,
	MDBModalContent,
	MDBModalHeader,
	MDBModalTitle,
	MDBModalBody,
	MDBModalFooter,
	MDBInput,
} from "mdb-react-ui-kit";

import { State } from "../App";

const Orders = () => {
	const [showOrderDialog, setOrderDialogStatus] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const { state, setState } = useContext(State);

	const editOrder = (customer) => {
		setSelectedOrder(customer);
		setOrderDialogStatus(true);
	};

	const handleOrderSave = (order) => {
		if (order.id) {
			setState({
				...state,
				orders: state.orders.map((x) => (x.id === order.id ? order : x)),
			});
		} else if (order.name === "") {
			alert("Uzupełnij Nazwę");
		} else {
			const data = { ...order, id: Date.now() };
			setState({ ...state, orders: [...state.orders, data] });
		}
		setOrderDialogStatus(false);
		setSelectedOrder(null);
	};

	return (
		<div>
			<div
				style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
			>
				<MDBBtn onClick={(event) => setOrderDialogStatus(true)}>
					Dodaj zamówienie
				</MDBBtn>
			</div>
			<MDBTable>
				<MDBTableHead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nazwa</th>
						<th>Opcje</th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{state.orders.map((order, index) => (
						<tr key={order.id}>
							<th scope="row">{index + 1}</th>
							<td>{order.name}</td>
							<td>
								<MDBBtn onClick={() => editOrder(order)}>Edytuj</MDBBtn>
							</td>
						</tr>
					))}
				</MDBTableBody>
			</MDBTable>
			<OrderFormDialog
				key={showOrderDialog}
				open={showOrderDialog}
				onClose={() => setOrderDialogStatus(false)}
				onSaveOrder={(order) => handleOrderSave(order)}
				setShow={setOrderDialogStatus}
				selectedOrder={selectedOrder}
			/>
		</div>
	);
};

const OrderFormDialog = ({
	open,
	onClose,
	onSaveOrder,
	setShow,
	selectedOrder,
}) => {
	const [order, setOrder] = useState(
		selectedOrder ? selectedOrder : { name: "" }
	);
	return (
		<MDBModal show={open} setShow={setShow} tabIndex="-1">
			<MDBModalDialog>
				<MDBModalContent>
					<MDBModalHeader>
						<MDBModalTitle>Dodaj zamówienie</MDBModalTitle>
					</MDBModalHeader>
					<MDBModalBody>
						<MDBInput
							label={"Nazwa"}
							value={order.name}
							onChange={(event) =>
								setOrder({ ...order, name: event.target.value })
							}
						/>
					</MDBModalBody>

					<MDBModalFooter>
						<MDBBtn color="secondary" onClick={onClose}>
							Anuluj
						</MDBBtn>
						<MDBBtn onClick={() => onSaveOrder(order)}>Dodaj</MDBBtn>
					</MDBModalFooter>
				</MDBModalContent>
			</MDBModalDialog>
		</MDBModal>
	);
};

export default Orders;
