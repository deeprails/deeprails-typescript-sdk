// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Defend extends APIResource {
  /**
   * Use this endpoint to create a new guardrail workflow with optional guardrail
   * thresholds and improvement actions
   */
  createWorkflow(body: DefendCreateWorkflowParams, options?: RequestOptions): APIPromise<DefendResponse> {
    return this._client.post('/defend', { body, ...options });
  }

  /**
   * Use this endpoint to retrieve a specific event of a guardrail workflow
   */
  retrieveEvent(
    eventID: string,
    params: DefendRetrieveEventParams,
    options?: RequestOptions,
  ): APIPromise<WorkflowEventResponse> {
    const { workflow_id } = params;
    return this._client.get(path`/defend/${workflow_id}/events/${eventID}`, options);
  }

  /**
   * Use this endpoint to retrieve the details for a specific defend workflow
   */
  retrieveWorkflow(workflowID: string, options?: RequestOptions): APIPromise<DefendResponse> {
    return this._client.get(path`/defend/${workflowID}`, options);
  }

  /**
   * Use this endpoint to submit a model input and output pair to a workflow for
   * evaluation
   */
  submitEvent(
    workflowID: string,
    body: DefendSubmitEventParams,
    options?: RequestOptions,
  ): APIPromise<WorkflowEventResponse> {
    return this._client.post(path`/defend/${workflowID}/events`, { body, ...options });
  }

  /**
   * Use this endpoint to update an existing guardrail workflow
   */
  updateWorkflow(
    workflowID: string,
    body: DefendUpdateWorkflowParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DefendResponse> {
    return this._client.put(path`/defend/${workflowID}`, { body, ...options });
  }
}

export interface DefendResponse {
  /**
   * Name of the workflow.
   */
  name: string;

  /**
   * A unique workflow ID.
   */
  workflow_id: string;

  /**
   * The time the workflow was created in UTC.
   */
  created_at?: string;

  /**
   * Description for the workflow.
   */
  description?: string;

  /**
   * The action used to improve outputs that fail one or more guardrail metrics for
   * the workflow events. May be `regen`, `fixit`, or `do_nothing`. ReGen runs the
   * user's input prompt with minor induced variance. FixIt attempts to directly
   * address the shortcomings of the output using the guardrail failure rationale. Do
   * Nothing does not attempt any improvement.
   */
  improvement_action?: 'regen' | 'fixit' | 'do_nothing';

  /**
   * Max. number of improvement action retries until a given event passes the
   * guardrails.
   */
  max_improvement_attempts?: number;

  /**
   * The most recent time the workflow was modified in UTC.
   */
  modified_at?: string;

  /**
   * Status of the selected workflow. May be `inactive` or `active`. Inactive
   * workflows will not accept events.
   */
  status?: 'inactive' | 'active';

  /**
   * Rate of events associated with this workflow that passed evaluation.
   */
  success_rate?: number;
}

export interface WorkflowEventResponse {
  /**
   * A unique workflow event ID.
   */
  event_id: string;

  /**
   * Workflow ID associated with the event.
   */
  workflow_id: string;

  /**
   * Count of improvement attempts for the event. If greater than one then all
   * previous improvement attempts failed.
   */
  attempt_number?: number;

  /**
   * A unique evaluation ID associated with this event. Every event has one or more
   * evaluation attempts.
   */
  evaluation_id?: string;

  /**
   * `False` if evaluation passed all of the guardrail metrics, `True` if evaluation
   * failed any of the guardrail metrics.
   */
  filtered?: boolean;
}

export interface DefendCreateWorkflowParams {
  /**
   * The action used to improve outputs that fail one or guardrail metrics for the
   * workflow events. May be `regen`, `fixit`, or `do_nothing`. ReGen runs the user's
   * input prompt with minor induced variance. FixIt attempts to directly address the
   * shortcomings of the output using the guardrail failure rationale. Do Nothing
   * does not attempt any improvement.
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
  type: 'automatic' | 'custom';

  /**
   * Mapping of guardrail metrics to hallucination tolerance levels (either `low`,
   * `medium`, or `high`). Possible metrics are `completeness`,
   * `instruction_adherence`, `context_adherence`, `ground_truth_adherence`, or
   * `comprehensive_safety`.
   */
  automatic_hallucination_tolerance_levels?: { [key: string]: 'low' | 'medium' | 'high' };

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
   * Max. number of improvement action retries until a given event passes the
   * guardrails. Defaults to 10.
   */
  max_improvement_attempts?: number;
}

export interface DefendRetrieveEventParams {
  /**
   * The ID of the workflow associated with the event.
   */
  workflow_id: string;
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
   * Description for the workflow.
   */
  description?: string;

  /**
   * Name of the workflow.
   */
  name?: string;
}

export declare namespace Defend {
  export {
    type DefendResponse as DefendResponse,
    type WorkflowEventResponse as WorkflowEventResponse,
    type DefendCreateWorkflowParams as DefendCreateWorkflowParams,
    type DefendRetrieveEventParams as DefendRetrieveEventParams,
    type DefendSubmitEventParams as DefendSubmitEventParams,
    type DefendUpdateWorkflowParams as DefendUpdateWorkflowParams,
  };
}
