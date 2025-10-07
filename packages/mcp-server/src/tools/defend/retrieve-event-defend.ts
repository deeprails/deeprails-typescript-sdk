// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'deeprails-mcp/filtering';
import { Metadata, asTextContentResult } from 'deeprails-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Deeprails from 'deeprails';

export const metadata: Metadata = {
  resource: 'defend',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/defend/{workflow_id}/events/{event_id}',
};

export const tool: Tool = {
  name: 'retrieve_event_defend',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a specific event of a guardrail workflow.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/workflow_event_response',\n  $defs: {\n    workflow_event_response: {\n      type: 'object',\n      description: 'Response payload for workflow event operations.',\n      properties: {\n        event_id: {\n          type: 'string',\n          description: 'A unique workflow event ID.'\n        },\n        workflow_id: {\n          type: 'string',\n          description: 'Workflow ID associated with the event.'\n        },\n        attempt_number: {\n          type: 'integer',\n          description: 'Count of improvement attempts for the event.  If greater than one then all previous improvement attempts failed.'\n        },\n        evaluation_id: {\n          type: 'string',\n          description: 'A unique evaluation ID associated with this event.  Every event has one or more evaluation attempts.'\n        },\n        filtered: {\n          type: 'boolean',\n          description: '`False` if evaluation passed all of the guardrail metrics, `True` if evaluation failed any of the guardrail metrics.'\n        }\n      },\n      required: [        'event_id',\n        'workflow_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      workflow_id: {
        type: 'string',
      },
      event_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['workflow_id', 'event_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Deeprails, args: Record<string, unknown> | undefined) => {
  const { event_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.defend.retrieveEvent(event_id, body)));
};

export default { metadata, tool, handler };
