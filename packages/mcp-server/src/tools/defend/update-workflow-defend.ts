// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'deeprails-mcp/filtering';
import { Metadata, asTextContentResult } from 'deeprails-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Deeprails from 'deeprails';

export const metadata: Metadata = {
  resource: 'defend',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/defend/{workflow_id}',
};

export const tool: Tool = {
  name: 'update_workflow_defend',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate an existing guardrail workflow.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/defend_response',\n  $defs: {\n    defend_response: {\n      type: 'object',\n      description: 'Response payload for guardrail workflow operations.',\n      properties: {\n        name: {\n          type: 'string',\n          description: 'Name of the workflow.'\n        },\n        workflow_id: {\n          type: 'string',\n          description: 'A unique workflow ID.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The time the workflow was created in UTC.',\n          format: 'date-time'\n        },\n        description: {\n          type: 'string',\n          description: 'Description for the workflow.'\n        },\n        improvement_action: {\n          type: 'string',\n          description: 'The action used to improve outputs that fail one or more guardrail metrics for the workflow events.  May be `regenerate`, `fixit`, or null which represents “do nothing”.  ReGen runs the user\\'s exact input prompt with minor induced variance.  Fixit attempts to directly address the shortcomings of the output using the guardrail failure rationale.  Do nothing does not attempt any improvement.',\n          enum: [            'regenerate',\n            'fixit'\n          ]\n        },\n        max_retries: {\n          type: 'integer',\n          description: 'Max. number of improvement action retries until a given event passes the guardrails.'\n        },\n        modified_at: {\n          type: 'string',\n          description: 'The most recent time the workflow was modified in UTC.',\n          format: 'date-time'\n        },\n        status: {\n          type: 'string',\n          description: 'Status of the selected workflow.  May be `archived` or `active`.  Archived workflows will not accept events.',\n          enum: [            'archived',\n            'active'\n          ]\n        },\n        success_rate: {\n          type: 'number',\n          description: 'Rate of events associated with this workflow that passed evaluation.'\n        }\n      },\n      required: [        'name',\n        'workflow_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      workflow_id: {
        type: 'string',
      },
      description: {
        type: 'string',
        description: 'Description for the workflow.',
      },
      name: {
        type: 'string',
        description: 'Name of the workflow.',
      },
      type: {
        type: 'string',
        description: 'Type of thresholds to use for the workflow, either `automatic` or `custom`.',
        enum: ['automatic', 'custom'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['workflow_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Deeprails, args: Record<string, unknown> | undefined) => {
  const { workflow_id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.defend.updateWorkflow(workflow_id, body)),
  );
};

export default { metadata, tool, handler };
