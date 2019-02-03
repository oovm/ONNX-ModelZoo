import onnx

from .dynamic_shape import shape_infer
from .layer_optimize import layer_optimize
from .meta_info import meta_info


def publish_model(path, name):
    model = onnx.load(path)
    print(onnx.checker.check_model(model))
    onnx.helper.strip_doc_string(model)
    model = shape_infer(model)
    model = layer_optimize(model)
    model = meta_info(model, name)
    print(onnx.checker.check_model(model))
    onnx.save(model, path)
    return True
