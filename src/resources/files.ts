// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
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
   * A unique file ID.
   */
  file_id?: string;

  /**
   * Name of the file.
   */
  file_name?: string;

  /**
   * The size of the file in bytes.
   */
  file_size?: number;
}

export interface FileUploadParams {
  /**
   * The contents of the files to upload.
   */
  files: Array<string>;
}

export declare namespace Files {
  export { type FileResponse as FileResponse, type FileUploadParams as FileUploadParams };
}
