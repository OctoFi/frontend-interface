import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { Default } from "./CircleLoading.stories";

afterEach(cleanup);

test("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Default {...Default.args} />, div);
});

test("matches snapshot", () => {
	const tree = renderer.create(<Default {...Default.args} />).toJSON();
	expect(tree).toMatchSnapshot();
});
