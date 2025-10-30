// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';

export class Files extends APIResource {
  /**
   * Use this endpoint to upload a file to the DeepRails API
   */
  upload(body: FileUploadParams, options?: RequestOptions): APIPromise<FileResponse> {
    return this._client.post(
      '/files/upload',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface FileResponse {
  /**
   * The time the file was created in UTC.
   */
  created_at?: string;

  /**
   * A unique file ID.
   */
  file_id?: string;

  /**
   * Name of the file.
   */
  file_name?: string;

  /**
   * Path to the s3 bucket where the file is stored.
   */
  file_path?: string;

  /**
   * The most recent time the file was modified in UTC.
   */
  updated_at?: string;
}

export interface FileUploadParams {
  /**
   * The contents of the file to upload.
   */
  file: Uploadable;
}

export declare namespace Files {
  export { type FileResponse as FileResponse, type FileUploadParams as FileUploadParams };
}
