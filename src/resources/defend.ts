// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Defend extends APIResource {
  /**
   * Use this endpoint to create a new guardrail workflow by specifying guardrail
   * thresholds, an improvement action, and optional extended capabilities.
   */
  createWorkflow(body: DefendCreateWorkflowParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/defend', { body, ...options });
  }

  /**
   * Use this endpoint to retrieve a specific event of a guardrail workflow
   */
  retrieveEvent(
    eventID: string,
    params: DefendRetrieveEventParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { workflow_id } = params;
    return this._client.get(path`/defend/${workflow_id}/events/${eventID}`, options);
  }

  /**
   * Use this endpoint to retrieve the details for a specific defend workflow
   */
  retrieveWorkflow(
    workflowID: string,
    query: DefendRetrieveWorkflowParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DefendResponse> {
    return this._client.get(path`/defend/${workflowID}`, { query, ...options });
  }

  /**
   * Use this endpoint to submit a model input and output pair to a workflow for
   * evaluation
   */
  submitEvent(
    workflowID: string,
    body: DefendSubmitEventParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.post(path`/defend/${workflowID}/events`, { body, ...options });
  }

  /**
   * Use this endpoint to update an existing defend workflow if its details change.
   */
  updateWorkflow(
    workflowID: string,
    body: DefendUpdateWorkflowParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.put(path`/defend/${workflowID}`, { body, ...options });
  }
}

export interface DefendResponse {
  /**
   * Mapping of guardrail metric names to tolerance values. Values can be strings
   * (`low`, `medium`, `high`) for automatic tolerance levels.
   */
  automatic_hallucination_tolerance_levels?: { [key: string]: 'low' | 'medium' | 'high' };

  /**
   * The time the workflow was created in UTC.
   */
  created_at?: string;

  /**
   * Mapping of guardrail metric names to threshold values. Values can be floating
   * point numbers (0.0-1.0) for custom thresholds.
   */
  custom_hallucination_threshold_values?: unknown;

  /**
   * A description for the workflow, to help you remember what that workflow means to
   * your organization.
   */
  description?: string;

  /**
   * The action used to improve outputs that fail one or more guardrail metrics for
   * the workflow events.
   */
  improvement_action?: 'regen' | 'fixit' | 'do_nothing';

  /**
   * A human-readable name for the workflow that will correspond to it's workflow ID.
   */
  name?: string;

  stats?: DefendResponse.Stats;

  /**
   * Status of the selected workflow. May be `inactive` or `active`. Inactive
   * workflows will not accept events.
   */
  status?: 'inactive' | 'active';

  /**
   * Type of thresholds used to evaluate the event.
   */
  threshold_type?: 'custom' | 'automatic';

  /**
   * The most recent time the workflow was updated in UTC.
   */
  updated_at?: string;

  /**
   * A unique workflow ID used to identify the workflow in other endpoints.
   */
  workflow_id?: string;
}

export namespace DefendResponse {
  export interface Stats {
    /**
     * Number of AI outputs that failed the guardrails.
     */
    outputs_below_threshold?: number;

    /**
     * Number of AI outputs that were improved.
     */
    outputs_improved?: number;

    /**
     * Total number of AI outputs processed by the workflow.
     */
    outputs_processed?: number;
  }
}

export type DefendCreateWorkflowResponse = unknown;

export type DefendRetrieveEventResponse = unknown;

export type DefendSubmitEventResponse = unknown;

export type DefendUpdateWorkflowResponse = unknown;

export interface DefendCreateWorkflowParams {
  /**
   * The action used to improve outputs that fail one or more guardrail metrics for
   * the workflow events. May be `regen`, `fixit`, or `do_nothing`. ReGen runs the
   * user's input prompt with minor induced variance. FixIt attempts to directly
   * address the shortcomings of the output using the guardrail failure rationale. Do
   * Nothing does not attempt any improvement.
   */
  improvement_action: 'regen' | 'fixit' | 'do_nothing';

  /**
   * Name of the workflow.
   */
  name: string;

  /**
   * Type of thresholds to use for the workflow, either `automatic` or `custom`.
   * Automatic thresholds are assigned internally after the user specifies a
   * qualitative tolerance for the metrics, whereas custom metrics allow the user to
   * set the threshold for each metric as a floating point number between 0.0 and
   * 1.0.
   */
  threshold_type: 'automatic' | 'custom';

  /**
   * Mapping of guardrail metrics to hallucination tolerance levels (either `low`,
   * `medium`, or `high`). Possible metrics are `completeness`,
   * `instruction_adherence`, `context_adherence`, `ground_truth_adherence`, or
   * `comprehensive_safety`.
   */
  automatic_hallucination_tolerance_levels?: { [key: string]: 'low' | 'medium' | 'high' };

  /**
   * Context includes any structured information that directly relates to the model’s
   * input and expected output—e.g., the recent turn-by-turn history between an AI
   * tutor and a student, facts or state passed through an agentic workflow, or other
   * domain-specific signals your system already knows and wants the model to
   * condition on. This field determines whether to enable context awareness for this
   * workflow's evaluations. Defaults to false.
   */
  context_awareness?: boolean;

  /**
   * Mapping of guardrail metrics to floating point threshold values. Possible
   * metrics are `correctness`, `completeness`, `instruction_adherence`,
   * `context_adherence`, `ground_truth_adherence`, or `comprehensive_safety`.
   */
  custom_hallucination_threshold_values?: { [key: string]: number };

  /**
   * Description for the workflow.
   */
  description?: string;

  /**
   * An array of file IDs to search in the workflow's evaluations. Files must be
   * uploaded via the DeepRails API first.
   */
  file_search?: Array<string>;

