import { useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { State } from "../App";

const OrderAssignment = () => {
	const { state, setState } = useContext(State);

	const assignOrderToCustomer = ({ orderId, customerId, orderName }) => {
		const selectedCustomer = state.customers.find((x) => x.id === customerId);
		selectedCustomer.orders.push({ orderId, orderName });

		const updatedCustomers = state.customers.map((x) =>
			x.id === customerId ? selectedCustomer : x
		);
		setState((previous) => ({ ...previous, customers: updatedCustomers }));
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<div
				style={{
					width: "50%",
					display: "flex",
					flexDirection: "column",
					margin: "5px",
					border: "1px gray solid",
					borderRadius: "5px",
					height: "auto",
				}}
			>
				<h1 style={{ textAlign: "center" }}>Klienci</h1>
				{state.customers.map((customer) => (
					<CustomerItem key={customer.id} customer={customer} />
				))}
			</div>
			<div
				style={{
					width: "50%",
					display: "flex",
					flexDirection: "column",
					margin: "5px",
					border: "1px gray solid",
					borderRadius: "5px",
					height: "auto",
				}}
			>
				<h1 style={{ textAlign: "center" }}>Zamówienia</h1>
				{state.orders.map((order) => (
					<OrderItem
						key={order.id}
						id={order.id}
						name={order.name}
						onOrderDrop={assignOrderToCustomer}
					/>
				))}
			</div>
		</div>
	);
};

const CustomerItem = ({ customer, order }) => {
	const [{ canDrop, isOver }, drop] = useDrop(
		() => ({
			accept: "order",
			drop: () => ({
				...customer,
			}),
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[]
	);

	return (
		<div
			ref={drop}
			className="d-flex justify-content-sm-center bg-primary p-2 m-2 rounded text-white"
		>
			{customer.name} - {customer.orders.length}
		</div>
	);
};

const OrderItem = ({ name, id, onOrderDrop }) => {
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: "order",
			item: { name, id },
			end(item, monitor) {
				const dropResult = monitor.getDropResult();
				if (dropResult?.id)
					onOrderDrop({
						orderId: id,
						customerId: dropResult.id,
						orderName: name,
					});
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[name]
	);
	return (
		<div
			ref={drag}
			style={{ opacity: isDragging ? 0.4 : 1 }}
			className="d-flex justify-content-sm-center bg-primary p-2 m-2 rounded text-white"
		>
			{name}
		</div>
	);
};

export default OrderAssignment;
