<img src="nodes/Gluetun/gluetun.svg" width="90" align="right" alt="Gluetun" />

# n8n-nodes-gluetun

[![npm version](https://img.shields.io/npm/v/n8n-nodes-gluetun.svg)](https://www.npmjs.com/package/n8n-nodes-gluetun)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-gluetun.svg)](https://www.npmjs.com/package/n8n-nodes-gluetun)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-gluetun.svg)](./LICENSE)
[![n8n verified](https://img.shields.io/badge/n8n-verified%20community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)

Community node for n8n to control a [gluetun](https://github.com/qdm12/gluetun) VPN
client through its HTTP control server.

> ✅ **Verified community node** — available directly from the node panel in n8n
> (self-hosted **and** n8n Cloud).

## Installation

This is a **verified** community node: in n8n, click **+ (Add node)** and search for
`gluetun` — no manual install needed.

<details>
<summary>Manual install (older n8n, or as an unverified package)</summary>

**Settings → Community Nodes → Install** → `n8n-nodes-gluetun`.
</details>

## Operations

| Operation | Endpoint | Description |
|---|---|---|
| **Get Public IP** | `GET /v1/publicip/ip` | Public IP, country, region of the VPN exit |
| **Get VPN Status** | `GET /v1/vpn/status` | Current VPN status (running / stopped) |
| **Set VPN Status** | `PUT /v1/vpn/status` | Start or stop the VPN |
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

## Usage example

Read the VPN public IP:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Public IP**.
4. Execute the node — example output:

```json
{ "public_ip": "146.70.194.87", "country": "France", "city": "Paris" }
```

## Disclaimer

This project isn't affiliated with or endorsed by the gluetun project. gluetun is the
property of its respective authors.
