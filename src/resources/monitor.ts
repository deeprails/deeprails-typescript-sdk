// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Monitor extends APIResource {
  /**
   * Use this endpoint to create a new monitor to evaluate model inputs and outputs
   * using guardrails
   *
   * @example
   * ```ts
   * const monitor = await client.monitor.create({
   *   guardrail_metrics: ['correctness'],
   *   name: 'name',
   * });
   * ```
   */
  create(body: MonitorCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/monitor', { body, ...options });
  }

  /**
   * Use this endpoint to retrieve the details and evaluations associated with a
   * specific monitor
   *
   * @example
   * ```ts
   * const monitor = await client.monitor.retrieve('monitor_id');
   * ```
   */
  retrieve(
    monitorID: string,
    query: MonitorRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/monitor/${monitorID}`, { query, ...options });
  }

  /**
   * Use this endpoint to update the name, status, and/or other details of an
   * existing monitor.
   *
   * @example
   * ```ts
   * const monitor = await client.monitor.update('monitor_id');
   * ```
   */
  update(
    monitorID: string,
    body: MonitorUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.put(path`/monitor/${monitorID}`, { body, ...options });
  }

  /**
   * Use this endpoint to retrieve the details of a specific monitor event
   *
   * @example
   * ```ts
   * const response = await client.monitor.retrieveEvent(
   *   'event_id',
   *   { monitor_id: 'monitor_id' },
   * );
   * ```
   */
  retrieveEvent(
    eventID: string,
    params: MonitorRetrieveEventParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { monitor_id } = params;
    return this._client.get(path`/monitor/${monitor_id}/events/${eventID}`, options);
  }

  /**
   * Use this endpoint to submit a model input and output pair to a monitor for
   * evaluation
   *
   * @example
   * ```ts
   * const response = await client.monitor.submitEvent(
   *   'monitor_id',
   *   { model_input: {}, model_output: 'model_output' },
   * );
   * ```
   */
  submitEvent(
    monitorID: string,
    body: MonitorSubmitEventParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.post(path`/monitor/${monitorID}/events`, { body, ...options });
  }
}

export type MonitorCreateResponse = unknown;

export type MonitorRetrieveResponse = unknown;

export type MonitorUpdateResponse = unknown;

export type MonitorRetrieveEventResponse = unknown;

export type MonitorSubmitEventResponse = unknown;

export interface MonitorCreateParams {
  /**
   * An array of guardrail metrics that the model input and output pair will be
   * evaluated on. For non-enterprise users, these will be limited to `correctness`,
   * `completeness`, `instruction_adherence`, `context_adherence`,
   * `ground_truth_adherence`, and/or `comprehensive_safety`.
   */
  guardrail_metrics: Array<
    | 'correctness'
    | 'completeness'
    | 'instruction_adherence'
    | 'context_adherence'
    | 'ground_truth_adherence'
    | 'comprehensive_safety'
  >;

  /**
   * Name of the new monitor.
   */
  name: string;

  /**
   * Context includes any structured information that directly relates to the model’s
   * input and expected output—e.g., the recent turn-by-turn history between an AI
   * tutor and a student, facts or state passed through an agentic workflow, or other
   * domain-specific signals your system already knows and wants the model to
   * condition on. This field determines whether to enable context awareness for this
   * monitor's evaluations. Defaults to false.
   */
  context_awareness?: boolean;

  /**
   * Description of the new monitor.
   */
  description?: string;

  /**
   * An array of file IDs to search in the monitor's evaluations. Files must be
   * uploaded via the DeepRails API first.
   */
  file_search?: Array<string>;

  /**
   * Whether to enable web search for this monitor's evaluations. Defaults to false.
   */
  web_search?: boolean;
}

export interface MonitorRetrieveParams {
  /**
   * Limit the number of returned evaluations associated with this monitor. Defaults
   * to 10.
   */
  limit?: number;
}

export interface MonitorUpdateParams {
  /**
   * New description of the monitor.
   */
  description?: string;

  /**
   * An array of file IDs to search in the monitor's evaluations. Files must be
   * uploaded via the DeepRails API first.
   */
  file_search?: Array<string>;

  /**
   * An array of the new guardrail metrics that model input and output pairs will be
   * evaluated on.
   */
  guardrail_metrics?: Array<
    | 'correctness'
    | 'completeness'
    | 'instruction_adherence'
    | 'context_adherence'
    | 'ground_truth_adherence'
    | 'comprehensive_safety'
  >;

  /**
   * New name of the monitor.
   */
  name?: string;

  /**
   * Status of the monitor. Can be `active` or `inactive`. Inactive monitors no
   * longer record and evaluate events.
   */
  status?: 'active' | 'inactive';

  /**
   * Whether to enable web search for this monitor's evaluations.
   */
  web_search?: boolean;
}

export interface MonitorRetrieveEventParams {
  /**
   * The ID of the monitor associated with this event.
   */
  monitor_id: string;
}

export interface MonitorSubmitEventParams {
  /**
   * A dictionary of inputs sent to the LLM to generate output. The dictionary must
   * contain at least a `user_prompt` field or a `system_prompt` field. For
   * ground_truth_adherence guardrail metric, `ground_truth` should be provided.
   */
  model_input: MonitorSubmitEventParams.ModelInput;

  /**
   * Output generated by the LLM to be evaluated.
   */
  model_output: string;

  /**
   * An optional, user-defined tag for the event.
   */
  nametag?: string;

  /**
   * Run mode for the monitor event. The run mode allows the user to optimize for
   * speed, accuracy, and cost by determining which models are used to evaluate the
   * event. Available run modes include `precision_plus`, `precision`, `smart`, and
   * `economy`. Defaults to `smart`.
   */
  run_mode?: 'precision_plus' | 'precision' | 'smart' | 'economy';
}

export namespace MonitorSubmitEventParams {
  /**
   * A dictionary of inputs sent to the LLM to generate output. The dictionary must
   * contain at least a `user_prompt` field or a `system_prompt` field. For
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
     * The ground truth for evaluating Ground Truth Adherence guardrail.
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

export declare namespace Monitor {
  export {
    type MonitorCreateResponse as MonitorCreateResponse,
    type MonitorRetrieveResponse as MonitorRetrieveResponse,
    type MonitorUpdateResponse as MonitorUpdateResponse,
    type MonitorRetrieveEventResponse as MonitorRetrieveEventResponse,
    type MonitorSubmitEventResponse as MonitorSubmitEventResponse,
    type MonitorCreateParams as MonitorCreateParams,
    type MonitorRetrieveParams as MonitorRetrieveParams,
    type MonitorUpdateParams as MonitorUpdateParams,
    type MonitorRetrieveEventParams as MonitorRetrieveEventParams,
    type MonitorSubmitEventParams as MonitorSubmitEventParams,
  };
}
