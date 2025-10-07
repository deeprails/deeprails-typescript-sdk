// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'deeprails-mcp/filtering';
import { Metadata, asTextContentResult } from 'deeprails-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Deeprails from 'deeprails';

export const metadata: Metadata = {
  resource: 'monitor',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/monitor/{monitor_id}',
};

export const tool: Tool = {
  name: 'retrieve_monitor',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve the details and evaluations associated with a specific monitor.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'Response wrapper for operations returning a MonitorDetailResponse.',\n  properties: {\n    success: {\n      type: 'boolean',\n      description: 'Represents whether the request was completed successfully.'\n    },\n    data: {\n      type: 'object',\n      description: 'Detailed response payload for retrieving a monitor and its evaluations.',\n      properties: {\n        monitor_id: {\n          type: 'string',\n          description: 'A unique monitor ID.'\n        },\n        monitor_status: {\n          type: 'string',\n          description: 'Status of the monitor.  Can be `active` or `inactive`.  Inactive monitors no longer record and evaluate events.',\n          enum: [            'active',\n            'inactive'\n          ]\n        },\n        name: {\n          type: 'string',\n          description: 'Name of this monitor.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The time the monitor was created in UTC.',\n          format: 'date-time'\n        },\n        description: {\n          type: 'string',\n          description: 'Description of this monitor.'\n        },\n        evaluations: {\n          type: 'array',\n          description: 'An array of all evaluations performed by this monitor.  Each one corresponds to a separate monitor event.',\n          items: {\n            $ref: '#/$defs/evaluation'\n          }\n        },\n        stats: {\n          type: 'object',\n          description: 'Contains five fields used for stats of this monitor: total evaluations, completed evaluations, failed evaluations, queued evaluations, and in progress evaluations.\\n',\n          properties: {\n            completed_evaluations: {\n              type: 'integer',\n              description: 'Number of evaluations that completed successfully.'\n            },\n            failed_evaluations: {\n              type: 'integer',\n              description: 'Number of evaluations that failed.'\n            },\n            in_progress_evaluations: {\n              type: 'integer',\n              description: 'Number of evaluations currently in progress.'\n            },\n            queued_evaluations: {\n              type: 'integer',\n              description: 'Number of evaluations currently queued.'\n            },\n            total_evaluations: {\n              type: 'integer',\n              description: 'Total number of evaluations performed by this monitor.'\n            }\n          }\n        },\n        updated_at: {\n          type: 'string',\n          description: 'The most recent time the monitor was modified in UTC.',\n          format: 'date-time'\n        },\n        user_id: {\n          type: 'string',\n          description: 'User ID of the user who created the monitor.'\n        }\n      },\n      required: [        'monitor_id',\n        'monitor_status',\n        'name'\n      ]\n    },\n    message: {\n      type: 'string',\n      description: 'The accompanying message for the request. Includes error details when applicable.'\n    }\n  },\n  required: [    'success'\n  ],\n  $defs: {\n    evaluation: {\n      type: 'object',\n      properties: {\n        eval_id: {\n          type: 'string',\n          description: 'A unique evaluation ID.'\n        },\n        evaluation_status: {\n          type: 'string',\n          description: 'Status of the evaluation.',\n          enum: [            'in_progress',\n            'completed',\n            'canceled',\n            'queued',\n            'failed'\n          ]\n        },\n        model_input: {\n          type: 'object',\n          description: 'A dictionary of inputs sent to the LLM to generate output. The dictionary must contain a `user_prompt` field and an optional `context` field.  Additional properties are allowed.\\n',\n          properties: {\n            user_prompt: {\n              type: 'string',\n              description: 'The user prompt used to generate the output.'\n            },\n            context: {\n              type: 'string',\n              description: 'Optional context supplied to the LLM when generating the output.'\n            }\n          },\n          required: [            'user_prompt'\n          ]\n        },\n        model_output: {\n          type: 'string',\n          description: 'Output generated by the LLM to be evaluated.'\n        },\n        run_mode: {\n          type: 'string',\n          description: 'Run mode for the evaluation.  The run mode allows the user to optimize for speed, accuracy, and cost by determining which models are used to evaluate the event.',\n          enum: [            'precision_plus',\n            'precision',\n            'smart',\n            'economy'\n          ]\n        },\n        created_at: {\n          type: 'string',\n          description: 'The time the evaluation was created in UTC.',\n          format: 'date-time'\n        },\n        end_timestamp: {\n          type: 'string',\n          description: 'The time the evaluation completed in UTC.',\n          format: 'date-time'\n        },\n        error_message: {\n          type: 'string',\n          description: 'Description of the error causing the evaluation to fail, if any.'\n        },\n        error_timestamp: {\n          type: 'string',\n          description: 'The time the error causing the evaluation to fail was recorded.',\n          format: 'date-time'\n        },\n        evaluation_result: {\n          type: 'object',\n          description: 'Evaluation result consisting of average scores and rationales for each of the evaluated guardrail metrics.',\n          additionalProperties: true\n        },\n        evaluation_total_cost: {\n          type: 'number',\n          description: 'Total cost of the evaluation.'\n        },\n        guardrail_metrics: {\n          type: 'array',\n          description: 'An array of guardrail metrics that the model input and output pair will be evaluated on.\\n',\n          items: {\n            type: 'string',\n            enum: [              'correctness',\n              'completeness',\n              'instruction_adherence',\n              'context_adherence',\n              'ground_truth_adherence',\n              'comprehensive_safety'\n            ]\n          }\n        },\n        model_used: {\n          type: 'string',\n          description: 'Model ID used to generate the output, like `gpt-4o` or `o3`.'\n        },\n        modified_at: {\n          type: 'string',\n          description: 'The most recent time the evaluation was modified in UTC.',\n          format: 'date-time'\n        },\n        nametag: {\n          type: 'string',\n          description: 'An optional, user-defined tag for the evaluation.'\n        },\n        progress: {\n          type: 'integer',\n          description: 'Evaluation progress.  Values range between 0 and 100; 100 corresponds to a completed `evaluation_status`.'\n        },\n        start_timestamp: {\n          type: 'string',\n          description: 'The time the evaluation started in UTC.',\n          format: 'date-time'\n        }\n      },\n      required: [        'eval_id',\n        'evaluation_status',\n        'model_input',\n        'model_output',\n        'run_mode'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      monitor_id: {
        type: 'string',
      },
      limit: {
        type: 'integer',
        description: 'Limit the returned events associated with this monitor.  Defaults to 10.',
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
    readOnlyHint: true,
  },
};

export const handler = async (client: Deeprails, args: Record<string, unknown> | undefined) => {
  const { monitor_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.monitor.retrieve(monitor_id, body)));
};

export default { metadata, tool, handler };
