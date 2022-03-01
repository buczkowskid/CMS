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

const Customers = () => {
	const [showCustomerDialog, setCustomerDialogStatus] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const { state, setState } = useContext(State);

	const editCustomer = (customer) => {
		setSelectedCustomer(customer);
		setCustomerDialogStatus(true);
	};

	const handleCustomerSave = (customer) => {
		console.log(customer);
		console.log(customer.id);
		if (customer.id) {
			setState({
				...state,
				customers: state.customers.map((x) =>
					x.id === customer.id ? customer : x
				),
			});
		} else if (customer.name === "" || customer.address === "") {
			alert("Uzupełnij Nazwę i Adres!")
		} else {
			const data = { ...customer, id: Date.now(), orders: [] };
			setState({ ...state, customers: [...state.customers, data] });
		}
		setCustomerDialogStatus(false);
		setSelectedCustomer(null);
	};

	return (
		<div>
			<div
				style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
			>
				<MDBBtn onClick={(event) => setCustomerDialogStatus(true)}>
					Dodaj klienta
				</MDBBtn>
			</div>
			<MDBTable>
				<MDBTableHead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nazwa</th>
						<th scope="col">Adres</th>
						<th scope="col">Zamówienia</th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{state.customers.map((customer, index) => (
						<tr key={customer.id}>
							<th scope="row">{index + 1}</th>
							<td>{customer.name}</td>
							<td>{customer.address}</td>
							<td>{customer.orders.length}</td>
							<td>
								<MDBBtn onClick={() => editCustomer(customer)}>Edytuj</MDBBtn>
							</td>
						</tr>
					))}
				</MDBTableBody>
			</MDBTable>
			<CustomerFormDialog
				key={showCustomerDialog}
				open={showCustomerDialog}
				onClose={() => setCustomerDialogStatus(false)}
				onSaveCustomer={(customer) => handleCustomerSave(customer)}
				setShow={setCustomerDialogStatus}
				selectedCustomer={selectedCustomer}
			/>
		</div>
	);
};

const CustomerFormDialog = ({
	open,
	onClose,
	onSaveCustomer,
	setShow,
	selectedCustomer,
}) => {
	const [customer, setCustomer] = useState(
		selectedCustomer ? selectedCustomer : { name: "", address: "" }
	);
	return (
		<MDBModal show={open} setShow={setShow} tabIndex="-1">
			<MDBModalDialog>
				<MDBModalContent>
					<MDBModalHeader>
						<MDBModalTitle>Dodaj klienta</MDBModalTitle>
					</MDBModalHeader>
					<MDBModalBody>
						<MDBInput
							label={"Nazwa"}
							value={customer.name}
							onChange={(event) =>
								setCustomer({ ...customer, name: event.target.value })
							}
						/>
						<MDBInput
							label={"Adres"}
							value={customer.address}
							onChange={(event) =>
								setCustomer({ ...customer, address: event.target.value })
							}
						/>
					</MDBModalBody>

					<MDBModalFooter>
						<MDBBtn color="secondary" onClick={onClose}>
							Anuluj
						</MDBBtn>
						<MDBBtn onClick={() => onSaveCustomer(customer)}>Dodaj</MDBBtn>
					</MDBModalFooter>
				</MDBModalContent>
			</MDBModalDialog>
		</MDBModal>
	);
};

export default Customers;
