import { Tensor, InferenceSession } from 'onnxjs';

const urls = {
    "Default": {
        url: 'https://github.com/GalAster/ONNX-ModelZoo/releases/download/v1.0.0/LeNet_trained_on_MNIST.onnx',
    },
    "Lite": {
        url: 'https://github.com/GalAster/ONNX-ModelZoo/releases/download/v1.0.0/LeNet_trained_on_MNIST.onnx',
    }
}

export default async function main() {
    // Create an ONNX inference session with WebAssembly backend.
    const session = new InferenceSession({ backendHint: 'wasm' });

    const url = urls.Default.url
    await session.loadModel(url);

    const x = new Float32Array(1 * 1 * 28 * 28).fill(1);
    const tensorX = new Tensor(x, 'float32', [1, 1, 28, 28]);

    // Run model with Tensor inputs and get the result by output name defined in model.
    const outputMap = await session.run([tensorX]);
    const outputData = outputMap.get('sum');
    console.log(outputData)
}

main();