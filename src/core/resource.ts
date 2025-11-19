// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { DeepRails } from '../client';

export abstract class APIResource {
  protected _client: DeepRails;

  constructor(client: DeepRails) {
    this._client = client;
  }
}
