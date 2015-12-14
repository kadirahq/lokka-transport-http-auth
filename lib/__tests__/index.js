/* eslint max-len:0 */

import {describe, it} from 'mocha';
import {expect} from 'chai';
import LokkaHTTPAuthTransport from '../';

describe('LokkaHTTPAuthTransport', () => {
  describe('constructor()', () => {
    describe('without an url', () => {
      it('should throw an error', () => {
        expect(() => new LokkaHTTPAuthTransport()).to.throw(/endpoint is required!/);
      });
    });

    describe('with a proper auth url', () => {
      it('should get the proper auth headers', () => {
        const url = 'http://u:p@localhost/path';
        const transport = new LokkaHTTPAuthTransport(url);
        const options = transport._buildOptions({aa: 10});
        expect(options.headers.Authorization).to.be.equal('Basic dTpw');
      });

      it('should get the proper endpoint', () => {
        const url = 'http://u:p@localhost/path';
        const transport = new LokkaHTTPAuthTransport(url);
        expect(transport.endpoint).to.be.equal('http://localhost:80/path');
      });
    });

    describe('without a port for https', () => {
      it('should get port 443', () => {
        const url = 'https://u:p@localhost/path';
        const transport = new LokkaHTTPAuthTransport(url);
        expect(transport.endpoint).to.be.equal('https://localhost:443/path');
      });
    });

    describe('without a port for http', () => {
      it('should get port 80', () => {
        const url = 'http://u:p@localhost/path';
        const transport = new LokkaHTTPAuthTransport(url);
        expect(transport.endpoint).to.be.equal('http://localhost:80/path');
      });
    });

    describe('with custom headers', () => {
      it('should preserve custom headers', () => {
        const url = 'http://u:p@localhost/path';
        const headers = {aa: 'bb'};
        const transport = new LokkaHTTPAuthTransport(url, {headers});
        const options = transport._buildOptions({aa: 10});
        expect(options.headers.aa).to.be.equal('bb');
      });
    });
  });
});
