var Id = require('peer-id')

module.exports.all = function (test, common) {
  test('Simple findPeers test', function (t) {
    t.plan(4)
    common.createPeer(function (err, pr1) {
      t.ifError(err)
      common.createPeer(function (err, pr2) {
        t.ifError(err)

        pr1.addPeer(pr2)
        pr2.addPeer(pr1)

        pr1.findPeers(Id.create().toBytes(), function (err, peerQueue) {
          t.ifError(err)

          t.equal(peerQueue.length, 1, 'should have one peer')
          common.teardown(pr1)
          common.teardown(pr2)
        })
      })
    })
  })
}
