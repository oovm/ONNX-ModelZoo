import mxnet as mx
import numpy as np
from mxnet.contrib import onnx

name = 'PGGAN trained on CelebA'
input_shape = (1, 512)

model = mx.symbol.load(name + '.json')
array = mx.nd.load(name + '.params')
# array["Input"] = mx.nd.array(np.zeros(input_shape))
# net = model.bind(mx.cpu(), array)
onnx.export_model(model, array, [input_shape], np.float32, name + 'onnx', True)
