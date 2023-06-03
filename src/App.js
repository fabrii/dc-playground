import logo from './logo.svg';
import './App.css';
import { RsaSignature2018 } from "./RSA_ED25519/rsa/RsaSignature2018"
import * as vc from "@digitalbazaar/vc";
import { securityLoader } from "@digitalbazaar/security-document-loader"
import objMiPerfil from './miPerfilDriverLicense.json';

function App() {

    const qrValue = `{
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://miperfil-cvr-staging.agesic.gub.uy/api/contexts/transport/driverlicense-v1"
    ],
    "type": [
        "VerifiableCredential",
        "DriverLicenseCredential"
    ],
    "id": "urn:uuid:88dc0275-4e6c-468a-a5d8-51ada3e15ca2",
    "issuer": "urn:oid:2.16.858.0.0.0.3.0",
    "issuanceDate": "2023-06-02T15:47:05Z",
    "expirationDate": "2024-06-02T15:47:05Z",
    "credentialSubject": {
        "id": "did:key:z2DfPjA1yT6cWbLjxavov7PpqNipHUNW8QMuj6SQPPm11zP",
        "name": "Fabricio Gregorio",
        "idUruguay": "uy-ci-44679760",
        "category": "A",
        "observations": "Lentes",
        "image": "urn:uuid:bd13e335-bc56-4313-b4c8-84eb716f78c0"
    },
    "proof": {
        "type": "RsaSignature2018",
        "created": "2023-06-02T15:47:05Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "urn:oid:2.16.858.0.0.0.3.0#1",
        "jws": "eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJSUzI1NiJ9..MkiQtgRtzT7HA7OVD_JRmyyuEkdiwdwBq88N_WncPT8WnwWJvdO1IVWLEeLI_c4J-uI6kudfs9FSM4P8d5rv1JsYS_t8d1t9SHrOc55x2YmO3F5JS77SMoOAcs2dYOvMC5G0H7_Kn-XupfpzPHhZvnF9YlUQCv9MKiWgQTsAJJiOOu5B27jBDBiRjHXHkK6a5hftN-V-9TGW3zc6LE1P8RunZrHvKp2xqJns3gq5-dZBWdX15USbAAhNxcfgoYg2VyFctcdERuTpsCtEwOUO0-bFekm2LKSWf0tnEFOUE2OTnMm9Rh52QqArgMm8kjGIS0uEEJ-3b_DnQu3iobApZg"
    }
}`

  const keypem =  `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqVTFFv0Dzi4iXOnA77Ao
qjL59KxGa2F4p+FqxF8AoaP6PS2u5NtCHBAQ/CZQ5Ht2eiijWwPcmT9wO3QeFPDh
u969D2b1goDEw8CXi9TuGk6mxqCBFDXs1vafqMHWBm44+f/r6JyQ2B0qplow0rhD
YArrcHcUQEWEPjfhRRBJQogwg9qycaqFTyEaZfXm0J2f0iei+X8uNYvZ7pp+VVaB
nk/VesEZ9JUUnJT9OeSTOyf66C9vFFGUyuo2Kz7CMqx8vtaqr5Ej/5yQcCliuIRv
W5yhD2aoNQJKEucoWzwO6AtIlO25or04fvpoqoJgXV5C2aZTJ2i2JYmS0uo5T505
AwIDAQAB
-----END PUBLIC KEY-----`;

  const urnResolver = {
    async get(params) {
      let keyObject
      try {
        /*
        if (params.url.includes('#')) {
          keyObject = {
            '@context': 'https://w3id.org/security/suites/ed25519-2020/v1',
            type: "Ed25519VerificationKey2020",
            controller: "urn:oid:2.16.858.0.0.0.3.0",
            id: "urn:oid:2.16.858.0.0.0.3.0#1",
            publicKeyMultibase: "z6MkuRvMyGYMnsKgfuqdetzypcq7QpEdMgvJyfwJFM9sXVSP",
          }
        } else {
          keyObject = {
            "@context": [
              "https://www.w3.org/ns/did/v1",
              "https://w3id.org/security/suites/ed25519-2020/v1"
            ],
            "id": "urn:oid:2.16.858.0.0.0.3.0",
            "assertionMethod": [{
              "id": "urn:oid:2.16.858.0.0.0.3.0#1",
              "type": "Ed25519VerificationKey2020",
              "controller": "urn:oid:2.16.858.0.0.0.3.0",
              "publicKeyMultibase": "z6MkuRvMyGYMnsKgfuqdetzypcq7QpEdMgvJyfwJFM9sXVSP"
            }]
          }
        }*/

        if (params.url.includes('#')) {
          keyObject = {
            '@context': 'https://www.w3.org/2018/credentials/v1',
            type: "RsaVerificationKey2018",
            controller: "urn:oid:2.16.858.0.0.0.3.0",
            id: "urn:oid:2.16.858.0.0.0.3.0#1",
            publicKeyPem: keypem,
          }
        } else {
          keyObject = {
            "@context": [
              "https://www.w3.org/ns/did/v1",
              "https://www.w3.org/2018/credentials/v1"
            ],
            "id": "urn:oid:2.16.858.0.0.0.3.0",
            "assertionMethod": [{
              "id": "urn:oid:2.16.858.0.0.0.3.0#1",
              "type": "RsaVerificationKey2018",
              "controller": "urn:oid:2.16.858.0.0.0.3.0",
              "publicKeyPem": keypem,
            }]
          }
        }

      } catch (e) { throw new Error("NotFoundError") }
      return keyObject
    }
  }

  const loader = securityLoader()
  loader.setProtocolHandler({ protocol: "urn", handler: urnResolver })
  loader.addStatic('https://miperfil-cvr-staging.agesic.gub.uy/api/contexts/transport/driverlicense-v1', objMiPerfil)

  const documentLoader = loader.build()

  function removeStackReplacer(key, value) {
    return key === "stack" ? "..." : value
  }

  async function verifyCredential(credential) {
    const { issuer } = credential
    const issuerDid = typeof issuer === "string" ? issuer : issuer.id

    //const suite = new Ed25519Signature2020();
    const suite = new RsaSignature2018();

    try {
      const result = await vc.verifyCredential({
        credential,
        suite,
        documentLoader,
        checkStatus: undefined
      })

      // This logic catches the case where the verify response does not contain a `log` value
      if (result.results?.[0].log === undefined) {
        throw result.error || new Error("Verify response does not a `log` value")
      }
      return result
    } catch (err) {
      console.warn(err)
      console.log(JSON.stringify(err, removeStackReplacer, 2))
      //throw new Error(CredentialError.CouldNotBeVerified)
    }
  }

  let res = verifyCredential(JSON.parse(qrValue));

  console.log(res);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
