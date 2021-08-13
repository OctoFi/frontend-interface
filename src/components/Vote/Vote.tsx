import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useWeb3React } from "@web3-react/core";
import { useHistory, useParams } from "react-router-dom";

import { formatProposal, getScores } from "../../lib/utils";
import Snapshot from "../../http/snapshot";
import { AppState } from "../../state";
import { useWalletModalToggle } from "../../state/application/hooks";
import { fetchProposals, fetchSpaces } from "../../state/governance/actions";
import { Modal } from "../Modal/bootstrap";
import Card from "../Card";
import Page from "../Page";
import { VoteCast } from "./VoteCast";
import { ProposalContent } from "./ProposalContent";
import { ProposalVotes } from "./ProposalVotes";
import { VoteInformation } from "./VoteInformation";
import { VoteResults } from "./VoteResults";

export const Vote = () => {
	const { account, library } = useWeb3React();
	const [selectedProposal, setSelectedProposal] = useState(false);
	const [selectedVote, setSelectedVote] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [votes, setVotes] = useState({});
	const [result, setResult] = useState({});
	const [status, setStatus] = useState({});
	const dispatch = useDispatch();
	const toggleWalletModal = useWalletModalToggle();
	const { spaces, loading: governanceLoading, proposals } = useSelector((state: AppState) => state.governance);
	const { t } = useTranslation();
	const api = new Snapshot();
	const history = useHistory();
	const { space, id } = useParams();

	let currentSpace = spaces[space];

	useEffect(() => {
		if (Object.keys(spaces).length === 0) {
			dispatch(fetchSpaces());
		} else {
			if (spaces.hasOwnProperty(space)) {
				dispatch(fetchProposals(space));
				api.get("votes", { space, id })
					.then((response) => {
						setVotes(response);
					})
					.catch((error) => {
						toast.error("Cannot get votes, Please try again in a minute");
					});
			} else {
				history.push("/governance");
			}
		}
	}, [spaces, space, id, dispatch, history]);

	const getVotes = () => {
		api.get("votes", { space, id })
			.then((response) => {
				setVotes(response);
			})
			.catch((error) => {
				toast.error("Cannot get votes, Please try again in a minute");
			});
	};

	const transformVotes = async (votes, proposals) => {
		let result = {};
		if (Object.keys(votes).length > 0) {
			const selectedProposals =
				proposals.hasOwnProperty(space) && proposals[space].hasOwnProperty(id)
					? formatProposal(Object.assign({}, proposals[space][id]))
					: formatProposal({});
			const scores = await getScores(
				space,
				currentSpace.strategies,
				currentSpace.network,
				library,
				Object.keys(votes)
			);
			result.votes = Object.fromEntries(
				Object.entries(votes)
					.map((vote) => {
						let transformed = [vote[0], Object.assign({}, vote[1])];
						transformed[1].scores = currentSpace.strategies.map(
							(strategy, i) => scores[i][transformed[1].id] || 0
						);
						transformed[1].balance = transformed[1].scores.reduce((a, b) => a + b, 0);
						return transformed;
					})
					.sort((a, b) => b[1].balance - a[1].balance)
			);
			result.results = {
				totalVotes: selectedProposals.msg?.payload?.choices?.map(
					(choice, i) =>
						Object.values(result.votes).filter((vote) => vote.msg.payload.choice === i + 1).length
				),
				totalBalances: selectedProposals.msg?.payload?.choices?.map((choice, i) =>
					Object.values(result.votes)
						.filter((vote) => vote.msg.payload.choice === i + 1)
						.reduce((a, b) => a + b.balance, 0)
				),
				totalScores: selectedProposals.msg?.payload?.choices?.map((choice, i) =>
					currentSpace.strategies.map((strategy, sI) =>
						Object.values(result.votes)
							.filter((vote) => vote.msg.payload.choice === i + 1)
							.reduce((a, b) => a + b.scores[sI], 0)
					)
				),
				totalVotesBalances: Object.values(result.votes).reduce((a, b) => a + b.balance, 0),
			};
			setResult(result);
		}
	};

	useEffect(() => {
		transformVotes(votes, proposals);
	}, [proposals, votes]);

	useEffect(() => {
		if (proposals.hasOwnProperty(space)) {
			if (proposals[space].hasOwnProperty(id)) {
				setSelectedProposal(proposals[space][id]);
				const ts = (Date.now() / 1e3).toFixed();
				const { start, end } = proposals[space][id].msg.payload;
				let state =
					ts > end
						? { title: "Closed", className: "label-light-danger" }
						: ts > start
						? { title: "Active", className: "label-light-success" }
						: { title: "Pending", className: "label-light-info" };
				setStatus(state);
			} else {
				history.push(`/governance/${space}`);
			}
		} else {
			setSelectedProposal(false);
		}
	}, [proposals, space, id, history]);

	const handleSubmit = useCallback(async () => {
		if (!account) {
			toggleWalletModal();
			return false;
		}
		const options = {
			token: currentSpace.token,
			type: "vote",
			space: space,
			payload: {
				proposal: id,
				choice: selectedVote,
				metadata: {},
			},
		};
		const msg = {
			address: account,
			msg: JSON.stringify({
				version: "0.1.3",
				timestamp: (Date.now() / 1e3).toFixed(),
				...options,
			}),
		};
		try {
			toast("Sending ...", {
				icon: "💡",
			});
			const signer = library.getSigner(account);
			msg.sig = await signer.signMessage(msg.msg);
			const res = await api.sendMessage(msg);
			toast.success("Your Vote is in!");
			if (res.hasOwnProperty("ipfsHash")) {
				getVotes();
			}
			setShowModal(false);
		} catch (error) {
			toast.error("Something went wrong!");
		}
	}, [selectedProposal, selectedVote, account, id, api, space, library, spaces]);

	return (
		<Page title={t("governance.title")}>
			{governanceLoading && !selectedProposal ? (
				<Card>
					<div className="d-flex align-items-center justify-content-center py-5 w-100">
						<Spinner animation="border" variant="primary" id="vote-loading" />
					</div>
				</Card>
			) : (
				selectedProposal && (
					<Row>
						<Col className={"order-2 order-md-1"} xs={12} md={8}>
							<Row>
								<Col xs={12} className={"gutter-b"}>
									<ProposalContent proposal={selectedProposal} status={status} />
								</Col>
								{status.title === "Active" && (
									<Col xs={12} className={"gutter-b"}>
										{selectedProposal && (
											<VoteCast
												proposal={selectedProposal}
												selected={selectedVote}
												onSelectOption={setSelectedVote}
												onVote={() => {
													!account ? toggleWalletModal() : setShowModal(true);
												}}
											/>
										)}
									</Col>
								)}
								<Col xs={12} className={"gutter-b"}>
									{votes && result && selectedProposal && (
										<ProposalVotes
											votes={votes}
											result={result}
											proposal={selectedProposal}
											space={currentSpace}
										/>
									)}
								</Col>
							</Row>
						</Col>
						<Col className={"order-1 order-md-2"} xs={12} md={4}>
							{selectedProposal && (
								<VoteInformation proposal={selectedProposal} space={currentSpace} id={space} />
							)}

							{result?.results && (
								<VoteResults
									result={result.results}
									choices={selectedProposal?.msg?.payload?.choices}
									symbol={currentSpace?.symbol}
								/>
							)}
						</Col>
					</Row>
				)
			)}

			{selectedProposal && (
				<Modal show={showModal} centered onHide={() => setShowModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Vote</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>
							{t("governance.voteConfirmation")} "{selectedProposal.msg.payload.choices[selectedVote - 1]}
							"? <br />
							{t("governance.voteWarning")}
						</p>
						<div className="pt-4 d-flex align-items-center justify-content-end">
							<Button variant="outline-danger" onClick={() => setShowModal(false)}>
								{t("close")}
							</Button>
							<Button variant="primary" onClick={handleSubmit} className={"ml-3"}>
								{t("governance.vote")}
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</Page>
	);
};
