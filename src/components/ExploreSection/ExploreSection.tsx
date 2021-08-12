import * as Styled from "./styleds";

export type ExploreSectionProps = {
	title: string;
	description: string;
	headerAction?: any;
	content: any;
	direction?: any;
};

export const ExploreSection = ({ title, description, headerAction, content, direction }: ExploreSectionProps) => {
	return (
		<Styled.Section>
			<Styled.SectionHeader>
				<Styled.SectionHeaderInner>
					<Styled.SectionTitle>{title}</Styled.SectionTitle>
					{description && <Styled.SectionSubTitle>{description}</Styled.SectionSubTitle>}
				</Styled.SectionHeaderInner>
				{headerAction || null}
			</Styled.SectionHeader>

			<Styled.SectionBody direction={direction || "column"} className="mr-n4">
				{content}
			</Styled.SectionBody>
		</Styled.Section>
	);
};
