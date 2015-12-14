import HttpTransport from 'lokka-transport-http';
import {parse} from 'url';
import basicAuthHeader from 'basic-auth-header';

export default class HttpAuthTransport extends HttpTransport {
  constructor(endpoint, options={}) {
    if (!endpoint) {
      throw new Error('endpoint is required!');
    }

    options.headers = options.headers || {};

    const {
      protocol,
      auth,
      hostname,
      port ,
      pathname
    } = parse(endpoint);

    const defaultPort = (protocol === 'https:') ? 443 : 80;
    const finalPort = port || defaultPort;

    const newEndpoint = `${protocol}//${hostname}:${finalPort}${pathname}`;
    const user = auth.split(':')[0].trim();
    const pass = auth.split(':')[1].trim();
    const headers = {
      Authorization: basicAuthHeader(user, pass)
    };

    Object.assign(options.headers, headers);
    super(newEndpoint, options);
  }
}