import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {FileUploader} from "./components/FileUploader/FileUploader";

function App() {
	return (
		<div className="App">
			<FileUploader />
		</div>
	);
}

export default App;
