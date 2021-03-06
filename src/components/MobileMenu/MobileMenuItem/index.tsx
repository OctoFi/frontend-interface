import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "react-feather";
import useTheme from "../../../hooks/useTheme";
import * as Styled from "./styleds";

export type MobileMenuItemProps = {
	items: Array<any>;
	title: string;
	icon?: any;
};

const MobileMenuItem = ({ items, title, icon }: MobileMenuItemProps) => {
	const theme = useTheme();
	const body = useRef(null);
	const [open, setOpen] = useState(false);
	const [height, setHeight] = useState(0);
	const { t } = useTranslation();

	const toggleOpen = useCallback(() => {
		if (open) {
			setOpen(false);
			setHeight(0);
		} else {
			if (body.current) {
				// @ts-ignore
				const { height } = body.current.getBoundingClientRect();
				setOpen((open) => !open);
				setHeight(height || 0);
			}
		}
	}, [body.current, open]);

	return (
		<Styled.Wrapper>
			<Styled.Header onClick={toggleOpen}>
				{icon ? (
					<Styled.TitleContainer>
						<Styled.Icon>{icon}</Styled.Icon>
						<Styled.Title>{t(`menu.${title}`)}</Styled.Title>
					</Styled.TitleContainer>
				) : (
					<Styled.Title>{t(`menu.${title}`)}</Styled.Title>
				)}
				<Styled.IconContainer open={open}>
					<ChevronDown size={16} color={theme.primary} />
				</Styled.IconContainer>
			</Styled.Header>
			<Styled.Collapse height={height}>
				<Styled.Body ref={body}>
					{Object.values(items).map((item, index) => {
						return (
							<Styled.BodyItem to={item.path} key={`${title}-${index}`}>
								{t(`menu.${item.title}`)}
							</Styled.BodyItem>
						);
					})}
				</Styled.Body>
			</Styled.Collapse>
		</Styled.Wrapper>
	);
};

export default MobileMenuItem;
