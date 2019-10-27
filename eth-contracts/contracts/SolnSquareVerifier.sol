pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";

contract SolnSquareVerifier is ZoomToken, SquareVerifier {
    struct Solution {
        uint index;
        address owner;
    }

    Solution[] private _solutions;
    mapping(uint => Solution) _usedSolutions;

    event SolutionAdded(uint index, address owner);

    function addSolution(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public {
        bool accepted = verifyTx(a, b, c, input);
        require(accepted, "Invalid solution");

        Solution memory solution = Solution(_solutions.length, msg.sender);
        _solutions.push(solution);

        emit SolutionAdded(solution.index, solution.owner);
    }

    function mintWithSolution(uint solutionIndex) public {
        require(_usedSolutions[solutionIndex].owner == address(0), "Solution already used");

        Solution memory solution = _solutions[solutionIndex];
        require(solution.owner != address(0), "No solution submitted at this index");
        require(solution.owner == msg.sender, "Only solution owner can mint");

        _usedSolutions[solutionIndex] = solution;
        mint(solution.owner, solutionIndex);
    }
}
