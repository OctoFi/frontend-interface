import { CheckCircle, Copy } from "react-feather";
import { Button } from "react-bootstrap";

export type PureCopyButtonProps = {
	success?: boolean;
	onCopy?: () => void;
	children?: any;
};

export const PureCopyButton = ({ onCopy, success, children }: PureCopyButtonProps) => {
	return (
		<Button
			onClick={onCopy}
			variant="light"
			className={`bg-transparent border-0 d-inline-flex gap-2 flex-nowrap align-items-center ${
				success ? "text-success" : "text-muted"
			}`}
		>
			{success ? (
				<>
					<CheckCircle size={24} />
					<span>Copied</span>
				</>
			) : (
				<>
					<Copy size={24} />
					{children}
				</>
			)}
		</Button>
	);
};
