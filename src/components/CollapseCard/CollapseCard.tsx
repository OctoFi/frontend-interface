import React, { useRef, useState, useCallback } from "react";
import { ChevronRight } from "react-bootstrap-icons";
import useTheme from "../../hooks/useTheme";
import * as Styled from "./styleds";

export interface CollapseCardProps {
	title?: string;
	children?: any;
}

export const CollapseCard = ({ title, children }: CollapseCardProps) => {
	const [show, setShow] = useState(false);
	const [height, setHeight] = useState(0);

	const header = useRef(null);
	const content = useRef(null);
	const theme = useTheme();

	const showCollapse = useCallback(() => {
		if (content.current) {
			// @ts-ignore
			const contentRect = content.current.getBoundingClientRect();

			if (show) {
				setHeight(0);
			} else {
				setHeight(contentRect.height);
			}

			setShow((show) => !show);
		}
	}, [show, content]);

	return (
		<Styled.Wrapper>
			<Styled.Header
				className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between"
				ref={header}
				onClick={showCollapse}
			>
				<Styled.HeaderTitle>{title}</Styled.HeaderTitle>
				<Styled.HeaderShowMore show={show}>
					<ChevronRight size={16} color={theme.text1} />
				</Styled.HeaderShowMore>
			</Styled.Header>
			<Styled.CollapseView height={height}>
				<Styled.Content ref={content}>{children}</Styled.Content>
			</Styled.CollapseView>
		</Styled.Wrapper>
	);
};