  /**
   * Max. number of improvement action attempts until a given event passes the
   * guardrails. Defaults to 10.
   */
  max_improvement_attempts?: number;

  /**
   * Whether to enable web search for this workflow's evaluations. Defaults to false.
   */
  web_search?: boolean;
}

export interface DefendRetrieveEventParams {
  /**
   * The ID of the workflow associated with the event.
   */
  workflow_id: string;
}

export interface DefendRetrieveWorkflowParams {
  /**
   * Limit the number of returned events associated with this workflow. Defaults
   * to 10.
   */
  limit?: number;
}

export interface DefendSubmitEventParams {
  /**
   * A dictionary of inputs sent to the LLM to generate output. The dictionary must
   * contain at least a `user_prompt` field or a `system_prompt` field. For the
   * ground_truth_adherence guardrail metric, `ground_truth` should be provided.
   */
  model_input: DefendSubmitEventParams.ModelInput;

  /**
   * Output generated by the LLM to be evaluated.
   */
  model_output: string;

  /**
   * Model ID used to generate the output, like `gpt-4o` or `o3`.
   */
  model_used: string;

  /**
   * Run mode for the workflow event. The run mode allows the user to optimize for
   * speed, accuracy, and cost by determining which models are used to evaluate the
   * event. Available run modes include `precision_plus`, `precision`, `smart`, and
   * `economy`. Defaults to `smart`.
   */
  run_mode: 'precision_plus' | 'precision' | 'smart' | 'economy';

  /**
   * An optional, user-defined tag for the event.
   */
  nametag?: string;
}

export namespace DefendSubmitEventParams {
  /**
   * A dictionary of inputs sent to the LLM to generate output. The dictionary must
   * contain at least a `user_prompt` field or a `system_prompt` field. For the
   * ground_truth_adherence guardrail metric, `ground_truth` should be provided.
   */
  export interface ModelInput {
    /**
     * Any structured information that directly relates to the model’s input and
     * expected output—e.g., the recent turn-by-turn history between an AI tutor and a
     * student, facts or state passed through an agentic workflow, or other
     * domain-specific signals your system already knows and wants the model to
     * condition on.
     */
    context?: Array<string>;

    /**
     * The ground truth for evaluating the Ground Truth Adherence guardrail.
     */
    ground_truth?: string;

    /**
     * The system prompt used to generate the output.
     */
    system_prompt?: string;

    /**
     * The user prompt used to generate the output.
     */
    user_prompt?: string;
  }
}

export interface DefendUpdateWorkflowParams {
  /**
   * New mapping of guardrail metrics to hallucination tolerance levels (either
   * `low`, `medium`, or `high`) to be used when `threshold_type` is set to
   * `automatic`. Possible metrics are `completeness`, `instruction_adherence`,
   * `context_adherence`, `ground_truth_adherence`, or `comprehensive_safety`.
   */
  automatic_hallucination_tolerance_levels?: { [key: string]: 'low' | 'medium' | 'high' };

  /**
   * Whether to enable context awareness for this workflow's evaluations.
   */
  context_awareness?: boolean;

  /**
   * New mapping of guardrail metrics to floating point threshold values to be used
   * when `threshold_type` is set to `custom`. Possible metrics are `correctness`,
   * `completeness`, `instruction_adherence`, `context_adherence`,
   * `ground_truth_adherence`, or `comprehensive_safety`.
   */
  custom_hallucination_threshold_values?: { [key: string]: number };

  /**
   * New description for the workflow.
   */
  description?: string;

  /**
   * An array of file IDs to search in the workflow's evaluations. Files must be
   * uploaded via the DeepRails API first.
   */
  file_search?: Array<string>;

  /**
   * The new action used to improve outputs that fail one or more guardrail metrics
   * for the workflow events. May be `regen`, `fixit`, or `do_nothing`. ReGen runs
   * the user's input prompt with minor induced variance. FixIt attempts to directly
   * address the shortcomings of the output using the guardrail failure rationale. Do
   * Nothing does not attempt any improvement.
   */
  improvement_action?: 'regen' | 'fixit' | 'do_nothing';

  /**
   * Max. number of improvement action attempts until a given event passes the
   * guardrails. Defaults to 10.
   */
  max_improvement_attempts?: number;

  /**
   * New name for the workflow.
   */
  name?: string;

  /**
   * New type of thresholds to use for the workflow, either `automatic` or `custom`.
   * Automatic thresholds are assigned internally after the user specifies a
   * qualitative tolerance for the metrics, whereas custom metrics allow the user to
   * set the threshold for each metric as a floating point number between 0.0 and
   * 1.0.
   */
  threshold_type?: 'automatic' | 'custom';

  /**
   * Whether to enable web search for this workflow's evaluations.
   */
  web_search?: boolean;
}

export declare namespace Defend {
  export {
    type DefendResponse as DefendResponse,
    type DefendCreateWorkflowResponse as DefendCreateWorkflowResponse,
    type DefendRetrieveEventResponse as DefendRetrieveEventResponse,
    type DefendSubmitEventResponse as DefendSubmitEventResponse,
    type DefendUpdateWorkflowResponse as DefendUpdateWorkflowResponse,
    type DefendCreateWorkflowParams as DefendCreateWorkflowParams,
    type DefendRetrieveEventParams as DefendRetrieveEventParams,
    type DefendRetrieveWorkflowParams as DefendRetrieveWorkflowParams,
    type DefendSubmitEventParams as DefendSubmitEventParams,
    type DefendUpdateWorkflowParams as DefendUpdateWorkflowParams,
  };
}
