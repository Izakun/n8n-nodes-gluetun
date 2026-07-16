import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GluetunApi implements ICredentialType {
	name = 'gluetunApi';

	displayName = 'Gluetun API';

	icon = 'file:gluetunApi.svg' as const;

	documentationUrl = 'https://github.com/qdm12/gluetun-wiki/blob/main/setup/advanced/control-server.md';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://gluetun:8000',
			required: true,
			description:
				'Base URL of the gluetun control server (e.g. http://gluetun:8000). No trailing slash.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Only required if the gluetun control server has API key authentication enabled (sent as the X-API-Key header)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/v1/publicip/ip',
		},
	};
}
