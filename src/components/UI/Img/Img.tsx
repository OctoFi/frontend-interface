import React, { useState, useCallback } from "react";
import { HelpCircle } from "react-feather";
import * as Styled from "./styleds";

// TODO: verify the props works correctly
export interface ImgProps {
	src?: string;
	alt?: string;
	props?: any;
}

export const Img = ({ src, alt, ...props }: ImgProps) => {
	const [tries, refresh] = useState(0);

	const errorHandler = useCallback(() => {
		refresh(-1);
	}, []);

	if (tries > -1 && src) {
		return <img {...props} src={src} alt={alt} onError={errorHandler} />;
	}

	return (
		<Styled.BadSource {...props}>
			<HelpCircle />
		</Styled.BadSource>
	);
};
