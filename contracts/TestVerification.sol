pragma solidity 0.4.24;

import "./ECDSA.sol";

contract TestVerification {
    function recover(bytes32 _hash, bytes _sig) external pure returns (address) {
        return ECDSA.recover(_hash, _sig);
    }
}