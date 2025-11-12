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
  createWorkflow(
    body: DefendCreateWorkflowParams,
    options?: RequestOptions,
  ): APIPromise<DefendCreateResponse> {
    return this._client.post('/defend', { body, ...options });
  }

  /**
   * Use this endpoint to retrieve a specific event of a guardrail workflow
   */
  retrieveEvent(
    eventID: string,
    params: DefendRetrieveEventParams,
    options?: RequestOptions,
  ): APIPromise<WorkflowEventDetailResponse> {
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
  ): APIPromise<WorkflowEventResponse> {
    return this._client.post(path`/defend/${workflowID}/events`, { body, ...options });
  }

  /**
   * Use this endpoint to update an existing defend workflow
   */
  updateWorkflow(
    workflowID: string,
    body: DefendUpdateWorkflowParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DefendUpdateResponse> {
    return this._client.put(path`/defend/${workflowID}`, { body, ...options });
  }
}

export interface DefendCreateResponse {
  /**
   * The time the workflow was created in UTC.
   */
  created_at: string;

  /**
   * Status of the selected workflow. May be `inactive` or `active`. Inactive
   * workflows will not accept events.
   */
  status: 'inactive' | 'active';

  /**
   * A unique workflow ID.
   */
  workflow_id: string;
}

export interface DefendResponse {
  /**
   * Mapping of guardrail metric names to tolerance values. Values can be strings
   * (`low`, `medium`, `high`) for automatic tolerance levels.
   */
  automatic_hallucination_tolerance_levels: { [key: string]: 'low' | 'medium' | 'high' };

  /**
   * Extended AI capabilities available to the event, if any. Can be `web_search`
   * and/or `file_search`.
   */
  capabilities: Array<DefendResponse.Capability>;

  /**
   * The time the workflow was created in UTC.
   */
  created_at: string;

  /**
   * Mapping of guardrail metric names to threshold values. Values can be floating
   * point numbers (0.0-1.0) for custom thresholds.
   */
  custom_hallucination_threshold_values: { [key: string]: number };

  /**
   * A description for the workflow, to help you remember what that workflow means to
   * your organization.
   */
  description: string;

  /**
   * An array of events associated with this workflow.
   */
  events: Array<DefendResponse.Event>;

  /**
   * List of files associated with the workflow. If this is not empty, models can
   * search these files when performing evaluations or remediations
   */
  files: Array<DefendResponse.File>;

  /**
   * A human-readable name for the workflow that will correspond to it's workflow ID.
   */
  name: string;

  /**
   * Status of the selected workflow. May be `inactive` or `active`. Inactive
   * workflows will not accept events.
   */
  status: 'inactive' | 'active';

  /**
   * Type of thresholds used to evaluate the event.
   */
  threshold_type: 'custom' | 'automatic';

  /**
   * The most recent time the workflow was updated in UTC.
   */
  updated_at: string;

  /**
   * A unique workflow ID.
   */
  workflow_id: string;

  /**
   * The action used to improve outputs that fail one or more guardrail metrics for
   * the workflow events.
   */
  improvement_action?: 'regen' | 'fixit' | 'do_nothing';

  stats?: DefendResponse.Stats;
}

export namespace DefendResponse {
  export interface Capability {
    capability?: string;
  }

  export interface Event {
    /**
     * An array of evaluations for this event.
     */
    evaluations?: Array<Event.Evaluation>;

    /**
     * A unique workflow event ID.
     */
    event_id?: string;

    /**
     * Improved model output after improvement tool was applied.
     */
    improved_model_output?: string;

    /**
     * Status of the improvement tool used to improve the event.
     */
    improvement_tool_status?: string;
  }

  export namespace Event {
    export interface Evaluation {
      /**
       * The attempt number or identifier for this evaluation.
       */
      attempt?: string;

      /**
       * The time the evaluation was created in UTC.
       */
      created_at?: string;

      /**
       * Error message if the evaluation failed.
       */
      error_message?: string;

      /**
       * The result of the evaluation.
       */
      evaluation_result?: { [key: string]: unknown };

      /**
       * Status of the evaluation.
       */
      evaluation_status?: string;

      /**
       * Total cost of the evaluation.
       */
      evaluation_total_cost?: number;

      /**
       * An array of guardrail metrics evaluated.
       */
      guardrail_metrics?: Array<string>;

      /**
       * The model input used for the evaluation.
       */
      model_input?: { [key: string]: unknown };

      /**
       * The model output that was evaluated.
       */
      model_output?: string;

