import React from "react";
import { CheckCircle, Triangle, ExternalLink } from "react-feather";
import { Spinner } from "react-bootstrap";
import { RowFixed } from "../Row";
import * as Styled from "./styleds";

export interface PureTransactionProps {
	url: string;
	pending: boolean;
	success?: boolean;
	label: string;
}

export const PureTransaction = ({ url, pending, success, label }: PureTransactionProps) => {
	return (
		<div>
			<Styled.TransactionState href={url} pending={pending} success={success}>
				<RowFixed>
					<Styled.TransactionStatusText>
						{label}
						<ExternalLink />
					</Styled.TransactionStatusText>
				</RowFixed>
				<Styled.IconWrapper pending={pending} success={success}>
					{pending ? (
						<Spinner animation="border" />
					) : success ? (
						<CheckCircle size="16" />
					) : (
						<Triangle size="16" />
					)}
				</Styled.IconWrapper>
			</Styled.TransactionState>
		</div>
	);
};
