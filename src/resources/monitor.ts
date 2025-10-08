// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as EvaluateAPI from './evaluate';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Monitor extends APIResource {
  /**
   * Use this endpoint to create a new monitor to evaluate model inputs and outputs
   * using guardrails
   */
  create(body: MonitorCreateParams, options?: RequestOptions): APIPromise<APIResponse> {
    return this._client.post('/monitor', { body, ...options });
  }

  /**
   * Use this endpoint to retrieve the details and evaluations associated with a
   * specific monitor
   */
  retrieve(
    monitorID: string,
    query: MonitorRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorRetrieveResponse> {
    return this._client.get(path`/monitor/${monitorID}`, { query, ...options });
  }

  /**
   * Use this endpoint to update the name, description, or status of an existing
   * monitor
   */
  update(
    monitorID: string,
    body: MonitorUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIResponse> {
    return this._client.put(path`/monitor/${monitorID}`, { body, ...options });
  }

  /**
   * Use this endpoint to submit a model input and output pair to a monitor for
   * evaluation
   */
  submitEvent(
    monitorID: string,
    body: MonitorSubmitEventParams,
    options?: RequestOptions,
  ): APIPromise<MonitorSubmitEventResponse> {
    return this._client.post(path`/monitor/${monitorID}/events`, { body, ...options });
  }
}

/**
 * Response wrapper for operations returning a MonitorResponse.
 */
export interface APIResponse {
  /**
   * Represents whether the request was completed successfully.
   */
  success: boolean;

  data?: APIResponse.Data;

  /**
   * The accompanying message for the request. Includes error details when
   * applicable.
   */
  message?: string;
}

export namespace APIResponse {
  export interface Data {
    /**
     * A unique monitor ID.
     */
    monitor_id: string;

    /**
     * Name of the monitor.
     */
    name: string;

    /**
     * The time the monitor was created in UTC.
     */
    created_at?: string;

    /**
     * Description of the monitor.
     */
    description?: string;

    /**
     * Status of the monitor. Can be `active` or `inactive`. Inactive monitors no
     * longer record and evaluate events.
     */
    monitor_status?: 'active' | 'inactive';

    /**
     * The most recent time the monitor was modified in UTC.
     */
    updated_at?: string;

    /**
     * User ID of the user who created the monitor.
     */
    user_id?: string;
  }
}

/**
 * Response wrapper for operations returning a MonitorDetailResponse.
 */
export interface MonitorRetrieveResponse {
  /**
   * Represents whether the request was completed successfully.
   */
  success: boolean;

  data?: MonitorRetrieveResponse.Data;

  /**
   * The accompanying message for the request. Includes error details when
   * applicable.
   */
  message?: string;
}

export namespace MonitorRetrieveResponse {
  export interface Data {
    /**
     * A unique monitor ID.
     */
    monitor_id: string;

    /**
     * Status of the monitor. Can be `active` or `inactive`. Inactive monitors no
     * longer record and evaluate events.
     */
    monitor_status: 'active' | 'inactive';

    /**
     * Name of this monitor.
     */
    name: string;

    /**
     * The time the monitor was created in UTC.
     */
    created_at?: string;

    /**
     * Description of this monitor.
     */
    description?: string;

    /**
     * An array of all evaluations performed by this monitor. Each one corresponds to a
     * separate monitor event.
     */
    evaluations?: Array<EvaluateAPI.Evaluation>;

    /**
     * Contains five fields used for stats of this monitor: total evaluations,
     * completed evaluations, failed evaluations, queued evaluations, and in progress
     * evaluations.
     */
    stats?: Data.Stats;

    /**
     * The most recent time the monitor was modified in UTC.
     */
    updated_at?: string;

    /**
     * User ID of the user who created the monitor.
     */
    user_id?: string;
  }

  export namespace Data {
    /**
     * Contains five fields used for stats of this monitor: total evaluations,
     * completed evaluations, failed evaluations, queued evaluations, and in progress
     * evaluations.
     */
    export interface Stats {
      /**
       * Number of evaluations that completed successfully.
       */
      completed_evaluations?: number;

      /**
       * Number of evaluations that failed.
       */
      failed_evaluations?: number;

      /**
       * Number of evaluations currently in progress.
       */
      in_progress_evaluations?: number;

      /**
       * Number of evaluations currently queued.
       */
      queued_evaluations?: number;

      /**
       * Total number of evaluations performed by this monitor.
       */
      total_evaluations?: number;
    }
  }
}

/**
 * Response wrapper for operations returning a MonitorEventResponse.
 */
export interface MonitorSubmitEventResponse {
  /**
   * Represents whether the request was completed successfully.
   */
  success: boolean;

  data?: MonitorSubmitEventResponse.Data;

  /**
   * The accompanying message for the request. Includes error details when
   * applicable.
   */
  message?: string;
}

export namespace MonitorSubmitEventResponse {
  export interface Data {
    /**
     * A unique evaluation ID associated with this event.
     */
    evaluation_id: string;

    /**
     * A unique monitor event ID.
     */
    event_id: string;

    /**
     * Monitor ID associated with this event.
     */
    monitor_id: string;

    /**
     * The time the monitor event was created in UTC.
     */
    created_at?: string;
  }
}

export interface MonitorCreateParams {
  /**
   * Name of the new monitor.
   */
  name: string;

  /**
   * Description of the new monitor.
   */
  description?: string;
}

export interface MonitorRetrieveParams {
  /**
   * Limit the returned events associated with this monitor. Defaults to 10.
   */
  limit?: number;
}

export interface MonitorUpdateParams {
  /**
   * Description of the monitor.
   */
  description?: string;

  /**
   * Status of the monitor. Can be `active` or `inactive`. Inactive monitors no
   * longer record and evaluate events.
   */
  monitor_status?: 'active' | 'inactive';

  /**
   * Name of the monitor.
   */
  name?: string;
}

export interface MonitorSubmitEventParams {
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
   * A dictionary of inputs sent to the LLM to generate output. This must contain a
   * `user_prompt` field and an optional `context` field. Additional properties are
   * allowed.
   */
  model_input: MonitorSubmitEventParams.ModelInput;

  /**
   * Output generated by the LLM to be evaluated.
   */
  model_output: string;

  /**
   * Model ID used to generate the output, like `gpt-4o` or `o3`.
   */
  model_used?: string;

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
   * A dictionary of inputs sent to the LLM to generate output. This must contain a
   * `user_prompt` field and an optional `context` field. Additional properties are
   * allowed.
   */
  export interface ModelInput {
    user_prompt: string;

    context?: string;

    [k: string]: unknown;
  }
}

export declare namespace Monitor {
  export {
    type APIResponse as APIResponse,
    type MonitorRetrieveResponse as MonitorRetrieveResponse,
    type MonitorSubmitEventResponse as MonitorSubmitEventResponse,
    type MonitorCreateParams as MonitorCreateParams,
    type MonitorRetrieveParams as MonitorRetrieveParams,
    type MonitorUpdateParams as MonitorUpdateParams,
    type MonitorSubmitEventParams as MonitorSubmitEventParams,
  };
}
