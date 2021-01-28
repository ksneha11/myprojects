import React, { ReactElement } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { BodyCopy, TextLink } from '../components/common';
import { Logger } from './index';

export const convertHtmlEncodedBodyToJsx = (
    text: string,
    callback: (string) => any = () => {},
    logger: Logger
): Children => {
    const parsedTexts: ReactElement[] = ReactHtmlParser(text);
    return (
        <>
            {parsedTexts.map((parsedText, index) => {
                if (typeof parsedText === 'string') {
                    return <BodyCopy key={index}>{parsedText}</BodyCopy>;
                } else if (parsedText.type === 'a' && parsedText.props?.href) {
                    return (
                        <TextLink key={index} onPress={() => callback(parsedText.props.href)} isUnderlined>
                            {parsedText.props.children[0]}
                        </TextLink>
                    );
                } else {
                    logger.warn('Unrecognized tag.');
                }
            })}
        </>
    );
};
