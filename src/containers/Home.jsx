import React, { useState } from "react";
import {
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
} from "mdb-react-ui-kit";

import Summary from "../components/Summary";
import Customers from "../components/Customers";
import Orders from "../components/Orders";
import OrderAssignment from "../components/OrderAssignment";

const Home = () => {
	const [activeTab, setActiveTab] = useState("summary");

	const onTabChange = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div
			style={{
				padding: "10px",
				backgroundColor: "#F7F9F9",
				borderRadius: "5px",
			}}
		>
			<h1>CMS</h1>
			<MDBTabs className="mt-3 mb-3">
				<MDBTabsItem>
					<MDBTabsLink
						className="bg-primary hover-overlay text-white"
						onClick={() => onTabChange("summary")}
						active={activeTab === "tab1"}
					>
						Podsumowanie
					</MDBTabsLink>
				</MDBTabsItem>

				<MDBTabsItem>
					<MDBTabsLink
						className="mx-1 bg-primary hover-overlay text-white"
						onClick={() => onTabChange("customers")}
						active={activeTab === "tab2"}
					>
						Klienci
					</MDBTabsLink>
				</MDBTabsItem>
				<MDBTabsItem>
					<MDBTabsLink
						className="bg-primary hover-overlay text-white"
						onClick={() => onTabChange("orders")}
						active={activeTab === "tab3"}
					>
						Zamówienia
					</MDBTabsLink>
				</MDBTabsItem>
				<MDBTabsItem>
					<MDBTabsLink
						className="mx-1 bg-primary hover-overlay text-white"
						onClick={() => onTabChange("assignment")}
						active={activeTab === "tab4"}
					>
						Manager zamówień
					</MDBTabsLink>
				</MDBTabsItem>
			</MDBTabs>

			<MDBTabsContent>
				<MDBTabsPane show={activeTab === "summary"}>
					<Summary />
				</MDBTabsPane>
				<MDBTabsPane show={activeTab === "orders"}>
					<Orders />
				</MDBTabsPane>
				<MDBTabsPane show={activeTab === "customers"}>
					<Customers />
				</MDBTabsPane>
				<MDBTabsPane show={activeTab === "assignment"}>
					<OrderAssignment />
				</MDBTabsPane>
			</MDBTabsContent>
		</div>
	);
};

export default Home;
