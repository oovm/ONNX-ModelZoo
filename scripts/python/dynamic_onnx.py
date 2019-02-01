import onnx
from onnx import shape_inference


def dynamic_onnx(path):
    original_model = onnx.load(path)
    onnx.checker.check_model(original_model)
    # print('Before shape inference, the shape info of Y is:\n{}'.format(original_model.graph.value_info))
    original_model.graph.input[0].type.tensor_type.shape.dim[0].dim_param = 'batchsize'
    inferred_model = shape_inference.infer_shapes(original_model)
    # Check the model and print Y's shape information
    print(onnx.checker.check_model(inferred_model))
    # print('After shape inference, the shape info of Y is:\n{}'.format(inferred_model.graph.value_info))
    onnx.save(inferred_model, path)
