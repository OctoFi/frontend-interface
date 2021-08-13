import styled from "styled-components";
import Img from '../../../../components/UI/Img';

export const InputRow = styled.div`
    ${({ theme }) => theme.flexRowNoWrap};
    align-items: center;
    padding: 1rem 0 0;

    @media (min-width: 768px) {
        padding-top: 0.75rem;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
`;

export const Label = styled.span`
    color: ${({ theme }) => theme.text1};
    font-weight: 400;
    font-size: 0.875rem;
    padding: 0;

    @media (min-width: 768px) {
        padding: 0 1rem;
    }

    @media (max-width: 1400px) {
        font-weight: 400;
    }
`;

export const InputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex: 1;
`;

export const LabelRow = styled.div`
    ${({ theme }) => theme.flexRowNoWrap};
    align-items: center;
    color: ${({ theme }) => theme.text1};
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0;
`;

export const Aligner = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const InputPanel = styled.div`
    ${({ theme }) => theme.flexColumnNoWrap};
    position: relative;
    border-radius: 0.42rem;
`;

export const TokenName = styled.span`
    margin-right: auto;
    font-size: 1rem;
    font-weight: 500;

    @media (max-width: 1400px) {
        font-size: 0.875rem;
    }
`;

export const Logo = styled(Img)`
    width: 34px;
    height: 34px;
    min-width: 34px;
    border-radius: 200px;
    border: 2px solid ${({ theme }) => theme.text1};
    margin-right: 15px;

    @media (max-width: 1400px) {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        min-width: 24px;
    }
`;

export const CurrencySelect = styled.button`
    display: flex;
    align-items: center;
    height: 56px;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.text1};
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
    box-shadow: none;
    outline: none;
    cursor: pointer;
    user-select: none;
    border: none;
    padding: 0.875rem 0.625rem;
    min-width: 116px;
    width: 116px;

    @media (min-width: 768px) {
        min-width: 178px;
        width: 178px;
        padding: 0.625rem 1rem;
        font-size: 1rem;
        font-weight: 700;
    }

    &:focus,
    &:hover {
        background-color: ${({ theme }) => theme.bg1};
        outline: none;
    }
`;

export const BalanceRow = styled.div`
	${({ theme }) => theme.flexRowNoWrap};
	align-items: center;
	margin-top: 10px;
	color: ${({ theme }) => theme.text1};
	font-size: 0.75rem;
	font-weight: 400;
	line-height: 1rem;
	padding: 0 1rem;
`;
