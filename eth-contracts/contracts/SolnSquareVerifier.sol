pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";

contract SolnSquareVerifier is ZoomToken, SquareVerifier {
    struct Solution {
        uint index;
        address owner;
    }

    Solution[] private _solutions;
    mapping(bytes32 => Solution) solutionByKeys;

    event SolutionAdded(uint index, address owner, bytes32 key);

    function addSolution(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(solutionByKeys[key].owner == address(0), "proof already used");

        bool accepted = verifyTx(a, b, c, input);
        require(accepted, "Invalid solution");

        Solution memory solution = Solution(_solutions.length, msg.sender);
        _solutions.push(solution);
        solutionByKeys[key] = solution;

        emit SolutionAdded(solution.index, solution.owner, key);
    }
}

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly




