      /**
       * The time the evaluation was last modified in UTC.
       */
      modified_at?: string;

      /**
       * An optional tag for the evaluation.
       */
      nametag?: string;

      /**
       * Evaluation progress (0-100).
       */
      progress?: number;

      /**
       * Run mode used for the evaluation.
       */
      run_mode?: string;
    }
  }

  export interface File {
    file_id?: string;

    file_name?: string;

    file_size?: number;
  }

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

export interface DefendUpdateResponse {
  /**
   * The time the workflow was last modified in UTC.
   */
  modified_at: string;

  /**
   * Status of the selected workflow. May be `inactive` or `active`. Inactive
   * workflows will not accept events.
   */
  status: 'inactive' | 'active';

  /**
   * A unique workflow ID.
   */
  workflow_id: string;
}

export interface WorkflowEventDetailResponse {
  /**
   * History of evaluations for the event.
   */
  evaluation_history: Array<WorkflowEventDetailResponse.EvaluationHistory>;

  /**
   * Evaluation result consisting of average scores and rationales for each of the
   * evaluated guardrail metrics.
   */
  evaluation_result: { [key: string]: unknown };

  /**
   * A unique workflow event ID.
   */
  event_id: string;

  /**
   * Status of the event.
   */
  event_status: 'In Progress' | 'Completed';

  /**
   * Whether the event was filtered and requires improvement.
   */
  filtered: boolean;

  /**
   * Improved model output after improvement tool was applied and each metric passed
   * evaluation.
   */
  improved_model_output: string;

  /**
   * Type of improvement action used to improve the event.
   */
  improvement_action: 'regen' | 'fixit' | 'do_nothing';

  /**
   * Status of the improvement tool used to improve the event.
   */
  improvement_tool_status: 'improved' | 'failed on max retries' | 'improvement_required' | null;

  /**
   * Type of thresholds used to evaluate the event.
   */
  threshold_type: 'custom' | 'automatic';

  /**
   * Workflow ID associated with the event.
   */
  workflow_id: string;

  /**
   * Mapping of guardrail metric names to tolerance values. Values are strings
   * (`low`, `medium`, `high`) representing automatic tolerance levels.
   */
  automatic_hallucination_tolerance_levels?: { [key: string]: 'low' | 'medium' | 'high' };

  /**
   * Extended AI capabilities available to the event, if any. Can be `web_search`
   * and/or `file_search`.
   */
  capabilities?: Array<WorkflowEventDetailResponse.Capability>;

  /**
   * Mapping of guardrail metric names to threshold values. Values are floating point
   * numbers (0.0-1.0) representing custom thresholds.
   */
  custom_hallucination_threshold_values?: { [key: string]: number };

  /**
   * List of files available to the event, if any. Will only be present if
   * `file_search` is enabled.
   */
  files?: Array<WorkflowEventDetailResponse.File>;
}

export namespace WorkflowEventDetailResponse {
  export interface EvaluationHistory {
    attempt?: string;

    created_at?: string;

    error_message?: string;

    evaluation_result?: { [key: string]: unknown };

    evaluation_status?: string;

    evaluation_total_cost?: number;

    guardrail_metrics?: Array<string>;

    model_input?: { [key: string]: unknown };

    model_output?: string;

    modified_at?: string;

    nametag?: string;

    progress?: number;

    run_mode?: string;
  }

  export interface Capability {
    capability?: string;
  }

  export interface File {
    file_id?: string;

    file_name?: string;

    file_size?: number;
  }
}

export interface WorkflowEventResponse {
  /**
   * The time the event was created in UTC.
   */
  created_at: string;

  /**
   * A unique workflow event ID.
   */
  event_id: string;

  /**
   * Status of the event.
   */
  status: 'In Progress' | 'Completed';

  /**
   * Workflow ID associated with the event.
   */
  workflow_id: string;
}

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
    type DefendCreateResponse as DefendCreateResponse,
    type DefendResponse as DefendResponse,
    type DefendUpdateResponse as DefendUpdateResponse,
    type WorkflowEventDetailResponse as WorkflowEventDetailResponse,
    type WorkflowEventResponse as WorkflowEventResponse,
    type DefendCreateWorkflowParams as DefendCreateWorkflowParams,
    type DefendRetrieveEventParams as DefendRetrieveEventParams,
    type DefendRetrieveWorkflowParams as DefendRetrieveWorkflowParams,
    type DefendSubmitEventParams as DefendSubmitEventParams,
    type DefendUpdateWorkflowParams as DefendUpdateWorkflowParams,
  };
}
