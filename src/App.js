import { useState, createContext } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MDBContainer } from "mdb-react-ui-kit";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./styles.css";
import Home from "./containers/Home";

export const State = createContext({
	customers: [],
	orders: [],
});

export default function App() {
	const [state, setState] = useState({ 
		customers: [], 
		orders: [] });
	const { Provider } = State;

	return (
		<MDBContainer breakpoint="lg" className="mt-3">
			<Provider value={{ state, setState }}>
				<DndProvider backend={HTML5Backend}>
					<Home />
				</DndProvider>
			</Provider>
		</MDBContainer>
	);
}
