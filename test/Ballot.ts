import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function deployContract() {
  const signers = await ethers.getSigners();

  const ballotFactory = await ethers.getContractFactory("Ballot");
  const proposals = PROPOSALS.map(ethers.encodeBytes32String);
  const ballotContract = await ballotFactory.deploy(proposals);
  await ballotContract.waitForDeployment();

  return {signers, ballotContract};
}

describe("Ballot", async () => {

  describe("when the contract is deployed", async () => {
    it("has the provided proposals", async () => {
      const {ballotContract} = await loadFixture(deployContract);

      //// Here we validate just the first element of the array...
      // const proposal0 = await ballotContract.proposals(0);
      // expect (PROPOSALS[0]).to.eq(ethers.decodeBytes32String(proposal0.name));

      // Here we validate all the elements of the array...
      for (let index = 0; index < PROPOSALS.length; index++){
        const proposal = await ballotContract.proposals(index);
        expect (PROPOSALS[index]).to.eq(ethers.decodeBytes32String(proposal.name));
      }
    });
  
    it("has zero votes for all proposals", async () => {
      const {ballotContract} = await loadFixture(deployContract);
      
      for (let index = 0; index < PROPOSALS.length; index++){
        const proposal = await ballotContract.proposals(index);
        expect (proposal.voteCount).to.eq(0);
      }
    });

    it("sets the deployer address as chairperson", async () => {
      const {signers, ballotContract} = await loadFixture(deployContract);
      const deployerAddress = signers[0].address;
      const chairpersonAddress = await ballotContract.chairperson();
      expect (deployerAddress).to.eq(chairpersonAddress);
    });

    it("sets the voting weight for the chairperson as 1", async () => {
      const {ballotContract} = await loadFixture(deployContract);
      const chairpersonAddress = await ballotContract.chairperson();
      const chairpersonVoter = await ballotContract.voters(chairpersonAddress)
      expect (chairpersonVoter.weight).to.equal(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", async () => {
    it("gives right to vote for another address", async () => {
      const {signers, ballotContract} = await loadFixture(deployContract);
      const voter1 = signers[1].address;
      await ballotContract.giveRightToVote(voter1);
      const voter1After = await ballotContract.voters(voter1);
      expect (voter1After.weight).to.eq(1);
    });

    it("can not give right to vote for someone that has voted", async () => {
      // TODO
      throw Error("Not implemented");
    });
    it("can not give right to vote for someone that has already voting rights", async () => {
      // TODO
      const {signers, ballotContract} = await loadFixture(deployContract);
      const voter1 = signers[1].address;
      await ballotContract.giveRightToVote(voter1);
      const voter1After = await ballotContract.voters(voter1);
      await expect(ballotContract.giveRightToVote(voter1)).to.be.reverted;
    });
  });

  describe("when the voter interacts with the vote function in the contract", async () => {
    // TODO
    it("should register the vote", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when the voter interacts with the delegate function in the contract", async () => {
    // TODO
    it("should transfer voting power", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account other than the chairperson interacts with the giveRightToVote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the vote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the delegate function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function before any votes are cast", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function before any votes are cast", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", async () => {
    // TODO
    it("should return the name of the winner proposal", async () => {
      throw Error("Not implemented");
    });
  });
});
