import logo from './logo.svg';
import './App.css';
import { RsaSignature2018 } from "./RSA_ED25519/rsa/RsaSignature2018"
//import { Ed25519Signature2020 } from "@digitalcredentials/ed25519-signature-2020"
import { Ed25519Signature2020 } from "./RSA_ED25519/Ed25519Signature2020"
import vc from "@digitalcredentials/vc"
import { securityLoader } from "@digitalcredentials/security-document-loader"
import objMiPerfil from './miPerfilDriverLicense.json';
import { purposes } from "@digitalcredentials/jsonld-signatures"

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
    "id": "urn:uuid:617e4df9-abbd-4426-9bda-55f93ab0945e",
    "issuer": "urn:oid:2.16.858.0.0.0.3.0",
    "issuanceDate": "2023-06-03T20:00:01Z",
    "expirationDate": "2024-06-03T20:00:01Z",
    "credentialSubject": {
        "id": "did:key:z2DfPjA1yT6cWbLjxavov7PpqNipHUNW8QMuj6SQPPm11zP",
        "name": "Fabricio Gregorio",
        "idUruguay": "uy-ci-44679760",
        "category": "A",
        "observations": "Lentes",
        "image": "urn:uuid:3050cb6b-e726-4c25-a841-c5e4cd1869c8"
    },
    "proof": {
        "type": "RsaSignature2018",
        "created": "2023-06-03T20:00:01Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "urn:oid:2.16.858.0.0.0.3.0#1",
        "jws": "eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJSUzI1NiJ9..V9U_RvswNOF-0r0BtjWZDA9AEb8ImsMvq4_KTW4VEQyy5TgCtsZVzeusIwYwK4EymFigMEDUGzRxlCeZFDw9o0kTGWutyFWmQYdFAf2i_ZGDjtW1_C1miC8dGkIeg4KoA74RbnLuwSUWlElBZtwfE43XnGdp2BFLDS56QxEmicXyICAIuDtfUSs4GAHeb3h3lGNdTpRh0QtyIthn6jxXepN7K0tza6G6ZzdF6oSUt_ORl9frNdz2az5uBfgAJ9eE3EMhBK1fGpvA7G8t_CDv1Vy5MYkghOLa5uifImpW3PiA0W-0GqkiDJX9ReWPgEsbxt8ceTQqf43dEKM1cslxXw"
    }
}`



//const qrValue = "{\"@context\":[\"https:\/\/www.w3.org\/2018\/credentials\/v1\",\"https:\/\/miperfil-cvr-staging.agesic.gub.uy\/api\/contexts\/transport\/driverlicense-v1\",\"https:\/\/w3id.org\/security\/suites\/ed25519-2020\/v1\"],\"type\":[\"VerifiableCredential\",\"DriverLicenseCredential\"],\"id\":\"urn:uuid:a39c3171-39ae-4023-9b7f-51c50b4cbd77\",\"issuer\":\"urn:oid:2.16.858.0.0.0.3.0\",\"issuanceDate\":\"2023-05-23T21:37:44Z\",\"expirationDate\":\"2024-05-23T21:37:43Z\",\"credentialSubject\":{\"id\":\"did:key:z2DfPjA1yT6cWbLjxavov7PpqNipHUNW8QMuj6SQPPm11zP\",\"name\":\"Fabricio Gregorio\",\"idUruguay\":\"uy-ci-44679760\",\"category\":\"A\",\"observations\":\"Lentes\",\"image\":\"urn:uuid:734cfb02-209f-4102-815b-1fa2729d70d3\"},\"proof\":{\"type\":\"Ed25519Signature2020\",\"created\":\"2023-05-23T21:37:44Z\",\"proofPurpose\":\"assertionMethod\",\"verificationMethod\":\"urn:oid:2.16.858.0.0.0.3.0#1\",\"proofValue\":\"z4agAkWzmWqh1qJ3SUNZ9wmhB2QcYX9oXpADqNpNLm8k4NhTWJDTvj1UdyFtvHKYT4qsqtVCp9zmNc7Yc5pmSA4Qv\"}}";
//const qrPresentationValue = "{\n\"@context\": [\n  \"https://www.w3.org/2018/credentials/v1\",\n  \"https://w3id.org/security/suites/ed25519-2020/v1\"\n],\n\"type\": [\n  \"VerifiablePresentation\"\n],\n\"verifiableCredential\": [\n {\"@context\":[\"https:\/\/www.w3.org\/2018\/credentials\/v1\",\"https:\/\/miperfil-cvr-staging.agesic.gub.uy\/api\/contexts\/transport\/driverlicense-v1\",\"https:\/\/w3id.org\/security\/suites\/ed25519-2020\/v1\"],\"type\":[\"VerifiableCredential\",\"DriverLicenseCredential\"],\"id\":\"urn:uuid:a39c3171-39ae-4023-9b7f-51c50b4cbd77\",\"issuer\":\"urn:oid:2.16.858.0.0.0.3.0\",\"issuanceDate\":\"2023-05-23T21:37:44Z\",\"expirationDate\":\"2024-05-23T21:37:43Z\",\"credentialSubject\":{\"id\":\"did:key:z2DfPjA1yT6cWbLjxavov7PpqNipHUNW8QMuj6SQPPm11zP\",\"name\":\"Fabricio Gregorio\",\"idUruguay\":\"uy-ci-44679760\",\"category\":\"A\",\"observations\":\"Lentes\",\"image\":\"urn:uuid:734cfb02-209f-4102-815b-1fa2729d70d3\"},\"proof\":{\"type\":\"Ed25519Signature2020\",\"created\":\"2023-05-23T21:37:44Z\",\"proofPurpose\":\"assertionMethod\",\"verificationMethod\":\"urn:oid:2.16.858.0.0.0.3.0#1\",\"proofValue\":\"z4agAkWzmWqh1qJ3SUNZ9wmhB2QcYX9oXpADqNpNLm8k4NhTWJDTvj1UdyFtvHKYT4qsqtVCp9zmNc7Yc5pmSA4Qv\"}} \n],\n\"holder\": \"did:key:z6Mkh4Nn9RWwp1gcNGJSkAaW58F9mAsc979pj5ET4QXu85TH\",\n\"proof\": {\n  \"type\": \"Ed25519Signature2020\",\n  \"created\": \"2023-05-08T15:29:02Z\",\n  \"verificationMethod\": \"did:key:z6Mkh4Nn9RWwp1gcNGJSkAaW58F9mAsc979pj5ET4QXu85TH#z6Mkh4Nn9RWwp1gcNGJSkAaW58F9mAsc979pj5ET4QXu85TH\",\n  \"proofPurpose\": \"authentication\",\n  \"challenge\": \"13a0ce32-1075-4110-abbf-8fdbff0f3afe\",\n  \"proofValue\": \"z3LVZMo4EFH5P8XXqXQrfM4G51Ey33udjscPNVSLducFnHM6MorXp89Cv1RjCEZH13jvgsc3r9LoB9T4U132iAkuY\"\n}\n              }"


  const keypem =  `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqVTFFv0Dzi4iXOnA77Ao
