process.env.NODE_ENV = 'test';

const { createLogger } = require('../../rssWorker/logger');
const expect = require('chai').expect;

describe('log', () => {
  const logOps = (log) => {
    log({ _id: 1111 }, 'err', { name: "err_1" });
    log({ _id: 1111 }, 'err', { name: "err_2" });
    log({ _id: 1111 }, 'msg', { name: "almost done" });
    log({ _id: 1111 }, 'msg', { name: "done" });
    log({ _id: 2222 }, 'err', { name: "err_1" });
    log({ _id: 2222 }, 'err', { name: "err_2" });
    log({ _id: 2222 }, 'err', { name: "err_3" });
    log({ _id: 2222 }, 'msg', { name: "done" });
  };
  const opsResult = {
    "1111": {
      "err": [
        { "name": "err_1" },
        { "name": "err_2" }
      ],
      "msg": [
        { "name": "almost done" },
        { "name": "done" }
      ]
    },
    "2222": {
      "err": [
        { "name": "err_1" },
        { "name": "err_2" },
        { "name": "err_3" }
      ],
      "msg": [
        { "name": "done" }
      ]
    }
  };
  it('assembles a correct log object', () => {
    const { log, getLogs } = createLogger();
    logOps(log);
    expect(getLogs()).to.eql(opsResult);
  });

  it('works fine if not passsed a podcast', () => {
    const { log, getLogs } = createLogger();
    log(null, 'err', { name: "err_1" });
    log(null, 'msg', { name: "done" });

    expect(getLogs()).to.eql({
      "general": {
        "err": [{ name: "err_1" }],
        "msg": [{ name: "done" }]
      }
    });
  });
});

