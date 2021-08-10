import { PropsWithChildren } from "react";
import { PureCopyButton } from "./CopyButton";
import useCopyClipboard from "../../hooks/useCopyClipboard";

export interface CopyButtonProps {
	toCopy: string;
}

const CopyButton = ({ toCopy, children }: PropsWithChildren<CopyButtonProps>) => {
	const [isCopied, setCopied] = useCopyClipboard(1000);

	return (
		<PureCopyButton onCopy={() => setCopied(toCopy)} success={isCopied}>
			{children}
		</PureCopyButton>
	);
};

export default CopyButton;
