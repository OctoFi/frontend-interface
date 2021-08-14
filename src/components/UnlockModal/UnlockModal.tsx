import { Modal } from "../Modal/bootstrap";
import { ConfirmationPendingContent, TransactionSubmittedContent } from "../TransactionConfirmationModal";

export interface UnlockModalProps {
	show?: boolean;
	unlocking?: boolean;
	done?: boolean;
	onDismiss?: () => void;
}

export const UnlockModal = ({ show, unlocking, done, onDismiss }: UnlockModalProps) => {
	return (
		<Modal show={show} onHide={onDismiss} centered>
			<Modal.Body className="p-0">
				{!done ? (
					<ConfirmationPendingContent
						onDismiss={onDismiss}
						pendingText={unlocking ? "Unlocking" : "Waiting for confirmation"}
					/>
				) : (
					<TransactionSubmittedContent hash={undefined} onDismiss={onDismiss} />
				)}
			</Modal.Body>
		</Modal>
	);
};
