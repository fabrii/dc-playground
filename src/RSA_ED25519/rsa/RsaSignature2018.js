/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import jsonld from 'jsonld';
import { JwsLinkedDataSignature } from './JwsLinkedDataSignature';
import { RsaVerificationKey2018 } from './rsa-verification-key-2018';

const SUITE_CONTEXT_URL_2018 = 'https://www.w3.org/2018/credentials/v1';
export class RsaSignature2018 extends JwsLinkedDataSignature {
    /**
     * @param type {string} Provided by subclass.
     *
     * @param [verificationMethod] {string} A key id URL to the paired public key.
     *
     * This parameter is required for signing:
     *
     * @param [signer] {function} an optional signer.
     *
     * Advanced optional parameters and overrides:
     *
     * @param [proof] {object} a JSON-LD document with options to use for
     *   the `proof` node (e.g. any other custom fields can be provided here
     *   using a context different from security-v2).
     * @param [date] {string|Date} signing date to use if not passed.
     * @param [key] {LDKeyPair} an optional crypto-ld KeyPair.
     * @param [useNativeCanonize] {boolean} true to use a native canonize
     *   algorithm.
     */
    constructor({
        signer, key, verificationMethod, proof, date, useNativeCanonize } = {}) {
        super({
            type: 'RsaSignature2018', alg: 'RS256',
            LDKeyClass: RsaVerificationKey2018, verificationMethod, signer, key,
            proof, date, useNativeCanonize
        });
        this.requiredKeyType = 'RsaVerificationKey2018';
    }

    async assertVerificationMethod({ verificationMethod }) {
        let contextUrl;
        if (verificationMethod.type === 'RsaVerificationKey2018') {
            contextUrl = SUITE_CONTEXT_URL_2018;
        } else {
            throw new Error(`Unsupported key type "${verificationMethod.type}".`);
        }
        if (!_includesContext({
            document: verificationMethod, contextUrl: contextUrl
        })) {
            // For DID Documents, since keys do not have their own contexts,
            // the suite context is usually provided by the documentLoader logic
            throw new TypeError(
                `The verification method (key) must contain "${contextUrl}".`
            );
        }

        if (!jsonld.hasValue(verificationMethod, 'type', this.requiredKeyType)) {
            throw new Error(
                `Invalid key type. Key type must be "${this.requiredKeyType}".`);
        }

        // ensure verification method has not been revoked
        if (verificationMethod.revoked !== undefined) {
            throw new Error('The verification method has been revoked.');
        }
    }
}

function _includesContext({ document, contextUrl }) {
    const context = document['@context'];
    return context === contextUrl ||
        (Array.isArray(context) && context.includes(contextUrl));
}