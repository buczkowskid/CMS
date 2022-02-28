import { useContext } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { State } from "../App";

const Summary = () => {
	const { state } = useContext(State);

	const getOrderName = (orders) => {
		return orders.map((order, index) => (
			<span>
				{order.orderName}
				{index < orders.length - 1 ? ", " : ""}
			</span>
		));
	};

	return (
		<div>
			<div
				style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
			></div>
			<MDBTable>
				<MDBTableHead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nazwa</th>
						<th scope="col">Adres</th>
						<th scope="col">Zamówienia</th>
						<th scope="col">Nazwa zamówienia</th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{state.customers.map((customer, index) => (
						<tr key={customer.id}>
							<th scope="row">{index + 1}</th>
							<td>{customer.name}</td>
							<td>{customer.address}</td>
							<td>{customer?.orders?.length}</td>
							<td>{getOrderName(customer?.orders)}</td>
						</tr>
					))}
				</MDBTableBody>
			</MDBTable>
		</div>
	);
};

export default Summary;
