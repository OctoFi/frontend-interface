import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { HelpCircle } from "react-feather";

export interface PureQuestionTooltipProps {
	text: string;
	title?: string;
}

export const PureQuestionTooltip = ({ text, title }: PureQuestionTooltipProps) => {
	return (
		<OverlayTrigger
			placement={"right"}
			overlay={
				<Popover id={"popover-right"}>
					{title && <Popover.Header as="h3">{title}</Popover.Header>}
					<Popover.Body>{text}</Popover.Body>
				</Popover>
			}
		>
			<HelpCircle size={20} />
		</OverlayTrigger>
	);
};
