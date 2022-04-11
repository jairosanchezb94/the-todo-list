import React, { useRef } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
	Container,
	ListGroupItem,
	InputGroup,
	FormControl
} from "react-bootstrap";
import { connect } from "react-redux";

import { deleteTodo, markComplete, markIncomplete } from "action/index";
import storeType from "types/storeType";
import AppPropType from "./AppPropType";

const App: React.FC<AppPropType> = ({
	complete,
	incomplete,
	deleteTodo,
	markComplete,
	markIncomplete,
}) => {
	const input = useRef<HTMLInputElement>(null);

	const renderList = (type: "Complete" | "Incomplete") => {
		const looper = type === "Complete" ? complete : incomplete;
		return (
			<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
				<h3>{type}</h3>
				{looper.map((todo, index) => {
					return (
						<ListGroupItem
							key={index}
							variant={type === "Complete" ? "success" : "danger"}
							style={{ display: "flex", justifyContent: "flex-start" }}
						>
							<div>{todo}</div>
							<div>
								<i
									className={`fas fa-${
										type === "Complete" ? "minus" : "check"
									} m-2`}
									onClick={() => {
										type === "Complete"
											? markIncomplete(todo)
											: markComplete(todo);
									}}
								></i>
								<i
									className="fas fa-trash m-2"
									onClick={() => deleteTodo(todo)}
								></i>
							</div>
						</ListGroupItem>
					);
				})}
			</Box>
		);
	};

	const addTodo = () => {
		if (input.current) {
			const val = input.current.value;
			input.current.value = "";
			markIncomplete(val);
		}
	};

	return (
		<Container>
			<InputGroup className="input-group m-3">
				<FormControl placeholder="Todo" ref={input} />
				<InputGroup.Append>
					<Button variant="contained" onClick={() => addTodo()}>
						Add
					</Button>
				</InputGroup.Append>
			</InputGroup>
			{renderList("Incomplete")}
			{renderList("Complete")}
		</Container>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		complete: state.complete,
		incomplete: state.incomplete,
	};
};

export default connect(mapStateToProps, {
	deleteTodo,
	markComplete,
	markIncomplete,
})(App);
