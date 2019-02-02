import mxnet as mx
import numpy as np
from mxnet.contrib.onnx import export_model as onnx_exporter

name = 'LeNet trained on MNIST'
input_shape = (1, 1, 28, 28)
model = mx.symbol.load(name + '.json')
array = mx.nd.load(name + '.params')
onnx_exporter(model, array, [input_shape], np.float32, name + '.onnx', True)
