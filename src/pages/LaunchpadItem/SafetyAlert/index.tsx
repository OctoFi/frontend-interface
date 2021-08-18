import { useState } from "react";
import { PureSafetyAlert } from "./SafetyAlert";

const SafetyAlert = () => {
	const [show, setShow] = useState(true);
	const onDismiss = () => setShow(false);

	return <PureSafetyAlert show={show} onDismiss={onDismiss} />;
};

export default SafetyAlert;
