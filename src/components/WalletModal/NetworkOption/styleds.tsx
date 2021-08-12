import styled from "styled-components";

export const InfoCard = styled.button<{ active?: boolean; clickable?: boolean }>`
	background-color: transparent;
	padding: 1rem;
	outline: none;
	border: none;
	border-radius: 20px;
	width: 100% !important;

	&:focus {
		outline: none;
	}
`;

export const OptionCard = styled(InfoCard as any)`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem 0.5rem;
	transition: all ease 0.4s;
`;

export const OptionCardLeft = styled.div`
	${({ theme }) => theme.flexRowNoWrap};
	justify-content: space-between;
	align-items: center;
	flex: 1;
	height: 100%;
`;

export const HeaderText = styled.div`
	${({ theme }) => theme.flexRowNoWrap};
	color: ${({ theme }) => theme.text3};
	font-size: 0.75rem;
	font-weight: 400;
	transition: all ease 0.3s;
`;

// ${({ name, supportedNetworks }) => (supportedNetworks?.incluedes(name) ? "1 !important" : "0.5 !important")};
export const OptionCardClickable = styled(OptionCard as any)<{
	clickable?: boolean;
	isRow?: boolean;
	disabled?: boolean;
}>`
	margin-top: 0;
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	margin-bottom: 0;
	cursor: ${({ disabled }) => (!disabled ? "pointer !important" : "not-allowed !important")};

	&:hover {
		cursor: ${({ clickable }) => (clickable ? "pointer" : "")};
		background-color: ${({ theme }) => theme.primaryLight};

		& .wallet-option__icon-wrapper {
			background-color: ${({ theme }) => theme.modalBG};
		}

		& ${HeaderText} {
			color: ${({ theme }) => theme.text1};
		}
	}
`;

export const IconWrapper = styled.div<{ size?: number | null }>`
	${({ theme }) => theme.flexColumnNoWrap};
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 60px;
	min-height: 60px;
	border-radius: 80px;
	background-color: ${({ theme }) => theme.primaryLight};
	margin-bottom: 12px;
	position: relative;
	transition: all ease 0.3s;

	& > img,
	span {
		height: ${({ size }) => (size ? size + "px" : "24px")};
		width: ${({ size }) => (size ? size + "px" : "24px")};
	}

	@media (max-width: 1199px) {
		width: 56px;
		height: 56px;
		min-height: 56px;

		& > img,
		span {
			height: 28px;
			width: 28px;
		}
	}
`;

export const LoadingContainer = styled.div<{ color: string }>`
	width: 24px;
	height: 24px;
	border-radius: 40px;
	border: 4px solid ${({ theme }) => theme.modalBG};
	background-color: ${({ theme, color }) => (color?.slice(0, 1) === "#" ? color : (theme as any)[color])};
	display: flex;
	align-items: center;
	justify-content: center;
	right: -4px;
	bottom: -8px;
	position: absolute;
`;
