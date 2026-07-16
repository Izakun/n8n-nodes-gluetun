import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
} from 'n8n-workflow';

type OpConfig = { method: IHttpRequestMethods; url: string };

const OPERATIONS: Record<string, OpConfig> = {
	getPublicIp: { method: 'GET', url: '/v1/publicip/ip' },
	getVpnStatus: { method: 'GET', url: '/v1/vpn/status' },
	getForwardedPort: { method: 'GET', url: '/v1/openvpn/portforwarded' },
	getDnsStatus: { method: 'GET', url: '/v1/dns/status' },
	setVpnStatus: { method: 'PUT', url: '/v1/vpn/status' },
};

export class Gluetun implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Gluetun',
		name: 'gluetun',
		icon: { light: 'file:gluetun.svg', dark: 'file:gluetun.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Control a gluetun VPN client through its HTTP control server',
		defaults: {
			name: 'Gluetun',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'gluetunApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get DNS Status',
						value: 'getDnsStatus',
						action: 'Get the DNS status',
					},
					{
						name: 'Get Forwarded Port',
						value: 'getForwardedPort',
						action: 'Get the VPN forwarded port',
					},
					{
						name: 'Get Public IP',
						value: 'getPublicIp',
						action: 'Get the public IP information',
					},
					{
						name: 'Get VPN Status',
						value: 'getVpnStatus',
						action: 'Get the VPN status',
					},
					{
						name: 'Set VPN Status',
						value: 'setVpnStatus',
						action: 'Start or stop the VPN',
					},
				],
				default: 'getPublicIp',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Running', value: 'running' },
					{ name: 'Stopped', value: 'stopped' },
				],
				default: 'running',
				description: 'The desired VPN status',
				displayOptions: { show: { operation: ['setVpnStatus'] } },
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('gluetunApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;
				const config = OPERATIONS[operation];

				const options: IHttpRequestOptions = {
					method: config.method,
					baseURL,
					url: config.url,
					json: true,
				};

				if (operation === 'setVpnStatus') {
					options.body = { status: this.getNodeParameter('status', i) as string };
				}

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'gluetunApi',
					options,
				);

				returnData.push({
					json: (typeof response === 'object' && response !== null
						? response
						: { result: response }) as IDataObject,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