qjL59KxGa2F4p+FqxF8AoaP6PS2u5NtCHBAQ/CZQ5Ht2eiijWwPcmT9wO3QeFPDh
u969D2b1goDEw8CXi9TuGk6mxqCBFDXs1vafqMHWBm44+f/r6JyQ2B0qplow0rhD
YArrcHcUQEWEPjfhRRBJQogwg9qycaqFTyEaZfXm0J2f0iei+X8uNYvZ7pp+VVaB
nk/VesEZ9JUUnJT9OeSTOyf66C9vFFGUyuo2Kz7CMqx8vtaqr5Ej/5yQcCliuIRv
W5yhD2aoNQJKEucoWzwO6AtIlO25or04fvpoqoJgXV5C2aZTJ2i2JYmS0uo5T505
AwIDAQAB
-----END PUBLIC KEY-----`;

const presentationPurpose = new purposes.AssertionProofPurpose()


  const urnResolver = {
    async get(params) {
      let keyObject
      try {
        
        /*
        if (params.url.includes('#')) {
          console.log("1")
          keyObject = {
            '@context': 'https://w3id.org/security/suites/ed25519-2020/v1',
            type: "Ed25519VerificationKey2020",
            controller: "urn:oid:2.16.858.0.0.0.3.0",
            id: "urn:oid:2.16.858.0.0.0.3.0#1",
            publicKeyMultibase: "z6MkuRvMyGYMnsKgfuqdetzypcq7QpEdMgvJyfwJFM9sXVSP",
          }
        } else {
          console.log("2")
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

  async function verifyPresentation(
    presentation,
    unsignedPresentation = true
) {
    try {
        const suite = new Ed25519Signature2020();
        //const suiteRSA = new RsaSignature2018();
        console.log('verifyPresentation')
        const result = await vc.verify({
            presentation,
            presentationPurpose,
            suite,
            documentLoader,
            unsignedPresentation,
            // Only check revocation status if any VC has a 'credentialStatus' property
            //checkStatus: hasRevocation ? checkStatus : undefined
            checkStatus: undefined
        })
        console.log(JSON.stringify(result))
        return result
    } catch (err) {
        console.error('verifyPre', err)
        console.warn(err)

        throw new Error('Presentation encoded could not be checked for verification and may be malformed.')
    }
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
