// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Deeprails } from '../client';

export abstract class APIResource {
  protected _client: Deeprails;

  constructor(client: Deeprails) {
    this._client = client;
  }
}
