import { ethers } from 'ethers';
import contractABI from '../abis/SpaceDappGame.json';

const CONTRACT_ADDRESS = '0x575A29635f019A33eB574eeA4Ea8070128edd7F7';
const RPC_URL = 'https://api.avax-test.network/ext/bc/C/rpc';

export const fetchLeaderboardFromChain = async () => {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

    const [typingEvents, quizEvents, spaceEvents] = await Promise.all([
        contract.queryFilter(contract.filters.TypingGamePlayed()),
        contract.queryFilter(contract.filters.QuizGamePlayed()),
        contract.queryFilter(contract.filters.SpaceGamePlayed())
    ]);

    const allEvents = [...typingEvents, ...quizEvents, ...spaceEvents];
    const scores = {};

    for (const e of allEvents) {
        const player = e.args.player;
        const score = e.args.score.toNumber();

        if (!scores[player]) {
            scores[player] = { address: player, totalScore: 0 };
        }
        scores[player].totalScore += score;
    }

    const sorted = Object.values(scores)
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 10);

    return sorted;
};