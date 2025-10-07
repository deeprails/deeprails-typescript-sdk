// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'deeprails-mcp/filtering';
import { Metadata, asTextContentResult } from 'deeprails-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Deeprails from 'deeprails';

export const metadata: Metadata = {
  resource: 'monitor',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/monitor/{monitor_id}',
};

export const tool: Tool = {
  name: 'update_monitor',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate the name, description, or status of an existing monitor.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/api_response',\n  $defs: {\n    api_response: {\n      type: 'object',\n      description: 'Response wrapper for operations returning a MonitorResponse.',\n      properties: {\n        success: {\n          type: 'boolean',\n          description: 'Represents whether the request was completed successfully.'\n        },\n        data: {\n          type: 'object',\n          description: 'Response payload for creating or updating a monitor.',\n          properties: {\n            monitor_id: {\n              type: 'string',\n              description: 'A unique monitor ID.'\n            },\n            name: {\n              type: 'string',\n              description: 'Name of the monitor.'\n            },\n            created_at: {\n              type: 'string',\n              description: 'The time the monitor was created in UTC.',\n              format: 'date-time'\n            },\n            description: {\n              type: 'string',\n              description: 'Description of the monitor.'\n            },\n            monitor_status: {\n              type: 'string',\n              description: 'Status of the monitor.  Can be `active` or `inactive`.  Inactive monitors no longer record and evaluate events.',\n              enum: [                'active',\n                'inactive'\n              ]\n            },\n            updated_at: {\n              type: 'string',\n              description: 'The most recent time the monitor was modified in UTC.',\n              format: 'date-time'\n            },\n            user_id: {\n              type: 'string',\n              description: 'User ID of the user who created the monitor.'\n            }\n          },\n          required: [            'monitor_id',\n            'name'\n          ]\n        },\n        message: {\n          type: 'string',\n          description: 'The accompanying message for the request. Includes error details when applicable.'\n        }\n      },\n      required: [        'success'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      monitor_id: {
        type: 'string',
      },
      description: {
        type: 'string',
        description: 'Description of the monitor.',
      },
      monitor_status: {
        type: 'string',
        description:
          'Status of the monitor.  Can be `active` or `inactive`.  Inactive monitors no longer record and evaluate events.',
        enum: ['active', 'inactive'],
      },
      name: {
        type: 'string',
        description: 'Name of the monitor.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['monitor_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Deeprails, args: Record<string, unknown> | undefined) => {
  const { monitor_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.monitor.update(monitor_id, body)));
};

export default { metadata, tool, handler };
