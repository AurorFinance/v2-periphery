import chai, { expect } from 'chai'
import { Contract } from 'ethers'
import { solidity, MockProvider, createFixtureLoader } from 'ethereum-waffle'

import { v2Fixture } from './shared/fixtures'

chai.use(solidity)

describe('RouterFee', () => {
  const provider = new MockProvider({
    hardfork: 'istanbul',
    mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
    gasLimit: 9999999
  })
  const [wallet, treasury, alice] = provider.getWallets()
  const loadFixture = createFixtureLoader(provider, [wallet])

  let routerFee: Contract
  beforeEach(async function() {
    const fixture = await loadFixture(v2Fixture)
    routerFee = fixture.routerFee
  })

  it('correct treasury address', async () => {
    expect(await routerFee.treasury()).to.eq(wallet.address)
  })

  it('can not set treasury if not owner', async () => {
    await expect(routerFee.connect(alice).setTreasury(treasury.address)).to.be.reverted
  })

  it('change treasury address', async () => {
    await routerFee.connect(wallet).setTreasury(treasury.address)
    expect(await routerFee.treasury()).to.eq(treasury.address)
  })

  it('can not change treasury address if address zero', async () => {
    await expect(routerFee.connect(wallet).setTreasury('0x0000000000000000000000000000000000000000')).to.be.reverted
  })
})
