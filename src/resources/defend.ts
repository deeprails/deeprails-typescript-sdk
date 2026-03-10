// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Defend extends APIResource {
  /**
   * Use this endpoint to create a new guardrail workflow by specifying guardrail
   * thresholds, an improvement action, and optional extended capabilities.
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
   * evaluation with streaming responses.
   */
  submitAndStreamEvent(
    workflowID: string,
    params: DefendSubmitAndStreamEventParams,
    options?: RequestOptions,
  ): APIPromise<Stream<DefendSubmitAndStreamEventResponse>> {
    const { stream, ...body } = params;
    return this._client.post(path`/defend/${workflowID}/events?stream=true`, {
      query: { stream },
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<DefendSubmitAndStreamEventResponse>>;
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
   * Use this endpoint to update an existing defend workflow if its details change.
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
   * Extended AI capabilities available to the event, if any. Can be `web_search`,
   * `file_search`, and/or `context_awareness`.
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
   * A unique workflow ID used to identify the workflow in other endpoints.
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
     * The ID of the billing request for the event.
     */
    billing_request_id?: string;

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
     * Status of the improvement tool used to improve the event. `improvement_required`
     * indicates that the evaluation is complete and the improvement action is needed
     * but is not taking place. `improved` and `improvement_failed` indicate when the
     * improvement action concludes, successfully and unsuccessfully, respectively.
     * `no_improvement_required` means that the first evaluation passed all its
     * metrics!
     */
    improvement_tool_status?:
      | 'improved'
      | 'improvement_failed'
      | 'no_improvement_required'
      | 'improvement_required';

    /**
     * Status of the event.
     */
    status?: 'completed' | 'failed' | 'in_progress';
  }

  export namespace Event {
    export interface Evaluation {
      /**
       * Analysis of the failures of the model_output according to the guardrail metrics
       * evaluated.
       */
      analysis_of_failures?: string;

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
       * Status of the improvement tool used to improve the event. `improvement_required`
       * indicates that the evaluation is complete and the improvement action is needed
       * but is not taking place. `improved` and `improvement_failed` indicate when the
       * improvement action concludes, successfully and unsuccessfully, respectively.
       * `no_improvement_required` means that the first evaluation passed all its
       * metrics!
       */
      improvement_tool_status?:
        | 'improved'
        | 'improvement_failed'
        | 'no_improvement_required'
        | 'improvement_required';

      /**
       * A list of key improvements made to the model_output to address the failures.
       */
      key_improvements?: Array<string>;

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

    presigned_url?: string;

    presigned_url_expires_at?: string;
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

  /**
   * The name of the workflow.
   */
  name?: string;
}

export interface WorkflowEventDetailResponse {
  analysis_of_failures: Array<string>;

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
   * Status of the improvement tool used to improve the event. `improvement_required`
   * indicates that the evaluation is complete and the improvement action is needed
   * but is not taking place. `improved` and `improvement_failed` indicate when the
   * improvement action concludes, successfully and unsuccessfully, respectively.
   * `no_improvement_required` means that the first evaluation passed all its
   * metrics!
   */
  improvement_tool_status:
    | 'improved'
    | 'improvement_failed'
    | 'no_improvement_required'
    | 'improvement_required'
    | null;

  key_improvements: Array<unknown>;

  /**
   * Status of the event.
   */
  status: 'In Progress' | 'Completed';

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
   * Extended AI capabilities available to the event, if any. Can be `web_search`,
   * `file_search`, and/or `context_awareness`.
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

  /**
   * The maximum number of improvement attempts to be applied to one event before it
   * is considered failed.
   */
  max_improvement_attempts?: number;
}

export namespace WorkflowEventDetailResponse {
  export interface EvaluationHistory {
    analysis_of_failures?: string;

    attempt?: string;

    created_at?: string;

    error_message?: string;

    evaluation_result?: { [key: string]: unknown };

    evaluation_status?: string;

    evaluation_total_cost?: number;

    guardrail_metrics?: Array<string>;

    improvement_tool_status?:
      | 'improved'
      | 'improvement_failed'
      | 'no_improvement_required'
      | 'improvement_required';

    key_improvements?: Array<string>;

    model_input?: { [key: string]: unknown };

    model_output?: string;

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

    presigned_url?: string;

    presigned_url_expires_at?: string;
  }
}

export interface WorkflowEventResponse {
  /**
   * The ID of the billing request for the event.
   */
  billing_request_id: string;

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

export type DefendSubmitAndStreamEventResponse = string;

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

export interface DefendSubmitAndStreamEventParams {
  /**
   * Body param: The input provided to the model (e.g., prompt, messages).
   */
  model_input: { [key: string]: unknown };

  /**
   * Body param: The output generated by the model to be evaluated.
   */
  model_output: string;

  /**
   * Body param: The model that generated the output (e.g., "gpt-4", "claude-3").
   */
  model_used: string;

  /**
   * Body param: The evaluation run mode. Streaming is supported on all run modes
   * except precision_max and precision_max_codex. Note: super_fast does not support
   * Web Search or File Search — if your workflow has these enabled, use a different
   * run mode or disable the capability on the workflow.
   */
  run_mode: 'super_fast' | 'fast' | 'precision' | 'precision_codex';

  /**
   * Query param: Enable SSE streaming for real-time token feedback. Supported on all
   * run modes except precision_max and precision_max_codex.
   */
  stream?: boolean;

  /**
   * Body param: Optional tag to identify this event.
   */
  nametag?: string;
}

export interface DefendSubmitEventParams {
  /**
   * A dictionary of inputs sent to the LLM to generate output. The dictionary must
   * contain a `user_prompt` field. For the ground_truth_adherence guardrail metric,
   * `ground_truth` should be provided.
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
   * event. Available run modes (fastest to most thorough): `super_fast`, `fast`,
   * `precision`, `precision_codex`, `precision_max`, and `precision_max_codex`.
   * Defaults to `fast`. Note: `super_fast` does not support Web Search or File
   * Search — if your workflow has these capabilities enabled, use a different run
   * mode or edit the workflow to disable them.
   */
  run_mode: 'super_fast' | 'fast' | 'precision' | 'precision_codex' | 'precision_max' | 'precision_max_codex';

  /**
   * An optional, user-defined tag for the event.
   */
  nametag?: string;
}

export namespace DefendSubmitEventParams {
  /**
   * A dictionary of inputs sent to the LLM to generate output. The dictionary must
   * contain a `user_prompt` field. For the ground_truth_adherence guardrail metric,
   * `ground_truth` should be provided.
   */
  export interface ModelInput {
    /**
     * The user prompt used to generate the output.
     */
    user_prompt: string;

    /**
     * Any structured information that directly relates to the model’s input and
     * expected output—e.g., the recent turn-by-turn history between an AI tutor and a
     * student, facts or state passed through an agentic workflow, or other
     * domain-specific signals your system already knows and wants the model to
     * condition on.
     */
    context?: Array<ModelInput.Context>;

    /**
     * The ground truth for evaluating the Ground Truth Adherence guardrail.
     */
    ground_truth?: string;

    /**
     * The system prompt used to generate the output.
     */
    system_prompt?: string;
  }

  export namespace ModelInput {
    export interface Context {
      /**
       * The content of the message.
       */
      content?: string;

      /**
       * The role of the speaker.
       */
      role?: string;
    }
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
    type DefendCreateResponse as DefendCreateResponse,
    type DefendResponse as DefendResponse,
    type DefendUpdateResponse as DefendUpdateResponse,
    type WorkflowEventDetailResponse as WorkflowEventDetailResponse,
    type WorkflowEventResponse as WorkflowEventResponse,
    type DefendSubmitAndStreamEventResponse as DefendSubmitAndStreamEventResponse,
    type DefendCreateWorkflowParams as DefendCreateWorkflowParams,
    type DefendRetrieveEventParams as DefendRetrieveEventParams,
    type DefendRetrieveWorkflowParams as DefendRetrieveWorkflowParams,
    type DefendSubmitAndStreamEventParams as DefendSubmitAndStreamEventParams,
    type DefendSubmitEventParams as DefendSubmitEventParams,
    type DefendUpdateWorkflowParams as DefendUpdateWorkflowParams,
  };
}
