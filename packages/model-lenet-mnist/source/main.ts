import { Tensor, InferenceSession } from 'onnxjs'
import { Dataset } from '@onnx/plugin-classification-utils'

const classifications = Dataset.MNIST.tags
const urls = {
    'Default': 'https://github.com/GalAster/ONNX-ModelZoo/releases/download/v1.0.0/LeNet_trained_on_MNIST.onnx',
    'Lite': 'https://microsoft.github.io/onnxjs-demo/mnist.onnx',
    'Local': 'Share/LeNet trained on MNIST.onnx'
} as Record<string, string>
//urls: { [key: string]: string } 

function get_url(str: string) {
    function isURL(url: string) {
        //     !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
        return !!url.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/g)
    }
    switch (true) {
        case urls.hasOwnProperty(str):
            return urls[str]
        case isURL(str):
            return str
        default:
            console.log('Error')
            return urls['Default']
    }
}

export default class Lenet {
    public urls: Record<string, string>
    private session: InferenceSession
    private loaded: boolean
    constructor (
        readonly config: InferenceSession.Config = { backendHint: 'wasm' },
    ) {
        this.session = new InferenceSession(this.config)
        this.loaded = false
        this.urls = urls
    }

    async load(input: string | Uint8Array = 'Default') {
        if (typeof (input) == 'string') {
            let url = get_url(input)
            await this.session.loadModel(url)
        }
        else {
            await this.session.loadModel(input)
        }
        this.loaded = true
        return null
    }


    resize() { }


    infer() { }



}
