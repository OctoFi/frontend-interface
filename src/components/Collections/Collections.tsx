import { useTranslation } from "react-i18next";
import { Search } from "react-bootstrap-icons";

import CollectionCard from "../CollectionCard";
import { InputGroupFormControl as FormControl, InputGroupText } from "../Form";
import * as Styled from "./styleds";

export interface PureCollectionsProps {
	onSearch?: () => void;
	collections?: Array<any>;
	loading?: boolean;
	onChangeCollection?: () => void;
	selected?: boolean;
}

export const PureCollections = ({
	onSearch,
	collections,
	loading,
	onChangeCollection,
	selected,
}: PureCollectionsProps) => {
	const { t } = useTranslation();

	return (
		<Styled.Wrapper>
			<Styled.CustomInputGroup className={"w-auto"} bg={"darker"}>
				<InputGroupText>
					<Search size={18} />
				</InputGroupText>
				<FormControl id="CollectionSearch" placeholder={t("search")} onChange={onSearch} />
			</Styled.CustomInputGroup>

			<Styled.Container>
				<Styled.Content>
					<Styled.CollectionsList>
						{loading
							? [...Array(8)].map((i) => {
									return (
										<Styled.CollectionsItem key={`collections-loading-${i}`}>
											<CollectionCard collection={{ loading: true }} />
										</Styled.CollectionsItem>
									);
							  })
							: collections.map((item, i) => {
									return (
										<Styled.CollectionsItem
											key={`collections-${i}`}
											onClick={onChangeCollection.bind(this, item)}
										>
											<CollectionCard collection={item} selected={item.slug === selected} />
										</Styled.CollectionsItem>
									);
							  })}
					</Styled.CollectionsList>
				</Styled.Content>
			</Styled.Container>
		</Styled.Wrapper>
	);
};
