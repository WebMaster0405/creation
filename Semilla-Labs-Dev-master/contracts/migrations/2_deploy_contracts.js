var ConcealProtocol = artifacts.require('./ConcealProtocol.sol');

module.exports = function(deployer) {
    deployer.deploy(ConcealProtocol);
}