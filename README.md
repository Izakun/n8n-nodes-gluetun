<img src="nodes/Gluetun/gluetun.svg" width="90" align="right" alt="Gluetun" />

# n8n-nodes-gluetun

[![npm version](https://img.shields.io/npm/v/n8n-nodes-gluetun.svg)](https://www.npmjs.com/package/n8n-nodes-gluetun)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-gluetun.svg)](./LICENSE)

Community node for n8n to control a [gluetun](https://github.com/qdm12/gluetun) VPN
client through its HTTP control server.

## Installation

In n8n: **Settings → Community Nodes → Install** and enter `n8n-nodes-gluetun`.

## Operations

| Operation | Endpoint | Description |
|---|---|---|
| **Get Public IP** | `GET /v1/publicip/ip` | Public IP, country, region of the VPN exit |
| **Get VPN Status** | `GET /v1/openvpn/status` | Current VPN status (running / stopped) |
| **Set VPN Status** | `PUT /v1/openvpn/status` | Start or stop the VPN |
| **Get Forwarded Port** | `GET /v1/openvpn/portforwarded` | The VPN forwarded port |
| **Get DNS Status** | `GET /v1/dns/status` | Current DNS-over-TLS status |

## Credentials

Create a **Gluetun API** credential:
- **Base URL** — e.g. `http://gluetun:8000` (control server address; `HTTP_CONTROL_SERVER_ADDRESS`).
- **API Key** — only if the control server has API key auth enabled (sent as `X-API-Key`).

## Example

Keep your torrent client in sync with the VPN: **Get Forwarded Port** → push the value
into your download client's listening port. Or **Get Public IP** on a schedule and alert
if the VPN exit changes or drops.

## Build

```bash
npm install --ignore-scripts
npm run build
```

## Disclaimer

This project isn't affiliated with or endorsed by the gluetun project. gluetun is the
property of its respective authors.
