import { HTMLAttributes } from "react";
import { Stars } from "react-bootstrap-icons";
import Skeleton from "react-loading-skeleton";
import * as Styled from "./styleds";

export interface SnapshotSpaceProps {
	name: string;
	symbol: string;
	network: string;
};

export interface PureGovernanceSpaceItemProps extends HTMLAttributes<HTMLElement> {
	space: SnapshotSpaceProps;
	// id?: string;
	to?: string;
	pinned?: boolean;
	logo?: string;
	loading?: boolean;
	// children?: ReactChild;
};

export const PureGovernanceSpaceItem = ({
	space,
	// id,
	to = "#",
	pinned = false,
	logo,
	loading = false,
	...attrs
}: PureGovernanceSpaceItemProps) => {
	if (loading) {
		return (
			<Styled.Wrapper to={"#"} loading={loading} {...attrs}>
				<Skeleton circle={true} width={88} height={88} className="mb-3" />

				<Styled.Title>
					<Skeleton height={20} width={120} />
				</Styled.Title>
				<Styled.CurrencyName>
					<Skeleton height={15} width={80} />
				</Styled.CurrencyName>
			</Styled.Wrapper>
		);
	}

	return (
		<Styled.Wrapper to={to} loading={loading} {...attrs}>
			{pinned && (
				<Styled.StarWrapper>
					<Stars size={18} />
				</Styled.StarWrapper>
			)}

			<Styled.Logo src={logo} />
			<Styled.Title>{space.name}</Styled.Title>
			<Styled.CurrencyName>{space.symbol}</Styled.CurrencyName>
		</Styled.Wrapper>
	);
};
