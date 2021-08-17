import React, { useState, useCallback } from "react";
import { HelpCircle } from "react-feather";
import * as Styled from "./styleds";

export interface ImgProps {
	src?: string;
	alt?: string;
	width?: any;
	height?: any;
	props?: any;
}

export const Img = ({ src, alt, width, height, ...props }: ImgProps) => {
	const [tries, refresh] = useState(0);

	const errorHandler = useCallback(() => {
		refresh(-1);
	}, []);

	if (tries > -1 && src) {
		return <img src={src} alt={alt} width={width} height={height} onError={errorHandler} {...props} />;
	}

	return (
		<Styled.BadSource>
			<HelpCircle />
		</Styled.BadSource>
	);
};
